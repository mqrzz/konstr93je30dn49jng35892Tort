(function(){
var P=[
{slug:"spf-dkim-dmarc",cat:"sending",date:"2026-09-24"},
{slug:"bounces-and-suppression",cat:"deliverability",date:"2026-09-24"}];
var cat="all",q="",O;
function T(k,d){return O&&O.t?O.t(k,d):d}
function esc(s){return String(s).replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;")}
function wait(n){O=window.GESERD;if(O&&O.ready&&O.langMenu)return O.ready.then(go);if(n>200){O=O||{};return go()}setTimeout(function(){wait(n+1)},25)}
function go(){
 var lg=(O&&O.lang)||"en",fm;
 try{fm=new Intl.DateTimeFormat(lg,{year:"numeric",month:"short",day:"numeric"})}catch(e){fm={format:function(d){return d.toISOString().slice(0,10)}}}
 var cats=["all"].concat(P.map(function(x){return x.cat}).filter(function(c,i,a){return a.indexOf(c)===i}));
 var tabs=document.getElementById("btabs"),list=document.getElementById("blist"),none=document.getElementById("bnone"),inp=document.getElementById("bq");
 if(!tabs||!list)return;
 inp.placeholder=T("bl.search","Search\u2026");
 function card(x,big){
  var title=T("bl."+x.slug+".title",x.slug),d=fm.format(new Date(x.date+"T12:00:00"));
  return '<a class="bcard'+(big?' big':'')+'" href="/blog/'+x.slug+'/"><div class="bcov"><span class="bpill">'+esc(T("bl.cat."+x.cat,x.cat))+'</span><b>'+esc(title)+'</b></div>'+
   '<h3>'+esc(title)+'</h3><div class="bmeta"><img src="/assets/logo-mark.svg" alt=""><span>Geserd</span><i>·</i><time datetime="'+x.date+'">'+d+'</time></div></a>';
 }
 function draw(){
  tabs.innerHTML=cats.map(function(c){return '<button type="button" role="tab" class="'+(c===cat?"on":"")+'" data-c="'+c+'" aria-selected="'+(c===cat)+'">'+(c==="all"?T("bl.all","All"):T("bl.cat."+c,c))+'</button>'}).join("");
  var rows=P.filter(function(x){
   if(cat!=="all"&&x.cat!==cat)return false;
   if(!q)return true;
   return (T("bl."+x.slug+".title","")+" "+T("bl."+x.slug+".lead","")).toLowerCase().indexOf(q)>-1;
  });
  var feat=rows.slice(0,2),rest=rows.slice(2),h='';
  if(feat.length)h+='<div class="bfeat">'+feat.map(function(x){return card(x,true)}).join("")+'</div>';
  if(rest.length)h+='<h2 class="blh">'+T("bl.latest","Latest posts")+'</h2><div class="bgrid">'+rest.map(function(x){return card(x,false)}).join("")+'</div>';
  list.innerHTML=h;none.hidden=rows.length>0;
 }
 tabs.addEventListener("click",function(e){var b=e.target.closest("button");if(!b)return;cat=b.dataset.c;draw()});
 inp.addEventListener("input",function(){q=inp.value.trim().toLowerCase();draw()});
 document.addEventListener("keydown",function(e){if((e.metaKey||e.ctrlKey)&&e.key.toLowerCase()==="k"){e.preventDefault();inp.focus();inp.select()}});
 draw();
}
wait(0);
})();
