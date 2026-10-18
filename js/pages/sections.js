(function(){var O,lg="en",RUB=["RU","BY","KZ","KG","TJ","TM","UZ","AM","AZ","MD"];
function t(k,d){return O&&O.t?O.t(k,d):d}
function f(n){return Number(n).toLocaleString(lg)}
function $(i){return document.getElementById(i)}
function inView(el,fn){if(!("IntersectionObserver" in window)){fn();return}var o=new IntersectionObserver(function(e){if(e[0].isIntersecting){o.disconnect();fn()}},{threshold:.35});o.observe(el)}
var P={free:{m:100,d:5,i:25,dom:1,log:1,pr:{rub:0,usd:0}},pro:{m:10000,d:500,i:5000,dom:3,log:7,pr:{rub:790,usd:9}},business:{m:50000,d:2500,i:25000,dom:10,log:30,pr:{rub:2490,usd:29}}};
function cur(){return RUB.indexOf(String(O.country||"").toUpperCase())>-1?"rub":"usd"}
function money(v){var c=cur();return v===0?t("xs.calc.free0","Free"):(c==="rub"?f(v)+" ₽":"$"+(Math.round(v*10)/10).toLocaleString(lg))}
function calc(){
 var r=$("xcR");if(!r)return;
 var N=$("xcN"),T=$("xcT").children,shown=0,tm=null;
 function vol(v){v=+v;if(v>=100)return 200000;return Math.round(Math.pow(10,2+v/100*3.3)/10)*10}
 function plan(n){return n<=100?"free":n<=10000?"pro":n<=50000?"business":"enterprise"}
 function count(to){clearInterval(tm);var from=shown,s=Date.now();tm=setInterval(function(){var p=Math.min(1,(Date.now()-s)/450),e=1-Math.pow(1-p,3);shown=Math.round(from+(to-from)*e);N.textContent=f(shown);if(p>=1)clearInterval(tm)},16)}
 function upd(){
  var n=vol(r.value),pl=plan(n);count(n);
  var order=["free","pro","business","enterprise"],ix=order.indexOf(pl);
  for(var i=0;i<T.length;i++){T[i].classList.toggle("on",i<=ix);T[i].classList.toggle("cur",i===ix)}
  var ent=pl==="enterprise",d=$("xcD"),ph=$("xcP"),pm=$("xcM");
  ph.textContent=ent?"Enterprise":pl.charAt(0).toUpperCase()+pl.slice(1);
  $("xcE").hidden=!ent;
  var b=$("xcB");b.href=ent?"/contact/":"/signup/";b.setAttribute("data-i18n",ent?"xs.calc.talk":"xs.calc.start");b.textContent=ent?t("xs.calc.talk","Contact sales"):t("xs.calc.start","Get started");
  if(ent){pm.textContent=t("xs.calc.custom","Custom volume");d.innerHTML="";return}
  var x=P[pl];pm.textContent=money(x.pr[cur()])+(x.pr[cur()]?" "+t("xs.mo","/ mo"):"");
  d.innerHTML=[["xs.calc.day","Per day",f(x.d)],["xs.calc.dom","Domains",f(x.dom)],["xs.calc.in","Inbound per month",f(x.i)],["xs.calc.log","Log history",t("xs.calc.days","{n} days").replace("{n}",x.log)]].map(function(a){return"<div><dt>"+t(a[0],a[1])+"</dt><dd>"+a[2]+"</dd></div>"}).join("")}
 r.addEventListener("input",upd);upd()}
function dns(){
 var b=$("xdB");if(!b)return;
 var rows=[].slice.call(document.querySelectorAll("#xdR .xs-row")),S=$("xdS"),M=$("xdM"),run=false,done=false,timers=[],auto=false;
 function state(r,s){r.classList.remove("look","ok");if(s)r.classList.add(s);var e=r.querySelector("em");e.setAttribute("data-i18n",s==="ok"?"xs.dns.ok":s==="look"?"xs.dns.look":"xs.dns.wait");e.textContent=t(s==="ok"?"xs.dns.ok":s==="look"?"xs.dns.look":"xs.dns.wait","")}
 function reset(){timers.forEach(clearTimeout);timers=[];rows.forEach(function(r){state(r,"")});S.classList.remove("ok");S.setAttribute("data-i18n","xs.dns.pend");S.textContent=t("xs.dns.pend","Pending");M.textContent="";b.disabled=false;b.setAttribute("data-i18n","xs.dns.run");b.textContent=t("xs.dns.run","Verify records");run=false;done=false}
 function go(){if(run)return;if(done){reset();return}run=true;b.disabled=true;
  rows.forEach(function(r,i){timers.push(setTimeout(function(){state(r,"look")},i*900));timers.push(setTimeout(function(){state(r,"ok")},i*900+700))});
  timers.push(setTimeout(function(){S.classList.add("ok");S.setAttribute("data-i18n","xs.dns.ok");S.textContent=t("xs.dns.ok","Verified");M.textContent=t("xs.dns.done","Verified.");run=false;done=true;b.disabled=false;b.setAttribute("data-i18n","xs.dns.again");b.textContent=t("xs.dns.again","Start over")},rows.length*900+500))}
 b.addEventListener("click",go);
 inView($("xdR"),function(){if(!auto){auto=true;go()}})}
function ev(){
 var F=$("xeF");if(!F)return;
 var TYPES=[["email.sent","xs.ev.sent"],["email.delivered","xs.ev.delivered"],["email.delivery_delayed","xs.ev.delayed"],["email.delivered","xs.ev.delivered"],["email.bounced","xs.ev.bounced"],["email.complained","xs.ev.complained"],["email.received","xs.ev.received"],["email.delivered","xs.ev.delivered"]],i=0,items=[],sel=null,paused=false,tm=null,started=false;
 function hex(n){var s="";for(var j=0;j<n;j++)s+="0123456789abcdef"[Math.floor(Math.random()*16)];return s}
 function now(){var d=new Date();return[d.getHours(),d.getMinutes(),d.getSeconds()].map(function(x){return x<10?"0"+x:x}).join(":")}
 function show(it){
  sel=it;[].forEach.call(F.children,function(li){li.classList.toggle("on",li.dataset.id===it.id)});
  var o={id:it.id,type:it.type,created_at:new Date().toISOString().slice(0,19)+"Z",data:{email_id:it.mail,from:"orders@mail.acme.com",to:["client@example.com"],subject:"Your order"}};
  if(it.type==="email.bounced")o.data.reason="mailbox_not_found";
  if(it.type==="email.received"){o.data.from="client@example.com";o.data.to=["support@acme.com"]}
  $("xeP").textContent=JSON.stringify(o,null,2);
  $("xeS").textContent="Geserd-Signature: v1="+it.sig}
 function add(){
  var T0=TYPES[i%TYPES.length];i++;
  var it={id:"evt_"+hex(8),mail:hex(8)+"-"+hex(4),type:T0[0],tk:T0[1],sig:hex(64),at:now()};
  items.unshift(it);if(items.length>6)items.pop();
  var li=document.createElement("li");li.dataset.id=it.id;li.innerHTML="<b>"+it.type+"</b><time>"+it.at+"</time><span>"+t(it.tk,"")+"</span>";
  li.addEventListener("click",function(){paused=true;L.classList.add("off");L.lastChild.setAttribute("data-i18n","xs.ev.pause");L.lastChild.textContent=t("xs.ev.pause","Paused");show(it)});
  F.insertBefore(li,F.firstChild);while(F.children.length>6)F.removeChild(F.lastChild);
  if(!paused)show(it)}
 var L=$("xeL");
 function start(){if(started)return;started=true;add();tm=setInterval(function(){if(!paused&&!document.hidden)add()},1800)}
 inView(F,start)}
function sib(){
 var C=$("xsC");if(!C)return;
 var plan="free",MULT=3,DISC=.5;
 function bar(cls,label,v,max){return'<div class="xs-bar '+cls+'"><small>'+label+'</small><i data-w="'+Math.max(2,Math.round(v/max*100))+'"></i></div>'}
 function row(label,u,s,max,txtU,txtS){return'<div class="xs-m"><span>'+label+'</span><div class="xs-bars">'+bar("",t("xs.sb.usual","Usual"),u,max)+bar("sib",t("xs.sb.sib","Siberia"),s,max)+'</div><b>'+txtU+(txtU!==txtS?" → "+txtS:"")+'</b></div>'}
 function render(){
  var x=P[plan],c=cur(),h="";
  if(plan==="free"){
   [["xs.sb.mo","Emails per month","m"],["xs.sb.day","Emails per day","d"],["xs.sb.in","Inbound per month","i"]].forEach(function(a){var u=x[a[2]],s=u*MULT;h+=row(t(a[0],a[1]),u,s,s,f(u),f(s))});
   $("xsN").textContent=t("xs.sb.free","")
  }else{
   var u=x.pr[c],s=u*(1-DISC);
   h+=row(t("xs.sb.price","Price per month"),u,s,u,money(u),money(s));
   [["xs.sb.mo","Emails per month","m"],["xs.sb.day","Emails per day","d"]].forEach(function(a){h+=row(t(a[0],a[1]),x[a[2]],x[a[2]],x[a[2]],f(x[a[2]]),f(x[a[2]]))});
   $("xsN").textContent=t("xs.sb.paid","")
  }
  C.innerHTML=h;
  requestAnimationFrame(function(){requestAnimationFrame(function(){[].forEach.call(C.querySelectorAll("i[data-w]"),function(e){e.style.width=e.dataset.w+"%"})})})}
 $("xsT").addEventListener("click",function(e){var b=e.target.closest("button[data-p]");if(!b)return;plan=b.dataset.p;[].forEach.call($("xsT").children,function(x){x.classList.toggle("on",x===b)});render()});
 inView(C,render);render()}
function init(){lg=O.lang||"en";calc();dns();ev();sib()}
function go(n){O=window.GESERD;if(!(O&&O.ready)){if(n<200)return setTimeout(function(){go(n+1)},25);O={}}(O.ready||Promise.resolve()).then(init)}
go(0)})();
