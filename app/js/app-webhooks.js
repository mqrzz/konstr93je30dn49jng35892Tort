(function(){
var A=window.GSApp,t=A.t,e=A.esc,root;
var EV=["email.sent","email.delivered","email.delivery_delayed","email.bounced","email.complained","email.failed","email.received"];
var C="minmax(0,2.4fr) minmax(0,1.2fr) minmax(0,1fr) 24px";
function evName(x){return t("au.w.ev."+x,x)}
function head(count){return'<div class="ph pgh"><div><h1>'+e(t("ap.w.t","Webhooks"))+"</h1>"+(count?'<p class="psub">'+e(count)+"</p>":"")+'</div><button type="button" class="abtn lg pri" id="wNew">'+A.icon(A.IC.plus,16)+"<span>"+e(t("ap.w.add","Add webhook"))+"</span></button></div>"}
function back(){return'<a class="backlnk" href="/app/webhooks/">'+A.icon(A.IC.back,16)+"<span>"+e(t("au.w.back","All webhooks"))+"</span></a>"}
function list(){
 root.innerHTML=head()+A.loading();wire();
 Promise.all([A.api("/webhooks"),A.api("/usage").catch(function(){return null})]).then(function(r){draw(r[0],r[1])},function(x){root.innerHTML=head()+A.failed(x,"wRetry");wire();document.getElementById("wRetry").onclick=list})}
function scope(h){return h.events.length?(h.events.length===1?evName(h.events[0]):A.plural(h.events.length,"au.w.events","{n} events")):t("au.w.all","All events")}
function draw(hs,us){
 var count=us?t("au.w.count","{a} of {b} webhooks used",{a:A.num(hs.length),b:us.limits.webhooks?A.num(us.limits.webhooks):t("au.unlimited","Unlimited")}):"";
 var body=hs.length?'<div class="dl"><div class="drow dhead" style="--cols:'+C+'"><div>'+e(t("au.w.url","Endpoint"))+"</div><div>"+e(t("au.w.listen","Listens to"))+"</div><div>"+e(t("au.d.status","Status"))+"</div><div></div></div>"+hs.map(function(h){return'<a class="drow link" href="/app/webhooks/?id='+e(h.id)+'" style="--cols:'+C+'"><div class="c strong ell" data-l="'+e(t("au.w.url","Endpoint"))+'">'+e(h.url)+'</div><div class="c dim" data-l="'+e(t("au.w.listen","Listens to"))+'">'+e(scope(h))+'</div><div class="c" data-l="'+e(t("au.d.status","Status"))+'">'+(h.active?A.pill("ok",t("au.w.active","Active")):A.pill("dim",t("au.w.paused","Paused")))+'</div><div class="c end">'+A.icon(A.IC.chev,16)+"</div></a>"}).join("")+"</div>"
  :A.empty(A.IC.hook,t("ap.w.h","No webhooks yet"),t("ap.w.p","Get notified at your own URL when emails are delivered, bounced or received."),'<button type="button" class="abtn lg pri" data-new>'+e(t("ap.w.add","Add webhook"))+"</button>");
 root.innerHTML=head(count)+body;wire()}
function wire(){root.querySelectorAll("#wNew,[data-new]").forEach(function(b){b.onclick=add})}
function picker(sel){var box=document.createElement("div");box.className="evchips";
 function paint(){box.innerHTML=EV.map(function(x){return'<button type="button" class="evchip'+(sel[x]?" on":"")+'" data-e="'+x+'">'+(sel[x]?A.icon(A.IC.check,13):"")+"<span>"+e(evName(x))+"</span></button>"}).join("")}
 paint();box.onclick=function(ev){var b=ev.target.closest(".evchip");if(!b)return;sel[b.dataset.e]=!sel[b.dataset.e];paint()};return box}
function chosen(sel){var a=EV.filter(function(x){return sel[x]});return a.length===EV.length?[]:a}
function add(){
 var sel={};EV.forEach(function(x){sel[x]=true});
 var f=document.createElement("div");f.innerHTML='<label class="lab" for="wUrl">'+e(t("au.w.url","Endpoint"))+'</label><input class="fld" id="wUrl" autocomplete="off" autocapitalize="none" spellcheck="false" inputmode="url" placeholder="https://example.com/webhooks/geserd"><p class="fhint">'+e(t("au.w.url.h","Geserd sends a signed POST request to this address."))+'</p><label class="lab" style="margin-top:18px">'+e(t("au.w.listen","Listens to"))+"</label>";
 f.appendChild(picker(sel));f.insertAdjacentHTML("beforeend",'<p class="ferr" id="wErr" hidden></p>');
 var m=A.modal({title:t("au.w.new.t","Add webhook"),desc:t("au.w.new.d","Choose where events are sent and which ones you need."),body:f,actions:[{label:t("au.cancel","Cancel")},{label:t("au.w.create","Add"),cls:"pri",onClick:function(mm,b){go(mm,b)}}]});
 function go(mm,b){var er=f.querySelector("#wErr");er.hidden=true;var ev=chosen(sel);if(!ev.length&&!EV.some(function(x){return sel[x]})){er.textContent=t("au.w.pick","Pick at least one event.");er.hidden=false;return}
  b.disabled=true;A.api("/webhooks",{method:"POST",body:{url:f.querySelector("#wUrl").value.trim(),events:ev}}).then(function(h){mm.close();secret(h,function(){location.href="/app/webhooks/?id="+encodeURIComponent(h.id)})},function(x){b.disabled=false;er.textContent=A.err(x);er.hidden=false})}
}
function secret(h,done){
 var b=document.createElement("div");b.innerHTML='<div class="warn">'+A.icon('<path d="M12 9v4M12 17h.01"/><path d="M10.3 3.9 2.4 18a2 2 0 0 0 1.7 3h15.8a2 2 0 0 0 1.7-3L13.7 3.9a2 2 0 0 0-3.4 0z"/>',18)+"<span>"+e(t("au.w.secret.warn","Use this secret to verify that requests really come from Geserd. You can view it again on the webhook’s page."))+'</span></div><div class="keybox"><code>'+e(h.secret)+'</code><button type="button" class="abtn cp" id="wCp">'+A.icon(A.IC.copy,15)+"<span>"+e(t("au.copy","Copy"))+"</span></button></div>";
 b.querySelector("#wCp").onclick=function(){A.copy(h.secret,this)};
 A.modal({title:t("au.w.secret.t","Signing secret"),body:b,persist:true,actions:[{label:t("au.done","Done"),cls:"pri",onClick:function(m){m.close();done()}}]})}
function detail(id){
 root.innerHTML=back()+A.loading();
 A.api("/webhooks/"+encodeURIComponent(id)).then(drawDetail,function(x){root.innerHTML=back()+(x.status===404?A.empty(A.IC.hook,t("au.err.not_found","Not found"),""):A.failed(x,"wRetry"));var b=document.getElementById("wRetry");if(b)b.onclick=function(){detail(id)}})}
function drawDetail(h){
 var DC="minmax(0,1.4fr) minmax(0,1fr) minmax(0,.6fr) minmax(0,1.2fr)";
 var ds=h.deliveries.length?'<div class="dl"><div class="drow dhead" style="--cols:'+DC+'"><div>'+e(t("au.w.event","Event"))+"</div><div>"+e(t("au.d.status","Status"))+"</div><div>"+e(t("au.w.tries","Attempts"))+"</div><div>"+e(t("au.w.when","Time"))+"</div></div>"+h.deliveries.map(function(d){var k=d.status==="delivered"?"ok":d.status==="failed"?"bad":"wait";return'<div class="drow" style="--cols:'+DC+'"><div class="c strong" data-l="'+e(t("au.w.event","Event"))+'">'+e(evName(d.event))+'</div><div class="c" data-l="'+e(t("au.d.status","Status"))+'">'+A.pill(k,t("au.w.s."+d.status,d.status))+(d.last_error&&d.status!=="delivered"?'<div class="dim sm nt">'+e(d.last_error)+"</div>":"")+'</div><div class="c dim" data-l="'+e(t("au.w.tries","Attempts"))+'">'+e(d.attempts)+'</div><div class="c dim" data-l="'+e(t("au.w.when","Time"))+'">'+e(A.date(d.created_at))+"</div></div>"}).join("")+"</div>":'<p class="dim">'+e(t("au.w.nodel","No deliveries yet. Press “Send test event” to try it."))+"</p>";
 var sel={};EV.forEach(function(x){sel[x]=!h.events.length||h.events.indexOf(x)>-1});
 root.innerHTML=back()+'<div class="ph pgh"><div class="dtitle"><h1 class="brk" style="font-size:22px;line-height:1.3">'+e(h.url)+"</h1>"+(h.active?A.pill("ok",t("au.w.active","Active")):A.pill("dim",t("au.w.paused","Paused")))+'</div><div class="acts"><button type="button" class="abtn lg" id="wTest">'+e(t("au.w.test","Send test event"))+'</button></div></div>'+
  '<section class="ssec2"><h2>'+e(t("au.w.sig","Signing secret"))+"</h2><p>"+e(t("au.w.sig.d","Every request carries a Geserd-Signature header, an HMAC-SHA256 of the id, timestamp and body made with this secret."))+'</p><div class="keybox"><code id="wSec">••••••••••••••••••••••••</code><button type="button" class="abtn cp" id="wShow">'+e(t("au.w.show","Show"))+'</button><button type="button" class="abtn cp" id="wCp2">'+A.icon(A.IC.copy,15)+"<span>"+e(t("au.copy","Copy"))+'</span></button></div><div style="margin-top:12px"><button type="button" class="abtn" id="wRot">'+e(t("au.w.rotate","Generate new secret"))+"</button></div></section>"+
  '<section class="ssec2"><h2>'+e(t("au.w.listen","Listens to"))+'</h2><div id="wEv"></div><div class="rowact"><button type="button" class="abtn lg pri" id="wSave" disabled>'+e(t("au.save","Save"))+'</button><button type="button" class="abtn lg" id="wTog">'+e(h.active?t("au.w.pause","Pause"):t("au.w.resume","Resume"))+"</button></div></section>"+
  '<section class="ssec2"><h2>'+e(t("au.w.deliv","Recent deliveries"))+"</h2>"+ds+"</section>"+
  '<section class="ssec2 danger"><div><h2>'+e(t("au.w.del","Delete webhook"))+"</h2><p>"+e(t("au.w.del.d","Stops all deliveries to this endpoint. This can’t be undone."))+'</p></div><button type="button" class="abtn lg dng" id="wDel">'+e(t("au.w.del","Delete webhook"))+"</button></section>";
 var pk=picker(sel),save=document.getElementById("wSave"),sec=document.getElementById("wSec"),shown=false;document.getElementById("wEv").appendChild(pk);
 pk.addEventListener("click",function(){save.disabled=false});
 var sh=document.getElementById("wShow");sh.onclick=function(){shown=!shown;sec.textContent=shown?h.secret:"••••••••••••••••••••••••";sh.textContent=shown?t("au.w.hide","Hide"):t("au.w.show","Show")};
 document.getElementById("wCp2").onclick=function(){A.copy(h.secret,this)};
 document.getElementById("wRot").onclick=function(){A.modal({title:t("au.w.rot.t","Generate a new secret?"),desc:t("au.w.rot.p","The old secret stops working immediately. Update your server with the new one."),actions:[{label:t("au.cancel","Cancel")},{label:t("au.w.rotate","Generate new secret"),cls:"pri",onClick:function(m,b){b.disabled=true;A.api("/webhooks/"+encodeURIComponent(h.id)+"/rotate",{method:"POST"}).then(function(r){m.close();h.secret=r.secret;detail(h.id)},function(x){b.disabled=false;A.toast(A.err(x))})}}]})};
 save.onclick=function(){var ev=chosen(sel);if(!EV.some(function(x){return sel[x]})){A.toast(t("au.w.pick","Pick at least one event."));return}save.disabled=true;A.api("/webhooks/"+encodeURIComponent(h.id),{method:"PATCH",body:{events:ev}}).then(function(){A.toast(t("au.saved","Saved"));detail(h.id)},function(x){save.disabled=false;A.toast(A.err(x))})};
 document.getElementById("wTog").onclick=function(){A.api("/webhooks/"+encodeURIComponent(h.id),{method:"PATCH",body:{active:!h.active}}).then(function(){detail(h.id)},function(x){A.toast(A.err(x))})};
 var tb=document.getElementById("wTest");tb.onclick=function(){tb.disabled=true;A.api("/webhooks/"+encodeURIComponent(h.id)+"/test",{method:"POST"}).then(function(r){A.toast(r.ok?t("au.w.test.ok","Test event delivered"):t("au.w.test.fail","Delivery failed: {e}",{e:r.error||r.status}));detail(h.id)},function(x){tb.disabled=false;A.toast(A.err(x))})};
 document.getElementById("wDel").onclick=function(){A.modal({title:t("au.w.del.t","Delete this webhook?"),desc:h.url,actions:[{label:t("au.cancel","Cancel")},{label:t("au.w.del","Delete webhook"),cls:"dng",onClick:function(m,b){b.disabled=true;A.api("/webhooks/"+encodeURIComponent(h.id),{method:"DELETE"}).then(function(){location.href="/app/webhooks/"},function(x){b.disabled=false;A.toast(A.err(x))})}}]})}}
A.ready(function(){root=document.getElementById("app-root");if(!root)return;var id=new URLSearchParams(location.search).get("id");id?detail(id):list()});
})();
