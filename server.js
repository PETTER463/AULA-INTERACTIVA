'use strict';
const http = require('node:http');
const fs = require('node:fs');
const path = require('node:path');
const crypto = require('node:crypto');

const PORT = Number(process.env.PORT || 3000);
const HOST = process.env.HOST || '0.0.0.0';
const ROOT = path.join(__dirname, 'public');
const rooms = new Map();
const BANKFILE=path.join(__dirname,'preguntas.json');
let BANK=JSON.parse(fs.readFileSync(BANKFILE,'utf8')).preguntas;
const SYLLABI=JSON.parse(fs.readFileSync(path.join(__dirname,'silabos_2026_2.json'),'utf8'));

const ADMIN_PIN=process.env.ADMIN_PIN||'';
function poolFor(course,subject,difficulty){return BANK.filter(q=>q.course===course&&q.subject===subject&&(difficulty==='Todos'||q.difficulty===difficulty));}
function sampleQuestions(pool,n){const copy=[...pool];for(let i=copy.length-1;i>0;i--){const j=crypto.randomInt(i+1);[copy[i],copy[j]]=[copy[j],copy[i]];}return copy.slice(0,n);}
function catalog(){const result={};for(const [course,topics] of Object.entries(SYLLABI.cursos)){result[course]={};for(const item of topics)result[course][item.tema]=0;}for(const q of BANK){if(!result[q.course])result[q.course]={};result[q.course][q.subject]=(result[q.course][q.subject]||0)+1;}return result;}
function syllabusDetails(){const details={};for(const [course,topics] of Object.entries(SYLLABI.cursos)){details[course]={};for(const t of topics)details[course][t.tema]=t.subtemas;}return details;}

function admin(b){return ADMIN_PIN.length>=6&&b.pin===ADMIN_PIN;}

