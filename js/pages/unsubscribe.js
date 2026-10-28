(function(){
var O,main=document.getElementById("ug"),tok=new URLSearchParams(location.search).get("t")||"";
function $(i){return document.getElementById(i)}
function set(s){main.setAttribute("data-st",s)}
function call(m,p,b){return fetch((O.api||"/api")+"/unsubscribe/"+encodeURIComponent(tok)+(p||""),{method:m,cache:"no-store",headers:b?{"Content-Type":"application/json"}:undefined,body:b?JSON.stringify(b):undefined}).then(function(r){return r.json().catch(function(){return{}}).then(function(j){if(!r.ok)throw j;return j})})}
function theme(s){
 if(!s)return;var b=document.body;b.classList.add("ug-themed");b.style.setProperty("--u-bg",s.bg);b.style.setProperty("--u-tx",s.tx);b.style.setProperty("--u-ac",s.accent);
 var pw=$("usPw");if(pw&&s.hide)pw.hidden=true}
function esc(x){return String(x).replace(/[&<>"]/g,function(c){return{"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"}[c]})}
function topics(l){
 var box=$("usT"),h=$("usTl");if(!l.length){box.hidden=true;return}
 box.hidden=false;
 h.innerHTML=l.map(function(x){return'<div class="ug-tr"><div><b>'+esc(x.name)+"</b>"+(x.description?"<span>"+esc(x.description)+"</span>":"")+'</div><button type="button" class="ug-sw" role="switch" data-t="'+esc(x.id)+'" aria-label="'+esc(x.name)+'" aria-checked="'+(x.subscribed?"true":"false")+'"><i></i></button></div>'}).join("");
 h.querySelectorAll(".ug-sw").forEach(function(b){b.addEventListener("click",function(){var on=b.getAttribute("aria-checked")!=="true";b.disabled=true;call("POST","/topics",{topic_id:b.dataset.t,subscribed:on}).then(function(){b.setAttribute("aria-checked",on?"true":"false");b.disabled=false},function(){b.disabled=false})})})
}
function boot(){
 if(!tok){set("err");return}
 call("GET").then(function(j){theme(j.style);$("usE").textContent=j.email;$("usA").textContent=j.audience;topics(j.topics||[]);set(j.unsubscribed?"done":"ready")},function(){set("err")});
 $("usGo").addEventListener("click",function(){var b=this;b.disabled=true;call("POST").then(function(){b.disabled=false;set("done")},function(){b.disabled=false;set("err")})});
 $("usBack").addEventListener("click",function(){var b=this;b.disabled=true;call("POST","/resubscribe").then(function(){b.disabled=false;set("back")},function(){b.disabled=false;set("err")})})
}
function w(n){O=window.GESERD;if(O&&O.ready)return O.ready.then(boot);if(n>200)return;setTimeout(function(){w(n+1)},25)}
w(0)
})();
