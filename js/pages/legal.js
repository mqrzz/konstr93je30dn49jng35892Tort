(function(){
function wait(n){var O=window.GESERD;if(O&&O.ready)return O.ready.then(function(){init(O)});if(n>200)return;setTimeout(function(){wait(n+1)},25)}
function init(O){
 var lang=O.lang==="ru"?"ru":"en";
 document.querySelectorAll("[data-lang]").forEach(function(b){b.hidden=b.dataset.lang!==lang});
 var note=document.getElementById("lgNote");
 if(note&&O.lang!=="en"&&O.lang!=="ru"){note.textContent=O.t("lg.note","This document is published in English and Russian. If you read it in another language, the English version applies.");note.hidden=false}
 var d=document.getElementById("lgDate");
 if(d){try{d.textContent=new Date(d.getAttribute("datetime")).toLocaleDateString(O.lang||"en",{day:"numeric",month:"long",year:"numeric"})}catch(e){}}
 var ll=document.getElementById("lgLang");if(ll&&document.querySelector("[data-lang]"))ll.textContent=" · "+(lang==="ru"?"Русский":"English");
 var toc=document.getElementById("lgToc");if(!toc)return;
 var hs=document.querySelectorAll('.lg-body [data-lang]:not([hidden]) h2');
 if(!hs.length){toc.hidden=true;return}
 var list=document.createElement("ol");
 hs.forEach(function(h,i){h.id="s"+(i+1);var li=document.createElement("li"),a=document.createElement("a");a.href="#s"+(i+1);a.textContent=h.textContent;li.appendChild(a);list.appendChild(li)});
 toc.innerHTML="";var t=document.createElement("p");t.className="lg-th";t.textContent=O.t("lg.toc","Contents");toc.appendChild(t);toc.appendChild(list);
 if(!("IntersectionObserver"in window))return;
 var links=list.querySelectorAll("a"),cur=null;
 var io=new IntersectionObserver(function(es){es.forEach(function(e){if(e.isIntersecting){cur=e.target.id;links.forEach(function(a){a.classList.toggle("on",a.getAttribute("href")==="#"+cur)})}})},{rootMargin:"-20% 0px -70% 0px"});
 hs.forEach(function(h){io.observe(h)})
}
wait(0);
})();
