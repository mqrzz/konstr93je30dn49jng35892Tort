/* js/pages/contact.js — contact form -> POST /api/contact. Waits for GESERD (this file runs before boot.js adds the site scripts). */
(function(){
var O;function t(k,d){return O&&O.t?O.t(k,d):d}
function wait(n){O=window.GESERD;if(O&&O.ready)return O.ready.then(init);if(n>200)return;setTimeout(function(){wait(n+1)},25)}
function init(){
 var f=document.getElementById("cform"),err=document.getElementById("cerr"),btn=document.getElementById("csend");if(!f)return;
 var qs=new URLSearchParams(location.search).get("topic");if(qs){var r=f.querySelector('input[name=topic][value="'+qs+'"]');if(r)r.checked=true}
 function show(k,d){err.textContent=t(k,d);err.hidden=false}
 f.addEventListener("submit",function(e){
  e.preventDefault();err.hidden=true;
  var v={name:f.name.value.trim(),email:f.email.value.trim(),message:f.message.value.trim(),website:f.website.value,topic:(f.querySelector("input[name=topic]:checked")||{}).value||"general"};
  if(!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.email)){show("ct2.err.email","Enter a valid email address");f.email.focus();return}
  if(v.message.length<10){show("ct2.err.short","Please write at least a couple of sentences");f.message.focus();return}
  btn.disabled=true;
  fetch((O.api||"/api")+"/contact",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(v)})
   .then(function(r){return r.json().catch(function(){return{}}).then(function(j){if(!r.ok)throw j;return j})})
   .then(function(){f.hidden=true;document.getElementById("cdone").hidden=false;window.scrollTo({top:0,behavior:"smooth"})})
   .catch(function(j){btn.disabled=false;var c=j&&j.error;if(c==="rate_limited")show("ct2.err.rate","Too many messages, please try again later");else if(c==="invalid_email")show("ct2.err.email","Enter a valid email address");else if(c==="message_too_short")show("ct2.err.short","Please write at least a couple of sentences");else show("ct2.err.net","Could not send the message, please try again")});
 });
}
wait(0);
})();
