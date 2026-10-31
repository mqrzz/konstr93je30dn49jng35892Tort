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
  var body=rows.length?'<div class="gstack">'+rows.map(function(a){return '<a class="gcard amrow" href="/app/automations/edit/?id='+a.id+'"><span class="amic">'+ic(IC.bolt,16)+'</span><span class="ambd"><h3 class="sh3">'+E(a.name)+'</h3><p class="gd">'+E(a.trigger_event?T("am.when","When")+" "+a.trigger_event:T("am.notrig","No event chosen yet"))+" · "+E(A.plural?A.plural(a.steps.length,"am.stepsn","{n} steps"):a.steps.length+" steps")+" · "+E(a.runs+" "+T("am.runs","runs"))+'</p></span><span class="am-st'+(a.enabled?' on':'')+'">'+E(a.enabled?T("am.on","Enabled"):T("am.off","Disabled"))+'</span></a>'}).join("")+'</div>':A.empty(IC.bolt,T("am.none","No automations yet"),T("am.nonep","Pick an event from your product, then choose what to send and when."),'<button type="button" class="abtn pri lg" id="amNew2">'+E(T("am.new","New automation"))+'</button>');
  root.innerHTML=headList()+body;nb();var b2=document.getElementById("amNew2");if(b2)b2.onclick=document.getElementById("amNew").onclick;
 },function(x){root.innerHTML=headList()+A.failed(x,"amRetry");nb();var b=document.getElementById("amRetry");if(b)b.onclick=listPage})
}
function stepCard(s,i){
 var del='<button type="button" class="am-x" data-del="'+i+'" aria-label="'+E(T("am.del","Remove step"))+'">'+ic(IC.trash,15)+'</button>';
 if(s.type==="wait")return '<div class="am-c"><div class="am-i">'+ic(IC.wait)+'</div><div class="am-b"><b>'+E(T("am.wait","Wait"))+'</b><div class="am-f"><input class="fld" type="number" min="1" max="43200" value="'+s.minutes+'" data-w="'+i+'" aria-label="'+E(T("am.minutes","Minutes"))+'"><span>'+E(T("am.min","minutes"))+'</span></div></div>'+del+'</div>';
 return '<div class="am-c"><div class="am-i">'+ic(IC.mail)+'</div><div class="am-b"><b>'+E(T("am.send","Send email"))+'</b><div class="am-f"><label class="am-l">'+E(T("am.tpl","Template"))+'</label><span class="am-dd" data-tp="'+i+'"></span></div><div class="am-f"><label class="am-l">'+E(T("am.from","From"))+'</label><input class="fld" type="text" value="'+E(s.from||"")+'" placeholder="hi@'+E(doms[0]?doms[0].name:"yourdomain.com")+'" data-fr="'+i+'" aria-label="'+E(T("am.from","From"))+'"></div></div>'+del+'</div>'}
