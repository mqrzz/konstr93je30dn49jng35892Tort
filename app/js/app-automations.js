(function(){
var A=window.GSApp;if(!A)return;
var T=A.t,E=A.esc,root=document.getElementById("am-root");if(!root)return;
var id=new URLSearchParams(location.search).get("id");
var tpls=[],doms=[],cur=null,dirty=false;
function list(x){return Array.isArray(x)?x:(x&&(x.data||x.items||x.rows))||[]}
function ic(p,s){return A.icon(p,s||16)}
var IC={mail:A.IC.mail,wait:'<circle cx="12" cy="12" r="8.5"/><path d="M12 7.5V12l3 2"/>',bolt:'<path d="m13 3-8 11h6l-1 7 8-11h-6z"/>',plus:A.IC.plus,trash:'<path d="M5 7h14M10 7V4h4v3M7 7l1 13h8l1-13"/>'};
function headList(){return '<div class="ph pgh"><div><h1>'+E(T("am.h","Automations"))+'</h1><p class="psub">'+E(T("am.p","Send emails by themselves when something happens in your product."))+'</p></div><button type="button" class="abtn pri lg" id="amNew">'+ic(IC.plus)+'<span>'+E(T("am.new","New automation"))+'</span></button></div>'}
function listPage(){
 root.innerHTML=headList()+A.loading();
 var nb=function(){var b=document.getElementById("amNew");if(b)b.onclick=function(){A.api("/automations",{method:"POST",body:{name:T("am.untitled","Untitled automation")}}).then(function(a){location.href="/app/automations/edit/?id="+a.id},function(x){A.toast(A.err(x),"err")})}};
 A.api("/automations").then(function(d){
  var rows=list(d);
  var body=rows.length?'<div class="p2l">'+rows.map(function(a){return '<div class="p2r"><div class="p2m">'+ic(IC.bolt,14)+'</div><div class="p2b"><h3><a href="/app/automations/edit/?id='+a.id+'">'+E(a.name)+'</a></h3><p>'+E(a.trigger_event?T("am.when","When")+" "+a.trigger_event:T("am.notrig","No event chosen yet"))+" · "+E(A.plural?A.plural(a.steps.length,"am.stepsn","{n} steps"):a.steps.length+" steps")+" · "+E(a.runs+" "+T("am.runs","runs"))+'</p></div><span class="am-st'+(a.enabled?' on':'')+'">'+E(a.enabled?T("am.on","Enabled"):T("am.off","Disabled"))+'</span></div>'}).join("")+'</div>':A.empty(IC.bolt,T("am.none","No automations yet"),T("am.nonep","Pick an event from your product, then choose what to send and when."),'<button type="button" class="abtn pri lg" id="amNew2">'+E(T("am.new","New automation"))+'</button>');
  root.innerHTML=headList()+body;nb();var b2=document.getElementById("amNew2");if(b2)b2.onclick=document.getElementById("amNew").onclick;
 },function(x){root.innerHTML=headList()+A.failed(x,"amRetry");nb();var b=document.getElementById("amRetry");if(b)b.onclick=listPage})
}
function stepCard(s,i){
 var del='<button type="button" class="am-x" data-del="'+i+'" aria-label="'+E(T("am.del","Remove step"))+'">'+ic(IC.trash,15)+'</button>';
 if(s.type==="wait")return '<div class="am-c"><div class="am-i">'+ic(IC.wait)+'</div><div class="am-b"><b>'+E(T("am.wait","Wait"))+'</b><div class="am-f"><input class="fld" type="number" min="1" max="43200" value="'+s.minutes+'" data-w="'+i+'" aria-label="'+E(T("am.minutes","Minutes"))+'"><span>'+E(T("am.min","minutes"))+'</span></div></div>'+del+'</div>';
 return '<div class="am-c"><div class="am-i">'+ic(IC.mail)+'</div><div class="am-b"><b>'+E(T("am.send","Send email"))+'</b><div class="am-f"><span class="am-dd" data-tp="'+i+'"></span></div><div class="am-f"><input class="fld" type="text" value="'+E(s.from||"")+'" placeholder="hi@'+E(doms[0]?doms[0].name:"yourdomain.com")+'" data-fr="'+i+'" aria-label="'+E(T("am.from","From"))+'"></div></div>'+del+'</div>'}
function addBtn(i){return '<div class="am-line"></div><button type="button" class="am-add" data-add="'+i+'" aria-label="'+E(T("am.add","Add step"))+'">'+ic(IC.plus,15)+'</button><div class="am-line"></div>'}
function draw(){
 var a=cur,steps=a.steps;
 var h='<div class="ph pgh"><div><a class="backlnk" href="/app/automations/">'+ic(A.IC.back||'<path d="m14.5 6-6 6 6 6"/>',16)+'<span>'+E(T("am.back","All automations"))+'</span></a><h1><input class="am-name" id="amName" value="'+E(a.name)+'" aria-label="'+E(T("am.name","Name"))+'"></h1></div><div class="am-act"><button type="button" class="abtn lg" id="amSave">'+E(T("am.save","Save"))+'</button><button type="button" class="abtn pri lg" id="amTog">'+E(a.enabled?T("am.stop","Stop"):T("am.start","Start"))+'</button></div></div>';
 var flow='<div class="am-flow"><div class="am-c am-t"><div class="am-i">'+ic(IC.bolt)+'</div><div class="am-b"><b>'+E(T("am.trigger","When this event arrives"))+'</b><div class="am-f"><input class="fld" id="amEv" type="text" value="'+E(a.trigger_event)+'" placeholder="user.signup" maxlength="80"></div><p class="am-h">'+E(T("am.evhelp","Send it from your code with POST /api/events."))+'</p></div></div>';
 flow+=addBtn(0);
 steps.forEach(function(s,i){flow+=stepCard(s,i)+addBtn(i+1)});
 flow+='</div>';
 var code='<div class="p2c am-code"><pre>curl https://geserd.com/api/events \\\n  -H "Authorization: Bearer gs_live_..." \\\n  -d \'{"name": "'+E(a.trigger_event||"user.signup")+'",\n       "email": "ada@example.com",\n       "data": {"name": "Ada"}}\'</pre></div>';
 var runs=list(a.runs||[]);
 var rt=runs.length?'<table class="am-runs"><tbody>'+runs.map(function(r){return '<tr><td>'+E(r.email)+'</td><td>'+E(T("am.rs."+r.status,r.status))+(r.error?' · '+E(r.error):'')+'</td><td>'+E(A.ago(r.created_at))+'</td></tr>'}).join("")+'</tbody></table>':'<p class="psub">'+E(T("am.noruns","No runs yet."))+'</p>';
 root.innerHTML=h+flow+'<h2 class="am-h2">'+E(T("am.api","Start it from your code"))+'</h2>'+code+'<h2 class="am-h2">'+E(T("am.recent","Recent runs"))+'</h2>'+rt;
 wire()
}
function collect(){sync();return{name:document.getElementById("amName").value.trim()||T("am.untitled","Untitled automation"),trigger_event:document.getElementById("amEv").value.trim(),steps:cur.steps}}
function save(msg){
 var b=collect();return A.api("/automations/"+id,{method:"PUT",body:b}).then(function(a){cur.name=a.name;cur.trigger_event=a.trigger_event;cur.steps=a.steps;cur.enabled=a.enabled;if(msg)A.toast(T("am.saved","Saved"));return a},function(x){A.toast(A.err(x),"err");throw x})}
function wire(){
 root.querySelectorAll("[data-del]").forEach(function(b){b.onclick=function(){sync();cur.steps.splice(+b.dataset.del,1);draw()}});
 root.querySelectorAll("[data-add]").forEach(function(b){b.onclick=function(){
  sync();var i=+b.dataset.add;
  var bd=document.createElement("div");bd.className="stg";
  bd.innerHTML='<button type="button" class="stc" data-k="send"><b>'+E(T("am.send","Send email"))+'</b><span>'+E(T("am.send.d","Send a saved template to the person."))+'</span></button><button type="button" class="stc" data-k="wait"><b>'+E(T("am.wait","Wait"))+'</b><span>'+E(T("am.wait.d","Pause before the next step."))+'</span></button>';
  bd.querySelectorAll("[data-k]").forEach(function(c){c.onclick=function(){
   var s=c.dataset.k==="wait"?{type:"wait",minutes:60}:{type:"send",template_id:tpls[0]?tpls[0].id:"",from:doms[0]?"hi@"+doms[0].name:""};
   cur.steps.splice(i,0,s);var x=document.querySelector(".gm .mx");if(x)x.click();draw()}});
  A.modal({title:T("am.addtitle","Add a step"),body:bd,actions:[{label:T("app.close","Close")}]})}});
 root.querySelectorAll("[data-tp]").forEach(function(h){var i=+h.dataset.tp;var opts=tpls.map(function(t){return[t.id,t.name]});if(!opts.length)opts=[["",T("am.notpl","Create a template first")]];h.appendChild(A.dropdown(opts,cur.steps[i].template_id||opts[0][0],function(v){cur.steps[i].template_id=v;dirty=true}))});
 document.getElementById("amSave").onclick=function(){sync();save(true)};
 document.getElementById("amTog").onclick=function(){sync();save(false).then(function(){return A.api("/automations/"+id,{method:"PUT",body:{enabled:!cur.enabled}})}).then(function(a){cur.enabled=a.enabled;A.toast(a.enabled?T("am.started","Started"):T("am.stopped","Stopped"));draw()},function(){})};
}
function sync(){root.querySelectorAll("[data-w]").forEach(function(i){cur.steps[+i.dataset.w].minutes=Math.max(1,parseInt(i.value,10)||1)});root.querySelectorAll("[data-fr]").forEach(function(i){cur.steps[+i.dataset.fr].from=i.value.trim()});var n=document.getElementById("amName");if(n)cur.name=n.value;var e=document.getElementById("amEv");if(e)cur.trigger_event=e.value}
function editPage(){
 root.innerHTML=A.loading();
 Promise.all([A.api("/automations/"+id),A.api("/templates").catch(function(){return[]}),A.api("/domains").catch(function(){return[]})]).then(function(r){cur=r[0];tpls=list(r[1]);doms=list(r[2]).filter(function(d){return d.status==="verified"});draw()},function(x){root.innerHTML=A.failed(x,"amRetry");var b=document.getElementById("amRetry");if(b)b.onclick=editPage})
}
if(id)editPage();else listPage();
})();
