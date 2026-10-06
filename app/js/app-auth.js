(function(){
var A=window.GSApp;if(!A)return;
var T=A.t,E=A.esc,root;
var st={from:"",opts:[],to:"",len:6,ttl:600,lang:"en",sent:false,tab:"send",busy:false};
var API=location.origin+((window.GESERD&&GESERD.api)||"/api");
function sgm(name,list,val){return '<div class="sgc" data-seg="'+name+'">'+list.map(function(o){return '<button type="button" data-val="'+o[0]+'" class="'+(String(o[0])===String(val)?"on":"")+'">'+E(o[1])+'</button>'}).join("")+'</div>'}
function head(){return '<div class="ph pgh"><div><h1>'+E(T("ak.h","Authentication"))+'</h1><p class="psub">'+E(T("ak.sub","Email one-time codes without building the plumbing."))+'</p></div></div>'}
function snippet(tab){
 if(tab==="verify")return 'curl -X POST '+API+'/auth-kit/verify \\\n  -H "Authorization: Bearer gs_your_api_key" \\\n  -H "Content-Type: application/json" \\\n  -d \'{ "to": "user@example.com", "code": "482913" }\'\n\n# { "valid": true }\n# { "valid": false, "reason": "wrong_code", "attempts_left": 4 }';
 return 'curl -X POST '+API+'/auth-kit/send \\\n  -H "Authorization: Bearer gs_your_api_key" \\\n  -H "Content-Type: application/json" \\\n  -d \'{\n    "from": "App <hello@yourdomain.com>",\n    "to": "user@example.com",\n    "lang": "en",\n    "app_name": "Acme",\n    "length": 6,\n    "ttl": 600\n  }\'\n\n# { "id": "...", "expires_at": "...", "length": 6 }'}
function kpis(s){
 var rate=s.sent?Math.round(s.verified/s.sent*100)+"%":"—";
 return '<div class="kpis"><div class="kpi"><span>'+E(T("ak.k.sent","Codes sent"))+'</span><b>'+A.num(s.sent)+'</b><i>'+E(T("ak.k.30","last 30 days"))+'</i></div><div class="kpi"><span>'+E(T("ak.k.ver","Verified"))+'</span><b>'+A.num(s.verified)+'</b><i>'+E(T("ak.k.30","last 30 days"))+'</i></div><div class="kpi"><span>'+E(T("ak.k.rate","Success rate"))+'</span><b>'+rate+'</b><i>'+E(T("ak.k.30","last 30 days"))+'</i></div></div>'}
function tryCard(){
 var chips=st.opts.length?'<div class="chips2" id="akFrom">'+st.opts.map(function(o){return '<button type="button" data-o="'+E(o)+'" class="'+(o===st.from?"on":"")+'">'+E(o)+'</button>'}).join("")+'</div>':'<p class="vhint">'+E(T("tp.nodomain","You have no verified domain yet."))+' <a href="/app/domains/">'+E(T("tp.adddomain","Add a domain"))+'</a></p>';
 var verify=st.sent?'<div class="pfld" style="margin-top:18px"><label for="akCode">'+E(T("ak.code","Enter the code from the email"))+'</label><div class="prow"><input id="akCode" class="akcode" inputmode="numeric" autocomplete="one-time-code" maxlength="8" placeholder="'+("0".repeat(st.len))+'"><button type="button" class="abtn pri lg" id="akVer">'+E(T("ak.verify","Verify"))+'</button></div><div id="akRes" class="akres" role="status"></div></div>':'';
 return '<div class="ucard"><div class="uh"><div><h3>'+E(T("ak.try","Try it"))+'</h3><p>'+E(T("ak.try.d","Send a real code and check it right here."))+'</p></div></div><div class="pfld"><label>'+E(T("tp.from","From"))+'</label>'+chips+'</div><div class="pfld"><label for="akTo">'+E(T("ak.to","Send to"))+'</label><input id="akTo" type="email" autocomplete="off" value="'+E(st.to)+'"></div><div class="akopts"><div class="pfld"><label>'+E(T("ak.len","Length"))+'</label>'+sgm("len",[[4,"4"],[6,"6"],[8,"8"]],st.len)+'</div><div class="pfld"><label>'+E(T("ak.ttl","Valid for"))+'</label>'+sgm("ttl",[[300,"5 "+T("ak.min","min")],[600,"10 "+T("ak.min","min")],[1800,"30 "+T("ak.min","min")]],st.ttl)+'</div><div class="pfld"><label>'+E(T("ak.lang","Email language"))+'</label>'+sgm("lang",[["en","EN"],["ru","RU"],["de","DE"],["fr","FR"]],st.lang)+'</div></div><div class="prow"><button type="button" class="abtn pri lg" id="akSend"'+(st.opts.length?"":" disabled")+'>'+E(st.sent?T("ak.resend","Send again"):T("ak.send","Send code"))+'</button></div>'+verify+'</div>'}
function intCard(){
 return '<div class="ucard"><div class="uh"><div><h3>'+E(T("ak.int","Use it in your app"))+'</h3><p>'+E(T("ak.int.d","Two requests with your API key. Codes are hashed, expire and lock after 5 wrong tries."))+'</p></div><div class="sgc" data-seg="tab"><button type="button" data-val="send" class="'+(st.tab==="send"?"on":"")+'">'+E(T("ak.t.send","Send"))+'</button><button type="button" data-val="verify" class="'+(st.tab==="verify"?"on":"")+'">'+E(T("ak.t.verify","Verify"))+'</button></div></div><pre class="smcode" id="akSnip"></pre><div class="prow" style="margin-top:14px"><button type="button" class="abtn cp" id="akCp">'+A.icon(A.IC.copy)+'<span>'+E(T("sm.copy","Copy"))+'</span></button><a class="abtn" href="/app/api-keys/">'+E(T("app.smtp.keys","Create API key"))+'</a></div></div>'}
function notes(){
 var n=[T("ak.n1","Codes count towards your email limits like any other email."),T("ak.n2","One address can get 5 codes per hour, and a new code only after 30 seconds."),T("ak.n3","Use your own template with the variables code, minutes and app, or the built-in email in four languages.")];
 return '<div class="ucard"><h3 style="margin-bottom:14px">'+E(T("sm.notes","Good to know"))+'</h3>'+n.map(function(x,i){return '<div class="tip"><i>'+(i+1)+'</i><p>'+E(x)+'</p></div>'}).join("")+'</div>'}
function recent(s){
 var lab={verified:T("ak.s.ver","Verified"),expired:T("ak.s.exp","Expired"),locked:T("ak.s.lock","Locked"),pending:T("ak.s.pend","Waiting")},cls={verified:"ok",expired:"",locked:"bad",pending:""};
 if(!s.recent.length)return '';
 return '<h2 class="sh1" style="margin-top:32px">'+E(T("ak.recent","Recent codes"))+'</h2><div class="akt"><div class="akr akh"><span>'+E(T("ak.r.to","Address"))+'</span><span>'+E(T("ak.r.st","Status"))+'</span><span>'+E(T("ak.r.at","Sent"))+'</span></div>'+s.recent.map(function(r){return '<div class="akr"><span class="mono">'+E(r.to)+'</span><span>'+A.pill(cls[r.status]||"",lab[r.status]||r.status)+'</span><span class="dim">'+E(A.ago(r.created_at))+'</span></div>'}).join("")+'</div>'}
var stats={sent:0,verified:0,recent:[]};
function paint(){
 root.innerHTML=head()+kpis(stats)+'<div class="smgrid"><div class="smcol">'+tryCard()+notes()+'</div><div class="smcol">'+intCard()+'</div></div>'+recent(stats);
 var sn=document.getElementById("akSnip"),txt=snippet(st.tab);sn.textContent=txt;
 document.getElementById("akCp").onclick=function(){A.copy(txt,this)}}
function reloadStats(){return A.api("/auth-kit/stats").then(function(s){stats=s}).catch(function(){})}
function errText(e){
 var m={cooldown:T("ak.err.cool","Wait a few seconds before sending another code."),too_many_codes:T("ak.err.many","Too many codes for this address. Try again in an hour."),domain_not_verified:T("tp.err.domain","This sender domain is not verified."),invalid_to:T("ak.err.to","Enter a valid email address."),quota_exceeded:T("ak.err.quota","You reached your sending limit."),rate_limited:T("ak.err.cool","Wait a few seconds before sending another code.")};
 return m[e.code]||A.err(e)}
function wire(){
 root.addEventListener("click",function(e){
  var t=e.target;
  var sg=t.closest("[data-seg] button");
  if(sg){var g=sg.parentNode.dataset.seg,v=sg.dataset.val;
   if(g==="tab"){st.tab=v;sg.parentNode.querySelectorAll("button").forEach(function(b){b.classList.toggle("on",b===sg)});var tx=snippet(v);document.getElementById("akSnip").textContent=tx;document.getElementById("akCp").onclick=function(){A.copy(tx,this)};return}
   if(g==="len"||g==="ttl")st[g]=+v;else st.lang=v;
   sg.parentNode.querySelectorAll("button").forEach(function(b){b.classList.toggle("on",b===sg)});return}
  var ch=t.closest("#akFrom button");if(ch){st.from=ch.dataset.o;root.querySelectorAll("#akFrom button").forEach(function(b){b.classList.toggle("on",b===ch)});return}
  if(t.closest("#akSend")){
   var to=document.getElementById("akTo").value.trim();st.to=to;
   if(!to){A.toast(T("ak.err.to","Enter a valid email address."),"err");return}
   var b=t.closest("#akSend");b.disabled=true;
   A.api("/auth-kit/send",{method:"POST",body:{from:"Geserd <"+st.from+">",to:to,length:st.len,ttl:st.ttl,lang:st.lang,app_name:"Geserd"}}).then(function(){st.sent=true;A.toast(T("ak.sent","Code sent to")+" "+to,"ok");return reloadStats()}).then(function(){var keep=document.getElementById("akTo").value;paint();document.getElementById("akTo").value=keep;var c=document.getElementById("akCode");if(c)c.focus()},function(x){b.disabled=false;A.toast(errText(x),"err")});return}
  if(t.closest("#akVer")){
   var code=document.getElementById("akCode").value.trim(),res=document.getElementById("akRes");
   if(!code)return;
   A.api("/auth-kit/verify",{method:"POST",body:{to:st.to,code:code}}).then(function(r){
    var m={wrong_code:T("ak.v.wrong","Wrong code."),expired:T("ak.v.exp","The code has expired."),too_many_attempts:T("ak.v.lock","Too many wrong tries. Send a new code."),not_found:T("ak.v.nf","No active code. Send a new one."),invalid:T("ak.v.inv","Enter the digits from the email.")};
    res.className="akres "+(r.valid?"ok":"bad");res.textContent=r.valid?T("ak.v.ok","Verified. This is what your app receives: valid: true."):(m[r.reason]||r.reason)+(r.attempts_left!=null?" ("+T("ak.v.left","tries left")+": "+r.attempts_left+")":"");
    if(r.valid)reloadStats().then(function(){var keep=st.to;paint();document.getElementById("akTo").value=keep;var rr=document.getElementById("akRes");if(rr){rr.className="akres ok";rr.textContent=T("ak.v.ok","Verified. This is what your app receives: valid: true.")}})},function(x){A.toast(A.err(x),"err")})}});
 root.addEventListener("keydown",function(e){if(e.key==="Enter"&&e.target.id==="akCode"){var b=document.getElementById("akVer");if(b)b.click()}})}
A.ready(function(){root=document.getElementById("ak-root");if(!root)return;
 root.innerHTML=head()+A.loading();
 Promise.all([A.api("/auth/me"),A.api("/domains").catch(function(){return[]}),A.api("/subdomain").catch(function(){return{}}),A.api("/auth-kit/stats")]).then(function(r){
  st.to=r[0].email;st.lang=(A.lang&&["en","ru","de","fr"].indexOf(A.lang())>=0)?A.lang():"en";
  (r[1]||[]).filter(function(d){return d.status==="verified"}).forEach(function(d){st.opts.push("hello@"+d.name)});
  ((r[2]&&r[2].items)||[]).forEach(function(x){st.opts.push("hello@"+x.domain)});
  st.from=st.opts[0]||"";stats=r[3];paint();wire()},function(x){root.innerHTML=head()+A.failed(x,"akRetry");var b=document.getElementById("akRetry");if(b)b.onclick=function(){location.reload()}})});
})();
