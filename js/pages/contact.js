(function(){
var O;function t(k,d){return O&&O.t?O.t(k,d):d}
function wait(n){O=window.GESERD;if(O&&O.ready)return O.ready.then(init);if(n>200)return;setTimeout(function(){wait(n+1)},25)}
function init(){
 var f=document.getElementById("cform"),err=document.getElementById("cerr"),btn=document.getElementById("csend");if(!f)return;
 var qs=new URLSearchParams(location.search).get("topic");if(qs){var r=f.querySelector('input[name=topic][value="'+qs+'"]');if(r)r.checked=true}
 function show(k,d){err.textContent=t(k,d);err.hidden=false}
 var files=[],fi=document.getElementById("cfile"),fl=document.getElementById("cflist");
 function drawF(){fl.innerHTML="";files.forEach(function(x,i){var li=document.createElement("li");var n=document.createElement("span");n.textContent=x.name;var s=document.createElement("em");s.textContent=Math.max(1,Math.round(x.size/1024))+" KB";var b=document.createElement("button");b.type="button";b.setAttribute("aria-label",t("ct2.att.rm","Remove"));b.innerHTML="&times;";b.onclick=function(){files.splice(i,1);drawF()};li.appendChild(n);li.appendChild(s);li.appendChild(b);fl.appendChild(li)})}
 fi.addEventListener("change",function(){Array.prototype.forEach.call(fi.files,function(f){if(files.length>=3)return;if(f.size>4*1024*1024){show("ct2.err.file","A file is too large. Up to 4 MB each.");return}var r=new FileReader();r.onload=function(){files.push({name:f.name,type:f.type,size:f.size,data:String(r.result).split(",")[1]||""});drawF()};r.readAsDataURL(f)});fi.value=""});
 f.addEventListener("submit",function(e){
  e.preventDefault();err.hidden=true;
  var v={name:f.name.value.trim(),email:f.email.value.trim(),message:f.message.value.trim(),website:f.website.value,topic:(f.querySelector("input[name=topic]:checked")||{}).value||"general",lang:O.lang||"en",page:location.href.slice(0,300),files:files.map(function(x){return{name:x.name,type:x.type,data:x.data}})};
  if(!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.email)){show("ct2.err.email","Enter a valid email address");f.email.focus();return}
  if(v.message.length<10){show("ct2.err.short","Please write at least a couple of sentences");f.message.focus();return}
  btn.disabled=true;
  fetch((O.api||"/api")+"/contact",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(v)})
   .then(function(r){return r.json().catch(function(){return{}}).then(function(j){if(!r.ok)throw j;return j})})
   .then(function(){f.hidden=true;document.getElementById("cdone").hidden=false;window.scrollTo({top:0,behavior:"smooth"})})
   .catch(function(j){btn.disabled=false;var c=j&&j.error;if(c==="region_blocked"){location.href="/unavailable/";return}if(c==="email_limit")show("ct2.err.limit","You already sent us a message in the last hour. Please wait for our reply.");else if(c==="file_too_large")show("ct2.err.file","A file is too large. Up to 4 MB each.");else if(c==="rate_limited")show("ct2.err.rate","Too many messages, please try again later");else if(c==="invalid_email")show("ct2.err.email","Enter a valid email address");else if(c==="message_too_short")show("ct2.err.short","Please write at least a couple of sentences");else show("ct2.err.net","Could not send the message, please try again")});
 });
}
wait(0);
})();
