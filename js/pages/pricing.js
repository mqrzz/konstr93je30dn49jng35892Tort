(function(){var O,t=function(k,d){return O&&O.t?O.t(k,d):d};
var RUB_CC=["RU","BY","KZ","KG","TJ","TM","UZ","AM","AZ","MD"];
var lg="en";
function fmt(n){return n.toLocaleString(lg)}
function go(n){O=window.GESERD;if(!(O&&O.ready)){if(n<200)return setTimeout(function(){go(n+1)},25);O={}}
 (O.ready||Promise.resolve()).then(init)}
function init(){
  lg=O.lang||"en";
  var rub=RUB_CC.indexOf((O.country||"").toUpperCase())>-1,cur=rub?"rub":"usd";
  document.querySelectorAll(".pv").forEach(function(e){e.textContent=e.getAttribute("data-"+cur)});
  document.querySelectorAll("[data-tpl]").forEach(function(e){e.textContent=t(e.getAttribute("data-tpl"),"").replace("{p}",e.getAttribute("data-"+cur))});
  document.querySelectorAll(".ct td.num").forEach(function(e){var n=parseInt(e.textContent.replace(/[^\d]/g,""),10);if(!isNaN(n))e.textContent=n.toLocaleString(lg)});
  var pro=document.querySelector('.plan[data-plan="pro"]');
  if(pro){pro.classList.add("hot");var h=pro.querySelector("h3");if(h&&!h.querySelector(".rec")){var r=document.createElement("span");r.className="rec";r.textContent=t("pr.rec","Recommended");h.appendChild(r)}}
}
go(0);})();
