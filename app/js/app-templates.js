(function(){
var A=window.GSApp,G=window.GSTpl;if(!A||!G)return;
var T=A.t,E=A.esc,root,limit=0;
var NEW="/app/templates/edit/";
var SN={blank:["tp.s.blank","Blank","Start from an empty message."],welcome:["tp.s.welcome","Welcome","Greet new users with a button."],code:["tp.s.code","Verification code","Send a one-time code."],receipt:["tp.s.receipt","Receipt","Confirm a payment."]};
function head(sub){return '<div class="ph pgh"><div><h1>'+E(T("tp.h","Templates"))+'</h1>'+(sub?'<p class="psub">'+E(sub)+'</p>':'')+'</div><button type="button" class="abtn pri lg" id="tpNew">'+A.icon(A.IC.plus,16)+'<span>'+E(T("tp.new","New template"))+'</span></button></div>'}
function chooser(){
 var cards=Object.keys(SN).map(function(k){return '<a class="stc" href="'+NEW+'?new=1&s='+k+'"><b>'+E(T(SN[k][0],SN[k][1]))+'</b><span>'+E(T(SN[k][0]+".d",SN[k][2]))+'</span></a>'}).join("");
 A.modal({title:T("tp.choose","Start from"),wide:true,body:'<div class="stg">'+cards+'</div>',actions:[{label:T("app.close","Close")}]})}
function fit(){root.querySelectorAll(".tthumb").forEach(function(b){var f=b.firstElementChild;if(f)f.style.transform="scale("+(b.clientWidth/600)+")"})}
function card(t){
 var vars=t.variables.slice(0,4).map(function(v){return '<i class="vchip">'+E(v)+'</i>'}).join("")+(t.variables.length>4?'<i class="vchip">+'+(t.variables.length-4)+'</i>':'');
 return '<div class="tplc" data-id="'+t.id+'"><a class="tlink" href="'+NEW+'?id='+t.id+'" aria-label="'+E(t.name)+'"></a>'+(t.thumb?'<div class="tthumb"><iframe sandbox="" tabindex="-1" loading="lazy" title="" srcdoc="'+E(t.thumb)+'"></iframe></div>':'<div class="tthumb ph0">'+A.icon('<rect x="3" y="4" width="18" height="16" rx="3"/><path d="M3 9h18M9 9v11"/>',32)+'</div>')+'<div class="tinfo"><b>'+E(t.name)+'</b><span>'+E(t.subject||T("tp.nosubject","No subject"))+'</span><div class="tvars">'+vars+'</div><time>'+E(A.ago(t.updated_at))+'</time></div><div class="tact"><button type="button" class="app-ico" data-dup="'+t.id+'" aria-label="'+E(T("tp.dup","Duplicate"))+'">'+A.icon(A.IC.copy,16)+'</button><button type="button" class="app-ico dng" data-del="'+t.id+'" aria-label="'+E(T("tp.del","Delete"))+'">'+A.icon(A.IC.trash,16)+'</button></div></div>'}
function load(){
 root.innerHTML=head()+A.loading();
 Promise.all([A.api("/templates"),A.api("/usage")]).then(function(r){
  var rows=r[0];limit=(r[1].limits||{}).templates||0;
  var sub=A.plural(rows.length,"tp.used","{n} templates")+(limit?" · "+T("tp.of","limit")+" "+limit:"");
  root.innerHTML=head(rows.length?sub:"")+(rows.length?'<div class="tgrid">'+rows.map(card).join("")+'</div>':A.empty('<rect x="3" y="4" width="18" height="16" rx="3"/><path d="M3 9h18M9 9v11"/>',T("tp.none","No templates yet"),T("tp.none.d","Save a message once and send it with a template id and variables."),'<button type="button" class="abtn pri lg" id="tpNew2">'+E(T("tp.new","New template"))+'</button>'));
  var n=document.getElementById("tpNew");if(n)n.onclick=chooser;var n2=document.getElementById("tpNew2");if(n2)n2.onclick=chooser;
  fit();setTimeout(fit,300);
  root.querySelectorAll("[data-dup]").forEach(function(b){b.onclick=function(){b.disabled=true;A.api("/templates/"+b.dataset.dup+"/duplicate",{method:"POST"}).then(function(){A.toast(T("tp.duped","Template duplicated"),"ok");load()},function(e){b.disabled=false;A.toast(e.code==="plan_limit"?T("tp.limit","You reached the template limit of your plan."):A.err(e),"err")})}});
  root.querySelectorAll("[data-del]").forEach(function(b){b.onclick=function(){
   A.modal({title:T("tp.del.t","Delete template"),desc:T("tp.del.d","This cannot be undone. Emails already sent are not affected."),actions:[{label:T("hp.cancel","Cancel")},{label:T("tp.del","Delete"),cls:"dng",onClick:function(api,btn){btn.disabled=true;A.api("/templates/"+b.dataset.del,{method:"DELETE"}).then(function(){api.close();A.toast(T("tp.deleted","Template deleted"),"ok");load()},function(e){btn.disabled=false;A.toast(A.err(e),"err")})}}]})}})
 },function(x){root.innerHTML=head()+A.failed(x,"tpRetry");var b=document.getElementById("tpRetry");if(b)b.onclick=load})}
A.ready(function(){root=document.getElementById("tp-root");if(!root)return;window.addEventListener("resize",fit);load()});
})();
