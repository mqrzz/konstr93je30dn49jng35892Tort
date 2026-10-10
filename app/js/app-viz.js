(function(){
var A=window.GSApp,t=A.t,e=A.esc;
A.dsn=function(code){
 code=String(code||"");var p=code.split("."),c;
 var keys=[code,p.slice(0,2).join("."),p[0]];
 for(var i=0;i<keys.length;i++){if(!keys[i]||!/^\d/.test(keys[i]))continue;c=t("ap.mx.dsn."+keys[i],"");if(c)return c}
 return t("ap.mx.dsn.unknown","Delivery was refused")
};
function nice(v){if(v<=4)return 4;var p=Math.pow(10,Math.floor(Math.log(v)/Math.LN10)),n=v/p;return(n<=1?1:n<=2?2:n<=5?5:10)*p}
function lab(iso,hourly){var d=new Date(iso);try{return hourly?d.toLocaleTimeString(A.lang(),{hour:"2-digit",minute:"2-digit",timeZone:"UTC"}):d.toLocaleDateString(A.lang(),{day:"numeric",month:"short",timeZone:"UTC"})}catch(x){return iso.slice(0,10)}}
function full(iso,hourly){var d=new Date(iso);try{return hourly?d.toLocaleString(A.lang(),{day:"numeric",month:"short",hour:"2-digit",minute:"2-digit",timeZone:"UTC"})+" UTC":d.toLocaleDateString(A.lang(),{day:"numeric",month:"long",year:"numeric",timeZone:"UTC"})}catch(x){return iso}}
A.bars=function(host,series,o){
 o=o||{};var hourly=!!o.hourly,sel=-1,tip,svg;
 host.classList.add("vch");host.style.setProperty("--chc",o.color||"var(--a-tx)");host.setAttribute("tabindex","0");host.setAttribute("role","img");host.setAttribute("aria-label",o.label||"");
 function draw(){
  var W=Math.max(260,host.clientWidth||600),H=W<520?190:240,L=W<520?34:44,B=26,T=10,pw=W-L-4,ph=H-B-T,n=series.length;
  var max=0;series.forEach(function(s){if(s.v>max)max=s.v});var top=nice(max||4),f=o.fmt||A.num;
  var g="";
  for(var i=0;i<=2;i++){var y=T+ph-ph*i/2;g+='<line x1="'+L+'" x2="'+(W-2)+'" y1="'+y+'" y2="'+y+'" class="vch-g"/><text x="'+(L-8)+'" y="'+(y+4)+'" class="vch-t" text-anchor="end">'+e(f(Math.round(top*i/2)))+"</text>"}
  var step=pw/n,bw=Math.max(2,Math.min(38,step*.64)),bars="",xl="",every=Math.ceil(n/(W<520?4:7));
  series.forEach(function(s,i){
   var h=s.v>0?Math.max(3,s.v/top*ph):0,x=L+step*i+(step-bw)/2,y=T+ph-h,r=Math.min(5,bw/2);
   bars+=h?'<path class="vch-bar" data-i="'+i+'" d="M'+x+" "+(y+h)+"V"+(y+r)+"a"+r+" "+r+" 0 0 1 "+r+" -"+r+"h"+(bw-2*r)+"a"+r+" "+r+" 0 0 1 "+r+" "+r+"V"+(y+h)+'z"/>':'<rect class="vch-z" data-i="'+i+'" x="'+x+'" y="'+(T+ph-2)+'" width="'+bw+'" height="2" rx="1"/>';
   if(i%every===0||i===n-1&&n-1-Math.floor((n-1)/every)*every>every/2)xl+='<text x="'+(x+bw/2)+'" y="'+(H-6)+'" class="vch-t" text-anchor="middle">'+e(lab(s.t,hourly))+"</text>"
  });
  svg='<svg viewBox="0 0 '+W+" "+H+'" width="'+W+'" height="'+H+'" aria-hidden="true" focusable="false">'+g+bars+xl+"</svg>";
  host.innerHTML=svg+'<div class="vch-tip" hidden></div>';tip=host.querySelector(".vch-tip");
  if(sel>=0)show(sel)
 }
 function show(i){
  if(i<0||i>=series.length)return;sel=i;
  host.querySelectorAll(".vch-bar,.vch-z").forEach(function(b){b.classList.toggle("on",+b.dataset.i===i)});
  var W=host.clientWidth,L=W<520?34:44,step=(W-L-4)/series.length,cx=L+step*i+step/2,s=series[i];
  var lines=(o.tip?o.tip(s,i):[[o.name||"",(o.fmt||A.num)(s.v)]]).map(function(r){return'<div><span>'+e(r[0])+"</span><b>"+e(r[1])+"</b></div>"}).join("");
  tip.innerHTML="<em>"+e(full(s.t,hourly))+"</em>"+lines;tip.hidden=false;
  var tw=tip.offsetWidth,x=Math.min(Math.max(4,cx-tw/2),W-tw-4);tip.style.left=x+"px"
 }
 function hide(){sel=-1;if(!tip)return;tip.hidden=true;host.querySelectorAll(".on").forEach(function(b){b.classList.remove("on")})}
 function at(ev){var r=host.getBoundingClientRect(),W=host.clientWidth,L=W<520?34:44,step=(W-L-4)/series.length,i=Math.floor((ev.clientX-r.left-L)/step);return i>=0&&i<series.length?i:-1}
 host.addEventListener("pointermove",function(ev){var i=at(ev);if(i<0)hide();else if(i!==sel)show(i)});
 host.addEventListener("pointerleave",hide);
 host.addEventListener("pointerdown",function(ev){var i=at(ev);if(i>=0)show(i)});
 host.addEventListener("keydown",function(ev){
  if(ev.key==="ArrowRight"||ev.key==="ArrowLeft"){ev.preventDefault();var n=sel<0?(ev.key==="ArrowRight"?0:series.length-1):sel+(ev.key==="ArrowRight"?1:-1);show(Math.max(0,Math.min(series.length-1,n)))}
  else if(ev.key==="Escape")hide()
 });
 host.addEventListener("blur",hide);
 var last=0;if(window.ResizeObserver){var ro=new ResizeObserver(function(){var w=host.clientWidth;if(w&&Math.abs(w-last)>1){last=w;draw()}});ro.observe(host)}
 draw();last=host.clientWidth;
 return{redraw:draw}
};
})();
