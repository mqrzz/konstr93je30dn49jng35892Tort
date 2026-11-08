(function(){
var O,main=document.getElementById("ug"),B={};
function $(i){return document.getElementById(i)}
function set(st,j){
 main.setAttribute("data-st",st);
 var chk=$("ugAgain");if(chk)chk.disabled=false
}
function run(){
 main.setAttribute("data-st","load");
 var again=$("ugAgain");if(again)again.disabled=true;
 O.geoCheck().then(function(j){
  if(!j){set("err");return}
  O.geoData=j;
  set(j.blocked?"blocked":"ok",j)
 })
}
function boot(){
 document.querySelectorAll("[data-ug-again]").forEach(function(b){b.addEventListener("click",run)});
 run()
}
function w(n){O=window.GESERD;if(O&&O.ready&&O.geoCheck)return O.ready.then(boot);if(n>200)return;setTimeout(function(){w(n+1)},25)}
w(0)
})();
