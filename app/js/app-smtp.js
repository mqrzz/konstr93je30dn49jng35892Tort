(function(){
var A=window.GSApp;if(!A)return;
var T=A.t,E=A.esc,root,S={};
function tabs(){return '<nav class="stabs"><a href="/app/emails/">'+E(T("ap.tab.send","Sending"))+'</a><a href="/app/emails/receiving/">'+E(T("ap.tab.recv","Receiving"))+'</a><a href="/app/emails/suppressions/">'+E(T("ap.tab.supp","Suppressions"))+'</a><a href="/app/emails/smtp/" class="on">'+E(T("ap.tab.smtp","SMTP"))+'</a></nav>'}
function portText(p){return p.port+" ("+(p.mode==="ssl"?T("app.smtp.ssl","SSL/TLS"):T("app.smtp.starttls","STARTTLS"))+")"}
function row(label,val,copy){return '<div class="crow"><div><span>'+E(label)+'</span><b class="mono">'+E(val)+'</b></div>'+(copy?'<button type="button" class="abtn cp" data-c="'+E(copy)+'">'+A.icon(A.IC.copy)+'<span>'+E(T("sm.copy","Copy"))+'</span></button>':'')+'</div>'}
function sample(kind,host,port){
 if(kind==="py")return 'import smtplib\nfrom email.message import EmailMessage\n\nmsg = EmailMessage()\nmsg["From"] = "hello@yourdomain.com"\nmsg["To"] = "user@example.com"\nmsg["Subject"] = "Hello"\nmsg.set_content("It works.")\n\nwith smtplib.SMTP_SSL("'+host+'", 465) as s:\n    s.login("geserd", "gs_your_api_key")\n    s.send_message(msg)';
 return 'import nodemailer from "nodemailer";\n\nconst transport = nodemailer.createTransport({\n  host: "'+host+'",\n  port: 465,\n  secure: true,\n  auth: { user: "geserd", pass: "gs_your_api_key" }\n});\n\nawait transport.sendMail({\n  from: "hello@yourdomain.com",\n  to: "user@example.com",\n  subject: "Hello",\n  text: "It works."\n});'}
function render(){
 var on=!!S.enabled,host=S.host||"smtp.geserd.com",ports=S.ports||[],kind=render.kind||"js";
 var conn='<div class="ucard"><div class="uh"><div><h3>'+E(T("sm.conn","Connection"))+'</h3><p>'+E(T("sm.conn.d","Use these settings in any app or library that sends over SMTP."))+'</p></div>'+A.pill(on?"ok":"bad",on?T("app.smtp.on","Available"):T("app.smtp.off","Not available right now"))+'</div><div class="crows">'+row(T("app.smtp.host","Host"),host,host)+row(T("app.smtp.port","Port"),ports.length?ports.map(portText).join(" / "):"465 / 587",ports.length?String(ports[0].port):"465")+row(T("app.smtp.user","Username"),"geserd","geserd")+row(T("app.smtp.pass","Password"),T("app.smtp.pass.v","Your API key"))+'</div><div class="prow" style="margin-top:18px"><a class="abtn pri lg" href="/app/api-keys/">'+E(T("app.smtp.keys","Create API key"))+'</a></div></div>';
 var code='<div class="ucard"><div class="uh"><div><h3>'+E(T("sm.ex","Example"))+'</h3><p>'+E(T("sm.ex.d","Replace the sender with an address on your verified domain."))+'</p></div><div class="sgc" id="smK"><button type="button" data-k="js" class="'+(kind==="js"?"on":"")+'">Node.js</button><button type="button" data-k="py" class="'+(kind==="py"?"on":"")+'">Python</button></div></div><pre class="smcode" id="smC"></pre><div class="prow" style="margin-top:14px"><button type="button" class="abtn cp" id="smCp">'+A.icon(A.IC.copy)+'<span>'+E(T("sm.copy","Copy"))+'</span></button></div></div>';
 var notes='<div class="ucard"><h3 style="margin-bottom:14px">'+E(T("sm.notes","Good to know"))+'</h3><div class="tip"><i>1</i><p>'+E(T("sm.n1","The From address must belong to a verified domain or to your Geserd subdomain."))+'</p></div><div class="tip"><i>2</i><p>'+E(T("sm.n2","Limits, suppressions and logs are the same as when you send through the API."))+'</p></div><div class="tip"><i>3</i><p>'+E(T("sm.n3","Port 465 uses TLS from the first byte, port 587 upgrades with STARTTLS. Plain connections are refused."))+'</p></div></div>';
 root.innerHTML='<div class="ph"><h1>'+E(T("ap.emails","Emails"))+'</h1></div>'+tabs()+'<div class="smgrid"><div class="smcol">'+conn+notes+'</div><div class="smcol">'+code+'</div></div>';
 var pre=document.getElementById("smC"),txt=sample(kind,host);pre.textContent=txt;
 document.getElementById("smK").onclick=function(e){var b=e.target.closest("button[data-k]");if(!b)return;render.kind=b.dataset.k;render()};
 document.getElementById("smCp").onclick=function(){A.copy(txt,this)};
 root.querySelectorAll("[data-c]").forEach(function(b){b.onclick=function(){A.copy(b.dataset.c,b)}})}
A.ready(function(){root=document.getElementById("app-root");if(!root)return;
 root.innerHTML='<div class="ph"><h1>'+E(T("ap.emails","Emails"))+'</h1></div>'+tabs()+A.loading();
 fetch("/api/smtp",{credentials:"same-origin",cache:"no-store"}).then(function(r){return r.ok?r.json():{}}).catch(function(){return{}}).then(function(j){S=j||{};render()})});
})();
