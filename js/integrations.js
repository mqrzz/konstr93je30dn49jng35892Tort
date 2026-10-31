(function(){
function ready(f){if(document.readyState!=="loading")f();else document.addEventListener("DOMContentLoaded",f)}
ready(function(){
document.addEventListener("click",function(e){
var t=e.target.closest("[data-tabs] [data-t]");
if(t){var box=t.closest("[data-tabs]"),i=t.dataset.t;box.querySelectorAll("[data-t]").forEach(function(b){b.classList.toggle("on",b===t)});box.querySelectorAll("[data-p]").forEach(function(p){p.classList.toggle("on",p.dataset.p===i)});return}
var c=e.target.closest("[data-copy]");
if(c){var src=c.parentNode.querySelector("pre,code");if(src)cp(c,src.textContent);return}
var ch=e.target.closest("[data-copy-text]");
if(ch)cp(ch,ch.textContent)});
function cp(b,txt){var done=function(){b.classList.add("ok");setTimeout(function(){b.classList.remove("ok")},1300)};
if(navigator.clipboard&&navigator.clipboard.writeText)navigator.clipboard.writeText(txt).then(done,function(){});else{var a=document.createElement("textarea");a.value=txt;document.body.appendChild(a);a.select();try{document.execCommand("copy");done()}catch(x){}a.remove()}}
var els=document.querySelectorAll("[data-play]");
if("IntersectionObserver"in window){var io=new IntersectionObserver(function(en){en.forEach(function(x){if(x.isIntersecting){x.target.classList.add("ix-play");io.unobserve(x.target)}})},{threshold:.35});els.forEach(function(x){io.observe(x)})}else els.forEach(function(x){x.classList.add("ix-play")});
document.querySelectorAll("video[data-src]").forEach(function(v){
var box=v.parentNode,src=v.dataset.src;
fetch(src,{method:"HEAD"}).then(function(r){if(!r.ok||!/video/.test(r.headers.get("content-type")||""))return;v.src=src;v.addEventListener("canplay",function(){box.classList.add("ok");var o=new IntersectionObserver(function(en){en.forEach(function(x){if(x.isIntersecting)v.play().catch(function(){});else v.pause()})},{threshold:.3});o.observe(v)},{once:true})}).catch(function(){})})
})})();
