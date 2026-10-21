(function(){
var A=window.GSApp;if(!A)return;
var T=A.t,E=A.esc,root=document.getElementById("pg2-root");if(!root)return;
var pg=root.getAttribute("data-pg");
function list(x){return Array.isArray(x)?x:(x&&(x.items||x.data||x.rows))||[]}
var TB=[["sending","app.set.sending","Sending","/app/settings/sending/"],["usage","app.set.usage","Usage","/app/settings/usage/"],["billing","app.set.billing","Billing","/app/settings/billing/"],["team","app.set.team","Team","/app/settings/team/"],["onboarding","app.nav.onboarding","Onboarding","/app/onboarding/"],["integrations","app.nav.integrations","Integrations","/app/integrations/"],["documents","app.nav.documents","Documents","/app/documents/"],["labs","app.nav.labs","Labs","/app/labs/"]];
function head(h,p){return '<div class="ph"><h1>'+E(T("app.set.title","Settings"))+'</h1></div><nav class="stabs">'+TB.map(function(x){return '<a href="'+x[3]+'"'+(x[0]===pg?' class="on"':'')+'>'+E(T(x[1],x[2]))+'</a>'}).join("")+'</nav><div class="ph pgh" style="margin-top:28px"><div><h2 style="margin:0">'+E(h)+'</h2><p class="psub">'+E(p)+'</p></div></div>'}
function row(o){return '<div class="p2r'+(o.done?' done':'')+'"><div class="p2m">'+(o.mark||'')+'</div><div class="p2b"><h3>'+E(o.t)+'</h3><p>'+E(o.d)+'</p>'+(o.extra||'')+'</div>'+(o.href?'<a class="abtn'+(o.pri?' pri':'')+'" href="'+o.href+'"'+(o.blank?' target="_blank" rel="noopener"':'')+'>'+E(o.b)+'</a>':'')+'</div>'}
function onboarding(){
 root.innerHTML=head(T("ob.h","Send your first email"),T("ob.p","Three steps. Each one is marked when it is done."))+A.loading();
 Promise.all([A.api("/domains").catch(function(){return[]}),A.api("/subdomain").catch(function(){return null}),A.api("/api-keys").catch(function(){return[]}),A.api("/emails").catch(function(){return[]})]).then(function(r){
  var d=list(r[0]).some(function(x){return x.status==="verified"||x.verified}),sd=r[1]&&(r[1].name||r[1].subdomain||r[1].claimed),k=list(r[2]).length>0,m=list(r[3]).length>0;
  var ck='<svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"><path d="m5 12.5 4.5 4.5L19 7.5"/></svg>';
  var code='<div class="p2c"><pre>curl https://geserd.com/api/emails \\\n  -H "Authorization: Bearer gs_live_..." \\\n  -d \'{"from": "hi@yourdomain.com",\n       "to": "you@example.com",\n       "subject": "Hello",\n       "text": "It works."}\'</pre><button type="button" class="abtn" id="p2cp">'+E(T("ob.copy","Copy"))+'</button></div>';
  var steps=[{t:T("ob.s1","Add a domain"),d:T("ob.s1d","Verify a domain you own, or claim a free Geserd subdomain."),b:T("ob.s1b","Add domain"),href:"/app/domains/",done:d||!!sd},{t:T("ob.s2","Create an API key"),d:T("ob.s2d","The key authenticates your requests. It is shown once."),b:T("ob.s2b","Create API key"),href:"/app/api-keys/",done:k},{t:T("ob.s3","Send an email"),d:T("ob.s3d","Run the request below with your key and your address."),extra:code,done:m}];
  root.innerHTML=head(T("ob.h","Send your first email"),T("ob.p","Three steps. Each one is marked when it is done."))+'<div class="p2l">'+steps.map(function(s,i){s.mark=s.done?ck:String(i+1);s.pri=!s.done;return row(s)}).join("")+'</div>';
  var c=document.getElementById("p2cp");if(c)c.onclick=function(){A.copy(c.previousElementSibling.textContent)}
 })}
function integrations(){
 root.innerHTML=head(T("ig.h","Integrations"),T("ig.p","Connect Geserd to the tools you already use."))+'<div class="p2l">'+[
  {t:"SMTP",d:T("ig.smtp","Use Geserd from any software that sends mail over SMTP, such as a sign-in provider or a CMS."),b:T("ig.smtp.b","SMTP settings"),href:"/app/settings/smtp/"},
  {t:T("ig.api","HTTP API"),d:T("ig.apid","Send and receive with one request. Examples for Node.js, Python and PHP."),b:T("ig.api.b","Open documentation"),href:"/docs/api/",blank:1},
  {t:T("ig.wh","Webhooks"),d:T("ig.whd","Get delivery, bounce and inbound events at your own URL."),b:T("ig.wh.b","Manage webhooks"),href:"/app/webhooks/"},
  {t:T("ig.au","Authentication"),d:T("ig.aud","Add one-time code sign-in to your app without building the email side yourself."),b:T("ig.au.b","Open authentication"),href:"/app/auth/"}].map(row).join("")+'</div>'}
function documents(){
 var D=[["dpa","Data processing agreement","Covers mail you send to your own recipients through Geserd. It applies once you sign up.","/legal/dpa/"],["terms","Terms of service","The rules that apply when you use Geserd.","/legal/terms/"],["privacy","Privacy policy","What we collect, why and on what basis, including a section for the European Union.","/legal/privacy/"],["subprocessors","Subprocessors","Companies that help us run the service.","/legal/subprocessors/"],["aup","Acceptable use","What you may and may not send.","/legal/aup/"],["payment","Payment terms","How billing, renewal and taxes work.","/legal/payment/"],["refunds","Refunds","When and how a payment is returned.","/legal/refunds/"],["cookies","Cookies","Which cookies we set and why.","/legal/cookies/"]];
 root.innerHTML=head(T("dc.h","Documents"),T("dc.p","Agreements and policies that apply to your account."))+'<div class="p2l">'+D.map(function(x){return row({t:T("dc."+x[0],x[1]),d:T("dc."+x[0]+".d",x[2]),b:T("dc.view","View"),href:x[3],blank:1})}).join("")+'</div>'}
function labs(){
 root.innerHTML=head(T("lb.h","Labs"),T("lb.p","Features that are new. They work, and they may change."))+'<div class="p2l">'+[
  {t:T("lb.mcp","MCP server"),d:T("lb.mcpd","Let Claude Code, Cursor or another assistant send and read email with your API key."),b:T("lb.mcp.b","Read the guide"),href:"/features/mcp/",blank:1},
  {t:T("lb.au","Automations"),d:T("lb.aud","Send an email by itself when an event arrives from your product, with waits in between."),b:T("lb.au.b","Open automations"),href:"/app/automations/"},
  {t:T("lb.cli","Command line tool"),d:T("lb.clid","Send and read email from a terminal with one small file."),b:T("lb.cli.b","Read the guide"),href:"/features/cli/",blank:1}].map(row).join("")+'</div>'}
({onboarding:onboarding,integrations:integrations,documents:documents,labs:labs})[pg]();
})();
