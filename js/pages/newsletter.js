(function(){
var main=document.getElementById("ug"),q=new URLSearchParams(location.search),a=q.get("a"),tk=q.get("t")||"";
function st(s){main.setAttribute("data-st",s)}
function post(p){return fetch("/api/newsletter/"+p,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({token:tk})}).then(function(r){if(!r.ok)throw 0;return r.json()})}
function boot(){
 if(!/^[0-9a-f]{48}$/.test(tk)){st("err");return}
 if(a==="confirm"){post("confirm").then(function(){st("subscribed")}).catch(function(){st("err")});return}
 st("ask");document.getElementById("nlGo").addEventListener("click",function(){post("unsubscribe").then(function(){st("done")}).catch(function(){st("err")})})
}
function w(n){var O=window.GESERD;if(O&&O.ready)return O.ready.then(boot);if(n>200)return;setTimeout(function(){w(n+1)},25)}
w(0)})();
