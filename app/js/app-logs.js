(function(){
var A=window.GSApp,t=A.t,e=A.esc,root,kind,F={status:"",method:"",type:"",direction:"",domain:"",q:""},rows=[],next=null,total=0,keep=0,busy=false,seq=0,doms=[];
var EK={sent:"dim",delivered:"ok",delayed:"wait",bounced:"bad",complained:"bad",failed:"bad",received:"ok"};
function tabs(){var on=function(k){return kind===k?' class="on"':""};return'<nav class="stabs"><a href="/app/logs/"'+on("requests")+">"+e(t("ap.lg.req","Requests"))+'</a><a href="/app/logs/events/"'+on("events")+">"+e(t("ap.lg.ev","Events"))+"</a></nav>"}
function dd(opts,key,cls){return A.dropdown(opts,F[key],function(v){F[key]=v;reload()},cls)}
function shell(){
 root.innerHTML='<div class="ph"><h1>'+e(t("ap.l.t","Logs"))+"</h1></div>"+tabs()+'<div class="tool" id="lgTool"></div><div id="lgBody"></div>';
 var tl=document.getElementById("lgTool");
 if(kind==="requests"){
  tl.appendChild(dd([["",t("ap.allst","All statuses")],["2xx",t("ap.lg.s2","Success (2xx)")],["4xx",t("ap.lg.s4","Client error (4xx)")],["5xx",t("ap.lg.s5","Server error (5xx)")]],"status"));
  tl.appendChild(dd([["",t("ap.lg.allm","All methods")],["POST","POST"],["GET","GET"],["PATCH","PATCH"],["PUT","PUT"],["DELETE","DELETE"],["SMTP","SMTP"]],"method"))
 }else{
  tl.appendChild(dd([["",t("ap.lg.allt","All event types")]].concat(["sent","delivered","delayed","bounced","complained","failed","received"].map(function(x){return[x,t("au.e.st."+x,x)]})),"type"));
  tl.appendChild(dd([["",t("ap.lg.alld","Sent and received")],["out",t("ap.tab.send","Sending")],["in",t("ap.tab.recv","Receiving")]],"direction"));
  tl.appendChild(dd([["",t("ap.alldom","All domains")]].concat(doms.map(function(x){return[x,x]})),"domain","lg-wide"))
 }
 var s=document.createElement("label");s.className="bx-search lg-search";s.innerHTML=A.icon('<circle cx="11" cy="11" r="7"/><path d="m20 20-3.5-3.5"/>',16)+'<input type="search" autocomplete="off" spellcheck="false" maxlength="100" aria-label="'+e(t("au.search","Search"))+'" placeholder="'+e(kind==="requests"?t("ap.lg.sreq","Search by endpoint"):t("ap.lg.sev","Search by address or subject"))+'">';
 var inp=s.querySelector("input"),tm;inp.value=F.q;inp.oninput=function(){clearTimeout(tm);tm=setTimeout(function(){F.q=inp.value.trim();reload()},300)};tl.appendChild(s);
 var tr=document.createElement("div");tr.className="mx-tr";tl.appendChild(tr);
 var ex=document.createElement("button");ex.type="button";ex.className="flt";ex.innerHTML=A.icon('<path d="M12 4v11M7 10l5 5 5-5M5 19h14"/>',14)+"<span>"+e(t("ap.export","Export"))+"</span>";ex.onclick=function(){location.href=(window.GESERD&&GESERD.api||"/api")+"/logs/export?"+qs(null,true)};tr.appendChild(ex);
 var rf=document.createElement("button");rf.type="button";rf.className="flt";rf.innerHTML=A.icon(A.IC.refresh,14)+"<span>"+e(t("au.refresh","Refresh"))+"</span>";rf.onclick=reload;tr.appendChild(rf)
}
function qs(before,exp){
 var p=["kind="+kind];if(!exp)p.push("limit=50");
 Object.keys(F).forEach(function(k){if(F[k]&&(kind==="requests"?(k==="status"||k==="method"||k==="q"):k!=="status"&&k!=="method"))p.push(k+"="+encodeURIComponent(F[k]))});
 if(before)p.push("before="+encodeURIComponent(before));return p.join("&")
}
function reload(){rows=[];next=null;seq++;busy=false;document.getElementById("lgBody").innerHTML=A.loading();page()}
function page(){
 if(busy)return;busy=true;var my=seq;
 A.api("/logs?"+qs(next)).then(function(r){if(my!==seq)return;busy=false;rows=rows.concat(r.data);next=r.next;total=r.total;keep=r.retention_days;draw()},function(x){if(my!==seq)return;busy=false;var b=document.getElementById("lgBody");b.innerHTML=A.failed(x,"lgRetry");document.getElementById("lgRetry").onclick=reload})
}
function filtered(){return!!(F.status||F.method||F.type||F.direction||F.domain||F.q)}
function code(c){var k=c>=500?"bad":c>=400?"wait":c>=300?"dim":"ok";return'<span class="st '+k+'"><i></i>'+c+"</span>"}
function who(r){return r.via==="smtp"?t("ap.lg.smtp","SMTP submission"):r.key_name?r.key_name:t("ap.lg.nokey","Unknown key")}
function addrs(a){a=Array.isArray(a)?a:[a];return a.length>1?a[0]+" +"+(a.length-1):(a[0]||"")}
function keepNote(){return keep?'<p class="mx-note dim sm lg-keep">'+e(t("ap.lg.keep","Logs are kept for {n} days on your plan.",{n:keep}))+(keep<365?' <a href="/app/settings/billing/">'+e(t("ap.mx.upg","Upgrade for a longer history"))+"</a>":"")+"</p>":""}
function more(){
 return'<div class="bx-pg"><span>'+e(t("ap.lg.showing","Showing {a} of {b}",{a:A.num(rows.length),b:A.num(total)}))+"</span>"+(next?'<div><button type="button" class="abtn lg" id="lgMore">'+e(t("au.more","Load more"))+"</button></div>":"")+"</div>"+keepNote()
}
function draw(){
 var b=document.getElementById("lgBody");
 if(!rows.length){
  var ic='<path d="M4 6h16M4 12h16M4 18h10"/>';
  b.innerHTML=(filtered()?A.empty(ic,t("ap.lg.nomatch","Nothing matches these filters"),t("ap.lg.nomatch.p","Try another filter or clear the search.")):kind==="requests"?A.empty(ic,t("ap.l.h","No logs yet"),t("ap.l.p","Every API request appears here with its full details."),'<a class="abtn lg pri" href="/docs/quickstart/">'+e(t("ap.docs","Go to docs"))+"</a>"):A.empty(ic,t("ap.lg.ev.h","No events yet"),t("ap.lg.ev.p","Sent, delivered, bounced and received events appear here.")))+keepNote();
  return
 }
 var h;
 if(kind==="requests"){
  var C="96px minmax(0,2.6fr) minmax(0,1.2fr) 80px minmax(0,1.1fr)";
  h='<div class="dl"><div class="drow dhead" style="--cols:'+C+'"><div>'+e(t("au.e.status","Status"))+"</div><div>"+e(t("ap.lg.endpoint","Endpoint"))+"</div><div>"+e(t("ap.lg.source","Source"))+"</div><div>"+e(t("ap.lg.time","Duration"))+"</div><div>"+e(t("ap.lg.when","Time"))+"</div></div>"+rows.map(function(r,i){return'<button type="button" class="drow link" data-i="'+i+'" style="--cols:'+C+'"><div class="c" data-l="'+e(t("au.e.status","Status"))+'">'+code(r.status)+'</div><div class="c ell lg-ep" data-l="'+e(t("ap.lg.endpoint","Endpoint"))+'"><b class="lg-m">'+e(r.method)+"</b> "+e(r.path)+'</div><div class="c dim ell" data-l="'+e(t("ap.lg.source","Source"))+'">'+e(who(r))+'</div><div class="c dim" data-l="'+e(t("ap.lg.time","Duration"))+'">'+r.ms+' ms</div><div class="c dim" data-l="'+e(t("ap.lg.when","Time"))+'" title="'+e(A.date(r.created_at))+'">'+e(A.ago(r.created_at))+"</div></button>"}).join("")+"</div>"
 }else{
  var C2="minmax(0,1.1fr) minmax(0,1.6fr) minmax(0,2fr) minmax(0,1fr)";
  h='<div class="dl"><div class="drow dhead" style="--cols:'+C2+'"><div>'+e(t("ap.lg.event","Event"))+"</div><div>"+e(t("ap.lg.addr","Address"))+"</div><div>"+e(t("au.e.subject","Subject"))+"</div><div>"+e(t("ap.lg.when","Time"))+"</div></div>"+rows.map(function(r,i){var ad=r.recipient||(r.direction==="in"?r.from_addr:addrs(r.to_addrs));return'<button type="button" class="drow link" data-i="'+i+'" style="--cols:'+C2+'"><div class="c" data-l="'+e(t("ap.lg.event","Event"))+'">'+A.pill(EK[r.type]||"dim",t("au.e.st."+r.type,r.type))+'</div><div class="c strong ell" data-l="'+e(t("ap.lg.addr","Address"))+'">'+e(ad)+'</div><div class="c ell dim" data-l="'+e(t("au.e.subject","Subject"))+'">'+e(r.subject||t("au.e.nosub","(no subject)"))+'</div><div class="c dim" data-l="'+e(t("ap.lg.when","Time"))+'" title="'+e(A.date(r.created_at))+'">'+e(A.ago(r.created_at))+"</div></button>"}).join("")+"</div>"
 }
 b.innerHTML=h+more();
 b.querySelectorAll("[data-i]").forEach(function(x){x.onclick=function(){var r=rows[+x.dataset.i];kind==="requests"?openReq(r):openEv(r)}});
 var mb=document.getElementById("lgMore");if(mb)mb.onclick=function(){mb.disabled=true;page()}
}
function metaHtml(m){return'<dl class="meta">'+m.filter(function(r){return r[1]!=null&&r[1]!==""}).map(function(r){return"<div><dt>"+e(r[0])+'</dt><dd class="brk">'+e(r[1])+"</dd></div>"}).join("")+"</dl>"}
function jsonBlock(title,v,id){
 var txt=v==null?"":JSON.stringify(v,null,2);
 return'<div class="lg-jh"><h3 class="sh3">'+e(title)+"</h3>"+(txt?'<button type="button" class="abtn" data-c="'+id+'">'+A.icon(A.IC.copy,14)+"<span>"+e(t("au.copy","Copy"))+"</span></button>":"")+"</div>"+(txt?'<pre class="src lg-pre">'+e(txt)+"</pre>":'<p class="dim sm">'+e(t("ap.lg.nobody","No body."))+"</p>")
}
function openReq(r){
 var m=A.modal({title:r.method+" "+r.path,wide:true,body:A.loading()});
 A.api("/logs/requests/"+encodeURIComponent(r.id)).then(function(d){
  m.body.innerHTML='<div class="mstat">'+code(d.status)+"</div>"+metaHtml([[t("ap.lg.when","Time"),A.date(d.created_at)],[t("ap.lg.source","Source"),who(d)+(d.key_prefix?" ("+d.key_prefix+"…)":"")],[t("ap.lg.time","Duration"),d.ms+" ms"],["IP",d.ip],[t("ap.lg.ua","User agent"),d.ua],["ID",String(d.id)]])+jsonBlock(t("ap.lg.reqb","Request body"),d.req,"req")+jsonBlock(t("ap.lg.resb","Response body"),d.res,"res");
  m.body.querySelectorAll("[data-c]").forEach(function(b){b.onclick=function(){A.copy(JSON.stringify(b.dataset.c==="req"?d.req:d.res,null,2),b)}})
 },function(x){m.body.innerHTML='<p class="ferr">'+e(A.err(x))+"</p>"})
}
function openEv(r){
 var why=r.type==="bounced"?A.dsn(r.dsn):"";
 var m=A.modal({title:t("au.e.ev."+r.type,r.type),wide:true,body:"<div class=\"mstat\">"+A.pill(EK[r.type]||"dim",t("au.e.st."+r.type,r.type))+"</div>"+(why?'<div class="warn bad">'+A.icon('<circle cx="12" cy="12" r="9"/><path d="M12 8v5M12 16h.01"/>',18)+"<span>"+e(why)+"</span></div>":"")+metaHtml([[t("ap.lg.when","Time"),A.date(r.created_at)],[t("au.e.from","From"),r.from_addr],[t("au.e.to","To"),(r.to_addrs||[]).join(", ")],[t("ap.lg.rcpt","Recipient"),r.recipient],[t("au.e.subject","Subject"),r.subject||t("au.e.nosub","(no subject)")],["DSN",r.dsn],[t("ap.lg.detail","Server response"),r.detail],[t("ap.lg.emailid","Email ID"),r.email_id]])})
}
A.ready(function(){
 root=document.getElementById("app-root");if(!root)return;kind=root.dataset.kind==="events"?"events":"requests";
 var go=function(){shell();reload()};
 if(kind==="events")A.api("/domains").then(function(r){doms=(Array.isArray(r)?r:[]).map(function(d){return d.name}).filter(Boolean)},function(){}).then(go);else go()
})
})();
