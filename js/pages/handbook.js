(function(){
function init(){
 var arts=[].slice.call(document.querySelectorAll(".hbk-a")),links=[].slice.call(document.querySelectorAll("#hbNav a")),ids=arts.map(function(a){return a.dataset.s}),q=document.getElementById("hbQ"),nx=document.getElementById("hbNx"),nt=document.getElementById("hbNxT");
 function show(id){
  if(ids.indexOf(id)<0)id=ids[0];
  arts.forEach(function(a){a.classList.toggle("on",a.dataset.s===id)});
  links.forEach(function(a){a.classList.toggle("on",a.dataset.s===id)});
  var i=ids.indexOf(id),n=ids[(i+1)%ids.length];nx.setAttribute("href","#"+n);nt.textContent=document.querySelector('#hbNav a[data-s="'+n+'"]').textContent;
  var m=document.getElementById("hbMain");if(window.innerWidth<=900&&m.getBoundingClientRect().top<0)m.scrollIntoView({behavior:"smooth",block:"start"})
 }
 window.addEventListener("hashchange",function(){show(location.hash.slice(1))});
 links.forEach(function(a){a.addEventListener("click",function(e){e.preventDefault();history.replaceState(null,"","#"+a.dataset.s);show(a.dataset.s)})});
 nx.addEventListener("click",function(e){e.preventDefault();var id=nx.getAttribute("href").slice(1);history.replaceState(null,"","#"+id);show(id)});
 q.addEventListener("input",function(){var v=q.value.trim().toLowerCase(),any=false;
  document.querySelectorAll(".hbk-g").forEach(function(g){var vis=0;g.querySelectorAll("a").forEach(function(a){var art=document.getElementById("a-"+a.dataset.s),ok=!v||(a.textContent+" "+art.textContent).toLowerCase().indexOf(v)>-1;a.hidden=!ok;if(ok)vis++});g.hidden=!vis;if(vis)any=true});
  document.getElementById("hbNone").hidden=any})
 show(location.hash.slice(1))
}
function go(){document.readyState==="loading"?document.addEventListener("DOMContentLoaded",init):init()}
(function wait(n){if(window.GESERD&&GESERD.ready)return GESERD.ready.then(go,go);if(n>400)return go();setTimeout(function(){wait(n+1)},25)})(0)
})();
