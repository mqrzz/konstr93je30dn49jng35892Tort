(function(){
var A=window.GSApp,t=A.t,e=A.esc,root,checks={};
var COLS="minmax(0,2fr) minmax(0,1fr) minmax(0,1.2fr) 32px";
function stDom(d){return d.status==="verified"?A.pill("ok",t("au.d.verified","Verified")):A.pill("wait",t("au.d.pending","Pending"))}

function head(count){return'<div class="ph pgh"><div><h1>'+e(t("ap.d.t","Domains"))+"</h1>"+(count?'<p class="psub">'+e(count)+"</p>":"")+'</div><button type="button" class="abtn lg pri" id="dNew">'+A.icon(A.IC.plus,16)+"<span>"+e(t("ap.d.add","Add domain"))+"</span></button></div>"}
function list(){
 root.innerHTML=head()+A.loading();wire();
 Promise.all([A.api("/domains"),A.api("/subdomain"),A.api("/usage").catch(function(){return null})]).then(function(r){drawList(r[0],r[1],r[2])},function(x){root.innerHTML=head()+A.failed(x,"dRetry");wire();var b=document.getElementById("dRetry");if(b)b.onclick=list});
}
function drawList(ds,sd,us){
 var count=us?t("au.d.count","{a} of {b} domains used",{a:A.num(ds.length),b:us.limits.domains?A.num(us.limits.domains):t("au.unlimited","Unlimited")}):"";
 var tbl=ds.length?'<div class="dl"><div class="drow dhead" style="--cols:'+COLS+'"><div>'+e(t("au.d.name","Domain"))+"</div><div>"+e(t("au.d.status","Status"))+"</div><div>"+e(t("au.d.added","Added"))+"</div><div></div></div>"+
  ds.map(function(d){return'<a class="drow link" href="/app/domains/?id='+e(d.id)+'" style="--cols:'+COLS+'"><div class="c strong" data-l="'+e(t("au.d.name","Domain"))+'">'+e(d.name)+'</div><div class="c" data-l="'+e(t("au.d.status","Status"))+'">'+stDom(d)+'</div><div class="c dim" data-l="'+e(t("au.d.added","Added"))+'">'+e(A.date(d.created_at))+'</div><div class="c end">'+A.icon(A.IC.chev,16)+"</div></a>"}).join("")+"</div>"
  :A.empty(A.IC.globe,t("ap.d.h","No domains yet"),t("ap.d.p","Verify a domain by adding a DNS record and start sending and receiving emails from your own address."),'<button type="button" class="abtn lg pri" data-new>'+e(t("ap.d.add","Add domain"))+"</button>");
 root.innerHTML=head(count)+subCard(sd)+'<h2 class="sh2">'+e(t("au.d.own","Your domains"))+"</h2>"+tbl;
 wire();wireSub(sd);
}
function wire(){root.querySelectorAll("#dNew,[data-new]").forEach(function(b){b.onclick=add})}

function add(){
 var f=document.createElement("div");f.innerHTML='<label class="lab" for="dName">'+e(t("au.d.name","Domain"))+'</label><input class="fld" id="dName" autocomplete="off" autocapitalize="none" spellcheck="false" inputmode="url" placeholder="example.com"><p class="ferr" id="dErr" hidden></p><p class="fhint">'+e(t("au.d.add.h","Use a domain or subdomain you control, for example mail.example.com."))+"</p>";
 var m=A.modal({title:t("au.d.add.t","Add domain"),desc:t("au.d.add.d","We generate a DKIM key and the DNS records you need."),body:f,actions:[{label:t("au.cancel","Cancel")},{label:t("au.d.add.b","Add"),cls:"pri",onClick:function(mm,b){go(mm,b)}}]});
 var i=f.querySelector("#dName");i.addEventListener("keydown",function(ev){if(ev.key==="Enter"){ev.preventDefault();go(m,m.el.querySelector(".ma .pri"))}});
 function go(mm,b){var er=f.querySelector("#dErr");er.hidden=true;var v=i.value.trim().toLowerCase().replace(/^https?:\/\//,"").replace(/\/.*$/,"");if(!v){i.focus();return}b.disabled=true;
  A.api("/domains",{method:"POST",body:{name:v}}).then(function(d){mm.close();location.href="/app/domains/?id="+encodeURIComponent(d.id)},function(x){b.disabled=false;er.textContent=A.err(x);er.hidden=false})}
}

function subCard(sd){
 var base=sd.base,items=sd.items||[],full=sd.limit&&items.length>=sd.limit;
 var mine=items.map(function(s){return'<div class="subrow"><div><div class="strong">'+e(s.domain)+'</div><div class="dim sm">'+e(t("au.sd.use","Send from anything@{d}",{d:s.domain}))+'</div></div><div class="subact"><button type="button" class="abtn cp" data-cps="'+e(s.domain)+'">'+A.icon(A.IC.copy,15)+"<span>"+e(t("au.copy","Copy"))+'</span></button><button type="button" class="app-ico dng" data-rel="'+e(s.slug)+'" aria-label="'+e(t("au.sd.release","Release"))+'" title="'+e(t("au.sd.release","Release"))+'">'+A.icon(A.IC.trash,16)+"</button></div></div>"}).join("");
 var form=full?'<p class="dim sm">'+e(t("au.sd.limit","Your plan includes {n} subdomains.",{n:A.num(sd.limit)}))+"</p>":
  '<div class="slugrow"><input class="slug" id="sdIn" maxlength="30" autocomplete="off" autocapitalize="none" spellcheck="false" placeholder="'+e(t("au.sd.ph","your-name"))+'" aria-label="'+e(t("au.sd.t","Geserd subdomain"))+'"><span class="suf">.'+e(base)+'</span></div><button type="button" class="abtn lg pri" id="sdGo" disabled>'+e(t("au.sd.claim","Claim"))+'</button><p class="hint" id="sdHint" aria-live="polite"></p>';
 return'<section class="gcard sdcard"><div class="sdl"><h2>'+e(t("au.sd.t","Geserd subdomain"))+"</h2><p>"+e(t("au.sd.d","No domain of your own? Claim a free name and send from anything@name.geserd.com right away."))+"</p>"+(full?"":'<p class="dim sm">'+e(t("au.sd.free","On the Free plan, messages carry a small “Sent with Geserd” line."))+"</p>")+'</div><div class="sdr">'+(mine?'<div class="sublist">'+mine+"</div>":"")+(full?"":'<div class="'+(mine?"sdadd more":"sdadd")+'">'+form+"</div>")+"</div></section>";
}
function wireSub(sd){
 root.querySelectorAll("[data-cps]").forEach(function(b){b.onclick=function(){A.copy(b.dataset.cps,b)}});
 root.querySelectorAll("[data-rel]").forEach(function(b){b.onclick=function(){
  var d=b.dataset.rel+"."+sd.base;
  A.modal({title:t("au.sd.release.t","Release {d}?",{d:d}),desc:t("au.sd.release.p","Anyone can claim this name afterwards, and you can no longer send from it."),actions:[{label:t("au.cancel","Cancel")},{label:t("au.sd.release","Release"),cls:"dng",onClick:function(m,bb){bb.disabled=true;A.api("/subdomain/"+encodeURIComponent(b.dataset.rel),{method:"DELETE"}).then(function(){m.close();A.toast(t("au.sd.released","Subdomain released"));list()},function(x){bb.disabled=false;A.toast(A.err(x))})}}]})}});
 var inp=document.getElementById("sdIn");if(!inp)return;var go=document.getElementById("sdGo"),hint=document.getElementById("sdHint"),tm,seq=0;
 function say(kind,msg){hint.className="hint "+(kind||"");hint.textContent=msg||""}
 inp.addEventListener("input",function(){var v=inp.value.toLowerCase().replace(/[^a-z0-9-]/g,"");if(v!==inp.value)inp.value=v;go.disabled=true;clearTimeout(tm);
  if(!v){say();return}
  if(!/^[a-z0-9][a-z0-9-]{1,28}[a-z0-9]$/.test(v)||v.indexOf("--")>-1){say("bad",t("au.sd.invalid","Use 3–30 letters, digits or hyphens, with no double hyphens."));return}
  say("",t("au.sd.checking","Checking…"));var n=++seq;
  tm=setTimeout(function(){A.api("/subdomain/check/"+encodeURIComponent(v)).then(function(r){if(n!==seq)return;
   if(r.available){say("ok",t("au.sd.avail","{d} is available",{d:v+"."+sd.base}));go.disabled=false}
   else say("bad",r.reason==="reserved"?t("au.sd.reserved","This name is reserved."):r.reason==="invalid"?t("au.sd.invalid","Use 3–30 letters, digits or hyphens, with no double hyphens."):t("au.sd.taken","{d} is already taken",{d:v+"."+sd.base}))},function(x){if(n===seq)say("bad",A.err(x))})},350)});
 function claim(){var v=inp.value;if(go.disabled)return;go.disabled=true;A.api("/subdomain",{method:"POST",body:{slug:v}}).then(function(){A.toast(t("au.sd.claimed","Subdomain claimed"));list()},function(x){say("bad",A.err(x));go.disabled=false})}
 go.onclick=claim;inp.addEventListener("keydown",function(ev){if(ev.key==="Enter"){ev.preventDefault();claim()}});
}

var RECS={dkim:["au.d.rec.dkim","DKIM","au.d.rec.dkim.n","Signs every message so receivers know it came from you."],spf:["au.d.rec.spf","SPF","au.d.rec.spf.n","Authorises the Geserd server to send for this domain."],mx:["au.d.rec.mx","MX","au.d.rec.mx.n","Needed only to receive email on this domain."],dmarc:["au.d.rec.dmarc","DMARC","au.d.rec.dmarc.n","Recommended. Tells receivers what to do with unauthenticated mail; not checked automatically."]};
var RCOLS="minmax(0,.7fr) minmax(0,1.1fr) minmax(0,3fr) minmax(0,.6fr) minmax(0,1fr)";
function recState(d,p){var c=checks[d.id];
 if(p==="dmarc")return A.pill("dim",t("au.d.s.rec","Recommended"));
 if(c)return c[p]?A.pill("ok",t("au.d.s.ok","Found")):A.pill("bad",t("au.d.s.miss","Not found"));
 if(d.status==="verified"&&d.sending_ok){if(p==="mx")return d.receiving_ok?A.pill("ok",t("au.d.s.ok","Found")):A.pill("dim",t("au.d.s.pend","Not checked"));return A.pill("ok",t("au.d.s.ok","Found"))}
 return A.pill("wait",t("au.d.s.pend","Not checked"))}
function detail(id){
 root.innerHTML=back()+A.loading();
 A.api("/domains/"+encodeURIComponent(id)).then(function(d){drawDetail(d)},function(x){root.innerHTML=back()+(x.status===404?A.empty(A.IC.globe,t("au.err.not_found","Not found"),"",'<a class="abtn lg" href="/app/domains/">'+e(t("au.d.back","All domains"))+"</a>"):A.failed(x,"dRetry"));var b=document.getElementById("dRetry");if(b)b.onclick=function(){detail(id)}});
}
function back(){return'<a class="backlnk" href="/app/domains/">'+A.icon(A.IC.back,16)+"<span>"+e(t("au.d.back","All domains"))+"</span></a>"}
function drawDetail(d){
 var rows=d.records.map(function(r){var m=RECS[r.purpose]||[,r.purpose.toUpperCase(),,""];
  return'<div class="drow rec" style="--cols:'+RCOLS+'"><div class="c" data-l="'+e(t("au.d.type","Type"))+'"><span class="tag">'+e(r.type)+'</span></div><div class="c" data-l="'+e(t("au.d.host","Name"))+'"><div class="cv"><code class="mono">'+e(r.name)+'</code><button type="button" class="cpi" data-cp="'+e(r.name)+'" aria-label="'+e(t("au.copy","Copy"))+'">'+A.icon(A.IC.copy,14)+'</button></div></div><div class="c" data-l="'+e(t("au.d.value","Value"))+'"><div class="cv"><code class="mono wrap">'+e(r.value)+'</code><button type="button" class="cpi" data-cp="'+e(r.value)+'" aria-label="'+e(t("au.copy","Copy"))+'">'+A.icon(A.IC.copy,14)+'</button></div><div class="dim sm nt"><strong>'+e(t(m[0],m[1]))+"</strong> · "+e(t(m[2],m[3]))+'</div></div><div class="c dim" data-l="'+e(t("au.d.prio","Priority"))+'">'+(r.priority!=null?e(r.priority):"—")+'</div><div class="c" data-l="'+e(t("au.d.status","Status"))+'">'+recState(d,r.purpose)+"</div></div>"}).join("");
 root.innerHTML=back()+'<div class="ph pgh"><div class="dtitle"><h1>'+e(d.name)+"</h1>"+stDom(d)+'</div><div class="acts"><button type="button" class="abtn lg pri" id="dVer">'+A.icon(A.IC.refresh,16)+"<span>"+e(t("au.d.verify","Verify DNS records"))+'</span></button></div></div>'+
  '<div class="sumgrid"><div class="gcard sm2"><div class="dim sm">'+e(t("au.d.send","Sending"))+"</div><div>"+(d.sending_ok?A.pill("ok",t("au.d.ready","Ready")):A.pill("wait",t("au.d.s.notyet","Not verified yet")))+'</div></div><div class="gcard sm2"><div class="dim sm">'+e(t("au.d.recv","Receiving"))+"</div><div>"+(d.receiving_ok?A.pill("ok",t("au.d.ready","Ready")):A.pill("dim",t("au.d.s.mxneeded","MX record needed")))+'</div></div><div class="gcard sm2"><div class="dim sm">'+e(t("au.d.added","Added"))+'</div><div class="strong">'+e(A.date(d.created_at))+"</div></div></div>"+
  '<section class="ssec2"><h2>'+e(t("au.d.rec.t","DNS records"))+"</h2><p>"+e(t("au.d.rec.d","Add these records at the company that hosts your DNS, then press Verify. Changes can take up to 48 hours to appear."))+'</p><div class="dl">'+'<div class="drow dhead" style="--cols:'+RCOLS+'"><div>'+e(t("au.d.type","Type"))+"</div><div>"+e(t("au.d.host","Name"))+"</div><div>"+e(t("au.d.value","Value"))+"</div><div>"+e(t("au.d.prio","Priority"))+"</div><div>"+e(t("au.d.status","Status"))+"</div></div>"+rows+"</div></section>"+
  '<section class="ssec2 danger"><div><h2>'+e(t("au.d.del","Delete domain"))+"</h2><p>"+e(t("au.d.del.d","Removes this domain and its DKIM key from Geserd. Your DNS records are not touched."))+'</p></div><button type="button" class="abtn lg dng" id="dDel">'+e(t("au.d.del","Delete domain"))+"</button></section>";
 root.querySelectorAll("[data-cp]").forEach(function(b){b.onclick=function(){A.copy(b.dataset.cp)}});
 document.getElementById("dVer").onclick=function(){verify(d)};
 document.getElementById("dDel").onclick=function(){del(d)};
}
function verify(d){var b=document.getElementById("dVer");b.disabled=true;b.querySelector("span").textContent=t("au.d.verifying","Checking DNS…");
 A.api("/domains/"+encodeURIComponent(d.id)+"/verify",{method:"POST"}).then(function(r){checks[d.id]=r.checks||{};A.toast(r.sending_ok?t("au.d.ok","Domain verified. You can send from it now."):t("au.d.miss","Some records weren’t found yet. DNS changes can take a while — try again soon."));return A.api("/domains/"+encodeURIComponent(d.id))}).then(drawDetail,function(x){A.toast(A.err(x));b.disabled=false;b.querySelector("span").textContent=t("au.d.verify","Verify DNS records")})}
function del(d){A.modal({title:t("au.d.del.t","Delete {name}?",{name:d.name}),desc:t("au.d.del.p","You will no longer be able to send from this domain. Your DNS records are not touched."),actions:[{label:t("au.cancel","Cancel")},{label:t("au.d.del","Delete domain"),cls:"dng",onClick:function(m,b){b.disabled=true;A.api("/domains/"+encodeURIComponent(d.id),{method:"DELETE"}).then(function(){location.href="/app/domains/"},function(x){b.disabled=false;A.toast(A.err(x))})}}]})}

A.ready(function(){root=document.getElementById("app-root");if(!root)return;var id=new URLSearchParams(location.search).get("id");id?detail(id):list()});
})();
