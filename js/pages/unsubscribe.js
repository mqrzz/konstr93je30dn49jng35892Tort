(function(){
var O,main=document.getElementById("ug"),tok=new URLSearchParams(location.search).get("t")||"";
function $(i){return document.getElementById(i)}
function set(s){main.setAttribute("data-st",s)}
function call(m,p){return fetch((O.api||"/api")+"/unsubscribe/"+encodeURIComponent(tok)+(p||""),{method:m,cache:"no-store"}).then(function(r){return r.json().catch(function(){return{}}).then(function(j){if(!r.ok)throw j;return j})})}
function boot(){
 if(!tok){set("err");return}
 call("GET").then(function(j){$("usE").textContent=j.email;$("usA").textContent=j.audience;set(j.unsubscribed?"done":"ready")},function(){set("err")});
 $("usGo").addEventListener("click",function(){var b=this;b.disabled=true;call("POST").then(function(){b.disabled=false;set("done")},function(){b.disabled=false;set("err")})});
 $("usBack").addEventListener("click",function(){var b=this;b.disabled=true;call("POST","/resubscribe").then(function(){b.disabled=false;set("back")},function(){b.disabled=false;set("err")})})
}
function w(n){O=window.GESERD;if(O&&O.ready)return O.ready.then(boot);if(n>200)return;setTimeout(function(){w(n+1)},25)}
w(0)
})();
