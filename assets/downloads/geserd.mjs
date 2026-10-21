#!/usr/bin/env node
const BASE=process.env.GESERD_URL||'https://geserd.com';
const KEY=process.env.GESERD_API_KEY;
const USAGE=`geserd — send and read email from the terminal

Usage
  geserd send --from hi@yourdomain.com --to ada@example.com --subject "Hello" --text "Hi Ada"
  geserd emails [--direction in|out] [--limit 20]
  geserd email <id>
  geserd domains
  geserd templates

Set GESERD_API_KEY to your key (it starts with gs_).`;
const args=process.argv.slice(2);
const cmd=args.shift();
function flags(a){const o={_:[]};for(let i=0;i<a.length;i++){if(a[i].startsWith('--')){const k=a[i].slice(2);const v=a[i+1]&&!a[i+1].startsWith('--')?a[++i]:'true';o[k]=o[k]===undefined?v:[].concat(o[k],v)}else o._.push(a[i])}return o}
async function api(method,path,body){
 const r=await fetch(BASE+'/api'+path,{method,headers:{Authorization:'Bearer '+KEY,'Content-Type':'application/json'},body:body?JSON.stringify(body):undefined});
 const j=await r.json().catch(()=>({}));
 if(!r.ok){console.error('Error: '+(j.error||r.status));process.exit(1)}
 return j}
function table(rows,cols){for(const r of rows)console.log(cols.map(c=>String(r[c]??'').slice(0,40).padEnd(42)).join(''))}
if(!cmd||cmd==='help'||cmd==='--help'){console.log(USAGE);process.exit(0)}
if(!KEY){console.error('Set GESERD_API_KEY first.');process.exit(1)}
const f=flags(args);
if(cmd==='send'){
 if(!f.from||!f.to||!f.subject){console.error('Needs --from, --to and --subject.');process.exit(1)}
 const body={from:f.from,to:[].concat(f.to),subject:f.subject};
 if(f.text)body.text=f.text;if(f.html)body.html=f.html;
 console.log(JSON.stringify(await api('POST','/emails',body),null,2))}
else if(cmd==='emails'){
 const p=new URLSearchParams();if(f.direction)p.set('direction',f.direction);p.set('limit',f.limit||'20');
 const j=await api('GET','/emails?'+p);table(j.data,['id','status','subject'])}
else if(cmd==='email'){console.log(JSON.stringify(await api('GET','/emails/'+f._[0]),null,2))}
else if(cmd==='domains'){const j=await api('GET','/domains');table(j,['name','status'])}
else if(cmd==='templates'){const j=await api('GET','/templates');table(Array.isArray(j)?j:(j.data||j.items||[]),['id','name','subject'])}
else{console.error('Unknown command.\n\n'+USAGE);process.exit(1)}