function addBtn(i){return '<div class="am-line"></div><button type="button" class="am-add" data-add="'+i+'" aria-label="'+E(T("am.add","Add step"))+'">'+ic(IC.plus,15)+'</button><div class="am-line"></div>'}
var view={x:null,y:32,k:1},tab="canvas";
function draw(){
 document.body.classList.add("ed-studio");
 var a=cur,steps=a.steps,hm='<path d="M4 11 12 4l8 7v8a1 1 0 0 1-1 1h-4v-6H9v6H5a1 1 0 0 1-1-1z"/>';
 var top='<div id="edTop"><div class="edh"><a class="backlnk edhome" href="/app/automations/" aria-label="'+E(T("am.back","All automations"))+'">'+ic(hm,18)+'</a><div class="edcrumb"><a href="/app/automations/">'+E(T("am.h","Automations"))+'</a><i>/</i><input class="am-name" id="amName" value="'+E(a.name)+'" maxlength="80" aria-label="'+E(T("am.name","Name"))+'"><span class="edbadge">'+E(a.enabled?T("am.on","Enabled"):T("am.off","Disabled"))+'</span></div><div class="edact"><button type="button" class="abtn lg" id="amSave">'+E(T("am.save","Save"))+'</button><button type="button" class="abtn pri lg" id="amTog">'+E(a.enabled?T("am.stop","Stop"):T("am.start","Start"))+'</button></div></div></div>';
 var flow='<div class="am-flow"><div class="am-c am-t"><div class="am-i">'+ic(IC.bolt)+'</div><div class="am-b"><b>'+E(T("am.trigger","When this event arrives"))+'</b><div class="am-f"><input class="fld" id="amEv" type="text" value="'+E(a.trigger_event)+'" placeholder="user.signup" maxlength="80"></div><p class="am-h">'+E(T("am.evhelp","Send it from your code with POST /api/events."))+'</p></div></div>';
 flow+=addBtn(0);
 steps.forEach(function(s,i){flow+=stepCard(s,i)+addBtn(i+1)});
 flow+='</div>';
 var Z=function(d){return A.icon(d,18)};
 var tabs='<div class="sgc amtabs" id="amTabs"><button type="button" data-t="canvas" class="'+(tab==="canvas"?"on":"")+'">'+E(T("am.tab.canvas","Canvas"))+'</button><button type="button" data-t="runs" class="'+(tab==="runs"?"on":"")+'">'+E(T("am.tab.runs","Runs & API"))+'</button></div>';
 var zoom='<div class="amzoom" id="amZoom"><button type="button" data-z="in" aria-label="'+E(T("am.zin","Zoom in"))+'">'+Z('<path d="M12 5v14M5 12h14"/>')+'</button><button type="button" data-z="out" aria-label="'+E(T("am.zout","Zoom out"))+'">'+Z('<path d="M5 12h14"/>')+'</button><button type="button" data-z="fit" aria-label="'+E(T("am.fit","Fit to screen"))+'">'+Z('<path d="M4 9V5a1 1 0 0 1 1-1h4M20 9V5a1 1 0 0 0-1-1h-4M4 15v4a1 1 0 0 0 1 1h4M20 15v4a1 1 0 0 1-1 1h-4"/>')+'</button><span id="amPct"></span></div>';
 var code='<div class="am-code"><pre class="src">curl https://geserd.com/api/events \\\n  -H "Authorization: Bearer gs_live_..." \\\n  -d \'{"name": "'+E(a.trigger_event||"user.signup")+'",\n       "email": "ada@example.com",\n       "data": {"name": "Ada"}}\'</pre></div>';
 var runs=list(a.runs||[]);
 var rt=runs.length?'<table class="am-runs"><tbody>'+runs.map(function(r){return '<tr><td>'+E(r.email)+'</td><td>'+E(T("am.rs."+r.status,r.status))+(r.error?' · '+E(r.error):'')+'</td><td>'+E(A.ago(r.created_at))+'</td></tr>'}).join(""):'<p class="psub">'+E(T("am.noruns","No runs yet."))+'</p>';
 if(runs.length)rt+='</tbody></table>';
 var body=tab==="canvas"?'<div class="amcv" id="amCv"><div class="amsg" id="amSt">'+flow+'</div></div>'+zoom:'<div class="amrp"><h2 class="am-h2">'+E(T("am.api","Start it from your code"))+'</h2>'+code+'<h2 class="am-h2">'+E(T("am.recent","Recent runs"))+'</h2>'+rt+'</div>';
 root.innerHTML=top+'<div class="amwrap">'+body+tabs+'</div>';
 wire();if(tab==="canvas")canvas()
}
function canvas(){
 var cv=document.getElementById("amCv"),st=document.getElementById("amSt"),pct=document.getElementById("amPct");if(!cv||!st)return;
 var MIN=.4,MAX=1.6;
 function apply(){st.style.transform="translate("+view.x+"px,"+view.y+"px) scale("+view.k+")";cv.style.backgroundPosition=view.x+"px "+view.y+"px";cv.style.backgroundSize=(24*view.k)+"px "+(24*view.k)+"px";if(pct)pct.textContent=Math.round(view.k*100)+"%"}
 function fit(){var w=st.offsetWidth,h=st.offsetHeight,cw=cv.clientWidth,ch=cv.clientHeight,tp=cw<=860?72:32;view.k=Math.max(MIN,Math.min(1,(cw-32)/w,(ch-tp-24)/h));view.x=(cw-w*view.k)/2;view.y=h*view.k+tp+24<ch?Math.max(tp,(ch-h*view.k)/2):tp;apply()}
 function zoomAt(f,cx,cy){var k=Math.max(MIN,Math.min(MAX,view.k*f));if(k===view.k)return;var r=cv.getBoundingClientRect(),px=cx-r.left,py=cy-r.top;view.x=px-(px-view.x)*(k/view.k);view.y=py-(py-view.y)*(k/view.k);view.k=k;apply()}
 if(view.x===null)fit();else apply();
 var ptr={},drag=null,pinch=0;
 function skip(t){return t.closest("input,textarea,button,a,.dd,.ddm,select")}
 cv.addEventListener("pointerdown",function(e){if(skip(e.target)&&e.pointerType==="mouse")return;ptr[e.pointerId]={x:e.clientX,y:e.clientY};var n=Object.keys(ptr).length;if(n===1){if(skip(e.target))return;drag={x:e.clientX,y:e.clientY,vx:view.x,vy:view.y};cv.classList.add("grab");try{cv.setPointerCapture(e.pointerId)}catch(x){}}else if(n===2){drag=null;var q=Object.keys(ptr).map(function(i){return ptr[i]});pinch=Math.hypot(q[0].x-q[1].x,q[0].y-q[1].y)}});
 cv.addEventListener("pointermove",function(e){if(!ptr[e.pointerId])return;ptr[e.pointerId]={x:e.clientX,y:e.clientY};var ks=Object.keys(ptr);if(ks.length===2&&pinch){var q=ks.map(function(i){return ptr[i]}),d=Math.hypot(q[0].x-q[1].x,q[0].y-q[1].y);zoomAt(d/pinch,(q[0].x+q[1].x)/2,(q[0].y+q[1].y)/2);pinch=d}else if(drag){view.x=drag.vx+e.clientX-drag.x;view.y=drag.vy+e.clientY-drag.y;apply()}});
 function up(e){delete ptr[e.pointerId];if(Object.keys(ptr).length<2)pinch=0;if(!Object.keys(ptr).length){drag=null;cv.classList.remove("grab")}}
 cv.addEventListener("pointerup",up);cv.addEventListener("pointercancel",up);
 cv.addEventListener("wheel",function(e){if(e.target.closest(".ddm"))return;e.preventDefault();if(e.ctrlKey||e.metaKey)zoomAt(Math.exp(-e.deltaY*.0025),e.clientX,e.clientY);else{view.x-=e.deltaX;view.y-=e.deltaY;apply()}},{passive:false});
 var zb=document.getElementById("amZoom");
 zb.onclick=function(e){var b=e.target.closest("button[data-z]");if(!b)return;var r=cv.getBoundingClientRect(),z=b.dataset.z;if(z==="fit")fit();else zoomAt(z==="in"?1.2:1/1.2,r.left+r.width/2,r.top+r.height/2)};
 cv.addEventListener("keydown",function(e){if(e.target.closest("input,textarea,select"))return;var r=cv.getBoundingClientRect();if(e.key==="+"||e.key==="=")zoomAt(1.2,r.left+r.width/2,r.top+r.height/2);else if(e.key==="-")zoomAt(1/1.2,r.left+r.width/2,r.top+r.height/2);else if(e.key==="0")fit()});
 cv.tabIndex=0;
 st.addEventListener("focusin",function(e){var c=e.target.closest(".am-c");st.querySelectorAll(".am-c.sel").forEach(function(x){x.classList.remove("sel")});if(c)c.classList.add("sel")});
 window.addEventListener("resize",function(){if(document.getElementById("amCv")===cv)apply()})
}
function collect(){sync();return{name:document.getElementById("amName").value.trim()||T("am.untitled","Untitled automation"),trigger_event:(cur.trigger_event||"").trim(),steps:cur.steps}}
function save(msg){
 var b=collect();return A.api("/automations/"+id,{method:"PUT",body:b}).then(function(a){cur.name=a.name;cur.trigger_event=a.trigger_event;cur.steps=a.steps;cur.enabled=a.enabled;if(msg)A.toast(T("am.saved","Saved"));return a},function(x){A.toast(A.err(x),"err");throw x})}
function wire(){
 var tb=document.getElementById("amTabs");if(tb)tb.onclick=function(e){var b=e.target.closest("button[data-t]");if(!b||b.dataset.t===tab)return;sync();tab=b.dataset.t;draw()};
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
A.ready(function(){if(id)editPage();else listPage()});
})();
