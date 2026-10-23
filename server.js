'use strict';
const http = require('node:http');
const fs = require('node:fs');
const path = require('node:path');
const crypto = require('node:crypto');

const PORT = Number(process.env.PORT || 3000);
const HOST = process.env.HOST || '0.0.0.0';
const ROOT = path.join(__dirname, 'public');
const rooms = new Map();
const QUESTIONS = [
 {id:1,topic:'Concepto de función y representación gráfica',q:'¿Cuál de las siguientes relaciones NO representa una función de x en y?',options:['{(1,2), (2,3), (3,4)}','{(1,2), (1,3), (2,4)}','y = 2x + 1','y = x²'],answer:1,why:'Una función asigna a cada valor de x una sola imagen. En la segunda relación x = 1 tiene dos imágenes: 2 y 3.'},
 {id:2,topic:'Dominio, rango y tipos de relaciones',q:'¿Cuál es el dominio real de f(x) = √(x − 3)?',options:['x ≤ 3','x > 3','x ≥ 3','Todos los números reales'],answer:2,why:'Para que la raíz sea real, x − 3 ≥ 0; por tanto, x ≥ 3. El dominio es [3, +∞).'},
 {id:3,topic:'Evaluación y notación de funciones',q:'Si f(x) = 2x² − 3x + 1, ¿cuánto vale f(−2)?',options:['3','15','−1','11'],answer:1,why:'f(−2) = 2(−2)² − 3(−2) + 1 = 8 + 6 + 1 = 15.'},
 {id:4,topic:'Funciones lineales',q:'¿Cuál es la pendiente de la recta que pasa por A(1, 2) y B(3, 8)?',options:['2','3','4','6'],answer:1,why:'m = (8 − 2)/(3 − 1) = 6/2 = 3.'},
 {id:5,topic:'Funciones cuadráticas',q:'¿Cuál es el vértice de la parábola f(x) = x² − 4x + 3?',options:['(−2, −1)','(2, 1)','(2, −1)','(4, 3)'],answer:2,why:'x_v = −b/(2a) = 4/2 = 2; f(2) = 4 − 8 + 3 = −1. El vértice es (2, −1).'}
];
const safeQuestions = QUESTIONS.map(({id,topic,q,options})=>({id,topic,q,options}));
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
 return {code:room.code,status:room.status,durationSec:room.durationSec,startedAt:room.startedAt,deadline:room.deadline,finishedAt:room.finishedAt,serverNow:now,questions:safeQuestions,participants:all.length,ranking:rank.map((p,i)=>({...p,position:i+1,score20:p.correct*4})),your:your?{id:your.id,name:your.name,answers:your.answers,submittedAt:your.submittedAt}:null,solutions:reveal?QUESTIONS.map(({id,answer,why})=>({id,answer,why})):null,role};
}
function finish(room){if(room.status!=='running')return;room.status='finished';room.finishedAt=Date.now();for(const p of room.players.values()){if(!p.submittedAt)p.submittedAt=room.deadline;calculate(p);}broadcast(room);}
function calculate(p){p.correct=QUESTIONS.reduce((n,q)=>n+(p.answers[q.id]===q.answer?1:0),0);}
function expire(room){if(room.status==='running'&&Date.now()>=room.deadline)finish(room);}
function broadcast(room){const data='data: '+JSON.stringify({type:'refresh',time:Date.now()})+'\n\n';for(const client of room.clients){try{client.write(data);}catch{room.clients.delete(client);}}}
function authHost(room,body){return body.hostToken===room.hostToken;}
function validateName(name){return typeof name==='string'&&name.trim().length>=2&&name.trim().length<=45;}
async function bodyJSON(req){let data='';for await(const chunk of req){data+=chunk;if(data.length>10000)throw Error('Solicitud demasiado grande.');}return JSON.parse(data||'{}');}
const mime={'.html':'text/html; charset=utf-8','.css':'text/css; charset=utf-8','.js':'text/javascript; charset=utf-8','.svg':'image/svg+xml','.png':'image/png'};
const server=http.createServer(async(req,res)=>{
 const url=new URL(req.url,'http://localhost');
 try{
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
   if(url.pathname==='/api/create'){
    if(!Number.isInteger(b.durationSec)||b.durationSec<30||b.durationSec>3600)return fail(res,400,'Tiempo permitido: 30 a 3600 segundos.');
    const code=roomCode();const room={code,hostToken:token(),durationSec:b.durationSec,status:'waiting',startedAt:null,deadline:null,finishedAt:null,players:new Map(),clients:new Set(),createdAt:Date.now()};rooms.set(code,room);
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
     const id=Number(b.id),answer=Number(b.answer);if(!QUESTIONS.some(q=>q.id===id)||!Number.isInteger(answer)||answer<0||answer>3)return fail(res,400,'Respuesta inválida.');
     p.answers[id]=answer;calculate(p);
    }else{p.submittedAt=Date.now();calculate(p);}
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