const publicQuestions = qs => qs.map(({id,topic,q,options})=>({id,topic,q,options}));
const token = () => crypto.randomBytes(24).toString('hex');
const respond = (res,status,data) => {res.writeHead(status,{'Content-Type':'application/json; charset=utf-8','Cache-Control':'no-store'});res.end(JSON.stringify(data));};
const fail = (res,status,message) => respond(res,status,{error:message});
function roomCode(){let c;do{c=String(crypto.randomInt(100000,1000000));}while(rooms.has(c));return c;}
function lookup(code){return rooms.get(String(code||'').trim());}
function person(room,participantToken){return [...room.players.values()].find(x=>x.token===participantToken);}
function state(room,role,playerToken){
 const now=Date.now();
 const all=[...room.players.values()];
 const rank=all.map(p=>({id:p.id,name:p.name,answered:Object.keys(p.answers).length,correct:p.correct,submitted:!!p.submittedAt,elapsedMs:p.submittedAt&&room.startedAt?p.submittedAt-room.startedAt:null,joinedAt:p.joinedAt})).sort((a,b)=>b.correct-a.correct||(a.submitted!==b.submitted?(a.submitted?-1:1):0)||(a.elapsedMs??Infinity)-(b.elapsedMs??Infinity)||a.joinedAt-b.joinedAt);
 const your=person(room,playerToken);
 const reveal=room.status==='finished';
 return {code:room.code,status:room.status,durationSec:room.durationSec,startedAt:room.startedAt,deadline:room.deadline,finishedAt:room.finishedAt,serverNow:now,topic:room.topic,course:room.course,difficulty:room.difficulty,questionCount:room.questions.length,questions:publicQuestions(room.questions),participants:all.length,ranking:rank.map((p,i)=>({...p,position:i+1,score20:p.correct*20/room.questions.length})),your:your?{id:your.id,name:your.name,answers:your.answers,submittedAt:your.submittedAt}:null,solutions:reveal?room.questions.map(({id,answer,why})=>({id,answer,why})):null,role};
}
function finish(room){if(room.status!=='running')return;room.status='finished';room.finishedAt=Date.now();for(const p of room.players.values()){if(!p.submittedAt)p.submittedAt=room.deadline;calculate(room,p);}broadcast(room);}
function calculate(room,p){p.correct=room.questions.reduce((n,q)=>n+(p.answers[q.id]===q.answer?1:0),0);}
function expire(room){if(room.status==='running'&&Date.now()>=room.deadline)finish(room);}
function broadcast(room){const data='data: '+JSON.stringify({type:'refresh',time:Date.now()})+'\n\n';for(const client of room.clients){try{client.write(data);}catch{room.clients.delete(client);}}}
function authHost(room,body){return body.hostToken===room.hostToken;}
function validateName(name){return typeof name==='string'&&name.trim().length>=2&&name.trim().length<=45;}
async function bodyJSON(req){let data='';for await(const chunk of req){data+=chunk;if(data.length>10000)throw Error('Solicitud demasiado grande.');}return JSON.parse(data||'{}');}
const mime={'.html':'text/html; charset=utf-8','.css':'text/css; charset=utf-8','.js':'text/javascript; charset=utf-8','.svg':'image/svg+xml','.png':'image/png'};
const server=http.createServer(async(req,res)=>{
 const url=new URL(req.url,'http://localhost');
 try{
  if(url.pathname==='/api/catalog'&&req.method==='GET')return respond(res,200,{catalog:catalog(),details:syllabusDetails(),editorEnabled:ADMIN_PIN.length>=6});
  if(url.pathname==='/api/events'&&req.method==='GET'){
   const room=lookup(url.searchParams.get('code'));if(!room)return fail(res,404,'Sala no encontrada.');
   const key=url.searchParams.get('token');if(key!==room.hostToken&&!person(room,key))return fail(res,403,'Acceso no autorizado.');
   res.writeHead(200,{'Content-Type':'text/event-stream','Cache-Control':'no-cache, no-transform','Connection':'keep-alive','X-Accel-Buffering':'no','Access-Control-Allow-Origin':'*'});res.write('data: {"type":"connected"}\n\n');room.clients.add(res);req.on('close',()=>room.clients.delete(res));return;
  }
  if(url.pathname==='/api/state'&&req.method==='GET'){
   const room=lookup(url.searchParams.get('code'));if(!room)return fail(res,404,'Sala no encontrada.');
   expire(room);const key=url.searchParams.get('token');const role=key===room.hostToken?'host':'player';if(role==='player'&&!person(room,key))return fail(res,403,'Acceso no autorizado.');
   return respond(res,200,state(room,role,key));
  }
  if(req.method==='POST'&&url.pathname.startsWith('/api/')){
   const b=await bodyJSON(req);
   if(url.pathname==='/api/bank'&&admin(b))return respond(res,200,{questions:BANK});
   if(url.pathname==='/api/add-question'){
    if(!admin(b))return fail(res,403,'PIN docente inválido o no configurado.');
    if(!['course','subject','difficulty','q','why'].every(k=>typeof b[k]==='string'&&b[k].trim().length>0))return fail(res,400,'Completa todos los campos.');
    if(!Array.isArray(b.options)||b.options.length!==4||!b.options.every(x=>typeof x==='string'&&x.trim().length>0)||!Number.isInteger(b.answer)||b.answer<0||b.answer>3)return fail(res,400,'Se requieren cuatro opciones y una respuesta correcta.');
    const question={id:Math.max(0,...BANK.map(q=>q.id))+1,course:b.course.trim().slice(0,80),subject:b.subject.trim().slice(0,80),difficulty:b.difficulty,topic:b.subject.trim().slice(0,80),q:b.q.trim().slice(0,500),options:b.options.map(x=>x.trim().slice(0,200)),answer:b.answer,why:b.why.trim().slice(0,1200)};
    BANK.push(question);
    // Persistencia local: efímera en Render Free tras reinicios o nuevas publicaciones.
    try{fs.writeFileSync(BANKFILE,JSON.stringify({preguntas:BANK},null,2),'utf8');}catch(e){BANK.pop();return fail(res,500,'No se pudo guardar el banco: '+e.message);}
    return respond(res,200,{ok:true,id:question.id});
   }
   if(url.pathname==='/api/create'){
    if(!Number.isInteger(b.durationSec)||b.durationSec<30||b.durationSec>3600)return fail(res,400,'Tiempo permitido: 30 a 3600 segundos.');
    const count=Number(b.count),course=String(b.course||'Matemática Básica'),subject=String(b.subject||'Funciones reales'),difficulty=String(b.difficulty||'Todos');
    if(!Number.isInteger(count)||count<5||count>20)return fail(res,400,'Selecciona entre 5 y 20 preguntas.');
    const pool=poolFor(course,subject,difficulty);if(pool.length<count)return fail(res,400,`Solo hay ${pool.length} preguntas disponibles para este tema y nivel.`);
    const code=roomCode();const room={code,course,topic:subject,difficulty,questions:sampleQuestions(pool,count),hostToken:token(),durationSec:b.durationSec,status:'waiting',startedAt:null,deadline:null,finishedAt:null,players:new Map(),clients:new Set(),createdAt:Date.now()};rooms.set(code,room);
    return respond(res,200,{code,hostToken:room.hostToken});
   }
   const room=lookup(b.code);if(!room)return fail(res,404,'Sala no encontrada.');expire(room);
   if(url.pathname==='/api/join'){
    if(room.status!=='waiting')return fail(res,409,'La competencia ya comenzó o terminó.');
    if(!validateName(b.name))return fail(res,400,'Escribe un nombre de 2 a 45 caracteres.');
    if(room.players.size>=150)return fail(res,409,'Sala llena (150 estudiantes).');
    const name=b.name.trim();if([...room.players.values()].some(p=>p.name.toLowerCase()===name.toLowerCase()))return fail(res,409,'Este nombre ya está en uso en la sala.');
    const p={id:crypto.randomUUID(),token:token(),name,answers:{},correct:0,submittedAt:null,joinedAt:Date.now()};room.players.set(p.id,p);broadcast(room);return respond(res,200,{code:room.code,playerToken:p.token});
   }
   if(url.pathname==='/api/start'||url.pathname==='/api/close'){
    if(!authHost(room,b))return fail(res,403,'Solo el docente puede controlar la sala.');
    if(url.pathname==='/api/start'){
     if(room.status!=='waiting')return fail(res,409,'La sala ya fue iniciada.');if(room.players.size===0)return fail(res,409,'Debe ingresar al menos un estudiante.');
     room.status='running';room.startedAt=Date.now();room.deadline=room.startedAt+room.durationSec*1000;setTimeout(()=>finish(room),room.durationSec*1000+30);
    } else {if(room.status!=='running')return fail(res,409,'La sala no está en curso.');finish(room);}
    broadcast(room);return respond(res,200,{ok:true});
   }
   if(url.pathname==='/api/answer'||url.pathname==='/api/submit'){
    const p=person(room,b.playerToken);if(!p)return fail(res,403,'Acceso no autorizado.');
    if(room.status!=='running'||p.submittedAt)return fail(res,409,'Esta evaluación ya terminó para ti.');
    if(url.pathname==='/api/answer'){
     const id=Number(b.id),answer=Number(b.answer);if(!room.questions.some(q=>q.id===id)||!Number.isInteger(answer)||answer<0||answer>3)return fail(res,400,'Respuesta inválida.');
     p.answers[id]=answer;calculate(room,p);
    }else{p.submittedAt=Date.now();calculate(room,p);}
    broadcast(room);return respond(res,200,{ok:true});
   }
   return fail(res,404,'Ruta desconocida.');
  }
  if(req.method!=='GET')return fail(res,405,'Método no permitido.');
  let file=decodeURIComponent(url.pathname);if(file==='/'||file==='/index.html')file='/index.html';
  const full=path.resolve(ROOT,'.'+file);if(!full.startsWith(ROOT+path.sep)&&full!==path.join(ROOT,'index.html'))return fail(res,403,'Prohibido.');
  fs.readFile(full,(err,data)=>{if(err)return fail(res,404,'Archivo no encontrado.');res.writeHead(200,{'Content-Type':mime[path.extname(full)]||'application/octet-stream','Cache-Control':'no-cache'});res.end(data);});
 }catch(e){fail(res,400,e.message||'Error inesperado.');}
});
setInterval(()=>{for(const [code,room]of rooms){expire(room);if(Date.now()-room.createdAt>24*3600000){for(const c of room.clients)c.end();rooms.delete(code);}}},10000).unref();
server.listen(PORT,HOST,()=>console.log(`Matemática Challenge disponible en http://localhost:${PORT}`));
