(function(){
var sw=document.querySelector(".sx-sw");if(!sw)return;
var port=document.getElementById("sx-port"),sec=document.getElementById("sx-sec");
var key={"465":"sx.m1","587":"sx.m2"};
sw.addEventListener("click",function(e){var b=e.target.closest("button[data-m]");if(!b)return;
sw.querySelectorAll("button").forEach(function(x){x.classList.toggle("on",x===b)});
port.textContent=b.dataset.m;var k=key[b.dataset.m],t=b.querySelector("span");sec.setAttribute("data-i18n",k);sec.textContent=t?t.textContent:""});
})();
