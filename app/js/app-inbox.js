(function(){
var A=window.GSApp;if(!A)return;
var T=A.t,E=A.esc,root,S={domain:"",state:"open",unread:false,mine:false,q:"",sel:null,sum:null,list:[],me:null,att:[],imgs:false,next:null};
var P={reply:'<path d="M9 14 4 9l5-5"/><path d="M4 9h10a6 6 0 0 1 6 6v3"/>',clip:'<path d="m21 11.5-8.5 8.5a5.5 5.5 0 0 1-7.8-7.8l8.5-8.5a3.7 3.7 0 0 1 5.2 5.2l-8.5 8.5a1.8 1.8 0 0 1-2.6-2.6l7.8-7.8"/>',ok:'<path d="m5 12.5 4.5 4.5L19 7.5"/>',lock:'<rect x="5" y="11" width="14" height="9" rx="3"/><path d="M8 11V8a4 4 0 0 1 8 0v3"/>',dot:'<circle cx="12" cy="12" r="3"/>',x:'<path d="M6 6l12 12M18 6 6 18"/>',img:'<rect x="3" y="4" width="18" height="16" rx="3"/><circle cx="9" cy="10" r="1.6"/><path d="m21 16-5-5-8 8"/>',eye:'<path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7S2 12 2 12z"/><circle cx="12" cy="12" r="3"/>',search:'<circle cx="11" cy="11" r="7"/><path d="m20 20-3.5-3.5"/>',user:'<circle cx="12" cy="8" r="4"/><path d="M4 20a8 8 0 0 1 16 0"/>'};
function ic(d,n){return A.icon(d,n||18)}
function tabs(){return'<nav class="stabs"><a href="/app/emails/">'+E(T("ap.tab.send","Sending"))+'</a><a href="/app/emails/receiving/" class="on">'+E(T("ap.tab.recv","Receiving"))+'</a><a href="/app/emails/rules/">'+E(T("ib.tab.rules","Rules"))+'</a><a href="/app/emails/suppressions/">'+E(T("ap.tab.supp","Suppressions"))+"</a></nav>"}
function name(a){var s=String(a||"");var m=/^"?([^"<]*)"?\s*<(.+)>$/.exec(s);return m&&m[1].trim()?m[1].trim():s.replace(/<|>/g,"")}
function mail(a){var m=/<(.+)>/.exec(String(a||""));return m?m[1]:String(a||"")}
function ini(a){return E(String(name(a)||"?").charAt(0).toUpperCase())}
function size(n){return n>1048576?(n/1048576).toFixed(1)+" MB":Math.max(1,Math.round(n/1024))+" KB"}
function segc(id,items,cur){return'<div class="ak-seg" id="'+id+'">'+items.map(function(x){return'<button type="button" data-v="'+E(x[0])+'"'+(x[0]===cur?' class="on"':"")+">"+E(x[1])+(x[2]?"<em>"+A.num(x[2])+"</em>":"")+"</button>"}).join("")+"</div>"}
function shell(){root.innerHTML='<div class="ph"><h1>'+E(T("ap.emails","Emails"))+"</h1></div>"+tabs()+'<div class="ak-bar" id="ibTop"></div><div id="ibBody"></div>'}
function top(){
 var s=S.sum||{domains:[]},tot=s.domains.reduce(function(a,x){return a+x.unread},0),el=document.getElementById("ibTop");
 var dm=s.domains.length>1?segc("ibDom",[["",T("ib.all","All"),tot]].concat(s.domains.map(function(x){return[x.d,x.d,x.unread]})),S.domain):"";
 el.innerHTML=dm+'<label class="ak-search">'+ic(P.search)+'<input type="search" id="ibQ" maxlength="100" autocomplete="off" placeholder="'+E(T("ib.search","Search messages"))+'" value="'+E(S.q)+'"></label>'+segc("ibSt",[["open",T("ib.open","Open")],["closed",T("ib.closed","Closed")],["",T("ib.any","All")]],S.state)+'<button type="button" class="ak-tg'+(S.unread?" on":"")+'" id="ibUn">'+ic(P.dot,14)+"<span>"+E(T("ib.unread","Unread"))+"</span></button>"+((s.team||[]).length>1?'<button type="button" class="ak-tg'+(S.mine?" on":"")+'" id="ibMine">'+ic(P.user,14)+"<span>"+E(T("ib.mine","Mine"))+"</span></button>":"");
 var tm;document.getElementById("ibQ").oninput=function(){var v=this.value;clearTimeout(tm);tm=setTimeout(function(){S.q=v.trim();list(true)},300)};
 var d=document.getElementById("ibDom");if(d)d.onclick=function(ev){var b=ev.target.closest("button");if(!b)return;S.domain=b.dataset.v;top();list(true)};
 document.getElementById("ibSt").onclick=function(ev){var b=ev.target.closest("button");if(!b)return;S.state=b.dataset.v;top();list(true)};
 document.getElementById("ibUn").onclick=function(){S.unread=!S.unread;top();list(true)};
 var m=document.getElementById("ibMine");if(m)m.onclick=function(){S.mine=!S.mine;top();list(true)}
}
function qs(){var a=[];if(S.domain)a.push("domain="+encodeURIComponent(S.domain));if(S.state)a.push("state="+S.state);if(S.unread)a.push("unread=1");if(S.mine)a.push("assignee=me");if(S.q)a.push("q="+encodeURIComponent(S.q));return a}
function list(reset){
 var b=document.getElementById("ibBody");
 if(reset){S.list=[];S.next=null;b.innerHTML='<div class="ak-split"><section class="gcard ak-list" id="ibL">'+A.loading()+'</section><section class="gcard ak-th2 ak-th2-empty" id="ibT"></section></div>'}
 var a=qs();if(S.next)a.push("before="+encodeURIComponent(S.next));
 A.api("/inbox/threads?"+a.join("&")).then(function(d){
  S.list=S.list.concat(d.data);S.next=d.next;draw()
 },function(x){document.getElementById("ibL").innerHTML=A.failed(x,"ibRetry");document.getElementById("ibRetry").onclick=function(){list(true)}})
}
function draw(){
 var L=document.getElementById("ibL"),T2=document.getElementById("ibT");
 if(!S.list.length){
  var none=!(S.sum&&S.sum.domains.length);
  document.getElementById("ibBody").innerHTML='<section class="gcard"><div class="ak-empty"><span class="ak-ei">'+ic(A.IC.inbox,32)+"</span><h3>"+E(none?T("ib.none","No messages yet"):T("ib.empty","Nothing here"))+"</h3><p>"+E(none?T("ib.none.p","Mail sent to your verified domains and Geserd addresses appears here as conversations. You can reply from this page."):T("ib.empty.p","Try another filter or search."))+"</p>"+(none?'<a class="abtn pri" href="/app/domains/">'+E(T("ib.adddom","Add a domain"))+"</a>":"")+"</div></section>";return}
 L.innerHTML=S.list.map(function(x){
  var who=x.last_dir==="out"?T("ib.you","You"):name(x.last_from);
  return'<button type="button" class="ak-li'+(S.sel===x.id?" on":"")+(x.unread?" ib-un":"")+'" data-id="'+x.id+'"><span class="ak-av">'+ini(x.first_from||x.last_from)+'</span><span class="ak-nm"><b>'+E(x.subject||T("ib.nosubj","(no subject)"))+"</b><small>"+E(who)+" · "+E(x.snippet||"")+'</small></span><span class="ib-meta"><time>'+E(A.ago(x.last_at))+"</time>"+(x.unread?'<i class="ib-dot"></i>':"")+(x.has_files?ic(P.clip,14):"")+"</span></button>"}).join("")+(S.next?'<button type="button" class="ak-li ib-more" id="ibMore">'+E(T("au.more","Load more"))+"</button>":"");
 L.querySelectorAll("[data-id]").forEach(function(b){b.onclick=function(){open(b.dataset.id)}});
 var mo=document.getElementById("ibMore");if(mo)mo.onclick=function(){list(false)};
 if(!S.sel&&window.innerWidth>1100&&S.list[0])open(S.list[0].id);
 else if(S.sel&&!S.list.some(function(x){return x.id===S.sel})){S.sel=null;T2.classList.add("ak-th2-empty")}
 if(!S.sel){T2.innerHTML='<div class="ak-empty" style="margin:auto"><span class="ak-ei">'+ic(A.IC.inbox,32)+"</span><h3>"+E(T("ib.pick","Pick a conversation"))+"</h3></div>"}
}
function body(m){
 if(m.html){
  var csp="default-src 'none'; style-src 'unsafe-inline'; img-src data:"+(S.imgs?" https:":"");
  var doc='<meta http-equiv="Content-Security-Policy" content="'+csp+'"><base target="_blank"><style>body{margin:0;padding:18px;font:14px/1.55 Arial,Helvetica,sans-serif;color:#1a1a1a;background:#fff;word-break:break-word}img{max-width:100%;height:auto}a{color:#0b57d0}</style>'+m.html;
  return'<iframe class="ib-frame" sandbox="allow-same-origin" referrerpolicy="no-referrer" srcdoc="'+E(doc)+'"></iframe>'}
 return'<div class="ib-txt">'+E(m.text||"")+"</div>"}
function open(id){
 S.sel=id;S.att=[];
 var L=document.getElementById("ibL"),T2=document.getElementById("ibT");
 L.querySelectorAll(".ak-li").forEach(function(b){b.classList.toggle("on",b.dataset.id===id)});
 T2.classList.remove("ak-th2-empty");T2.innerHTML='<div class="ak-empty" style="margin:auto">'+A.loading()+"</div>";
 A.api("/inbox/threads/"+id).then(function(d){
  var row=S.list.filter(function(x){return x.id===id})[0];if(row&&row.unread){row.unread=0;var b=L.querySelector('[data-id="'+id+'"]');if(b){b.classList.remove("ib-un");var dt=b.querySelector(".ib-dot");if(dt)dt.remove()}refreshSum()}
  var hasImg=d.messages.some(function(m){return m.html&&/<img/i.test(m.html)});
  var team=(S.sum&&S.sum.team)||[],asg=team.filter(function(u){return u.id===d.assignee})[0];
  var last=d.messages[d.messages.length-1],lastIn=d.messages.slice().reverse().filter(function(m){return m.direction==="in"})[0];
  T2.innerHTML='<div class="ak-thh"><span class="ak-av">'+ini(lastIn?lastIn.from:d.subject)+'</span><div style="flex:1;min-width:0"><h2>'+E(d.subject||T("ib.nosubj","(no subject)"))+"</h2><p>"+E(lastIn?mail(lastIn.from):"")+'</p></div><div class="ib-act" id="ibAct"></div></div>'+(hasImg&&!S.imgs?'<div class="ib-bn">'+ic(P.img,16)+"<span>"+E(T("ib.imgs.off","Remote images are blocked to protect your privacy."))+'</span><button type="button" class="abtn" id="ibImg">'+E(T("ib.imgs","Show images"))+"</button></div>":"")+'<div class="ak-msgs ib-msgs" id="ibMs">'+d.messages.map(function(m){var out=m.direction==="out";return'<article class="ib-m'+(out?" out":"")+'"><header><span class="ak-av">'+ini(out?T("ib.you","You"):m.from)+'</span><div class="ak-nm"><b>'+E(out?T("ib.you","You"):name(m.from))+"</b><small>"+E(out?T("ib.to","To")+": "+(m.to||[]).join(", "):mail(m.from))+"</small></div><time>"+E(A.date(m.created_at))+"</time></header>"+body(m)+(m.files&&m.files.length?'<div class="ak-chips ib-files">'+m.files.map(function(f){return'<a class="ak-chip" href="'+(window.GESERD&&GESERD.api?GESERD.api:"/api")+"/inbox/files/"+f.id+'" download>'+ic(P.clip,14)+"<span>"+E(f.filename||"file")+"</span><small>"+size(f.size)+"</small></a>"}).join("")+"</div>":"")+"</article>"}).join("")+'</div><div class="ak-cmp"><textarea id="ibTx" rows="4" maxlength="20000" placeholder="'+E(T("ib.reply.ph","Write a reply"))+'"></textarea><div class="ak-chips" id="ibAtt"></div><div class="row"><div class="ak-btns"><label class="abtn" for="ibF">'+ic(P.clip,16)+"<span>"+E(T("ib.attach","Attach"))+'</span></label><input type="file" id="ibF" multiple hidden></div><button type="button" class="abtn pri" id="ibSend">'+ic(P.reply,16)+"<span>"+E(T("ib.send","Send reply"))+"</span></button></div></div>";
  var ms=document.getElementById("ibMs");ms.scrollTop=ms.scrollHeight;
  T2.querySelectorAll(".ib-frame").forEach(function(f){var fit=function(){try{f.style.height=(f.contentDocument.documentElement.scrollHeight+4)+"px"}catch(e){f.style.height="320px"}};f.onload=fit;setTimeout(fit,300)});
  var im=document.getElementById("ibImg");if(im)im.onclick=function(){S.imgs=true;open(id)};
  var act=document.getElementById("ibAct");
  act.appendChild(A.dropdown([["",T("ib.unassigned","Unassigned")]].concat(team.map(function(u){return[u.id,u.name||u.email]})),d.assignee||"",function(v){A.api("/inbox/threads/"+id,{method:"PATCH",body:{assignee:v||null}}).then(function(){var r=S.list.filter(function(x){return x.id===id})[0];if(r){r.assignee=v||null;r.assignee_name=null}A.toast(T("au.saved","Saved"))},function(x){A.toast(A.err(x),"err")})}));
  var st=document.createElement("button");st.type="button";st.className="abtn";st.innerHTML=ic(d.state==="closed"?P.reply:P.ok,16)+"<span>"+E(d.state==="closed"?T("ib.reopen","Reopen"):T("ib.close","Close"))+"</span>";
  st.onclick=function(){A.api("/inbox/threads/"+id,{method:"PATCH",body:{state:d.state==="closed"?"open":"closed"}}).then(function(){S.sel=null;refreshSum();list(true)},function(x){A.toast(A.err(x),"err")})};act.appendChild(st);
  var un=document.createElement("button");un.type="button";un.className="abtn";un.setAttribute("aria-label",T("ib.markun","Mark as unread"));un.title=T("ib.markun","Mark as unread");un.innerHTML=ic(P.eye,16);
  un.onclick=function(){A.api("/inbox/threads/"+id,{method:"PATCH",body:{unread:true}}).then(function(){var r=S.list.filter(function(x){return x.id===id})[0];if(r)r.unread=1;S.sel=null;refreshSum();draw()},function(x){A.toast(A.err(x),"err")})};act.appendChild(un);
  var tot=0;function paintAtt(){var c=document.getElementById("ibAtt");c.innerHTML=S.att.map(function(a,i){return'<span class="ak-chip">'+ic(P.clip,14)+"<span>"+E(a.filename)+"</span><small>"+size(a.size)+'</small><button type="button" class="ib-x" data-i="'+i+'" aria-label="'+E(T("ib.rm","Remove"))+'">'+ic(P.x,12)+"</button></span>"}).join("");c.querySelectorAll("[data-i]").forEach(function(b){b.onclick=function(){S.att.splice(+b.dataset.i,1);paintAtt()}})}
  document.getElementById("ibF").onchange=function(){var files=[].slice.call(this.files);this.value="";
   files.forEach(function(f){var sum=S.att.reduce(function(a,x){return a+x.size},0)+f.size;if(sum>9*1048576||S.att.length>=10){A.toast(T("ib.toolarge","Attachments are limited to 10 MB in total."),"err");return}
    var r=new FileReader();r.onload=function(){S.att.push({filename:f.name,size:f.size,content:String(r.result).split(",")[1]||"",content_type:f.type||"application/octet-stream"});paintAtt()};r.readAsDataURL(f)})};
  document.getElementById("ibSend").onclick=function(){
   var b=this,v=document.getElementById("ibTx").value.trim();if(!v)return;b.disabled=true;
   A.api("/inbox/threads/"+id+"/reply",{method:"POST",body:{text:v,attachments:S.att.map(function(a){return{filename:a.filename,content:a.content,content_type:a.content_type}})}}).then(function(){A.toast(T("ib.sent","Reply sent"));S.att=[];open(id);refreshSum()},function(x){b.disabled=false;A.toast(A.err(x),"err")})};
  if(window.innerWidth<=1100)T2.scrollIntoView({behavior:"smooth",block:"start"})
 },function(x){T2.innerHTML='<p class="ferr" style="padding:24px">'+E(A.err(x))+"</p>"})
}
function refreshSum(){A.api("/inbox/summary").then(function(s){S.sum=s;var m=document.querySelector("#ibDom");top()},function(){})}
A.ready(function(){
 root=document.getElementById("app-root");if(!root)return;
 shell();document.getElementById("ibBody").innerHTML=A.loading();
 A.api("/inbox/summary").then(function(s){S.sum=s;top();list(true)},function(x){document.getElementById("ibBody").innerHTML=A.failed(x,"ibRetry");document.getElementById("ibRetry").onclick=function(){location.reload()}})
})
})();
