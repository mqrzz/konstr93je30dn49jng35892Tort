(function(){
var A=window.GSApp,t=A.t,e=A.esc,root,id=new URLSearchParams(location.search).get("id"),S={name:"",audience_id:"",from:"",reply_to:"",subject:"",template_id:"",html:"",text:""},auds=[],tpls=[],me=null,focus=null,dirty=false;
var SAMPLE={first_name:"Anna",last_name:"Smith",email:"anna@example.com",unsubscribe_url:"#"};
function err(x){var m=A.t("au.err."+(x&&x.code),"");return m||A.err(x)}
function sub(str,html){return String(str||"").replace(/\{\{\s*([a-zA-Z_][a-zA-Z0-9_]*)\s*\}\}/g,function(m,k){var v=SAMPLE[k]||"";return html?e(v):v})}
function back(){return'<a class="backlnk" href="/app/broadcasts/">'+A.icon(A.IC.back,16)+"<span>"+e(t("bc.t","Broadcasts"))+"</span></a>"}
function field(idn,label,inner,hint){return'<div class="bx-f"><label class="lab" for="'+idn+'">'+e(label)+"</label>"+inner+(hint?'<p class="fhint">'+e(hint)+"</p>":"")+"</div>"}
function inp(idn,v,ph,ml){return'<input class="fld" id="'+idn+'" maxlength="'+(ml||300)+'" autocomplete="off" placeholder="'+e(ph||"")+'" value="'+e(v)+'">'}
function draw(){
 root.innerHTML=back()+'<div class="ph pgh"><div><h1>'+e(id?t("bc.edit","Edit broadcast"):t("bc.new","Create broadcast"))+'</h1><p class="psub">'+e(t("bc.edit.sub","Write the email, choose who gets it and send it now or later."))+'</p></div><div class="bx-act"><button type="button" class="abtn lg" id="eSave">'+e(t("bc.save","Save draft"))+'</button><button type="button" class="abtn lg" id="eTest">'+e(t("bc.test","Send test"))+'</button><button type="button" class="abtn lg pri" id="eSend">'+e(t("bc.send","Send…"))+'</button></div></div><div class="bx-ed"><div class="bx-form">'+
 field("eName",t("bc.c.name","Name"),inp("eName",S.name,t("bc.name.ph","e.g. October newsletter"),120),t("bc.name.h","Only you see this name."))+
 '<div class="bx-f"><span class="lab">'+e(t("bc.c.aud","Audience"))+'</span><div id="eAud"></div></div>'+
 field("eFrom",t("bc.from","From"),inp("eFrom",S.from,"Acme <hello@example.com>",300),t("bc.from.h","Use an address on a verified domain or on your Geserd subdomain."))+
 field("eReply",t("bc.reply","Reply-to (optional)"),inp("eReply",S.reply_to,"support@example.com",254))+
 field("eSubj",t("bc.subject","Subject"),inp("eSubj",S.subject,"",300))+
 '<div class="bx-f"><span class="lab">'+e(t("bc.tpl","Start from a template"))+'</span><div id="eTpl"></div></div>'+
 '<div class="bx-f"><span class="lab">'+e(t("bc.vars","Insert a variable"))+'</span><div class="bx-chips">'+["first_name","last_name","email","unsubscribe_url"].map(function(v){return'<button type="button" class="bx-chip" data-var="'+v+'">{{'+v+"}}</button>"}).join("")+"</div></div>"+
 field("eHtml",t("bc.html","HTML"),'<textarea class="fld bx-ta mono" id="eHtml" rows="12" spellcheck="false">'+e(S.html)+"</textarea>")+
 field("eText",t("bc.text","Plain text (optional)"),'<textarea class="fld bx-ta mono" id="eTextA" rows="6" spellcheck="false">'+e(S.text)+"</textarea>",t("bc.text.h","Generated from the HTML if left empty."))+
 '<p class="fhint">'+e(t("bc.foot","An unsubscribe link is added to every email automatically."))+'</p><p class="ferr" id="eErr" hidden></p></div><div class="bx-side"><span class="lab">'+e(t("bc.preview","Preview"))+'</span><iframe class="bx-prev" id="ePrev" sandbox="" title="'+e(t("bc.preview","Preview"))+'"></iframe></div></div>';
 var da=A.dropdown([["",t("bc.aud.pick","Choose an audience")].concat([])].concat(auds.map(function(a){return[a.id,a.name+" ("+A.num(a.contacts-a.unsubscribed)+")"]})),S.audience_id,function(v){S.audience_id=v;dirty=true},"bx-dd");
 document.getElementById("eAud").appendChild(da);
 var dt=A.dropdown([["",t("bc.tpl.none","No template")].concat([])].concat(tpls.map(function(x){return[x.id,x.name]})),S.template_id,pickTpl,"bx-dd");
 document.getElementById("eTpl").appendChild(dt);
 [["eName","name"],["eFrom","from"],["eReply","reply_to"],["eSubj","subject"],["eHtml","html"],["eTextA","text"]].forEach(function(p){var el=document.getElementById(p[0]);el.addEventListener("input",function(){S[p[1]]=el.value;dirty=true;if(p[1]==="html"||p[1]==="subject")preview()});el.addEventListener("focus",function(){if(p[0]==="eSubj"||p[0]==="eHtml"||p[0]==="eTextA")focus=el})});
 root.querySelectorAll("[data-var]").forEach(function(b){b.onclick=function(){insert("{{"+b.dataset.var+"}}")}});
 document.getElementById("eSave").onclick=function(){run(this,function(){return save().then(function(){A.toast(t("bc.saved","Draft saved"),"ok")})})};
 document.getElementById("eTest").onclick=testModal;document.getElementById("eSend").onclick=sendModal;
 preview()
}
function insert(v){var el=focus||document.getElementById("eHtml");var s=el.selectionStart==null?el.value.length:el.selectionStart,en=el.selectionEnd==null?s:el.selectionEnd;el.value=el.value.slice(0,s)+v+el.value.slice(en);el.focus();el.selectionStart=el.selectionEnd=s+v.length;el.dispatchEvent(new Event("input"))}
function preview(){var f=document.getElementById("ePrev");if(!f)return;f.srcdoc=S.html?sub(S.html,true):'<body style="font:14px Arial;color:#888;padding:24px">'+e(t("bc.preview.empty","Your HTML preview appears here."))+"</body>"}
function pickTpl(v){
 S.template_id=v;dirty=true;if(!v)return;
 A.api("/templates/"+encodeURIComponent(v)).then(function(x){S.html=x.html||"";S.text=x.text||"";if(!S.subject)S.subject=x.subject||"";document.getElementById("eHtml").value=S.html;document.getElementById("eTextA").value=S.text;document.getElementById("eSubj").value=S.subject;preview()},function(z){A.toast(err(z),"err")})
}
function showErr(s){var x=document.getElementById("eErr");if(!x)return;x.textContent=s||"";x.hidden=!s}
function body(){return{name:S.name.trim(),audience_id:S.audience_id||null,from:S.from.trim(),reply_to:S.reply_to.trim(),subject:S.subject.trim(),template_id:S.template_id||null,html:S.html,text:S.text}}
function save(){
 showErr("");
 var p=id?A.api("/broadcasts/"+encodeURIComponent(id),{method:"PATCH",body:body()}):A.api("/broadcasts",{method:"POST",body:body()});
 return p.then(function(b){if(!id){id=b.id;history.replaceState(null,"","/app/broadcasts/edit/?id="+id)}dirty=false;return b},function(x){showErr(err(x));throw x})
}
function run(btn,fn){btn.disabled=true;return fn().then(function(){btn.disabled=false},function(){btn.disabled=false})}
function testModal(){
 var b=document.createElement("div");b.innerHTML='<label class="lab" for="tTo">'+e(t("bc.test.to","Send the test to"))+'</label><input class="fld" id="tTo" type="email" autocomplete="email" value="'+e(me&&me.email||"")+'"><p class="fhint">'+e(t("bc.test.h","The test counts toward your sending limit."))+'</p><p class="ferr" id="tErr" hidden></p>';
 A.modal({title:t("bc.test","Send test"),body:b,actions:[{label:t("au.cancel","Cancel")},{label:t("bc.test.go","Send test"),cls:"pri",onClick:function(mm,btn){var er=b.querySelector("#tErr");er.hidden=true;btn.disabled=true;save().then(function(){return A.api("/broadcasts/"+encodeURIComponent(id)+"/test",{method:"POST",body:{to:b.querySelector("#tTo").value.trim()}})}).then(function(){mm.close();A.toast(t("bc.test.done","Test email sent"),"ok")},function(x){btn.disabled=false;er.textContent=err(x);er.hidden=false})}}]})
}
function local(d){var p=function(n){return String(n).padStart(2,"0")};return d.getFullYear()+"-"+p(d.getMonth()+1)+"-"+p(d.getDate())+"T"+p(d.getHours())+":"+p(d.getMinutes())}
function sendModal(){
 var a=auds.filter(function(x){return x.id===S.audience_id})[0],n=a?a.contacts-a.unsubscribed:0,mode="now";
 var b=document.createElement("div");
 b.innerHTML='<div class="bx-sum"><div><span>'+e(t("bc.c.aud","Audience"))+"</span><b>"+e(a?a.name:"—")+"</b></div><div><span>"+e(t("bc.st.total","Recipients"))+"</span><b>"+A.num(n)+"</b></div><div><span>"+e(t("bc.from","From"))+"</span><b>"+e(S.from||"—")+"</b></div><div><span>"+e(t("bc.subject","Subject"))+"</span><b>"+e(S.subject||"—")+'</b></div></div><div class="seg2" id="sMode"><button type="button" class="on" data-m="now">'+e(t("bc.now","Send now"))+'</button><button type="button" data-m="later">'+e(t("bc.later","Schedule"))+'</button></div><div id="sWhen" hidden><label class="lab" for="sAt">'+e(t("bc.when","Date and time"))+'</label><input class="fld" id="sAt" type="datetime-local" min="'+local(new Date(Date.now()+120000))+'" value="'+local(new Date(Date.now()+3600e3))+'"></div><p class="fhint">'+e(t("bc.send.h","Contacts who unsubscribe before their turn are skipped."))+'</p><p class="ferr" id="sErr" hidden></p>';
 var m=A.modal({title:t("bc.send.t","Send broadcast"),desc:t("bc.send.d","Check the details. Sent emails can’t be recalled."),body:b,actions:[{label:t("au.cancel","Cancel")},{label:t("bc.send.go","Send"),cls:"pri",onClick:function(mm,btn){go(mm,btn)}}]});
 b.querySelectorAll("[data-m]").forEach(function(x){x.onclick=function(){mode=x.dataset.m;b.querySelectorAll("[data-m]").forEach(function(y){y.classList.toggle("on",y===x)});b.querySelector("#sWhen").hidden=mode!=="later"}});
 function go(mm,btn){var er=b.querySelector("#sErr");er.hidden=true;btn.disabled=true;var payload={};if(mode==="later"){var d=new Date(b.querySelector("#sAt").value);if(isNaN(d)){btn.disabled=false;er.textContent=t("au.err.invalid_schedule","Pick a time at least a few minutes ahead.");er.hidden=false;return}payload.scheduled_at=d.toISOString()}
  save().then(function(){return A.api("/broadcasts/"+encodeURIComponent(id)+"/send",{method:"POST",body:payload})}).then(function(){mm.close();location.href="/app/broadcasts/view/?id="+id},function(x){btn.disabled=false;er.textContent=x&&x.code==="domain_not_verified"&&x.data&&x.data.domain?t("au.err.domain_not_verified","This sender domain is not verified.")+" ("+x.data.domain+")":err(x);er.hidden=false})}
}
function defaults(){
 return Promise.all([A.api("/domains").catch(function(){return[]}),A.api("/subdomain").catch(function(){return{items:[]}})]).then(function(r){var d=(r[0]||[]).filter(function(x){return x.status==="verified"&&x.sending_ok})[0];if(d)return"hello@"+d.name;var s=r[1]&&r[1].items&&r[1].items[0];return s?"hello@"+s.domain:""})
}
function init(){
 root.innerHTML=back()+A.loading();
 Promise.all([A.api("/audiences"),A.api("/templates").catch(function(){return[]}),A.api("/auth/me").catch(function(){return null}),id?A.api("/broadcasts/"+encodeURIComponent(id)):defaults()]).then(function(r){
  auds=r[0].data;tpls=r[1]||[];me=r[2];
  if(id){var b=r[3];if(b.status!=="draft"){location.replace("/app/broadcasts/view/?id="+id);return}S={name:b.name||"",audience_id:b.audience_id||"",from:b.from_addr||"",reply_to:b.reply_to||"",subject:b.subject||"",template_id:b.template_id||"",html:b.html||"",text:b.text||""}}
  else S.from=r[3]||"";
  draw()
 },function(x){root.innerHTML=back()+A.failed(x,"bRetry");var b=document.getElementById("bRetry");if(b)b.onclick=init})
}
window.addEventListener("beforeunload",function(ev){if(dirty){ev.preventDefault();ev.returnValue=""}});
A.ready(function(){root=document.getElementById("app-root");if(root)init()})
})();
