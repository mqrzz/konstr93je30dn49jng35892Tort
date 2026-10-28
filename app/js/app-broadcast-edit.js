(function(){
var A=window.GSApp,t=A.t,e=A.esc,root,id=new URLSearchParams(location.search).get("id"),S={name:"",audience_id:"",segment_id:"",topic_id:"",from:"",reply_to:"",subject:"",template_id:"",html:"",text:""},auds=[],tpls=[],me=null,focus=null,dirty=false;
var SAMPLE={first_name:"Anna",last_name:"Smith",email:"anna@example.com",unsubscribe_url:"#"};
function err(x){var m=A.t("au.err."+(x&&x.code),"");return m||A.err(x)}
function sub(str,html){return String(str||"").replace(/\{\{\s*([a-zA-Z_][a-zA-Z0-9_]*)\s*\}\}/g,function(m,k){var v=SAMPLE[k]||"";return html?e(v):v})}
function back(){return'<a class="backlnk" href="/app/broadcasts/">'+A.icon(A.IC.back,16)+"<span>"+e(t("bc.t","Broadcasts"))+"</span></a>"}
function field(idn,label,inner,hint){return'<div class="bx-f"><label class="lab" for="'+idn+'">'+e(label)+"</label>"+inner+(hint?'<p class="fhint">'+e(hint)+"</p>":"")+"</div>"}
function inp(idn,v,ph,ml){return'<input class="fld" id="'+idn+'" maxlength="'+(ml||300)+'" autocomplete="off" placeholder="'+e(ph||"")+'" value="'+e(v)+'">'}
function draw(){
 document.body.classList.add("ed-studio");
 var hm='<path d="M4 11 12 4l8 7v8a1 1 0 0 1-1 1h-4v-6H9v6H5a1 1 0 0 1-1-1z"/>';
 function row(lab,inner){return'<div class="edrow"><span>'+e(lab)+"</span>"+inner+"</div>"}
 root.innerHTML='<div id="edTop"><div class="edh"><a class="backlnk edhome" href="/app/broadcasts/" aria-label="'+e(t("bc.back","All broadcasts"))+'">'+A.icon(hm,18)+'</a><div class="edcrumb"><a href="/app/broadcasts/">'+e(t("bc.crumb","Broadcasts"))+'</a><i>/</i><b id="edTitle">'+e(S.name||t("tp.untitled","Untitled"))+'</b><span class="edbadge">'+e(t("tp.draft","Draft"))+'</span></div><div class="edact"><button type="button" class="abtn lg" id="eSave">'+e(t("bc.save","Save draft"))+'</button><button type="button" class="abtn lg" id="eTest">'+e(t("bc.test","Send test"))+'</button><button type="button" class="abtn lg pri" id="eSend">'+e(t("bc.send","Send…"))+'</button></div></div></div><div class="edt"><nav class="edrail"><button type="button" class="on" aria-label="'+e(t("tp.tab.blocks","Blocks"))+'">'+A.icon('<path d="M4 20l1-4L16 5l3 3L8 19z"/><path d="m14 7 3 3"/>',20)+'</button></nav><div class="edr"><div class="edhead">'+
 '<label class="edrow"><span>'+e(t("bc.c.name","Name"))+"</span>"+inp("eName",S.name,t("bc.name.ph","e.g. October newsletter"),120)+"</label>"+
 row(t("bc.c.aud","Audience"),'<div id="eAud" class="edsel"></div>')+
 row(t("bc.seg","Segment"),'<div id="eSeg" class="edsel"></div>')+
 row(t("bc.topic","Topic"),'<div id="eTop" class="edsel"></div>')+
 '<label class="edrow"><span>'+e(t("bc.from","From"))+"</span>"+inp("eFrom",S.from,"Acme <hello@example.com>",300)+"</label>"+
 '<label class="edrow"><span>'+e(t("bc.reply","Reply-to (optional)"))+"</span>"+inp("eReply",S.reply_to,"support@example.com",254)+"</label>"+
 '<label class="edrow"><span>'+e(t("bc.subject","Subject"))+"</span>"+inp("eSubj",S.subject,"",300)+"</label></div><div class=\"pvf desktop\"><iframe class=\"bx-prev\" id=\"ePrev\" sandbox=\"\" title=\""+e(t("bc.preview","Preview"))+'"></iframe></div></div><aside class="edl"><div class="edph"><span class="edpi">'+A.icon('<path d="M8 8l-4 4 4 4M16 8l4 4-4 4"/>',16)+'</span><b>'+e(t("bc.html","HTML"))+'</b></div><div class="bx-f"><span class="lab">'+e(t("bc.tpl","Start from a template"))+'</span><div id="eTpl"></div></div><div class="bx-f"><span class="lab">'+e(t("bc.vars","Insert a variable"))+'</span><div class="bx-chips">'+["first_name","last_name","email","unsubscribe_url"].map(function(v){return'<button type="button" class="bx-chip" data-var="'+v+'">{{'+v+"}}</button>"}).join("")+"</div></div>"+
 field("eHtml",t("bc.html","HTML"),'<textarea class="fld bx-ta mono" id="eHtml" rows="12" spellcheck="false">'+e(S.html)+"</textarea>")+
 field("eText",t("bc.text","Plain text (optional)"),'<textarea class="fld bx-ta mono" id="eTextA" rows="6" spellcheck="false">'+e(S.text)+"</textarea>",t("bc.text.h","Generated from the HTML if left empty."))+
 '<p class="fhint">'+e(t("bc.foot","An unsubscribe link is added to every email automatically."))+'</p><p class="ferr" id="eErr" hidden></p></aside></div>';
 var da=A.dropdown([["",t("bc.aud.pick","Choose an audience")].concat([])].concat(auds.map(function(a){return[a.id,a.name+" ("+A.num(a.contacts-a.unsubscribed)+")"]})),S.audience_id,function(v){S.audience_id=v;S.segment_id="";S.topic_id="";dirty=true;loadExtras()},"bx-dd");
 document.getElementById("eAud").appendChild(da);
 loadExtras();
 var dt=A.dropdown([["",t("bc.tpl.none","No template")].concat([])].concat(tpls.map(function(x){return[x.id,x.name]})),S.template_id,pickTpl,"bx-dd");
 document.getElementById("eTpl").appendChild(dt);
 [["eName","name"],["eFrom","from"],["eReply","reply_to"],["eSubj","subject"],["eHtml","html"],["eTextA","text"]].forEach(function(p){var el=document.getElementById(p[0]);el.addEventListener("input",function(){S[p[1]]=el.value;dirty=true;if(p[0]==="eName"){var ti=document.getElementById("edTitle");if(ti)ti.textContent=el.value||t("tp.untitled","Untitled")}if(p[1]==="html"||p[1]==="subject")preview()});el.addEventListener("focus",function(){if(p[0]==="eSubj"||p[0]==="eHtml"||p[0]==="eTextA")focus=el})});
 root.querySelectorAll("[data-var]").forEach(function(b){b.onclick=function(){insert("{{"+b.dataset.var+"}}")}});
 document.getElementById("eSave").onclick=function(){run(this,function(){return save().then(function(){A.toast(t("bc.saved","Draft saved"),"ok")})})};
 document.getElementById("eTest").onclick=testModal;document.getElementById("eSend").onclick=sendModal;
 preview()
}
function loadExtras(){
 var sg=document.getElementById("eSeg"),tp=document.getElementById("eTop"),vb=root.querySelector(".bx-chips");
 sg.innerHTML="";tp.innerHTML="";
 var base=["first_name","last_name","email","unsubscribe_url"];
 function chips(extra){if(vb)vb.innerHTML=base.concat(extra).map(function(v){return'<button type="button" class="bx-chip" data-var="'+e(v)+'">{{'+e(v)+"}}</button>"}).join("");root.querySelectorAll("[data-var]").forEach(function(b){b.onclick=function(){insert("{{"+b.dataset.var+"}}")}})}
 if(!S.audience_id){sg.appendChild(A.dropdown([["",t("bc.seg.all","Whole audience")]],"",function(){},"bx-dd"));tp.appendChild(A.dropdown([["",t("bc.topic.none","No topic")]],"",function(){},"bx-dd"));chips([]);return}
 var aid=encodeURIComponent(S.audience_id);
 Promise.all([A.api("/audiences/"+aid+"/segments").catch(function(){return{data:[]}}),A.api("/audiences/"+aid+"/topics").catch(function(){return{data:[]}}),A.api("/audiences/"+aid+"/properties").catch(function(){return{data:[]}})]).then(function(R){
  if(!document.getElementById("eSeg"))return;
  sg.appendChild(A.dropdown([["",t("bc.seg.all","Whole audience")]].concat(R[0].data.map(function(x){return[x.id,x.name+" ("+A.num(x.contacts)+")"]})),S.segment_id,function(v){S.segment_id=v;dirty=true},"bx-dd"));
  tp.appendChild(A.dropdown([["",t("bc.topic.none","No topic")]].concat(R[1].data.map(function(x){return[x.id,x.name]})),S.topic_id,function(v){S.topic_id=v;dirty=true},"bx-dd"));
  chips(R[2].data.map(function(x){return x.key}))
 })
}
function insert(v){var el=focus||document.getElementById("eHtml");var s=el.selectionStart==null?el.value.length:el.selectionStart,en=el.selectionEnd==null?s:el.selectionEnd;el.value=el.value.slice(0,s)+v+el.value.slice(en);el.focus();el.selectionStart=el.selectionEnd=s+v.length;el.dispatchEvent(new Event("input"))}
function preview(){var f=document.getElementById("ePrev");if(!f)return;f.srcdoc=S.html?sub(S.html,true):'<body style="font:14px Arial;color:#888;padding:24px">'+e(t("bc.preview.empty","Your HTML preview appears here."))+"</body>"}
function pickTpl(v){
 S.template_id=v;dirty=true;if(!v)return;
 A.api("/templates/"+encodeURIComponent(v)).then(function(x){S.html=x.html||"";S.text=x.text||"";if(!S.subject)S.subject=x.subject||"";document.getElementById("eHtml").value=S.html;document.getElementById("eTextA").value=S.text;document.getElementById("eSubj").value=S.subject;preview()},function(z){A.toast(err(z),"err")})
}
function showErr(s){var x=document.getElementById("eErr");if(!x)return;x.textContent=s||"";x.hidden=!s}
function body(){return{name:S.name.trim(),audience_id:S.audience_id||null,segment_id:S.segment_id||null,topic_id:S.topic_id||null,from:S.from.trim(),reply_to:S.reply_to.trim(),subject:S.subject.trim(),template_id:S.template_id||null,html:S.html,text:S.text}}
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
  if(id){var b=r[3];if(b.status!=="draft"){location.replace("/app/broadcasts/view/?id="+id);return}S={name:b.name||"",audience_id:b.audience_id||"",segment_id:b.segment_id||"",topic_id:b.topic_id||"",from:b.from_addr||"",reply_to:b.reply_to||"",subject:b.subject||"",template_id:b.template_id||"",html:b.html||"",text:b.text||""}}
  else S.from=r[3]||"";
  draw()
 },function(x){root.innerHTML=back()+A.failed(x,"bRetry");var b=document.getElementById("bRetry");if(b)b.onclick=init})
}
window.addEventListener("beforeunload",function(ev){if(dirty){ev.preventDefault();ev.returnValue=""}});
A.ready(function(){root=document.getElementById("app-root");if(root)init()})
})();
