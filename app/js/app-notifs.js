(function(){
var A=window.GSApp;if(!A)return;
var T=A.t,E=A.esc;
var ICON={bounce:'<path d="M4 4h16v12H4zM4 8l8 5 8-5M9 20h6"/>',complaint:'<path d="M12 3 2 20h20zM12 10v4M12 17h.01"/>',quota:'<path d="M5 20V11M11 20V4M17 20v-6M3 20h18"/>',domain:'<circle cx="12" cy="12" r="9"/><path d="M8 12.5l3 3 5-6"/>',ticket:'<path d="M4 5h16v11H9l-5 4z"/>'};
function title(n){var k=n.title;return T("nt.t."+k,k)}
function body(n){
 if(n.title==="quota_80"||n.title==="quota_full"){var sc=String(n.body||"").split(":")[0];return T("nt.b.quota."+(sc==="daily"?"daily":"monthly"),sc==="daily"?"Daily sending limit":"Monthly sending limit")}
 return n.body||""}
function item(n){
 var ic=ICON[n.type]||ICON.quota,link=n.link||"";
 return '<div class="nitem'+(n.read_at?'':' un')+'" data-id="'+n.id+'" data-link="'+E(link)+'"><span class="ni">'+A.icon(ic,20)+'</span><div><b>'+E(title(n))+'</b>'+(body(n)?'<p>'+E(body(n))+'</p>':'')+'<time>'+E(A.ago(n.created_at))+'</time></div><button type="button" class="x" data-del="'+n.id+'" aria-label="'+E(T("nt.del","Delete"))+'">'+A.icon(A.IC.x,16)+'</button></div>'}
function head(unread){return '<div class="ph"><h1>'+E(T("nt.h","Notifications"))+'</h1></div><div class="tops"><span class="sub" style="font-size:14px;color:var(--a-tx2)">'+(unread?E(A.plural(unread,"nt.unread","{n} unread")):E(T("nt.allread","All caught up")))+'</span>'+(unread?'<button type="button" class="abtn" id="ntAll">'+E(T("nt.markall","Mark all as read"))+'</button>':'')+'</div>'}
function load(root){
 root.innerHTML='<div class="ph"><h1>'+E(T("nt.h","Notifications"))+'</h1></div>'+A.loading();
 A.api("/notifications").then(function(j){
  root.innerHTML=head(j.unread)+(j.data.length?'<div class="nlist" id="ntl">'+j.data.map(item).join("")+'</div>':A.empty('<path d="M6 9a6 6 0 1 1 12 0c0 6 2 7 2 7H4s2-1 2-7M10 20a2 2 0 0 0 4 0"/>',T("nt.none","No notifications yet"),T("nt.none.d","Bounces, spam complaints, plan limits and support replies will appear here.")));
  var all=document.getElementById("ntAll");if(all)all.onclick=function(){all.disabled=true;A.api("/notifications/read",{method:"POST"}).then(function(){if(window.GSBadge)GSBadge();load(root)},function(e){all.disabled=false;A.toast(A.err(e),"err")})};
  var l=document.getElementById("ntl");if(l)l.onclick=function(e){
   var d=e.target.closest("[data-del]");
   if(d){e.stopPropagation();A.api("/notifications/"+d.dataset.del,{method:"DELETE"}).then(function(){if(window.GSBadge)GSBadge();load(root)},function(x){A.toast(A.err(x),"err")});return}
   var it=e.target.closest(".nitem");if(!it)return;
   A.api("/notifications/"+it.dataset.id+"/read",{method:"POST"}).catch(function(){}).then(function(){if(it.dataset.link)location.href=it.dataset.link;else{it.classList.remove("un");if(window.GSBadge)GSBadge()}})}
 },function(x){root.innerHTML='<div class="ph"><h1>'+E(T("nt.h","Notifications"))+'</h1></div>'+A.failed(x,"ntRetry");var b=document.getElementById("ntRetry");if(b)b.onclick=function(){load(root)}})}
A.ready(function(){var r=document.getElementById("nt-root");if(r)load(r)});
})();
