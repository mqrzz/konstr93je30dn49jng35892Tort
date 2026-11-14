(function(){
var A=window.GSApp;if(!A)return;
var T=A.t,E=A.esc,root,D=null;
var P={store:'<path d="M3 13h5l1.5 3h5L16 13h5"/><path d="M5 5h14l2 8v6H3v-6z"/>',forward:'<path d="M5 12h14M13 6l6 6-6 6"/>',webhook:'<path d="M9 7a3 3 0 1 1 5.2 2L12 13M6 17a3 3 0 1 0 2 5M14 20h4a3 3 0 1 0-2.5-5"/>',autoreply:'<path d="M9 14 4 9l5-5"/><path d="M4 9h10a6 6 0 0 1 6 6v3"/>',drop:'<path d="M4 7h16M10 11v6M14 11v6M6 7l1 13h10l1-13M9 7V4h6v3"/>',plus:'<path d="M12 5v14M5 12h14"/>',up:'<path d="m6 14 6-6 6 6"/>',down:'<path d="m6 10 6 6 6-6"/>',edit:'<path d="M4 20h4L19 9l-4-4L4 16z"/>',list:'<path d="M8 7h12M8 12h12M8 17h12M4 7h.01M4 12h.01M4 17h.01"/>'};
var ACT=[["store","ib.a.store","Keep only","ib.a.store.d","The message stays in Receiving."],["forward","ib.a.forward","Forward","ib.a.forward.d","Keep it and send a copy to your own email."],["webhook","ib.a.webhook","Webhook","ib.a.webhook.d","Keep it and send it to your server."],["autoreply","ib.a.autoreply","Auto-reply","ib.a.autoreply.d","Keep it and answer the sender once a day."],["drop","ib.a.drop","Discard","ib.a.drop.d","Accept the message and do not keep it."]];
function ic(d,n){return A.icon(d,n||18)}
function tabs(){return'<nav class="stabs"><a href="/app/emails/">'+E(T("ap.tab.send","Sending"))+'</a><a href="/app/emails/receiving/">'+E(T("ap.tab.recv","Receiving"))+'</a><a href="/app/emails/rules/" class="on">'+E(T("ib.tab.rules","Rules"))+'</a><a href="/app/emails/suppressions/">'+E(T("ap.tab.supp","Suppressions"))+"</a></nav>"}
function lab(a){var x=ACT.filter(function(y){return y[0]===a})[0];return T(x[1],x[2])}
function load(){
 root.innerHTML='<div class="ph"><h1>'+E(T("ap.emails","Emails"))+"</h1></div>"+tabs()+A.loading();
 A.api("/inbox/rules").then(function(d){D=d;draw()},function(x){root.innerHTML='<div class="ph"><h1>'+E(T("ap.emails","Emails"))+"</h1></div>"+tabs()+A.failed(x,"rlRetry");document.getElementById("rlRetry").onclick=load})
}
function draw(){
 var n=D.items.length,full=n>=D.limit,noDom=!D.domains.length;
 var head='<div class="ph"><h1>'+E(T("ap.emails","Emails"))+"</h1></div>"+tabs();
 var intro='<section class="gcard rl-intro"><span class="ak-ci">'+ic(P.list,20)+'</span><div><h3>'+E(T("ib.rules.t","Where incoming mail goes"))+"</h3><p>"+E(T("ib.rules.p","Rules are checked from top to bottom and the first match wins. If nothing matches, the message is kept in Receiving. Use * for any part of the name, for example sales-*."))+'</p></div><div class="ak-btns"><button type="button" class="abtn pri" id="rlAdd"'+(full||noDom?" disabled":"")+">"+ic(P.plus,16)+"<span>"+E(T("ib.rule.add","Add rule"))+"</span></button></div></section>";
 var cnt='<p class="dim sm" style="margin:0 0 14px">'+E(T("ib.rules.n","{n} of {m} rules",{n:A.num(n),m:A.num(D.limit)}))+(noDom?" · "+E(T("ib.rules.nodom","Add and verify a domain or claim a Geserd address first.")):"")+"</p>";
 var body;
 if(!n)body='<section class="gcard"><div class="ak-empty"><span class="ak-ei">'+ic(P.forward,32)+"</span><h3>"+E(T("ib.rules.none","No rules yet"))+"</h3><p>"+E(T("ib.rules.none.p","Example: send everything to info@your-domain to your personal inbox, or answer support@ automatically."))+"</p></div></section>";
 else body='<section class="gcard rl-list">'+D.items.map(function(r,i){
  var tg=r.action==="forward"?r.target:r.action==="webhook"?r.target:r.action==="autoreply"?(r.reply_subject||T("ib.reply.default","Re: your message")):"";
  return'<div class="rl-row'+(r.enabled?"":" off")+'" data-id="'+r.id+'"><span class="rl-n">'+(i+1)+'</span><div class="rl-main"><div class="rl-pat"><code>'+E(r.match)+"@"+E(r.domain)+'</code></div><div class="rl-act"><span class="ak-av" style="width:34px;height:34px;border-radius:12px">'+ic(P[r.action],16)+"</span><div><b>"+E(lab(r.action))+"</b>"+(tg?"<small>"+E(tg)+"</small>":"")+'</div></div></div><div class="rl-hits"><b>'+A.num(r.hits)+"</b><small>"+E(r.last_hit_at?A.ago(r.last_hit_at):T("ib.rule.never","no matches yet"))+'</small></div><div class="ak-btns rl-btns"><button type="button" class="ak-tg'+(r.enabled?" on":"")+'" data-a="tg">'+E(r.enabled?T("ib.rule.on","On"):T("ib.rule.off","Off"))+'</button><button type="button" class="abtn" data-a="up" aria-label="'+E(T("ib.rule.up","Move up"))+'"'+(i?"":" disabled")+">"+ic(P.up,15)+'</button><button type="button" class="abtn" data-a="dn" aria-label="'+E(T("ib.rule.down","Move down"))+'"'+(i<n-1?"":" disabled")+">"+ic(P.down,15)+'</button><button type="button" class="abtn" data-a="ed" aria-label="'+E(T("ib.rule.edit","Edit"))+'">'+ic(P.edit,15)+'</button><button type="button" class="abtn dng" data-a="rm" aria-label="'+E(T("au.delete","Delete"))+'">'+ic(P.drop,15)+"</button></div></div>"}).join("")+"</section>";
 root.innerHTML=head+intro+cnt+body;
 document.getElementById("rlAdd").onclick=function(){form(null)};
 root.querySelectorAll(".rl-row").forEach(function(row){var r=D.items.filter(function(x){return x.id===row.dataset.id})[0];row.querySelectorAll("[data-a]").forEach(function(b){b.onclick=function(){
  var a=b.dataset.a;b.disabled=true;
  if(a==="ed"){b.disabled=false;return form(r)}
  if(a==="tg")return A.api("/inbox/rules/"+r.id,{method:"PATCH",body:{enabled:!r.enabled}}).then(load,function(x){b.disabled=false;A.toast(A.err(x),"err")});
  if(a==="up"||a==="dn")return A.api("/inbox/rules/"+r.id+"/move",{method:"POST",body:{dir:a==="up"?"up":"down"}}).then(load,function(x){b.disabled=false;A.toast(A.err(x),"err")});
  b.disabled=false;
  var m=A.modal({title:T("ib.rule.del.t","Delete this rule?"),body:'<p class="dim">'+E(T("ib.rule.del.p","Messages that matched it will be kept in Receiving from now on."))+'</p><div class="prow"><button type="button" class="abtn" id="rlNo">'+E(T("au.cancel","Cancel"))+'</button><button type="button" class="abtn pri" id="rlYes">'+E(T("au.delete","Delete"))+"</button></div>"});
  m.body.querySelector("#rlNo").onclick=m.close;
  m.body.querySelector("#rlYes").onclick=function(){var y=this;y.disabled=true;A.api("/inbox/rules/"+r.id,{method:"DELETE"}).then(function(){m.close();load()},function(x){y.disabled=false;A.toast(A.err(x),"err")})}
 }})})
}
function form(r){
 var ed=!!r,cur={domain:ed?r.domain:D.domains[0],action:ed?r.action:"forward"};
 var m=A.modal({title:ed?T("ib.rule.edit.t","Edit rule"):T("ib.rule.add","Add rule"),wide:true,body:'<div class="ak-fld"><label for="rlM">'+E(T("ib.rule.addr","Address"))+'</label><div class="rl-addr"><input id="rlM" maxlength="64" autocomplete="off" placeholder="info" value="'+E(ed?r.match:"")+'"><span>@</span><div id="rlD"></div></div><small>'+E(T("ib.rule.addr.h","Letters, digits, dots, hyphens. Use * for a pattern, or * alone for everything."))+'</small></div><div class="ak-fld"><label>'+E(T("ib.rule.what","What to do"))+'</label><div class="ak-opts" id="rlO">'+ACT.map(function(x){return'<button type="button" class="ak-opt'+(cur.action===x[0]?" on":"")+'" data-v="'+x[0]+'"><span class="ak-ci">'+ic(P[x[0]],18)+'</span><div><b>'+E(T(x[1],x[2]))+'</b><span class="d">'+E(T(x[3],x[4]))+"</span></div></button>"}).join("")+'</div></div><div id="rlX"></div><p class="ferr" id="rlE" hidden></p><div class="prow"><button type="button" class="abtn" id="rlNo">'+E(T("au.cancel","Cancel"))+'</button><button type="button" class="abtn pri" id="rlYes">'+E(T("au.save","Save"))+"</button></div>"});
 var $=function(s){return m.body.querySelector(s)};
 $("#rlD").appendChild(A.dropdown(D.domains.map(function(d){return[d,d]}),cur.domain,function(v){cur.domain=v}));
 if(ed)$("#rlD").style.pointerEvents="none";
 function extra(){
  var x=$("#rlX"),a=cur.action;
  if(a==="forward")x.innerHTML='<div class="ak-fld"><label for="rlT">'+E(T("ib.f.to","Send copies to"))+'</label><input id="rlT" maxlength="400" autocomplete="off" placeholder="me@example.com" value="'+E(ed&&r.action==="forward"?r.target:"")+'"><small>'+E(T("ib.f.to.h","Up to 5 addresses, separated by commas. The copy comes from this address, replies go to the sender."))+"</small></div>";
  else if(a==="webhook")x.innerHTML='<div class="ak-fld"><label for="rlT">URL</label><input id="rlT" maxlength="1000" autocomplete="off" placeholder="https://example.com/hooks/mail" value="'+E(ed&&r.action==="webhook"?r.target:"")+'"><small>'+E(T("ib.f.wh.h","We send the message as JSON with a signature. Only public https addresses are accepted."))+"</small></div>"+(ed&&r.secret?'<div class="ak-fld"><label>'+E(T("ib.f.secret","Signing secret"))+'</label><code class="ak-uri" id="rlS">'+E(r.secret)+"</code></div>":"");
  else if(a==="autoreply")x.innerHTML='<div class="ak-fld"><label for="rlS1">'+E(T("ib.f.subj","Subject"))+'</label><input id="rlS1" maxlength="200" autocomplete="off" value="'+E(ed?r.reply_subject||"":"")+'"></div><div class="ak-fld"><label for="rlB">'+E(T("ib.f.body","Message"))+'</label><textarea id="rlB" rows="4" maxlength="5000">'+E(ed?r.reply_body||"":"")+"</textarea><small>"+E(T("ib.f.ar.h","Each sender gets this once a day. Automatic messages and mailing lists are never answered."))+"</small></div>";
  else x.innerHTML=""}
 extra();
 $("#rlO").onclick=function(ev){var b=ev.target.closest("[data-v]");if(!b)return;cur.action=b.dataset.v;m.body.querySelectorAll(".ak-opt").forEach(function(o){o.classList.toggle("on",o===b)});extra()};
 $("#rlNo").onclick=m.close;
 $("#rlYes").onclick=function(){
  var b=this,er=$("#rlE");er.hidden=true;b.disabled=true;
  var body={action:cur.action,match:$("#rlM").value};
  if(!ed)body.domain=cur.domain;
  if(cur.action==="forward"||cur.action==="webhook")body.target=$("#rlT").value;
  if(cur.action==="autoreply"){body.reply_subject=$("#rlS1").value;body.reply_body=$("#rlB").value}
  (ed?A.api("/inbox/rules/"+r.id,{method:"PATCH",body:body}):A.api("/inbox/rules",{method:"POST",body:body})).then(function(){m.close();load()},function(x){b.disabled=false;er.textContent=A.err(x);er.hidden=false})}
}
A.ready(function(){root=document.getElementById("app-root");if(root)load()})
})();
