/* js/pages/blog.js — blog index: category tabs, live search (also opens with Ctrl/Cmd+K), list of posts. */
(function(){
var T=function(k,d){return window.GESERD&&GESERD.t?GESERD.t(k,d):d};
var P=[
{slug:"spf-dkim-dmarc",cat:"sending",date:"2026-09-24"},
{slug:"bounces-and-suppression",cat:"deliverability",date:"2026-09-24"}];
var cat="all",q="";
function go(){
 var lg=(window.GESERD&&GESERD.lang)||"en",fm;
 try{fm=new Intl.DateTimeFormat(lg,{year:"numeric",month:"short",day:"numeric"})}catch(e){fm={format:function(d){return d.toISOString().slice(0,10)}}}
 var cats=["all"].concat(P.map(function(x){return x.cat}).filter(function(c,i,a){return a.indexOf(c)===i}));
 var tabs=document.getElementById("btabs"),list=document.getElementById("blist"),none=document.getElementById("bnone"),inp=document.getElementById("bq");
 if(!tabs||!list)return;
 inp.placeholder=T("bl.search","Search\u2026");
 function draw(){
  tabs.innerHTML=cats.map(function(c){return '<button type="button" role="tab" class="'+(c===cat?"on":"")+'" data-c="'+c+'" aria-selected="'+(c===cat)+'">'+(c==="all"?T("bl.all","All"):T("bl.cat."+c,c))+'</button>'}).join("");
  var rows=P.filter(function(x){
   if(cat!=="all"&&x.cat!==cat)return false;
   if(!q)return true;
   return (T("bl."+x.slug+".title","")+" "+T("bl."+x.slug+".lead","")).toLowerCase().indexOf(q)>-1;
  });
  list.innerHTML=rows.map(function(x){return '<a class="brow" href="/blog/'+x.slug+'/"><div><h3>'+T("bl."+x.slug+".title",x.slug)+'</h3><p>'+T("bl."+x.slug+".lead","")+'</p></div><div class="bm"><span>'+T("bl.cat."+x.cat,x.cat)+'</span><time datetime="'+x.date+'">'+fm.format(new Date(x.date+"T12:00:00"))+'</time></div></a>'}).join("");
  none.hidden=rows.length>0;
 }
 tabs.addEventListener("click",function(e){var b=e.target.closest("button");if(!b)return;cat=b.dataset.c;draw()});
 inp.addEventListener("input",function(){q=inp.value.trim().toLowerCase();draw()});
 document.addEventListener("keydown",function(e){if((e.metaKey||e.ctrlKey)&&e.key.toLowerCase()==="k"){e.preventDefault();inp.focus();inp.select()}});
 draw();
}
(window.GESERD&&GESERD.ready?GESERD.ready:Promise.resolve()).then(function(){document.readyState==="loading"?document.addEventListener("DOMContentLoaded",go):go()});
})();
