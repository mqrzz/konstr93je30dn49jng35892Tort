(function(){
var A=window.GSApp,t=A.t,e=A.esc,root,dir,status="",rows=[],next=null,busy=false;
var KIND={queued:"wait",sent:"dim",delivered:"ok",failed:"bad",bounced:"bad",complained:"bad",received:"ok"};
var ST=["queued","sent","delivered","bounced","complained","failed"];
function stName(s){return t("au.e.st."+s,s)}
function pill(s){return A.pill(KIND[s]||"dim",stName(s))}
function tabs(){var on=function(d){return dir===d?' class="on"':""};return'<nav class="stabs"><a href="/app/emails/"'+on("out")+">"+e(t("ap.tab.send","Sending"))+'</a><a href="/app/emails/receiving/"'+on("in")+">"+e(t("ap.tab.recv","Receiving"))+'</a><a href="/app/emails/suppressions/">'+e(t("ap.tab.supp","Suppressions"))+'</a><a href="/app/emails/smtp/">'+e(t("ap.tab.smtp","SMTP"))+"</a></nav>"}
function shell(){root.innerHTML='<div class="ph"><h1>'+e(t("ap.emails","Emails"))+"</h1></div>"+tabs()+'<div class="tool" id="eTool"></div><div id="eBody"></div>';
 var tool=document.getElementById("eTool");
 tool.appendChild(A.dropdown([[""  ,t("ap.allst","All statuses")]].concat((dir==="in"?["received"]:ST).map(function(s){return[s,stName(s)]})),status,function(v){status=v;reload()}));
 var rf=document.createElement("button");rf.type="button";rf.className="flt end";rf.innerHTML=A.icon(A.IC.refresh,14)+"<span>"+e(t("au.refresh","Refresh"))+"</span>";rf.onclick=reload;tool.appendChild(rf)}
function qs(before){var q="?direction="+dir+"&limit=25";if(status)q+="&status="+encodeURIComponent(status);if(before)q+="&before="+encodeURIComponent(before);return q}
function reload(){rows=[];next=null;document.getElementById("eBody").innerHTML=A.loading();fetchPage()}
function fetchPage(){if(busy)return;busy=true;
 A.api("/emails"+qs(next)).then(function(r){busy=false;rows=rows.concat(r.data);next=r.next;draw()},function(x){busy=false;document.getElementById("eBody").innerHTML=A.failed(x,"eRetry");document.getElementById("eRetry").onclick=reload})}
function addrs(a){a=Array.isArray(a)?a:[a];return a.length>1?a[0]+" +"+(a.length-1):(a[0]||"")}
function draw(){var b=document.getElementById("eBody");
 if(!rows.length){b.innerHTML=dir==="in"?A.empty(A.IC.inbox,t("ap.e2.h","No received emails yet"),t("ap.e2.p","Mail sent to your verified domains will show up here.")):status?A.empty(A.IC.mail,t("au.e.nomatch","No emails with this status"),""):A.empty(A.IC.mail,t("ap.e1.h","No sent emails yet"),t("ap.e1.p","Start sending emails to see insights and previews for every message."),'<a class="abtn lg pri" href="/docs/quickstart/">'+e(t("ap.docs","Go to docs"))+"</a>");return}
 var C="minmax(0,1.5fr) minmax(0,2fr) minmax(0,1fr) minmax(0,1fr) 24px",who=dir==="in"?t("au.e.from","From"):t("au.e.to","To");
 b.innerHTML='<div class="dl"><div class="drow dhead" style="--cols:'+C+'"><div>'+e(who)+"</div><div>"+e(t("au.e.subject","Subject"))+"</div><div>"+e(t("au.e.status","Status"))+"</div><div>"+e(dir==="in"?t("au.e.received","Received"):t("au.e.sent","Sent"))+"</div><div></div></div>"+
  rows.map(function(m){return'<button type="button" class="drow link" data-id="'+e(m.id)+'" style="--cols:'+C+'"><div class="c strong ell" data-l="'+e(who)+'">'+e(dir==="in"?m.from_addr:addrs(m.to_addrs))+'</div><div class="c ell" data-l="'+e(t("au.e.subject","Subject"))+'">'+e(m.subject||t("au.e.nosub","(no subject)"))+'</div><div class="c" data-l="'+e(t("au.e.status","Status"))+'">'+pill(m.status)+'</div><div class="c dim" data-l="'+e(dir==="in"?t("au.e.received","Received"):t("au.e.sent","Sent"))+'" title="'+e(A.date(m.created_at))+'">'+e(A.ago(m.created_at))+'</div><div class="c end">'+A.icon(A.IC.chev,16)+"</div></button>"}).join("")+"</div>"+(next?'<div class="more"><button type="button" class="abtn lg" id="eMore">'+e(t("au.e.more","Load more"))+"</button></div>":"");
 b.querySelectorAll("[data-id]").forEach(function(r){r.onclick=function(){open(r.dataset.id)}});
 var mb=document.getElementById("eMore");if(mb)mb.onclick=function(){mb.disabled=true;fetchPage()}}

function open(id){
 var m=A.modal({title:t("au.e.det","Email details"),wide:true,body:A.loading()});
 A.api("/emails/"+encodeURIComponent(id)).then(function(d){fill(m,d)},function(x){m.body.innerHTML='<p class="ferr">'+e(A.err(x))+"</p>"});
}
function evText(ev){var d=ev.data||{};if(ev.type==="failed"||ev.type==="bounced"||ev.type==="complained"){var x=d.error||d.reason||d.diagnostic;return x?String(x).slice(0,300):""}
 if(ev.type==="sent"&&d.accepted)return(d.accepted||[]).join(", ");if(ev.type==="delivered"&&d.recipient)return d.recipient;return""}
function fill(m,d){
 var to=(d.to||[]).join(", "),hasH=!!d.html,hasT=!!d.text,tabsA=[];if(hasH)tabsA.push(["prev",t("au.e.preview","Preview")],["html","HTML"]);if(hasT)tabsA.push(["text",t("au.e.text","Plain text")]);
 var meta=[[t("au.e.from","From"),d.from],[t("au.e.to","To"),to],[t("au.e.subject","Subject"),d.subject||t("au.e.nosub","(no subject)")],[t("au.e.created","Created"),A.date(d.created_at)],["ID",d.id]];
 var ev=(d.events||[]).map(function(x){var tx=evText(x);return'<li><span class="dot '+(KIND[x.type]||"dim")+'"></span><div><div class="strong">'+e(t("au.e.ev."+x.type,x.type))+'</div>'+(tx?'<div class="dim sm brk">'+e(tx)+"</div>":"")+'</div><time class="dim sm">'+e(A.date(x.created_at))+"</time></li>"}).join("");
 m.el.querySelector("h2").textContent=d.subject||t("au.e.nosub","(no subject)");
 m.body.innerHTML='<div class="mstat">'+pill(d.status)+"</div>"+(d.error?'<div class="warn bad">'+A.icon('<circle cx="12" cy="12" r="9"/><path d="M12 8v5M12 16h.01"/>',18)+"<span>"+e(d.error)+"</span></div>":"")+
  '<dl class="meta">'+meta.map(function(r){return"<div><dt>"+e(r[0])+'</dt><dd class="brk">'+e(r[1])+"</dd></div>"}).join("")+"</dl>"+
  '<h3 class="sh3">'+e(t("au.e.events","Events"))+'</h3><ul class="evl">'+(ev||'<li class="dim sm">'+e(t("au.e.noev","No events yet."))+"</li>")+"</ul>"+
  (tabsA.length?'<h3 class="sh3">'+e(t("au.e.content","Content"))+'</h3><div class="seg2" id="cTabs">'+tabsA.map(function(x,i){return'<button type="button" data-k="'+x[0]+'" class="'+(i?"":"on")+'">'+e(x[1])+"</button>"}).join("")+'</div><div id="cBody" class="cbody"></div>':"");
 if(!tabsA.length)return;
 var body=m.body.querySelector("#cBody");
 function show(k){m.body.querySelectorAll("#cTabs button").forEach(function(b){b.classList.toggle("on",b.dataset.k===k)});body.innerHTML="";
  if(k==="prev"){var f=document.createElement("iframe");f.setAttribute("sandbox","allow-popups allow-popups-to-escape-sandbox");f.setAttribute("referrerpolicy","no-referrer");f.className="pv";f.srcdoc='<base target="_blank"><style>body{font-family:Arial,Helvetica,sans-serif;margin:16px;color:#111}</style>'+d.html;body.appendChild(f)}
  else{var p=document.createElement("pre");p.className="src";p.textContent=k==="html"?d.html:d.text;body.appendChild(p)}}
 m.body.querySelector("#cTabs").onclick=function(ev){var b=ev.target.closest("button");if(b)show(b.dataset.k)};show(tabsA[0][0]);
}

A.ready(function(){root=document.getElementById("app-root");if(!root)return;dir=root.dataset.dir==="in"?"in":"out";shell();reload()});
})();
