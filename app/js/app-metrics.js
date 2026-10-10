(function(){
var A=window.GSApp,t=A.t,e=A.esc,root,days=15,domain="all",metric="sent",D=null,busy=false;
var DEF=[["sent","au.e.st.sent","Sent","var(--a-tx)"],["delivered","au.e.st.delivered","Delivered","var(--a-ok)"],["bounced","au.e.st.bounced","Bounced","var(--a-bad)"],["complained","au.e.st.complained","Complained","var(--a-wait)"],["received","au.e.st.received","Received","var(--a-tx2)"]];
var RL={1:["ap.mx.r1","Last 24 hours"],7:["ap.mx.r7","Last 7 days"],15:["ap.d15","Last 15 days"],30:["ap.mx.r30","Last 30 days"],90:["ap.mx.r90","Last 90 days"],365:["ap.mx.r365","Last year"]};
function rl(d){var r=RL[d]||RL[15];return t(r[0],r[1])}
function pc(v){return v==null?"—":(Math.round(v*100)/100).toLocaleString(A.lang())+"%"}
function shell(){
 root.innerHTML='<div class="ph"><h1>'+e(t("ap.m.t","Metrics"))+'</h1></div><div class="tool" id="mxTool"></div><div id="mxBody"></div>';
 tools()
}
function tools(){
 var tl=document.getElementById("mxTool");tl.innerHTML="";
 var rs=(D&&D.ranges)||[1,7,15,30,90,365];
 tl.appendChild(A.dropdown(rs.map(function(d){return[String(d),rl(d)]}),String(days),function(v){days=+v;load()}));
 var ds=[["all",t("ap.alldom","All domains")]].concat(((D&&D.domains)||[]).map(function(x){return[x,x]}));
 if(domain!=="all"&&!ds.some(function(x){return x[0]===domain}))ds.push([domain,domain]);
 tl.appendChild(A.dropdown(ds,domain,function(v){domain=v;load()}));
 var tr=document.createElement("div");tr.className="mx-tr";tl.appendChild(tr);
 var ex=document.createElement("button");ex.type="button";ex.className="flt";ex.innerHTML=A.icon('<path d="M12 4v11M7 10l5 5 5-5M5 19h14"/>',14)+"<span>"+e(t("ap.export","Export"))+"</span>";ex.onclick=exportCsv;ex.disabled=!D;tr.appendChild(ex);
 var rf=document.createElement("button");rf.type="button";rf.className="flt";rf.innerHTML=A.icon(A.IC.refresh,14)+"<span>"+e(t("au.refresh","Refresh"))+"</span>";rf.onclick=function(){load()};tr.appendChild(rf)
}
function load(){
 if(busy)return;busy=true;
 var b=document.getElementById("mxBody");if(!D)b.innerHTML=A.loading();else b.classList.add("mx-fade");
 A.api("/metrics?days="+days+"&domain="+encodeURIComponent(domain)).then(function(r){busy=false;D=r;days=r.days;b.classList.remove("mx-fade");tools();draw()},function(x){busy=false;b.classList.remove("mx-fade");D=null;b.innerHTML=A.failed(x,"mxRetry");document.getElementById("mxRetry").onclick=load})
}
function exportCsv(){
 if(!D)return;var cols=["sent","delivered","bounced","complained","delayed","failed","suppressed","received"];
 var out=["time,"+cols.join(",")].concat(D.series.map(function(s){return s.t+","+cols.map(function(c){return s[c]}).join(",")})).join("\n")+"\n";
 var u=URL.createObjectURL(new Blob([out],{type:"text/csv;charset=utf-8"})),a=document.createElement("a");a.href=u;a.download="geserd-metrics-"+(D.bucket==="hour"?"24h":D.days+"d")+".csv";document.body.appendChild(a);a.click();a.remove();setTimeout(function(){URL.revokeObjectURL(u)},2000)
}
function delta(k){
 if(!D.prev)return"";var a=D.totals[k],p=D.prev.totals[k];
 if(!p&&!a)return"";if(!p)return'<em class="mx-d">'+e(t("ap.mx.new","new"))+"</em>";
 var d=Math.round((a-p)/p*100);return'<em class="mx-d'+(d>0?" up":d<0?" dn":"")+'">'+(d>0?"+":"")+d.toLocaleString(A.lang())+"%</em>"
}
function tiles(){
 return'<div class="mx-tiles" role="group" aria-label="'+e(t("ap.mx.pick","Choose a metric"))+'">'+DEF.map(function(d){
  var k=d[0],v=D.totals[k],sub="";
  if(k==="delivered")sub=pc(D.rates.delivered);else if(k==="bounced")sub=pc(D.rates.bounced);else if(k==="complained")sub=pc(D.rates.complained);
  return'<button type="button" class="mx-tile'+(metric===k?" on":"")+'" data-k="'+k+'" aria-pressed="'+(metric===k)+'" style="--chc:'+d[3]+'"><span class="mx-l"><i></i>'+e(t(d[1],d[2]))+'</span><b>'+A.num(v)+'</b><span class="mx-s">'+(sub!=="—"&&sub?e(t("ap.mx.ofsent","{p} of sent",{p:sub})):"")+delta(k)+"</span></button>"
 }).join("")+"</div>"
}
function health(){
 var h=D.health,T=D.targets,L=D.limits,r=D.rates,sc=D.score;
 var kind=h==="good"?"ok":h==="warn"?"wait":h==="bad"?"bad":"dim";
 function row(name,val,tg,bad){
  var v=val==null?0:val,max=bad*1.25,w=Math.min(100,v/max*100),tp=tg/max*100,bp=bad/max*100,k=val==null?"ok":val>=bad?"bad":val>=tg?"wait":"ok";
  return'<div class="mx-m"><div class="mx-mh"><span>'+e(name)+"</span><b>"+e(pc(val))+'</b></div><div class="mx-mt" role="meter" aria-valuemin="0" aria-valuemax="'+bad+'" aria-valuenow="'+v+'" aria-label="'+e(name)+'"><i class="'+k+'" style="width:'+Math.max(1,w)+'%"></i><u style="left:'+tp+'%"></u><u class="b" style="left:'+bp+'%"></u></div><div class="mx-mf"><span>'+e(t("ap.mx.target","Target: under {p}",{p:pc(tg)}))+"</span></div></div>"
 }
 var msg=h==="none"?t("ap.mx.h.none","Delivery health appears after you send at least 20 emails in this period."):h==="good"?t("ap.mx.h.good","Your sending looks healthy. Bounce and complaint rates are within the recommended range."):h==="warn"?t("ap.mx.h.warn","Some rates are above the recommended range. Review the bounce reasons below and clean your list."):t("ap.mx.h.bad","Rates are high enough to damage your reputation. Fix the causes below, otherwise mailbox providers may block your mail.");
 var score=sc==null?"":'<div class="mx-sc"><div class="mx-sn"><b>'+sc+"</b><span>/ 100</span></div><div class=\"mx-st\" role=\"meter\" aria-valuemin=\"0\" aria-valuemax=\"100\" aria-valuenow=\""+sc+'" aria-label="'+e(t("ap.mx.score","Delivery score"))+'"><i class="'+kind+'" style="width:'+Math.max(3,sc)+'%"></i></div></div><p class="mx-how dim sm">'+e(t("ap.mx.sc.how","The score starts at 100 and drops as bounce and complaint rates grow. Higher is better."))+"</p>";
 return'<section class="gcard mx-health"><div class="mx-hh"><h2 class="sh3">'+e(t("ap.mx.health","Delivery health"))+"</h2>"+A.pill(kind,t("ap.mx.hs."+h,h))+"</div>"+score+'<p class="dim">'+e(msg)+"</p>"+(h==="none"?"":'<div class="mx-ms">'+row(t("ap.mx.bounce","Bounce rate"),r.bounced,T.bounce,L.bounce)+row(t("ap.mx.complaint","Complaint rate"),r.complained,T.complaint,L.complaint)+"</div>")+"</section>"
}
function chartCard(){
 var d=DEF.filter(function(x){return x[0]===metric})[0];
 return'<section class="gcard mx-chart"><div class="mx-ch"><h2 class="sh3">'+e(t(d[1],d[2]))+'</h2><span class="dim sm">'+e(rl(D.days))+" · UTC</span></div><div id=\"mxChart\"></div></section>"
}
function others(){
 var rows=[["delayed","ap.mx.o.delayed","Delayed"],["failed","ap.mx.o.failed","Failed to send"],["suppressed","ap.mx.o.suppressed","Skipped (suppressed)"]];
 return'<section class="gcard"><h2 class="sh3">'+e(t("ap.mx.other","Other events"))+'</h2><div class="mx-o">'+rows.map(function(r){return'<div><b>'+A.num(D.totals[r[0]])+"</b><span>"+e(t(r[1],r[2]))+"</span></div>"}).join("")+"</div></section>"
}
function recipients(){
 var rc=D.recipients;
 var body=rc.length?'<div class="mx-rt" role="table"><div class="mx-rh" role="row"><span role="columnheader">'+e(t("ap.mx.rd","Recipient domain"))+'</span><span role="columnheader">'+e(t("au.e.st.delivered","Delivered"))+'</span><span role="columnheader">'+e(t("au.e.st.bounced","Bounced"))+'</span><span role="columnheader">'+e(t("ap.mx.bounce","Bounce rate"))+"</span></div>"+rc.map(function(r){var tot=r.delivered+r.bounced;return'<div class="mx-rr" role="row"><span class="strong ell" role="cell" title="'+e(r.domain)+'">'+e(r.domain)+'</span><span role="cell">'+A.num(r.delivered)+'</span><span role="cell">'+A.num(r.bounced)+'</span><span class="dim" role="cell">'+e(pc(tot?r.bounced/tot*100:null))+"</span></div>"}).join("")+"</div>":'<p class="dim mx-none">'+e(t("ap.mx.rd.none","No delivery results yet."))+"</p>";
 return'<section class="gcard"><h2 class="sh3">'+e(t("ap.mx.rd.t","Top recipient domains"))+"</h2>"+body+"</section>"
}
function reasons(){
 var bn=D.bounces,max=0;bn.forEach(function(b){if(b.n>max)max=b.n});
 var body=bn.length?'<div class="mx-br">'+bn.map(function(b){return'<div class="mx-bi"><div class="mx-bt"><span class="mx-code">'+e(b.dsn)+"</span><span>"+e(A.dsn(b.dsn))+"</span><b>"+A.num(b.n)+'</b></div><div class="mx-bb"><i style="width:'+Math.max(4,b.n/max*100)+'%"></i></div></div>'}).join("")+"</div>":'<p class="dim mx-none">'+e(t("ap.mx.br.none","No bounces in this period."))+"</p>";
 return'<section class="gcard"><h2 class="sh3">'+e(t("ap.mx.br.t","Bounce reasons"))+"</h2>"+body+"</section>"
}
function draw(){
 var b=document.getElementById("mxBody"),any=false;
 for(var k in D.totals)if(D.totals[k])any=true;
 if(!any){b.innerHTML=A.empty('<path d="M3 3v18h18M7 15l4-4 3 3 5-6"/>',t("ap.m.h","No data yet"),t("ap.m.p","Metrics appear here once you send your first email."))+note();return}
 b.innerHTML=health()+tiles()+chartCard()+others()+'<div class="mx-two">'+recipients()+reasons()+"</div>"+note();
 b.querySelectorAll(".mx-tile").forEach(function(x){x.onclick=function(){metric=x.dataset.k;b.querySelectorAll(".mx-tile").forEach(function(y){var on=y===x;y.classList.toggle("on",on);y.setAttribute("aria-pressed",on)});var c=document.querySelector(".mx-chart");c.outerHTML=chartCard();chart()}});
 chart()
}
function chart(){
 var d=DEF.filter(function(x){return x[0]===metric})[0],host=document.getElementById("mxChart");
 var s=D.series.map(function(x){return{t:x.t,v:x[metric],raw:x}});
 A.bars(host,s,{hourly:D.bucket==="hour",color:d[3],name:t(d[1],d[2]),label:t(d[1],d[2])+", "+rl(D.days),tip:function(p){var o=[[t(d[1],d[2]),A.num(p.v)]];if(metric==="sent"){o.push([t("au.e.st.delivered","Delivered"),A.num(p.raw.delivered)],[t("au.e.st.bounced","Bounced"),A.num(p.raw.bounced)])}return o}})
}
function note(){
 var more=D&&D.max_days<365?' <a href="/app/settings/billing/">'+e(t("ap.mx.upg","Upgrade for a longer history"))+"</a>":"";
 return'<p class="mx-note dim sm">'+e(t("ap.mx.keep","Your plan keeps metrics for {n} days.",{n:D?D.max_days:""}))+more+"</p>"
}
A.ready(function(){root=document.getElementById("app-root");if(!root)return;shell();load()});
})();
