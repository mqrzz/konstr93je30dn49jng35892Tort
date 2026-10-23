(function(){
var A=window.GSApp;if(!A)return;
var T=A.t,E=A.esc,root=document.getElementById("pg2-root");if(!root)return;
var pg=root.getAttribute("data-pg");
function list(x){return Array.isArray(x)?x:(x&&(x.items||x.data||x.rows))||[]}
var TB=[["sending","app.set.sending","Sending","/app/settings/sending/"],["usage","app.set.usage","Usage","/app/settings/usage/"],["billing","app.set.billing","Billing","/app/settings/billing/"],["team","app.set.team","Team","/app/settings/team/"],["onboarding","app.nav.onboarding","Onboarding","/app/onboarding/"],["integrations","app.nav.integrations","Integrations","/app/integrations/"],["unsub","app.nav.unsub","Unsubscribe page","/app/unsubscribe-page/"],["documents","app.nav.documents","Documents","/app/documents/"],["labs","app.nav.labs","Labs","/app/labs/"]];
function head(h,p){return '<div class="ph"><h1>'+E(T("app.set.title","Settings"))+'</h1></div><nav class="stabs">'+TB.map(function(x){return '<a href="'+x[3]+'"'+(x[0]===pg?' class="on"':'')+'>'+E(T(x[1],x[2]))+'</a>'}).join("")+'</nav>'}
function card(o){return '<section class="p2k"><div class="p2kh">'+(o.icon?'<span class="p2ki">'+o.icon+'</span>':'')+'<h3>'+E(o.t)+'</h3>'+(o.badge?'<span class="p2bd">'+E(o.badge)+'</span>':'')+'</div><p>'+E(o.d)+'</p>'+(o.href?'<a class="abtn'+(o.pri?' pri':'')+'" href="'+o.href+'"'+(o.blank?' target="_blank" rel="noopener"':'')+'>'+E(o.b)+(o.blank?' <span class="ext">&#8599;</span>':'')+'</a>':'')+'</section>'}
var CODE={
 node:'import { readFileSync } from "node:fs";\n\nconst res = await fetch("https://geserd.com/api/emails", {\n  method: "POST",\n  headers: {\n    Authorization: "Bearer gs_live_xxxxxxxxx",\n    "Content-Type": "application/json"\n  },\n  body: JSON.stringify({\n    from: "hi@yourdomain.com",\n    to: "you@example.com",\n    subject: "Hello World",\n    html: "<p>Congrats on sending your <strong>first email</strong>!</p>"\n  })\n});',
 python:'import requests\n\nrequests.post(\n    "https://geserd.com/api/emails",\n    headers={"Authorization": "Bearer gs_live_xxxxxxxxx"},\n    json={\n        "from": "hi@yourdomain.com",\n        "to": "you@example.com",\n        "subject": "Hello World",\n        "html": "<p>Congrats on sending your <strong>first email</strong>!</p>",\n    },\n)',
 php:'<?php\n$ch = curl_init("https://geserd.com/api/emails");\ncurl_setopt_array($ch, [\n  CURLOPT_POST => true,\n  CURLOPT_RETURNTRANSFER => true,\n  CURLOPT_HTTPHEADER => ["Authorization: Bearer gs_live_xxxxxxxxx", "Content-Type: application/json"],\n  CURLOPT_POSTFIELDS => json_encode([\n    "from" => "hi@yourdomain.com",\n    "to" => "you@example.com",\n    "subject" => "Hello World",\n    "html" => "<p>Congrats on sending your <strong>first email</strong>!</p>"\n  ])\n]);\ncurl_exec($ch);',
 curl:'curl https://geserd.com/api/emails \\\n  -H "Authorization: Bearer gs_live_xxxxxxxxx" \\\n  -H "Content-Type: application/json" \\\n  -d \'{"from":"hi@yourdomain.com",\n       "to":"you@example.com",\n       "subject":"Hello World",\n       "html":"<p>Congrats on sending your <strong>first email</strong>!</p>"}\''};
function onboarding(){
 root.innerHTML='<div class="ob"><h1>'+E(T("ob.h","Send your first email"))+'</h1><p class="psub">'+E(T("ob.p","Follow the steps to send an email using the Geserd API."))+'</p>'+A.loading()+'</div>';
 Promise.all([A.api("/domains").catch(function(){return[]}),A.api("/subdomain").catch(function(){return null}),A.api("/api-keys").catch(function(){return[]}),A.api("/emails").catch(function(){return[]})]).then(function(r){
  var d=list(r[0]).some(function(x){return x.status==="verified"||x.verified}),sd=r[1]&&(r[1].name||r[1].subdomain||r[1].claimed),k=list(r[2]).length>0,m=list(r[3]).length>0;
  var s=[d||!!sd,k,m],cur=s.indexOf(false);if(cur<0)cur=3;
  var tabs=[["node","Node.js"],["python","Python"],["php","PHP"],["curl","cURL"]];
  var cb='<div class="p2cd"><div class="p2tb">'+tabs.map(function(x,i){return '<button type="button" data-l="'+x[0]+'" class="'+(i?'':'on')+'">'+x[1]+'</button>'}).join("")+'<button type="button" class="p2cp" id="p2cp" aria-label="'+E(T("ob.copy","Copy"))+'">'+A.icon('<rect x="8" y="8" width="11" height="11" rx="2.5"/><path d="M5 15V7a2 2 0 0 1 2-2h8"/>',15)+'</button></div><pre id="p2pre">'+E(CODE.node)+'</pre></div>';
  var it=[
   {t:T("ob.s1","Add a domain"),d:T("ob.s1d","Verify a domain you own, or claim a free Geserd subdomain."),x:'<a class="abtn pri" href="/app/domains/">'+E(T("ob.s1b","Add domain"))+'</a>'},
   {t:T("ob.s2","Add an API key"),d:T("ob.s2d","Use the generated key to authenticate requests. It is shown once."),x:'<a class="abtn pri" href="/app/api-keys/">'+E(T("ob.s2b","Add API key"))+'</a>'},
   {t:T("ob.s3","Send an email"),d:T("ob.s3d","Implement or run the code below to send your first email."),x:cb}];
  var h='<div class="ob"><h1>'+E(T("ob.h","Send your first email"))+'</h1><p class="psub">'+E(T("ob.p","Follow the steps to send an email using the Geserd API."))+'</p><ol class="obl">'+it.map(function(x,i){var st=s[i]?"done":(i===cur?"cur":"next");return '<li class="'+st+'"><i></i><div><h2>'+E(x.t)+'</h2><p>'+E(x.d)+'</p>'+(i===cur||s[i]?x.x:"")+'</div></li>'}).join("")+'</ol></div>';
  root.innerHTML=h;
  var pre=document.getElementById("p2pre"),L="node";
  root.querySelectorAll("[data-l]").forEach(function(b){b.onclick=function(){L=b.dataset.l;root.querySelectorAll("[data-l]").forEach(function(o){o.classList.toggle("on",o===b)});if(pre)pre.textContent=CODE[L]}});
  var c=document.getElementById("p2cp");if(c)c.onclick=function(){A.copy(pre.textContent)}
 })}
function integrations(){
 root.innerHTML=head(T("ig.h","Integrations"),T("ig.p","Connect Geserd to the tools you already use."))+'<div class="p2s">'+[
  {t:"SMTP",badge:"",d:T("ig.smtp","Use Geserd from any software that sends mail over SMTP, such as a sign-in provider or a CMS."),b:T("ig.smtp.b","SMTP settings"),href:"/app/settings/smtp/"},
  {t:T("ig.api","HTTP API"),d:T("ig.apid","Send and receive with one request. Examples for Node.js, Python and PHP."),b:T("ig.api.b","Open documentation"),href:"/docs/api/",blank:1},
  {t:T("ig.wh","Webhooks"),d:T("ig.whd","Get delivery, bounce and inbound events at your own URL."),b:T("ig.wh.b","Manage webhooks"),href:"/app/webhooks/"},
  {t:T("ig.au","Authentication"),d:T("ig.aud","Add one-time code sign-in to your app without building the email side yourself."),b:T("ig.au.b","Open authentication"),href:"/app/auth/"}].map(card).join("")+'</div>'}
function documents(){
 var D=[["dpa","Data processing agreement","Covers mail you send to your own recipients through Geserd. It applies once you sign up.","/legal/dpa/"],["terms","Terms of service","The rules that apply when you use Geserd.","/legal/terms/"],["privacy","Privacy policy","What we collect, why and on what basis, including a section for the European Union.","/legal/privacy/"],["subprocessors","Subprocessors","Companies that help us run the service.","/legal/subprocessors/"],["aup","Acceptable use","What you may and may not send.","/legal/aup/"],["payment","Payment terms","How billing, renewal and taxes work.","/legal/payment/"],["refunds","Refunds","When and how a payment is returned.","/legal/refunds/"],["cookies","Cookies","Which cookies we set and why.","/legal/cookies/"]];
 root.innerHTML=head(T("dc.h","Documents"),T("dc.p","Agreements and policies that apply to your account."))+'<div class="p2s">'+D.map(function(x){return card({t:T("dc."+x[0],x[1]),d:T("dc."+x[0]+".d",x[2]),b:T("dc.view","View"),href:x[3],blank:1,pri:1})}).join("")+'</div>'}
function labs(){
 root.innerHTML=head(T("lb.h","Labs"),T("lb.p","Features that are new. They work, and they may change."))+'<div class="p2s">'+[
  {t:T("lb.mcp","MCP server"),d:T("lb.mcpd","Let Claude Code, Cursor or another assistant send and read email with your API key."),b:T("lb.mcp.b","Read the guide"),href:"/features/mcp/",blank:1},
  {t:T("lb.au","Automations"),d:T("lb.aud","Send an email by itself when an event arrives from your product, with waits in between."),b:T("lb.au.b","Open automations"),href:"/app/automations/"},
  {t:T("lb.cli","Command line tool"),d:T("lb.clid","Send and read email from a terminal with one small file."),b:T("lb.cli.b","Read the guide"),href:"/features/cli/",blank:1}].map(card).join("")+'</div>'}
function unsub(){
 root.innerHTML=head()+A.loading();
 A.api("/unsubscribe-style").then(function(s){
  var st={bg:s.bg,tx:s.tx,accent:s.accent,hide:s.hide_branding},tab="pref";
  function pv(){
   var ok='<div class="uk"><svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m5 12.5 4.5 4.5L19 7.5"/></svg></div>';
   var body=tab==="pref"?ok+'<h3>'+E(T("us.t","Unsubscribe from this list?"))+'</h3><p>'+E(T("us.pv.p","Confirm your email preferences:"))+'</p><span class="ub">'+E(T("us.go","Unsubscribe"))+'</span>':ok+'<h3>'+E(T("us.done.t","You have been unsubscribed"))+'</h3><p>'+E(T("us.pv.d","You will not receive these emails anymore."))+'</p>';
   return '<div class="upv" style="background:'+st.bg+';color:'+st.tx+';--ua:'+st.accent+'">'+body+(st.hide?'':'<small>'+E(T("us.pw","Powered by"))+' <b>Geserd</b></small>')+'</div>'}
  function fld(k,l){return '<label class="ucf"><span>'+E(l)+'</span><span class="ucw"><input type="color" data-k="'+k+'" value="'+st[k]+'" aria-label="'+E(l)+'"><input type="text" class="fld" data-h="'+k+'" value="'+st[k]+'" maxlength="7" spellcheck="false"></span></label>'}
  function draw(){
   root.innerHTML=head()+'<div class="ued"><div class="uprev"><div class="utb"><div><button type="button" data-t="pref" class="'+(tab==="pref"?"on":"")+'">'+E(T("us.pv.tab1","Preferences"))+'</button><button type="button" data-t="ok" class="'+(tab==="ok"?"on":"")+'">'+E(T("us.pv.tab2","Success"))+'</button></div></div><div id="upv">'+pv()+'</div></div><aside class="uside"><h3>'+E(T("us.pv.page","Page"))+'</h3><h4>'+E(T("us.pv.colors","Colors"))+'</h4>'+fld("bg",T("us.pv.bg","Background"))+fld("tx",T("us.pv.tx","Text"))+fld("accent",T("us.pv.ac","Accent"))+'<h4>'+E(T("us.pv.foot","Footer"))+'</h4><label class="ucf"><span>'+E(T("us.pv.hide","Hide branding"))+'</span><button type="button" class="tg'+(st.hide?" on":"")+'" id="uhide" '+(s.can_hide?'':'disabled')+' aria-label="'+E(T("us.pv.hide","Hide branding"))+'"><i></i></button></label>'+(s.can_hide?'':'<p class="uhint">'+E(T("us.pv.hint","Hiding the branding is available on paid plans."))+'</p>')+'<div class="uact"><button type="button" class="abtn" id="ures">'+E(T("us.pv.reset","Reset"))+'</button><button type="button" class="abtn pri" id="usave">'+E(T("am.save","Save"))+'</button></div></aside></div>';
   root.querySelectorAll("[data-t]").forEach(function(b){b.onclick=function(){tab=b.dataset.t;draw()}});
   root.querySelectorAll("[data-k]").forEach(function(i){i.oninput=function(){st[i.dataset.k]=i.value;i.parentNode.querySelector("[data-h]").value=i.value;document.getElementById("upv").innerHTML=pv()}});
   root.querySelectorAll("[data-h]").forEach(function(i){i.oninput=function(){if(/^#[0-9a-f]{6}$/i.test(i.value)){st[i.dataset.h]=i.value;i.parentNode.querySelector("[data-k]").value=i.value;document.getElementById("upv").innerHTML=pv()}}});
   var h=document.getElementById("uhide");if(h)h.onclick=function(){st.hide=!st.hide;draw()};
   document.getElementById("usave").onclick=function(){A.api("/unsubscribe-style",{method:"PUT",body:{bg:st.bg,tx:st.tx,accent:st.accent,hide_branding:st.hide}}).then(function(){A.toast(T("am.saved","Saved"))},function(x){A.toast(A.err(x),"err")})};
   document.getElementById("ures").onclick=function(){A.api("/unsubscribe-style",{method:"DELETE"}).then(function(d){st={bg:d.bg,tx:d.tx,accent:d.accent,hide:false};draw()},function(x){A.toast(A.err(x),"err")})}}
  draw()},function(x){root.innerHTML=head()+A.failed(x,"p2r");var b=document.getElementById("p2r");if(b)b.onclick=unsub})}
({unsub:unsub,onboarding:onboarding,integrations:integrations,documents:documents,labs:labs})[pg]();
})();
