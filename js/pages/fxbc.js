(function(){
function cnt(el){var v=+el.dataset.n,s=el.dataset.s||"",t0=performance.now();function f(n){var k=Math.min(1,(n-t0)/1600);k=1-Math.pow(1-k,3);el.textContent=Math.round(v*k).toLocaleString(document.documentElement.lang||"en")+s;if(k<1)requestAnimationFrame(f)}requestAnimationFrame(f)}
function go(root){
 root.classList.add("in");
 root.querySelectorAll("[data-n]").forEach(cnt);
 root.querySelectorAll("[data-w]").forEach(function(x){requestAnimationFrame(function(){requestAnimationFrame(function(){var m=matchMedia("(max-width:860px)").matches&&x.parentNode.classList.contains("bcx-ln");x.style[m?"height":"width"]=x.dataset.w+"%"})})})
}
var els=document.querySelectorAll("[data-bcx]");
if(!("IntersectionObserver" in window)){els.forEach(go);return}
var io=new IntersectionObserver(function(a){a.forEach(function(e){if(e.isIntersecting){io.unobserve(e.target);go(e.target)}})},{threshold:.35});
els.forEach(function(e){io.observe(e)});
var rows=document.querySelectorAll(".bcx-aud div"),i=0;
if(rows.length)setInterval(function(){rows[i].classList.remove("on");i=(i+1)%rows.length;rows[i].classList.add("on")},2600)
})();
