(function(){
var O,P="unisender",M="smtp";
function t(k,d){var s=O&&O.t?O.t(k,d):d;return s}
function wait(n){O=window.GESERD;if(O&&O.ready)return O.ready.then(init);if(n>200)return;setTimeout(function(){wait(n+1)},25)}
function nm(){return P==="smtp"?t("mg.p.smtp.n","Your SMTP service"):P==="api"?t("mg.p.api.n","Your API service"):t("mg.p."+P,P)}
function paint(){
 var n=nm(),old,nw;
 document.getElementById("mgName").textContent=n;
 if(M==="smtp"){
  old="# "+n+"\nhost:     smtp.your-provider.example\nport:     587\nusername: your-login\npassword: your-password";
  nw="# Geserd\nhost:     smtp.geserd.com\nport:     465 (SSL) / 587 (STARTTLS)\nusername: "+t("mg.any","any, for example geserd")+"\npassword: gs_xxxxxxxx  # "+t("mg.apikey","your API key");
 }else{
  old="# "+n+"\nPOST https://api.your-provider.example/send\nAuthorization: "+t("mg.oldkey","your current key")+"\n\n{ "+t("mg.oldfields","field names of your provider")+" }";
  nw="curl -X POST https://geserd.com/api/emails \\\n  -H \"Authorization: Bearer gs_xxxxxxxx\" \\\n  -H \"Content-Type: application/json\" \\\n  -d '{\"from\":\"hi@yourdomain.com\",\n       \"to\":\"user@example.com\",\n       \"subject\":\"Hello\",\n       \"html\":\"<strong>it works!</strong>\"}'";
 }
 document.getElementById("mgOld").textContent=old;
 document.getElementById("mgNew").textContent=nw;
 document.getElementById("mgNote").textContent=t(M==="smtp"?"mg.note.smtp":"mg.note.api","");
 document.querySelectorAll(".mg-tbl .mg-tr").forEach(function(r,i){r.hidden=(i<4)!==(M==="smtp")});
 document.querySelectorAll("#mgPv .mg-pv").forEach(function(b){var on=b.dataset.p===P;b.classList.toggle("on",on);b.setAttribute("aria-checked",on?"true":"false")});
 document.querySelectorAll("#mgTabs button").forEach(function(b){b.classList.toggle("on",b.dataset.m===M)});
}
function init(){
 var pv=document.getElementById("mgPv");if(!pv)return;
 pv.addEventListener("click",function(e){var b=e.target.closest(".mg-pv");if(!b)return;P=b.dataset.p;if(P==="smtp")M="smtp";if(P==="api")M="api";paint()});
 document.getElementById("mgTabs").addEventListener("click",function(e){var b=e.target.closest("button");if(!b)return;M=b.dataset.m;paint()});
 var cp=document.getElementById("mgCp");
 cp.addEventListener("click",function(){var s=document.getElementById("mgNew").textContent;try{navigator.clipboard.writeText(s).then(function(){cp.textContent=t("home.copied","Copied");setTimeout(function(){cp.textContent=t("home.copy","Copy")},1400)})}catch(x){}});
 paint();
 var l=O.lang;setInterval(function(){if(O.lang!==l){l=O.lang;paint()}},400);
}
wait(0);
})();
