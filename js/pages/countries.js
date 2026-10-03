var R={europe:"AL AD AT BY BE BA BG HR CY CZ DK EE FO FI FR DE GI GR GG HU IS IE IM IT JE XK LV LI LT LU MT MD MC ME NL MK NO PL PT RO RU SM RS SK SI ES SE CH UA GB VA AX SJ",
asia:"AF AM AZ BH BD BT BN KH CN GE HK IN ID IR IQ IL JP JO KZ KW KG LA LB MO MY MV MN MM NP KP OM PK PS PH QA SA SG KR LK SY TW TJ TH TL TR TM AE UZ VN YE",
africa:"DZ AO BJ BW BF BI CM CV CF TD KM CG CD CI DJ EG GQ ER SZ ET GA GM GH GN GW KE LS LR LY MG MW ML MR MU YT MA MZ NA NE NG RE RW SH ST SN SC SL SO ZA SS SD TZ TG TN UG EH ZM ZW",
namerica:"AG BS BB BZ CA CR CU DM DO SV GD GT HT HN JM MX NI PA KN LC VC TT US AI AW BM BQ VG KY CW GL GP MQ MS PR BL MF PM SX TC VI",
samerica:"AR BO BR CL CO EC FK GF GY PY PE SR UY VE",
oceania:"AU FJ KI MH FM NR NZ PW PG WS SB TO TV VU AS CK PF GU MP NC NU NF PN TK WF CX CC"};
var NAMES={europe:"Europe",asia:"Asia",africa:"Africa",namerica:"North America",samerica:"South America",oceania:"Oceania"};
function esc(s){return String(s).replace(/[&<>"]/g,function(c){return{"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"}[c]})}
function w(n){if(window.GESERD&&GESERD.ready)return GESERD.ready.then(run);if(n>200)return;setTimeout(function(){w(n+1)},25)}
function run(){
 var O=GESERD,t=O.t,dn;
 try{dn=new Intl.DisplayNames([O.lang||"en"],{type:"region"})}catch(e){dn={of:function(c){return c}}}
 var coll;try{coll=new Intl.Collator(O.lang||"en")}catch(e){coll={compare:function(a,b){return a<b?-1:a>b?1:0}}}
 var groups=Object.keys(R).map(function(k){
  var items=R[k].split(" ").filter(function(c){return O.blocked.indexOf(c)<0}).map(function(c){var n;try{n=dn.of(c)}catch(e){n=c}return{c:c,n:n||c}}).sort(function(a,b){return coll.compare(a.n,b.n)});
  return{k:k,title:t("co.r."+k,NAMES[k]),items:items}
 });
 var total=groups.reduce(function(s,g){return s+g.items.length},0);
 var list=document.getElementById("coList"),q=document.getElementById("coQ"),cnt=document.getElementById("coN"),emp=document.getElementById("coE");
 function draw(){
  var f=q.value.trim().toLowerCase(),shown=0,html="";
  groups.forEach(function(g){
   var it=f?g.items.filter(function(x){return x.n.toLowerCase().indexOf(f)>-1||x.c.toLowerCase()===f}):g.items;
   if(!it.length)return;shown+=it.length;
   html+='<section class="co-g"><div class="co-gh"><h2>'+esc(g.title)+'</h2><span>'+it.length+'</span></div><ul>'+it.map(function(x){return"<li>"+esc(x.n)+"</li>"}).join("")+"</ul></section>"
  });
  list.innerHTML=html;emp.hidden=shown>0;
  cnt.textContent=(t("co.count","{n} countries")).replace("{n}",f?shown+" / "+total:total)
 }
 q.addEventListener("input",draw);draw()
}
w(0);
