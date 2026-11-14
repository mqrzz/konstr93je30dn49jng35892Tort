(function(){
document.body.classList.add("is-admin");
var A=window.GSApp,t=A.t,e=A.esc,root,page,F={q:"",status:"",plan:"",flag:""},U={off:0,rows:[],total:0};
var P={page:'<path d="M7 3h7l4 4v14H7z"/><path d="M14 3v4h4M10 12h5M10 16h5"/>',globe:'<circle cx="12" cy="12" r="9"/><path d="M3 12h18M12 3c3 3 3 15 0 18M12 3c-3 3-3 15 0 18"/>',click:'<path d="M9 4v10l2.5-2 2 4.5 2-1-2-4.4 3.5-.1z"/>',link:'<path d="M10 14a4 4 0 0 0 5.7 0l3-3a4 4 0 0 0-5.7-5.7l-1 1"/><path d="M14 10a4 4 0 0 0-5.7 0l-3 3a4 4 0 0 0 5.7 5.7l1-1"/>',phone:'<rect x="7" y="3" width="10" height="18" rx="3"/><path d="M11 18h2"/>',chart:'<path d="M4 20V11M10 20V4M16 20v-6M22 20H2"/>',key:'<circle cx="8" cy="15" r="4"/><path d="m11 12 8-8M16 7l3 3M14 9l2 2"/>',shield:'<path d="M12 3 4 6v6c0 4.5 3.2 7.5 8 9 4.8-1.5 8-4.5 8-9V6z"/><path d="m9 12 2.2 2.2L15.5 10"/>',users:'<circle cx="9" cy="8" r="3.5"/><path d="M2.5 20a6.5 6.5 0 0 1 13 0M16 4.5a3.5 3.5 0 0 1 0 7M18 14.5a6.5 6.5 0 0 1 3.5 5.5"/>',flag:'<path d="M5 21V4M5 4h11l-2 4 2 4H5"/>',map:'<path d="M12 21s7-6.2 7-11a7 7 0 1 0-14 0c0 4.8 7 11 7 11z"/><circle cx="12" cy="10" r="2.5"/>',chat:'<path d="M4 5h16v11H9l-5 4z"/><path d="M8.5 9.5h7M8.5 12.5h4"/>',star:'<path d="m12 3 2.7 5.6 6.1.9-4.4 4.3 1 6.1L12 17l-5.4 2.9 1-6.1L3.2 9.5l6.1-.9z"/>',mail:'<rect x="3" y="5" width="18" height="14" rx="3"/><path d="m3.5 7.5 8.5 6 8.5-6"/>',lock:'<rect x="5" y="11" width="14" height="9" rx="3"/><path d="M8 11V8a4 4 0 0 1 8 0v3"/>',pause:'<circle cx="12" cy="12" r="9"/><path d="M10 9v6M14 9v6"/>',ban:'<circle cx="12" cy="12" r="9"/><path d="m5.6 5.6 12.8 12.8"/>',ok:'<path d="m5 12.5 4.5 4.5L19 7.5"/>',back:'<path d="m15 6-6 6 6 6"/>',dl:'<path d="M12 4v12M7 11l5 5 5-5M5 20h14"/>',up:'<path d="M12 16V4M7 9l5-5 5 5M5 20h14"/>',alert:'<path d="M12 4 3 19h18z"/><path d="M12 10v4M12 17h.01"/>',clock:'<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/>',next:'<path d="m9 6 6 6-6 6"/>',send:'<path d="M5 12h14M13 6l6 6-6 6"/>',plus:'<path d="M12 5v14M5 12h14"/>',id:'<rect x="3" y="5" width="18" height="14" rx="3"/><circle cx="9" cy="11" r="2"/><path d="M6 16a3 3 0 0 1 6 0M14 10h4M14 14h3"/>',list:'<path d="M8 7h12M8 12h12M8 17h12M4 7h.01M4 12h.01M4 17h.01"/>'};
var TABS=[["","ad.t.over","Overview","/app/admin/",P.shield],["users","ad.t.users","Users","/app/admin/users/",P.users],["review","ad.t.review","Review","/app/admin/review/",P.flag],["siberia","ad.t.sib","Applications","/app/admin/siberia/",P.map],["tickets","ad.t.tickets","Tickets","/app/admin/tickets/",P.chat],["rating","ad.t.rating","Rating rules","/app/admin/rating/",P.star]];
function head(){
 var ti={"":["ad.t.over","Overview"],users:["ad.t.users","Users"],user:["ad.t.users","Users"],review:["ad.t.review","Review"],siberia:["ad.t.sib","Applications"],tickets:["ad.t.tickets","Tickets"],rating:["ad.t.rating","Rating rules"],maint:["ad.t.maint","Maintenance"],sso:["ad.t.sso","SSO"],notice:["ad.t.maint","Technical works"],analytics:["ad.t.an","Analytics"],staff:["ad.t.staff","Team"],mail:["ad.t.mail","Mail"],newsletter:["ad.t.nl","Newsletter"],audit:["ad.t.audit","Mail audit"]}[page]||["ad.h","Admin"];
 var sb={users:["ad.sub.users","Every account on the platform: plan, status, country and last activity."],review:["ad.sub.review","Accounts the system marked as suspicious. Decide what to do with each one."],siberia:["ad.sub.sib","Requests for the Siberia tariff. Check the tax ID and the purpose, then decide."],tickets:["ad.sub.tickets","Conversations from the help center. Answer here and the reply goes to the customer by email."],rating:["ad.sub.rating","How the account rating is calculated. The maximum points of all factors add up to 100."],sso:["ad.sub.sso","Single sign-on for Enterprise customers through their own OpenID Connect provider."],staff:["ad.sub.staff","Who can work in this panel and what each role is allowed to do."],analytics:["ad.sub.an","Visitors of the public site. Only people who accepted analytics cookies are counted."],mail:["ad.sub.mail","Organization addresses: read, answer with attachments and manage who has access."],audit:["ad.sub.audit","What accounts sent lately. Check it with any AI and apply the result in a few clicks."]}[page];
 return'<div class="ph"><h1>'+e(t(ti[0],ti[1]))+"</h1></div>"+(sb?'<p class="ak-sub">'+e(t(sb[0],sb[1]))+"</p>":"")
}
function shell(inner){root.innerHTML=head()+inner}
function fail(x,id){root.innerHTML=head()+A.failed(x,id);document.getElementById(id).onclick=function(){load()}}
function pill(s){var k=s==="active"||s==="approved"||s==="reviewed"?"ok":s==="frozen"||s==="pending"||s==="open"?"wait":s==="blocked"||s==="rejected"||s==="revoked"?"bad":"dim";return A.pill(k,t("ad.s."+s,s))}
function ic(d,n){return A.icon(d,n||20)}
function kpi(i,n,l,o){o=o||{};var tag=o.href?"a":"div";return"<"+tag+(o.href?' href="'+o.href+'"':"")+' class="ak-k'+(o.hot?" hot":"")+'"><span class="kg"></span><span class="ki">'+ic(i)+"</span><b>"+A.num(n||0)+"</b><span>"+e(l)+"</span>"+(o.sub?"<small>"+e(o.sub)+"</small>":"")+"</"+tag+">"}
function kpis(list){return'<div class="ak-k4">'+list.join("")+"</div>"}
function emptyBox(i,ti,p,btn,ghost){return'<section class="ak-card"><div class="ak-empty">'+(ghost?'<div class="ak-ghost"><i></i><i></i><i></i></div>':"")+'<span class="ak-ei">'+ic(i,32)+"</span><h3>"+e(ti)+"</h3>"+(p?"<p>"+e(p)+"</p>":"")+(btn||"")+"</div></section>"}
function segc(id,items,cur){return'<div class="ak-seg" id="'+id+'">'+items.map(function(x){return'<button type="button" data-v="'+x[0]+'"'+(x[0]===cur?' class="on"':"")+">"+e(x[1])+(x[2]!=null?"<em>"+A.num(x[2])+"</em>":"")+"</button>"}).join("")+"</div>"}
function bindSeg(id,fn){var s=document.getElementById(id);if(s)s.onclick=function(ev){var b=ev.target.closest("button");if(b)fn(b.dataset.v)}}
function av(s,cls){return'<span class="ak-av'+(cls?" "+cls:"")+'">'+e(String(s||"?").charAt(0).toUpperCase())+"</span>"}
function cnt(){return A.api("/admin/counts").then(null,function(){return{}})}
function cardHead(i,ti,p){return'<div class="ak-ch"><span class="ak-ci">'+ic(i,20)+"</span><div><h3>"+e(ti)+"</h3>"+(p?"<p>"+e(p)+"</p>":"")+"</div></div>"}
function confirmBox(title,text,okLabel,danger,go){
 var m=A.modal({title:title,body:'<p class="dim">'+e(text)+'</p><div class="prow"><button type="button" class="abtn" id="adNo">'+e(t("au.cancel","Cancel"))+'</button><button type="button" class="abtn pri'+(danger?" bad":"")+'" id="adYes">'+e(okLabel)+"</button></div>"});
 m.body.querySelector("#adNo").onclick=m.close;
 m.body.querySelector("#adYes").onclick=function(){var y=this;y.disabled=true;go(m,y)}
}
function ic(d,n){return A.icon(d,n||20)}
function kpi(i,n,l,o){o=o||{};var tag=o.href?"a":"div";return"<"+tag+(o.href?' href="'+o.href+'"':"")+' class="ak-k'+(o.hot?" hot":"")+'"><span class="kg"></span><span class="ki">'+ic(i)+"</span><b>"+A.num(n||0)+"</b><span>"+e(l)+"</span>"+(o.sub?"<small>"+e(o.sub)+"</small>":"")+"</"+tag+">"}
function kpis(list){return'<div class="ak-k4">'+list.join("")+"</div>"}
function emptyBox(i,ti,p,btn,ghost){return'<section class="ak-card"><div class="ak-empty">'+(ghost?'<div class="ak-ghost"><i></i><i></i><i></i></div>':"")+'<span class="ak-ei">'+ic(i,32)+"</span><h3>"+e(ti)+"</h3>"+(p?"<p>"+e(p)+"</p>":"")+(btn||"")+"</div></section>"}
function segc(id,items,cur){return'<div class="ak-seg" id="'+id+'">'+items.map(function(x){return'<button type="button" data-v="'+x[0]+'"'+(x[0]===cur?' class="on"':"")+">"+e(x[1])+(x[2]!=null?"<em>"+A.num(x[2])+"</em>":"")+"</button>"}).join("")+"</div>"}
function bindSeg(id,fn){var s=document.getElementById(id);if(s)s.onclick=function(ev){var b=ev.target.closest("button");if(b)fn(b.dataset.v)}}
function av(s,cls){return'<span class="ak-av'+(cls?" "+cls:"")+'">'+e(String(s||"?").charAt(0).toUpperCase())+"</span>"}
function cnt(){return A.api("/admin/counts").then(null,function(){return{}})}
function cardHead(i,ti,p){return'<div class="ak-ch"><span class="ak-ci">'+ic(i,20)+"</span><div><h3>"+e(ti)+"</h3>"+(p?"<p>"+e(p)+"</p>":"")+"</div></div>"}
function confirmBox(title,text,okLabel,danger,go){
 var m=A.modal({title:title,body:'<p class="dim">'+e(text)+'</p><div class="prow"><button type="button" class="abtn" id="adNo">'+e(t("au.cancel","Cancel"))+'</button><button type="button" class="abtn pri'+(danger?" bad":"")+'" id="adYes">'+e(okLabel)+"</button></div>"});
 m.body.querySelector("#adNo").onclick=m.close;
 m.body.querySelector("#adYes").onclick=function(){var y=this;y.disabled=true;go(m,y)}
}
function ic(d,n){return A.icon(d,n||20)}
function kpi(i,n,l,o){o=o||{};var tag=o.href?"a":"div";return"<"+tag+(o.href?' href="'+o.href+'"':"")+' class="ak-k'+(o.hot?" hot":"")+'"><span class="kg"></span><span class="ki">'+ic(i)+"</span><b>"+A.num(n||0)+"</b><span>"+e(l)+"</span>"+(o.sub?"<small>"+e(o.sub)+"</small>":"")+"</"+tag+">"}
function kpis(list){return'<div class="ak-k4">'+list.join("")+"</div>"}
function emptyBox(i,ti,p,btn,ghost){return'<section class="ak-card"><div class="ak-empty">'+(ghost?'<div class="ak-ghost"><i></i><i></i><i></i></div>':"")+'<span class="ak-ei">'+ic(i,32)+"</span><h3>"+e(ti)+"</h3>"+(p?"<p>"+e(p)+"</p>":"")+(btn||"")+"</div></section>"}
function segc(id,items,cur){return'<div class="ak-seg" id="'+id+'">'+items.map(function(x){return'<button type="button" data-v="'+x[0]+'"'+(x[0]===cur?' class="on"':"")+">"+e(x[1])+(x[2]!=null?"<em>"+A.num(x[2])+"</em>":"")+"</button>"}).join("")+"</div>"}
function bindSeg(id,fn){var s=document.getElementById(id);if(s)s.onclick=function(ev){var b=ev.target.closest("button");if(b)fn(b.dataset.v)}}
function av(s,cls){return'<span class="ak-av'+(cls?" "+cls:"")+'">'+e(String(s||"?").charAt(0).toUpperCase())+"</span>"}
function cnt(){return A.api("/admin/counts").then(null,function(){return{}})}
function cardHead(i,ti,p){return'<div class="ak-ch"><span class="ak-ci">'+ic(i,20)+"</span><div><h3>"+e(ti)+"</h3>"+(p?"<p>"+e(p)+"</p>":"")+"</div></div>"}
function confirmBox(title,text,okLabel,danger,go){
 var m=A.modal({title:title,body:'<p class="dim">'+e(text)+'</p><div class="prow"><button type="button" class="abtn" id="adNo">'+e(t("au.cancel","Cancel"))+'</button><button type="button" class="abtn pri'+(danger?" bad":"")+'" id="adYes">'+e(okLabel)+"</button></div>"});
 m.body.querySelector("#adNo").onclick=m.close;
 m.body.querySelector("#adYes").onclick=function(){var y=this;y.disabled=true;go(m,y)}
}
function ic(d,n){return A.icon(d,n||20)}
function kpi(i,n,l,o){o=o||{};var tag=o.href?"a":"div";return"<"+tag+(o.href?' href="'+o.href+'"':"")+' class="ak-k'+(o.hot?" hot":"")+'"><span class="kg"></span><span class="ki">'+ic(i)+"</span><b>"+A.num(n||0)+"</b><span>"+e(l)+"</span>"+(o.sub?"<small>"+e(o.sub)+"</small>":"")+"</"+tag+">"}
function kpis(list){return'<div class="ak-k4">'+list.join("")+"</div>"}
function emptyBox(i,ti,p,btn,ghost){return'<section class="ak-card"><div class="ak-empty">'+(ghost?'<div class="ak-ghost"><i></i><i></i><i></i></div>':"")+'<span class="ak-ei">'+ic(i,32)+"</span><h3>"+e(ti)+"</h3>"+(p?"<p>"+e(p)+"</p>":"")+(btn||"")+"</div></section>"}
function segc(id,items,cur){return'<div class="ak-seg" id="'+id+'">'+items.map(function(x){return'<button type="button" data-v="'+x[0]+'"'+(x[0]===cur?' class="on"':"")+">"+e(x[1])+(x[2]!=null?"<em>"+A.num(x[2])+"</em>":"")+"</button>"}).join("")+"</div>"}
function bindSeg(id,fn){var s=document.getElementById(id);if(s)s.onclick=function(ev){var b=ev.target.closest("button");if(b)fn(b.dataset.v)}}
function av(s,cls){return'<span class="ak-av'+(cls?" "+cls:"")+'">'+e(String(s||"?").charAt(0).toUpperCase())+"</span>"}
function cnt(){return A.api("/admin/counts").then(null,function(){return{}})}
function cardHead(i,ti,p){return'<div class="ak-ch"><span class="ak-ci">'+ic(i,20)+"</span><div><h3>"+e(ti)+"</h3>"+(p?"<p>"+e(p)+"</p>":"")+"</div></div>"}
function confirmBox(title,text,okLabel,danger,go){
 var m=A.modal({title:title,body:'<p class="dim">'+e(text)+'</p><div class="prow"><button type="button" class="abtn" id="adNo">'+e(t("au.cancel","Cancel"))+'</button><button type="button" class="abtn pri'+(danger?" bad":"")+'" id="adYes">'+e(okLabel)+"</button></div>"});
 m.body.querySelector("#adNo").onclick=m.close;
 m.body.querySelector("#adYes").onclick=function(){var y=this;y.disabled=true;go(m,y)}
}
function ic(d,n){return A.icon(d,n||20)}
function kpi(i,n,l,o){o=o||{};var tag=o.href?"a":"div";return"<"+tag+(o.href?' href="'+o.href+'"':"")+' class="ak-k'+(o.hot?" hot":"")+'"><span class="kg"></span><span class="ki">'+ic(i)+"</span><b>"+A.num(n||0)+"</b><span>"+e(l)+"</span>"+(o.sub?"<small>"+e(o.sub)+"</small>":"")+"</"+tag+">"}
function kpis(list){return'<div class="ak-k4">'+list.join("")+"</div>"}
function emptyBox(i,ti,p,btn,ghost){return'<section class="ak-card"><div class="ak-empty">'+(ghost?'<div class="ak-ghost"><i></i><i></i><i></i></div>':"")+'<span class="ak-ei">'+ic(i,32)+"</span><h3>"+e(ti)+"</h3>"+(p?"<p>"+e(p)+"</p>":"")+(btn||"")+"</div></section>"}
function segc(id,items,cur){return'<div class="ak-seg" id="'+id+'">'+items.map(function(x){return'<button type="button" data-v="'+x[0]+'"'+(x[0]===cur?' class="on"':"")+">"+e(x[1])+(x[2]!=null?"<em>"+A.num(x[2])+"</em>":"")+"</button>"}).join("")+"</div>"}
function bindSeg(id,fn){var s=document.getElementById(id);if(s)s.onclick=function(ev){var b=ev.target.closest("button");if(b)fn(b.dataset.v)}}
function av(s,cls){return'<span class="ak-av'+(cls?" "+cls:"")+'">'+e(String(s||"?").charAt(0).toUpperCase())+"</span>"}
function cnt(){return A.api("/admin/counts").then(null,function(){return{}})}
function cardHead(i,ti,p){return'<div class="ak-ch"><span class="ak-ci">'+ic(i,20)+"</span><div><h3>"+e(ti)+"</h3>"+(p?"<p>"+e(p)+"</p>":"")+"</div></div>"}
function confirmBox(title,text,okLabel,danger,go){
 var m=A.modal({title:title,body:'<p class="dim">'+e(text)+'</p><div class="prow"><button type="button" class="abtn" id="adNo">'+e(t("au.cancel","Cancel"))+'</button><button type="button" class="abtn pri'+(danger?" bad":"")+'" id="adYes">'+e(okLabel)+"</button></div>"});
 m.body.querySelector("#adNo").onclick=m.close;
 m.body.querySelector("#adYes").onclick=function(){var y=this;y.disabled=true;go(m,y)}
}
function ic(d,n){return A.icon(d,n||20)}
function kpi(i,n,l,o){o=o||{};var tag=o.href?"a":"div";return"<"+tag+(o.href?' href="'+o.href+'"':"")+' class="ak-k'+(o.hot?" hot":"")+'"><span class="kg"></span><span class="ki">'+ic(i)+"</span><b>"+A.num(n||0)+"</b><span>"+e(l)+"</span>"+(o.sub?"<small>"+e(o.sub)+"</small>":"")+"</"+tag+">"}
function kpis(list){return'<div class="ak-k4">'+list.join("")+"</div>"}
function emptyBox(i,ti,p,btn,ghost){return'<section class="ak-card"><div class="ak-empty">'+(ghost?'<div class="ak-ghost"><i></i><i></i><i></i></div>':"")+'<span class="ak-ei">'+ic(i,32)+"</span><h3>"+e(ti)+"</h3>"+(p?"<p>"+e(p)+"</p>":"")+(btn||"")+"</div></section>"}
function segc(id,items,cur){return'<div class="ak-seg" id="'+id+'">'+items.map(function(x){return'<button type="button" data-v="'+x[0]+'"'+(x[0]===cur?' class="on"':"")+">"+e(x[1])+(x[2]!=null?"<em>"+A.num(x[2])+"</em>":"")+"</button>"}).join("")+"</div>"}
function bindSeg(id,fn){var s=document.getElementById(id);if(s)s.onclick=function(ev){var b=ev.target.closest("button");if(b)fn(b.dataset.v)}}
function av(s,cls){return'<span class="ak-av'+(cls?" "+cls:"")+'">'+e(String(s||"?").charAt(0).toUpperCase())+"</span>"}
function cnt(){return A.api("/admin/counts").then(null,function(){return{}})}
function cardHead(i,ti,p){return'<div class="ak-ch"><span class="ak-ci">'+ic(i,20)+"</span><div><h3>"+e(ti)+"</h3>"+(p?"<p>"+e(p)+"</p>":"")+"</div></div>"}
function confirmBox(title,text,okLabel,danger,go){
 var m=A.modal({title:title,body:'<p class="dim">'+e(text)+'</p><div class="prow"><button type="button" class="abtn" id="adNo">'+e(t("au.cancel","Cancel"))+'</button><button type="button" class="abtn pri'+(danger?" bad":"")+'" id="adYes">'+e(okLabel)+"</button></div>"});
 m.body.querySelector("#adNo").onclick=m.close;
 m.body.querySelector("#adYes").onclick=function(){var y=this;y.disabled=true;go(m,y)}
}
function ic(d,n){return A.icon(d,n||20)}
function kpi(i,n,l,o){o=o||{};var tag=o.href?"a":"div";return"<"+tag+(o.href?' href="'+o.href+'"':"")+' class="ak-k'+(o.hot?" hot":"")+'"><span class="kg"></span><span class="ki">'+ic(i)+"</span><b>"+A.num(n||0)+"</b><span>"+e(l)+"</span>"+(o.sub?"<small>"+e(o.sub)+"</small>":"")+"</"+tag+">"}
function kpis(list){return'<div class="ak-k4">'+list.join("")+"</div>"}
function emptyBox(i,ti,p,btn,ghost){return'<section class="ak-card"><div class="ak-empty">'+(ghost?'<div class="ak-ghost"><i></i><i></i><i></i></div>':"")+'<span class="ak-ei">'+ic(i,32)+"</span><h3>"+e(ti)+"</h3>"+(p?"<p>"+e(p)+"</p>":"")+(btn||"")+"</div></section>"}
function segc(id,items,cur){return'<div class="ak-seg" id="'+id+'">'+items.map(function(x){return'<button type="button" data-v="'+x[0]+'"'+(x[0]===cur?' class="on"':"")+">"+e(x[1])+(x[2]!=null?"<em>"+A.num(x[2])+"</em>":"")+"</button>"}).join("")+"</div>"}
function bindSeg(id,fn){var s=document.getElementById(id);if(s)s.onclick=function(ev){var b=ev.target.closest("button");if(b)fn(b.dataset.v)}}
function av(s,cls){return'<span class="ak-av'+(cls?" "+cls:"")+'">'+e(String(s||"?").charAt(0).toUpperCase())+"</span>"}
function cnt(){return A.api("/admin/counts").then(null,function(){return{}})}
function cardHead(i,ti,p){return'<div class="ak-ch"><span class="ak-ci">'+ic(i,20)+"</span><div><h3>"+e(ti)+"</h3>"+(p?"<p>"+e(p)+"</p>":"")+"</div></div>"}
function confirmBox(title,text,okLabel,danger,go){
 var m=A.modal({title:title,body:'<p class="dim">'+e(text)+'</p><div class="prow"><button type="button" class="abtn" id="adNo">'+e(t("au.cancel","Cancel"))+'</button><button type="button" class="abtn pri'+(danger?" bad":"")+'" id="adYes">'+e(okLabel)+"</button></div>"});
 m.body.querySelector("#adNo").onclick=m.close;
 m.body.querySelector("#adYes").onclick=function(){var y=this;y.disabled=true;go(m,y)}
}
function ic(d,n){return A.icon(d,n||20)}
function kpi(i,n,l,o){o=o||{};var tag=o.href?"a":"div";return"<"+tag+(o.href?' href="'+o.href+'"':"")+' class="ak-k'+(o.hot?" hot":"")+'"><span class="kg"></span><span class="ki">'+ic(i)+"</span><b>"+A.num(n||0)+"</b><span>"+e(l)+"</span>"+(o.sub?"<small>"+e(o.sub)+"</small>":"")+"</"+tag+">"}
function kpis(list){return'<div class="ak-k4">'+list.join("")+"</div>"}
function emptyBox(i,ti,p,btn,ghost){return'<section class="ak-card"><div class="ak-empty">'+(ghost?'<div class="ak-ghost"><i></i><i></i><i></i></div>':"")+'<span class="ak-ei">'+ic(i,32)+"</span><h3>"+e(ti)+"</h3>"+(p?"<p>"+e(p)+"</p>":"")+(btn||"")+"</div></section>"}
function segc(id,items,cur){return'<div class="ak-seg" id="'+id+'">'+items.map(function(x){return'<button type="button" data-v="'+x[0]+'"'+(x[0]===cur?' class="on"':"")+">"+e(x[1])+(x[2]!=null?"<em>"+A.num(x[2])+"</em>":"")+"</button>"}).join("")+"</div>"}
function bindSeg(id,fn){var s=document.getElementById(id);if(s)s.onclick=function(ev){var b=ev.target.closest("button");if(b)fn(b.dataset.v)}}
function av(s,cls){return'<span class="ak-av'+(cls?" "+cls:"")+'">'+e(String(s||"?").charAt(0).toUpperCase())+"</span>"}
function cnt(){return A.api("/admin/counts").then(null,function(){return{}})}
function cardHead(i,ti,p){return'<div class="ak-ch"><span class="ak-ci">'+ic(i,20)+"</span><div><h3>"+e(ti)+"</h3>"+(p?"<p>"+e(p)+"</p>":"")+"</div></div>"}
function confirmBox(title,text,okLabel,danger,go){
 var m=A.modal({title:title,body:'<p class="dim">'+e(text)+'</p><div class="prow"><button type="button" class="abtn" id="adNo">'+e(t("au.cancel","Cancel"))+'</button><button type="button" class="abtn pri'+(danger?" bad":"")+'" id="adYes">'+e(okLabel)+"</button></div>"});
 m.body.querySelector("#adNo").onclick=m.close;
 m.body.querySelector("#adYes").onclick=function(){var y=this;y.disabled=true;go(m,y)}
}
function ic(d,n){return A.icon(d,n||20)}
function kpi(i,n,l,o){o=o||{};var tag=o.href?"a":"div";return"<"+tag+(o.href?' href="'+o.href+'"':"")+' class="ak-k'+(o.hot?" hot":"")+'"><span class="kg"></span><span class="ki">'+ic(i)+"</span><b>"+A.num(n||0)+"</b><span>"+e(l)+"</span>"+(o.sub?"<small>"+e(o.sub)+"</small>":"")+"</"+tag+">"}
function kpis(list){return'<div class="ak-k4">'+list.join("")+"</div>"}
function emptyBox(i,ti,p,btn,ghost){return'<section class="ak-card"><div class="ak-empty">'+(ghost?'<div class="ak-ghost"><i></i><i></i><i></i></div>':"")+'<span class="ak-ei">'+ic(i,32)+"</span><h3>"+e(ti)+"</h3>"+(p?"<p>"+e(p)+"</p>":"")+(btn||"")+"</div></section>"}
function segc(id,items,cur){return'<div class="ak-seg" id="'+id+'">'+items.map(function(x){return'<button type="button" data-v="'+x[0]+'"'+(x[0]===cur?' class="on"':"")+">"+e(x[1])+(x[2]!=null?"<em>"+A.num(x[2])+"</em>":"")+"</button>"}).join("")+"</div>"}
function bindSeg(id,fn){var s=document.getElementById(id);if(s)s.onclick=function(ev){var b=ev.target.closest("button");if(b)fn(b.dataset.v)}}
function av(s,cls){return'<span class="ak-av'+(cls?" "+cls:"")+'">'+e(String(s||"?").charAt(0).toUpperCase())+"</span>"}
function cnt(){return A.api("/admin/counts").then(null,function(){return{}})}
function cardHead(i,ti,p){return'<div class="ak-ch"><span class="ak-ci">'+ic(i,20)+"</span><div><h3>"+e(ti)+"</h3>"+(p?"<p>"+e(p)+"</p>":"")+"</div></div>"}
function confirmBox(title,text,okLabel,danger,go){
 var m=A.modal({title:title,body:'<p class="dim">'+e(text)+'</p><div class="prow"><button type="button" class="abtn" id="adNo">'+e(t("au.cancel","Cancel"))+'</button><button type="button" class="abtn pri'+(danger?" bad":"")+'" id="adYes">'+e(okLabel)+"</button></div>"});
 m.body.querySelector("#adNo").onclick=m.close;
 m.body.querySelector("#adYes").onclick=function(){var y=this;y.disabled=true;go(m,y)}
}
function ic(d,n){return A.icon(d,n||20)}
function kpi(i,n,l,o){o=o||{};var tag=o.href?"a":"div";return"<"+tag+(o.href?' href="'+o.href+'"':"")+' class="ak-k'+(o.hot?" hot":"")+'"><span class="kg"></span><span class="ki">'+ic(i)+"</span><b>"+A.num(n||0)+"</b><span>"+e(l)+"</span>"+(o.sub?"<small>"+e(o.sub)+"</small>":"")+"</"+tag+">"}
function kpis(list){return'<div class="ak-k4">'+list.join("")+"</div>"}
function emptyBox(i,ti,p,btn,ghost){return'<section class="ak-card"><div class="ak-empty">'+(ghost?'<div class="ak-ghost"><i></i><i></i><i></i></div>':"")+'<span class="ak-ei">'+ic(i,32)+"</span><h3>"+e(ti)+"</h3>"+(p?"<p>"+e(p)+"</p>":"")+(btn||"")+"</div></section>"}
function segc(id,items,cur){return'<div class="ak-seg" id="'+id+'">'+items.map(function(x){return'<button type="button" data-v="'+x[0]+'"'+(x[0]===cur?' class="on"':"")+">"+e(x[1])+(x[2]!=null?"<em>"+A.num(x[2])+"</em>":"")+"</button>"}).join("")+"</div>"}
function bindSeg(id,fn){var s=document.getElementById(id);if(s)s.onclick=function(ev){var b=ev.target.closest("button");if(b)fn(b.dataset.v)}}
function av(s,cls){return'<span class="ak-av'+(cls?" "+cls:"")+'">'+e(String(s||"?").charAt(0).toUpperCase())+"</span>"}
function cnt(){return A.api("/admin/counts").then(null,function(){return{}})}
function cardHead(i,ti,p){return'<div class="ak-ch"><span class="ak-ci">'+ic(i,20)+"</span><div><h3>"+e(ti)+"</h3>"+(p?"<p>"+e(p)+"</p>":"")+"</div></div>"}
function confirmBox(title,text,okLabel,danger,go){
 var m=A.modal({title:title,body:'<p class="dim">'+e(text)+'</p><div class="prow"><button type="button" class="abtn" id="adNo">'+e(t("au.cancel","Cancel"))+'</button><button type="button" class="abtn pri'+(danger?" bad":"")+'" id="adYes">'+e(okLabel)+"</button></div>"});
 m.body.querySelector("#adNo").onclick=m.close;
 m.body.querySelector("#adYes").onclick=function(){var y=this;y.disabled=true;go(m,y)}
}
function ic(d,n){return A.icon(d,n||20)}
function kpi(i,n,l,o){o=o||{};var tag=o.href?"a":"div";return"<"+tag+(o.href?' href="'+o.href+'"':"")+' class="ak-k'+(o.hot?" hot":"")+'"><span class="kg"></span><span class="ki">'+ic(i)+"</span><b>"+A.num(n||0)+"</b><span>"+e(l)+"</span>"+(o.sub?"<small>"+e(o.sub)+"</small>":"")+"</"+tag+">"}
function kpis(list){return'<div class="ak-k4">'+list.join("")+"</div>"}
function emptyBox(i,ti,p,btn,ghost){return'<section class="ak-card"><div class="ak-empty">'+(ghost?'<div class="ak-ghost"><i></i><i></i><i></i></div>':"")+'<span class="ak-ei">'+ic(i,32)+"</span><h3>"+e(ti)+"</h3>"+(p?"<p>"+e(p)+"</p>":"")+(btn||"")+"</div></section>"}
function segc(id,items,cur){return'<div class="ak-seg" id="'+id+'">'+items.map(function(x){return'<button type="button" data-v="'+x[0]+'"'+(x[0]===cur?' class="on"':"")+">"+e(x[1])+(x[2]!=null?"<em>"+A.num(x[2])+"</em>":"")+"</button>"}).join("")+"</div>"}
function bindSeg(id,fn){var s=document.getElementById(id);if(s)s.onclick=function(ev){var b=ev.target.closest("button");if(b)fn(b.dataset.v)}}
function av(s,cls){return'<span class="ak-av'+(cls?" "+cls:"")+'">'+e(String(s||"?").charAt(0).toUpperCase())+"</span>"}
function cnt(){return A.api("/admin/counts").then(null,function(){return{}})}
function cardHead(i,ti,p){return'<div class="ak-ch"><span class="ak-ci">'+ic(i,20)+"</span><div><h3>"+e(ti)+"</h3>"+(p?"<p>"+e(p)+"</p>":"")+"</div></div>"}
function confirmBox(title,text,okLabel,danger,go){
 var m=A.modal({title:title,body:'<p class="dim">'+e(text)+'</p><div class="prow"><button type="button" class="abtn" id="adNo">'+e(t("au.cancel","Cancel"))+'</button><button type="button" class="abtn pri'+(danger?" bad":"")+'" id="adYes">'+e(okLabel)+"</button></div>"});
 m.body.querySelector("#adNo").onclick=m.close;
 m.body.querySelector("#adYes").onclick=function(){var y=this;y.disabled=true;go(m,y)}
}
function tile(n,l,ic,href,cls){return'<'+(href?'a href="'+href+'"':"div")+' class="ad-tile'+(cls?" "+cls:"")+'"><span class="ad-ti">'+A.icon(ic,20)+"</span><b>"+A.num(n)+"</b><span>"+e(l)+"</span></"+(href?"a":"div")+">"}
function panel(ic,ttl,body,cls){return'<section class="dsh-p'+(cls?" "+cls:"")+'"><header><span class="dsh-i">'+A.icon(ic,18)+"</span><h3>"+e(ttl)+"</h3></header>"+body+"</section>"}
function spark(v){var mx=Math.max.apply(null,[1].concat(v));return'<div class="dsh-sp" aria-hidden="true">'+v.map(function(x){return'<i style="height:'+Math.max(8,Math.round(x/mx*100))+'%"></i>'}).join("")+"</div>"}
function stat(n,l){return'<div class="dsh-s"><b>'+A.num(n)+"</b><span>"+e(l)+"</span></div>"}
function attn(n,l,ic,href){return'<a class="dsh-a'+(n?" hot":"")+'" href="'+href+'"><span class="dsh-i">'+A.icon(ic,20)+"</span><b>"+A.num(n)+"</b><span>"+e(l)+"</span>"+(n?"":"<small>"+e(t("ad.o.ok","All clear"))+"</small>")+"</a>"}
function seg(parts){var tot=parts.reduce(function(a,x){return a+x.v},0);return'<div class="dsh-seg">'+parts.map(function(x,i){return'<i class="c'+i+'" style="flex:'+(tot?x.v:1)+'"></i>'}).join("")+'</div><div class="dsh-lg">'+parts.map(function(x,i){return'<div><i class="c'+i+'"></i><span>'+e(x.l)+"</span><b>"+A.num(x.v)+"</b></div>"}).join("")+"</div>"}
function rows(list,total){return'<div class="dsh-rows">'+list.map(function(x){var w=total?Math.round(x.v/total*100):0;return'<div class="dsh-r"><i style="width:'+w+'%"></i><span>'+x.l+"</span><b>"+A.num(x.v)+"</b></div>"}).join("")+"</div>"}
function areaSvg(dy){
 var W=760,H=270,L=46,R=16,T=18,B=34,n=dy.length;
 var mx=Math.max.apply(null,[10].concat(dy.map(function(x){return x.sent})));
 var st=Math.pow(10,Math.floor(Math.log(mx)/Math.LN10)),top=Math.ceil(mx/st)*st;
 var bm=Math.max.apply(null,[1].concat(dy.map(function(x){return x.bounced+x.complained})));
 function X(i){return L+(W-L-R)*i/(n-1)}
 function Y(v){return T+(H-T-B)*(1-v/top)}
 var p=dy.map(function(x,i){return[X(i),Y(x.sent)]});
 function cv(a){var s="M"+a[0][0].toFixed(1)+","+a[0][1].toFixed(1);for(var i=0;i<a.length-1;i++){var p0=a[i-1]||a[i],p1=a[i],p2=a[i+1],p3=a[i+2]||p2;s+=" C"+(p1[0]+(p2[0]-p0[0])/6).toFixed(1)+","+(p1[1]+(p2[1]-p0[1])/6).toFixed(1)+" "+(p2[0]-(p3[0]-p1[0])/6).toFixed(1)+","+(p2[1]-(p3[1]-p1[1])/6).toFixed(1)+" "+p2[0].toFixed(1)+","+p2[1].toFixed(1)}return s}
 var base=H-B,line=cv(p),area=line+" L"+X(n-1).toFixed(1)+","+base+" L"+X(0).toFixed(1)+","+base+" Z";
 var g="";for(var k=0;k<=4;k++){var v=top*k/4,y=Y(v);g+='<line x1="'+L+'" x2="'+(W-R)+'" y1="'+y.toFixed(1)+'" y2="'+y.toFixed(1)+'" stroke="currentColor" stroke-opacity="'+(k?".08":".18")+'"'+(k?' stroke-dasharray="3 6"':"")+'/><text x="'+(L-10)+'" y="'+(y+4).toFixed(1)+'" text-anchor="end" font-size="11" fill="currentColor" fill-opacity=".45">'+A.num(Math.round(v))+"</text>"}
 var bars="",lab="",hit="";
 dy.forEach(function(x,i){var bh=Math.round((x.bounced+x.complained)/bm*30);var cx=X(i);if(x.bounced+x.complained)bars+='<rect x="'+(cx-5).toFixed(1)+'" y="'+(base-bh)+'" width="10" height="'+bh+'" rx="4" fill="currentColor" fill-opacity=".28"/>';
  if(i%2===n%2||i===n-1&&false)lab+='<text x="'+cx.toFixed(1)+'" y="'+(H-10)+'" text-anchor="middle" font-size="11" fill="currentColor" fill-opacity=".45">'+x.d.slice(8)+"."+x.d.slice(5,7)+"</text>";
  hit+='<rect x="'+(cx-(W-L-R)/n/2).toFixed(1)+'" y="'+T+'" width="'+((W-L-R)/n).toFixed(1)+'" height="'+(H-T-B)+'" fill="transparent"><title>'+x.d+": "+A.num(x.sent)+" / "+A.num(x.bounced+x.complained)+"</title></rect>"});
 var lp=p[n-1];
 return'<svg class="ov-svg" viewBox="0 0 '+W+" "+H+'" role="img" aria-label="'+e(t("ad.o.mail14","Emails in 14 days"))+'"><defs><linearGradient id="ovG" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="currentColor" stop-opacity=".32"/><stop offset="1" stop-color="currentColor" stop-opacity="0"/></linearGradient></defs>'+g+bars+'<path d="'+area+'" fill="url(#ovG)"/><path d="'+line+'" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"/>'+lab+'<line x1="'+lp[0].toFixed(1)+'" x2="'+lp[0].toFixed(1)+'" y1="'+lp[1].toFixed(1)+'" y2="'+base+'" stroke="currentColor" stroke-opacity=".3" stroke-dasharray="2 4"/><circle cx="'+lp[0].toFixed(1)+'" cy="'+lp[1].toFixed(1)+'" r="6" fill="var(--a-bg)" stroke="currentColor" stroke-width="2.4"/>'+hit+"</svg>"
}
function ringSvg(parts,ct,sub){
 var r=44,c=2*Math.PI*r,tot=parts.reduce(function(a,x){return a+x.v},0)||1,off=0,s="";
 parts.forEach(function(x){var l=x.v/tot*c;if(l<=0)return;s+='<circle cx="60" cy="60" r="'+r+'" fill="none" stroke="currentColor" stroke-opacity="'+x.o+'" stroke-width="13" stroke-dasharray="'+Math.max(0,l-4).toFixed(1)+" "+(c-Math.max(0,l-4)).toFixed(1)+'" stroke-dashoffset="'+(-off).toFixed(1)+'" stroke-linecap="round" transform="rotate(-90 60 60)"/>';off+=l});
 return'<div class="ov-ring"><svg viewBox="0 0 120 120" width="132" height="132"><circle cx="60" cy="60" r="'+r+'" fill="none" stroke="currentColor" stroke-opacity=".08" stroke-width="13"/>'+s+'</svg><div><b>'+e(ct)+"</b><span>"+e(sub||"")+"</span></div></div>"
}
function areaSvg(dy){
 var W=760,H=270,L=46,R=16,T=18,B=34,n=dy.length;
 var mx=Math.max.apply(null,[10].concat(dy.map(function(x){return x.sent})));
 var st=Math.pow(10,Math.floor(Math.log(mx)/Math.LN10)),top=Math.ceil(mx/st)*st;
 var bm=Math.max.apply(null,[1].concat(dy.map(function(x){return x.bounced+x.complained})));
 function X(i){return L+(W-L-R)*i/(n-1)}
 function Y(v){return T+(H-T-B)*(1-v/top)}
 var p=dy.map(function(x,i){return[X(i),Y(x.sent)]});
 function cv(a){var s="M"+a[0][0].toFixed(1)+","+a[0][1].toFixed(1);for(var i=0;i<a.length-1;i++){var p0=a[i-1]||a[i],p1=a[i],p2=a[i+1],p3=a[i+2]||p2;s+=" C"+(p1[0]+(p2[0]-p0[0])/6).toFixed(1)+","+(p1[1]+(p2[1]-p0[1])/6).toFixed(1)+" "+(p2[0]-(p3[0]-p1[0])/6).toFixed(1)+","+(p2[1]-(p3[1]-p1[1])/6).toFixed(1)+" "+p2[0].toFixed(1)+","+p2[1].toFixed(1)}return s}
 var base=H-B,line=cv(p),area=line+" L"+X(n-1).toFixed(1)+","+base+" L"+X(0).toFixed(1)+","+base+" Z";
 var g="";for(var k=0;k<=4;k++){var v=top*k/4,y=Y(v);g+='<line x1="'+L+'" x2="'+(W-R)+'" y1="'+y.toFixed(1)+'" y2="'+y.toFixed(1)+'" stroke="currentColor" stroke-opacity="'+(k?".08":".18")+'"'+(k?' stroke-dasharray="3 6"':"")+'/><text x="'+(L-10)+'" y="'+(y+4).toFixed(1)+'" text-anchor="end" font-size="11" fill="currentColor" fill-opacity=".45">'+A.num(Math.round(v))+"</text>"}
 var bars="",lab="",hit="";
 dy.forEach(function(x,i){var bh=Math.round((x.bounced+x.complained)/bm*30);var cx=X(i);if(x.bounced+x.complained)bars+='<rect x="'+(cx-5).toFixed(1)+'" y="'+(base-bh)+'" width="10" height="'+bh+'" rx="4" fill="currentColor" fill-opacity=".28"/>';
  if(i%2===n%2||i===n-1&&false)lab+='<text x="'+cx.toFixed(1)+'" y="'+(H-10)+'" text-anchor="middle" font-size="11" fill="currentColor" fill-opacity=".45">'+x.d.slice(8)+"."+x.d.slice(5,7)+"</text>";
  hit+='<rect x="'+(cx-(W-L-R)/n/2).toFixed(1)+'" y="'+T+'" width="'+((W-L-R)/n).toFixed(1)+'" height="'+(H-T-B)+'" fill="transparent"><title>'+x.d+": "+A.num(x.sent)+" / "+A.num(x.bounced+x.complained)+"</title></rect>"});
 var lp=p[n-1];
 return'<svg class="ov-svg" viewBox="0 0 '+W+" "+H+'" role="img" aria-label="'+e(t("ad.o.mail14","Emails in 14 days"))+'"><defs><linearGradient id="ovG" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="currentColor" stop-opacity=".32"/><stop offset="1" stop-color="currentColor" stop-opacity="0"/></linearGradient></defs>'+g+bars+'<path d="'+area+'" fill="url(#ovG)"/><path d="'+line+'" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"/>'+lab+'<line x1="'+lp[0].toFixed(1)+'" x2="'+lp[0].toFixed(1)+'" y1="'+lp[1].toFixed(1)+'" y2="'+base+'" stroke="currentColor" stroke-opacity=".3" stroke-dasharray="2 4"/><circle cx="'+lp[0].toFixed(1)+'" cy="'+lp[1].toFixed(1)+'" r="6" fill="var(--a-bg)" stroke="currentColor" stroke-width="2.4"/>'+hit+"</svg>"
}
function ringSvg(parts,ct,sub){
 var r=44,c=2*Math.PI*r,tot=parts.reduce(function(a,x){return a+x.v},0)||1,off=0,s="";
 parts.forEach(function(x){var l=x.v/tot*c;if(l<=0)return;s+='<circle cx="60" cy="60" r="'+r+'" fill="none" stroke="currentColor" stroke-opacity="'+x.o+'" stroke-width="13" stroke-dasharray="'+Math.max(0,l-4).toFixed(1)+" "+(c-Math.max(0,l-4)).toFixed(1)+'" stroke-dashoffset="'+(-off).toFixed(1)+'" stroke-linecap="round" transform="rotate(-90 60 60)"/>';off+=l});
 return'<div class="ov-ring"><svg viewBox="0 0 120 120" width="132" height="132"><circle cx="60" cy="60" r="'+r+'" fill="none" stroke="currentColor" stroke-opacity=".08" stroke-width="13"/>'+s+'</svg><div><b>'+e(ct)+"</b><span>"+e(sub||"")+"</span></div></div>"
}
function areaSvg(dy){
 var W=760,H=270,L=46,R=16,T=18,B=34,n=dy.length;
 var mx=Math.max.apply(null,[10].concat(dy.map(function(x){return x.sent})));
 var st=Math.pow(10,Math.floor(Math.log(mx)/Math.LN10)),top=Math.ceil(mx/st)*st;
 var bm=Math.max.apply(null,[1].concat(dy.map(function(x){return x.bounced+x.complained})));
 function X(i){return L+(W-L-R)*i/(n-1)}
 function Y(v){return T+(H-T-B)*(1-v/top)}
 var p=dy.map(function(x,i){return[X(i),Y(x.sent)]});
 function cv(a){var s="M"+a[0][0].toFixed(1)+","+a[0][1].toFixed(1);for(var i=0;i<a.length-1;i++){var p0=a[i-1]||a[i],p1=a[i],p2=a[i+1],p3=a[i+2]||p2;s+=" C"+(p1[0]+(p2[0]-p0[0])/6).toFixed(1)+","+(p1[1]+(p2[1]-p0[1])/6).toFixed(1)+" "+(p2[0]-(p3[0]-p1[0])/6).toFixed(1)+","+(p2[1]-(p3[1]-p1[1])/6).toFixed(1)+" "+p2[0].toFixed(1)+","+p2[1].toFixed(1)}return s}
 var base=H-B,line=cv(p),area=line+" L"+X(n-1).toFixed(1)+","+base+" L"+X(0).toFixed(1)+","+base+" Z";
 var g="";for(var k=0;k<=4;k++){var v=top*k/4,y=Y(v);g+='<line x1="'+L+'" x2="'+(W-R)+'" y1="'+y.toFixed(1)+'" y2="'+y.toFixed(1)+'" stroke="currentColor" stroke-opacity="'+(k?".08":".18")+'"'+(k?' stroke-dasharray="3 6"':"")+'/><text x="'+(L-10)+'" y="'+(y+4).toFixed(1)+'" text-anchor="end" font-size="11" fill="currentColor" fill-opacity=".45">'+A.num(Math.round(v))+"</text>"}
 var bars="",lab="",hit="";
 dy.forEach(function(x,i){var bh=Math.round((x.bounced+x.complained)/bm*30);var cx=X(i);if(x.bounced+x.complained)bars+='<rect x="'+(cx-5).toFixed(1)+'" y="'+(base-bh)+'" width="10" height="'+bh+'" rx="4" fill="currentColor" fill-opacity=".28"/>';
  if(i%2===n%2||i===n-1&&false)lab+='<text x="'+cx.toFixed(1)+'" y="'+(H-10)+'" text-anchor="middle" font-size="11" fill="currentColor" fill-opacity=".45">'+x.d.slice(8)+"."+x.d.slice(5,7)+"</text>";
  hit+='<rect x="'+(cx-(W-L-R)/n/2).toFixed(1)+'" y="'+T+'" width="'+((W-L-R)/n).toFixed(1)+'" height="'+(H-T-B)+'" fill="transparent"><title>'+x.d+": "+A.num(x.sent)+" / "+A.num(x.bounced+x.complained)+"</title></rect>"});
 var lp=p[n-1];
 return'<svg class="ov-svg" viewBox="0 0 '+W+" "+H+'" role="img" aria-label="'+e(t("ad.o.mail14","Emails in 14 days"))+'"><defs><linearGradient id="ovG" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="currentColor" stop-opacity=".32"/><stop offset="1" stop-color="currentColor" stop-opacity="0"/></linearGradient></defs>'+g+bars+'<path d="'+area+'" fill="url(#ovG)"/><path d="'+line+'" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"/>'+lab+'<line x1="'+lp[0].toFixed(1)+'" x2="'+lp[0].toFixed(1)+'" y1="'+lp[1].toFixed(1)+'" y2="'+base+'" stroke="currentColor" stroke-opacity=".3" stroke-dasharray="2 4"/><circle cx="'+lp[0].toFixed(1)+'" cy="'+lp[1].toFixed(1)+'" r="6" fill="var(--a-bg)" stroke="currentColor" stroke-width="2.4"/>'+hit+"</svg>"
}
function ringSvg(parts,ct,sub){
 var r=44,c=2*Math.PI*r,tot=parts.reduce(function(a,x){return a+x.v},0)||1,off=0,s="";
 parts.forEach(function(x){var l=x.v/tot*c;if(l<=0)return;s+='<circle cx="60" cy="60" r="'+r+'" fill="none" stroke="currentColor" stroke-opacity="'+x.o+'" stroke-width="13" stroke-dasharray="'+Math.max(0,l-4).toFixed(1)+" "+(c-Math.max(0,l-4)).toFixed(1)+'" stroke-dashoffset="'+(-off).toFixed(1)+'" stroke-linecap="round" transform="rotate(-90 60 60)"/>';off+=l});
 return'<div class="ov-ring"><svg viewBox="0 0 120 120" width="132" height="132"><circle cx="60" cy="60" r="'+r+'" fill="none" stroke="currentColor" stroke-opacity=".08" stroke-width="13"/>'+s+'</svg><div><b>'+e(ct)+"</b><span>"+e(sub||"")+"</span></div></div>"
}
function areaSvg(dy){
 var W=760,H=270,L=46,R=16,T=18,B=34,n=dy.length;
 var mx=Math.max.apply(null,[10].concat(dy.map(function(x){return x.sent})));
 var st=Math.pow(10,Math.floor(Math.log(mx)/Math.LN10)),top=Math.ceil(mx/st)*st;
 var bm=Math.max.apply(null,[1].concat(dy.map(function(x){return x.bounced+x.complained})));
 function X(i){return L+(W-L-R)*i/(n-1)}
 function Y(v){return T+(H-T-B)*(1-v/top)}
 var p=dy.map(function(x,i){return[X(i),Y(x.sent)]});
 function cv(a){var s="M"+a[0][0].toFixed(1)+","+a[0][1].toFixed(1);for(var i=0;i<a.length-1;i++){var p0=a[i-1]||a[i],p1=a[i],p2=a[i+1],p3=a[i+2]||p2;s+=" C"+(p1[0]+(p2[0]-p0[0])/6).toFixed(1)+","+(p1[1]+(p2[1]-p0[1])/6).toFixed(1)+" "+(p2[0]-(p3[0]-p1[0])/6).toFixed(1)+","+(p2[1]-(p3[1]-p1[1])/6).toFixed(1)+" "+p2[0].toFixed(1)+","+p2[1].toFixed(1)}return s}
 var base=H-B,line=cv(p),area=line+" L"+X(n-1).toFixed(1)+","+base+" L"+X(0).toFixed(1)+","+base+" Z";
 var g="";for(var k=0;k<=4;k++){var v=top*k/4,y=Y(v);g+='<line x1="'+L+'" x2="'+(W-R)+'" y1="'+y.toFixed(1)+'" y2="'+y.toFixed(1)+'" stroke="currentColor" stroke-opacity="'+(k?".08":".18")+'"'+(k?' stroke-dasharray="3 6"':"")+'/><text x="'+(L-10)+'" y="'+(y+4).toFixed(1)+'" text-anchor="end" font-size="11" fill="currentColor" fill-opacity=".45">'+A.num(Math.round(v))+"</text>"}
 var bars="",lab="",hit="";
 dy.forEach(function(x,i){var bh=Math.round((x.bounced+x.complained)/bm*30);var cx=X(i);if(x.bounced+x.complained)bars+='<rect x="'+(cx-5).toFixed(1)+'" y="'+(base-bh)+'" width="10" height="'+bh+'" rx="4" fill="currentColor" fill-opacity=".28"/>';
  if(i%2===n%2||i===n-1&&false)lab+='<text x="'+cx.toFixed(1)+'" y="'+(H-10)+'" text-anchor="middle" font-size="11" fill="currentColor" fill-opacity=".45">'+x.d.slice(8)+"."+x.d.slice(5,7)+"</text>";
  hit+='<rect x="'+(cx-(W-L-R)/n/2).toFixed(1)+'" y="'+T+'" width="'+((W-L-R)/n).toFixed(1)+'" height="'+(H-T-B)+'" fill="transparent"><title>'+x.d+": "+A.num(x.sent)+" / "+A.num(x.bounced+x.complained)+"</title></rect>"});
 var lp=p[n-1];
 return'<svg class="ov-svg" viewBox="0 0 '+W+" "+H+'" role="img" aria-label="'+e(t("ad.o.mail14","Emails in 14 days"))+'"><defs><linearGradient id="ovG" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="currentColor" stop-opacity=".32"/><stop offset="1" stop-color="currentColor" stop-opacity="0"/></linearGradient></defs>'+g+bars+'<path d="'+area+'" fill="url(#ovG)"/><path d="'+line+'" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"/>'+lab+'<line x1="'+lp[0].toFixed(1)+'" x2="'+lp[0].toFixed(1)+'" y1="'+lp[1].toFixed(1)+'" y2="'+base+'" stroke="currentColor" stroke-opacity=".3" stroke-dasharray="2 4"/><circle cx="'+lp[0].toFixed(1)+'" cy="'+lp[1].toFixed(1)+'" r="6" fill="var(--a-bg)" stroke="currentColor" stroke-width="2.4"/>'+hit+"</svg>"
}
function ringSvg(parts,ct,sub){
 var r=44,c=2*Math.PI*r,tot=parts.reduce(function(a,x){return a+x.v},0)||1,off=0,s="";
 parts.forEach(function(x){var l=x.v/tot*c;if(l<=0)return;s+='<circle cx="60" cy="60" r="'+r+'" fill="none" stroke="currentColor" stroke-opacity="'+x.o+'" stroke-width="13" stroke-dasharray="'+Math.max(0,l-4).toFixed(1)+" "+(c-Math.max(0,l-4)).toFixed(1)+'" stroke-dashoffset="'+(-off).toFixed(1)+'" stroke-linecap="round" transform="rotate(-90 60 60)"/>';off+=l});
 return'<div class="ov-ring"><svg viewBox="0 0 120 120" width="132" height="132"><circle cx="60" cy="60" r="'+r+'" fill="none" stroke="currentColor" stroke-opacity=".08" stroke-width="13"/>'+s+'</svg><div><b>'+e(ct)+"</b><span>"+e(sub||"")+"</span></div></div>"
}
function areaSvg(dy){
 var W=760,H=270,L=46,R=16,T=18,B=34,n=dy.length;
 var mx=Math.max.apply(null,[10].concat(dy.map(function(x){return x.sent})));
 var st=Math.pow(10,Math.floor(Math.log(mx)/Math.LN10)),top=Math.ceil(mx/st)*st;
 var bm=Math.max.apply(null,[1].concat(dy.map(function(x){return x.bounced+x.complained})));
 function X(i){return L+(W-L-R)*i/(n-1)}
 function Y(v){return T+(H-T-B)*(1-v/top)}
 var p=dy.map(function(x,i){return[X(i),Y(x.sent)]});
 function cv(a){var s="M"+a[0][0].toFixed(1)+","+a[0][1].toFixed(1);for(var i=0;i<a.length-1;i++){var p0=a[i-1]||a[i],p1=a[i],p2=a[i+1],p3=a[i+2]||p2;s+=" C"+(p1[0]+(p2[0]-p0[0])/6).toFixed(1)+","+(p1[1]+(p2[1]-p0[1])/6).toFixed(1)+" "+(p2[0]-(p3[0]-p1[0])/6).toFixed(1)+","+(p2[1]-(p3[1]-p1[1])/6).toFixed(1)+" "+p2[0].toFixed(1)+","+p2[1].toFixed(1)}return s}
 var base=H-B,line=cv(p),area=line+" L"+X(n-1).toFixed(1)+","+base+" L"+X(0).toFixed(1)+","+base+" Z";
 var g="";for(var k=0;k<=4;k++){var v=top*k/4,y=Y(v);g+='<line x1="'+L+'" x2="'+(W-R)+'" y1="'+y.toFixed(1)+'" y2="'+y.toFixed(1)+'" stroke="currentColor" stroke-opacity="'+(k?".08":".18")+'"'+(k?' stroke-dasharray="3 6"':"")+'/><text x="'+(L-10)+'" y="'+(y+4).toFixed(1)+'" text-anchor="end" font-size="11" fill="currentColor" fill-opacity=".45">'+A.num(Math.round(v))+"</text>"}
 var bars="",lab="",hit="";
 dy.forEach(function(x,i){var bh=Math.round((x.bounced+x.complained)/bm*30);var cx=X(i);if(x.bounced+x.complained)bars+='<rect x="'+(cx-5).toFixed(1)+'" y="'+(base-bh)+'" width="10" height="'+bh+'" rx="4" fill="currentColor" fill-opacity=".28"/>';
  if(i%2===n%2||i===n-1&&false)lab+='<text x="'+cx.toFixed(1)+'" y="'+(H-10)+'" text-anchor="middle" font-size="11" fill="currentColor" fill-opacity=".45">'+x.d.slice(8)+"."+x.d.slice(5,7)+"</text>";
  hit+='<rect x="'+(cx-(W-L-R)/n/2).toFixed(1)+'" y="'+T+'" width="'+((W-L-R)/n).toFixed(1)+'" height="'+(H-T-B)+'" fill="transparent"><title>'+x.d+": "+A.num(x.sent)+" / "+A.num(x.bounced+x.complained)+"</title></rect>"});
 var lp=p[n-1];
 return'<svg class="ov-svg" viewBox="0 0 '+W+" "+H+'" role="img" aria-label="'+e(t("ad.o.mail14","Emails in 14 days"))+'"><defs><linearGradient id="ovG" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="currentColor" stop-opacity=".32"/><stop offset="1" stop-color="currentColor" stop-opacity="0"/></linearGradient></defs>'+g+bars+'<path d="'+area+'" fill="url(#ovG)"/><path d="'+line+'" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"/>'+lab+'<line x1="'+lp[0].toFixed(1)+'" x2="'+lp[0].toFixed(1)+'" y1="'+lp[1].toFixed(1)+'" y2="'+base+'" stroke="currentColor" stroke-opacity=".3" stroke-dasharray="2 4"/><circle cx="'+lp[0].toFixed(1)+'" cy="'+lp[1].toFixed(1)+'" r="6" fill="var(--a-bg)" stroke="currentColor" stroke-width="2.4"/>'+hit+"</svg>"
}
function ringSvg(parts,ct,sub){
 var r=44,c=2*Math.PI*r,tot=parts.reduce(function(a,x){return a+x.v},0)||1,off=0,s="";
 parts.forEach(function(x){var l=x.v/tot*c;if(l<=0)return;s+='<circle cx="60" cy="60" r="'+r+'" fill="none" stroke="currentColor" stroke-opacity="'+x.o+'" stroke-width="13" stroke-dasharray="'+Math.max(0,l-4).toFixed(1)+" "+(c-Math.max(0,l-4)).toFixed(1)+'" stroke-dashoffset="'+(-off).toFixed(1)+'" stroke-linecap="round" transform="rotate(-90 60 60)"/>';off+=l});
 return'<div class="ov-ring"><svg viewBox="0 0 120 120" width="132" height="132"><circle cx="60" cy="60" r="'+r+'" fill="none" stroke="currentColor" stroke-opacity=".08" stroke-width="13"/>'+s+'</svg><div><b>'+e(ct)+"</b><span>"+e(sub||"")+"</span></div></div>"
}
function ov(){
 Promise.all([A.api("/admin/overview"),A.api("/admin/analytics?days=7").then(function(x){return x&&x.totals?x:null},function(){return null}),cnt()]).then(function(r){
  var d=r[0],an=r[1],c=r[2],u=d.users||{},m=d.mail24h||{sent:0},q=d.queues||{},dy=d.daily||[];
  var act=Math.max(0,u.total-u.frozen-u.blocked);
  var s14=dy.reduce(function(a,x){return a+x.sent},0),b14=dy.reduce(function(a,x){return a+x.bounced+x.complained},0),n14=dy.reduce(function(a,x){return a+x.signups},0);
  var rate=s14?Math.round((s14-b14)/s14*1000)/10:100;
  var smx=Math.max.apply(null,[1].concat(dy.map(function(x){return x.signups})));
  var main='<section class="ak-card pad ov-main"><div class="ov-h"><div><span class="ov-k">'+e(t("ad.o.mail14","Emails in 14 days"))+'</span><b class="ov-big">'+A.num(s14)+'</b></div><div class="ov-lg"><span><i></i>'+e(t("ad.o.sent","Sent"))+'</span><span><i class="b"></i>'+e(t("ad.o.bc","Bounces and complaints"))+"</span></div></div>"+areaSvg(dy)+"</section>";
  var side='<div class="ov-side"><section class="ak-card pad ov-s"><span class="ov-k">'+e(t("ad.o.rate","Delivery rate"))+"</span>"+ringSvg([{v:s14-b14,o:.9},{v:b14,o:.3}],rate+"%",t("ad.o.l14","last 14 days"))+'</section><section class="ak-card pad ov-s"><span class="ov-k">'+e(t("ad.o.signups","New accounts"))+'</span><div class="ov-sg"><b class="ov-big">'+A.num(n14)+'</b><div class="ov-bars">'+dy.map(function(x){return'<i style="height:'+Math.max(6,Math.round(x.signups/smx*100))+'%" title="'+x.d+": "+x.signups+'"></i>'}).join("")+"</div></div></section></div>";
  var tiles=kpis([kpi(P.flag,q.flags_open,t("ad.o.flags","Open review flags"),{href:"/app/admin/review/",hot:!!q.flags_open}),kpi(P.map,q.siberia_pending,t("ad.o.sib","Siberia applications"),{href:"/app/admin/siberia/",hot:!!q.siberia_pending}),kpi(P.chat,c.tk_wait,t("ad.tk.wait","Waiting for you"),{href:"/app/admin/tickets/",hot:!!c.tk_wait,sub:A.num(q.tickets_open)+" "+t("ad.o.tickets","Open tickets").toLowerCase()}),kpi(P.mail,m.sent,t("ad.o.audit24","Sent in 24 hours"),{href:"/app/admin/audit/",sub:t("ad.t.audit","Mail audit")})]);
  var pl=["free","pro","business","enterprise"].map(function(k,i){return{k:k,v:u[k]||0,o:[.22,.45,.7,.95][i]}});
  var tot=u.total||1;
  var plans='<section class="ak-card pad">'+cardHead(P.star,t("ad.o.plans","Plans"))+'<div class="ov-stack">'+pl.map(function(x){return'<i style="flex:'+Math.max(x.v,.0001)+';opacity:'+x.o+'"></i>'}).join("")+'</div><div class="ak-lst" style="margin-top:20px">'+pl.map(function(x){return'<div class="ak-lr"><span><u class="ov-dot" style="opacity:'+x.o+'"></u>'+e(t("app.plan."+x.k,x.k))+"</span><b>"+A.num(x.v)+" · "+Math.round(x.v/tot*100)+"%</b></div>"}).join("")+"</div></section>";
  var st='<section class="ak-card pad">'+cardHead(P.users,t("ad.o.states","Account states"))+'<div class="ov-st">'+ringSvg([{v:act,o:.9},{v:u.frozen||0,o:.5},{v:u.blocked||0,o:.22}],A.num(u.total),t("ad.o.users","Accounts"))+'<div class="ak-lst" style="flex:1"><div class="ak-lr"><span><u class="ov-dot" style="opacity:.9"></u>'+e(t("ad.s.active","Active"))+"</span><b>"+A.num(act)+'</b></div><div class="ak-lr"><span><u class="ov-dot" style="opacity:.5"></u>'+e(t("ad.s.frozen","Frozen"))+"</span><b>"+A.num(u.frozen)+'</b></div><div class="ak-lr"><span><u class="ov-dot" style="opacity:.22"></u>'+e(t("ad.s.blocked","Blocked"))+"</span><b>"+A.num(u.blocked)+"</b></div>"+(an?'<div class="ak-lr"><span><u class="ov-dot" style="opacity:0;box-shadow:inset 0 0 0 1.5px currentColor"></u>'+e(t("ad.an.vis","Visitors"))+"</span><b>"+A.num(an.totals.visitors)+"</b></div>":"")+"</div></div></section>";
  shell('<div class="ov-g">'+main+side+"</div>"+tiles+'<div class="ak-two">'+plans+st+"</div>")
 },function(x){fail(x,"adRetry")})
}
function usersTool(c){
 var tl=document.getElementById("adTool");tl.innerHTML="";
 var s=document.createElement("label");s.className="ak-search";s.innerHTML=A.icon('<circle cx="11" cy="11" r="7"/><path d="m20 20-3.5-3.5"/>',18)+'<input type="search" autocomplete="off" maxlength="100" placeholder="'+e(t("ad.u.search","Search by email, name or ID"))+'" aria-label="'+e(t("au.search","Search"))+'">';
 var inp=s.querySelector("input"),tm;inp.value=F.q;inp.oninput=function(){clearTimeout(tm);tm=setTimeout(function(){F.q=inp.value.trim();users(true)},300)};tl.appendChild(s);
 var sg=document.createElement("div");sg.innerHTML=segc("adSt",[["",t("ad.u.all","All"),c.total],["active",t("ad.s.active","Active"),c.active],["frozen",t("ad.s.frozen","Frozen"),c.frozen],["blocked",t("ad.s.blocked","Blocked"),c.blocked]],F.status);tl.appendChild(sg.firstChild);
 bindSeg("adSt",function(v){F.status=v;document.querySelectorAll("#adSt button").forEach(function(b){b.classList.toggle("on",b.dataset.v===v)});users(true)});
 tl.appendChild(A.dropdown([["",t("ad.u.allpl","All plans")],["free",t("app.plan.free","Free")],["pro",t("app.plan.pro","Pro")],["business",t("app.plan.business","Business")],["enterprise",t("app.plan.enterprise","Enterprise")]],F.plan,function(v){F.plan=v;users(true)}));
 var tg=document.createElement("button");tg.type="button";tg.className="ak-tg"+(F.flag==="open"?" on":"");tg.innerHTML=ic(P.flag,16)+"<span>"+e(t("ad.u.flagged","Needs review"))+"</span>"+(c.flags?"<em>"+A.num(c.flags)+"</em>":"");tg.onclick=function(){F.flag=F.flag==="open"?"":"open";tg.classList.toggle("on",F.flag==="open");users(true)};tl.appendChild(tg)
}
function usersPage(){
 var p=new URLSearchParams(location.search);["status","q","plan","flag"].forEach(function(k){if(p.get(k)&&!F[k])F[k]=p.get(k)});
 Promise.all([A.api("/admin/overview"),cnt()]).then(function(r){
  var u=r[0].users||{},c=r[1],act=Math.max(0,u.total-u.frozen-u.blocked);
  shell(kpis([kpi(P.users,u.total,t("ad.o.users","Accounts"),{sub:"+"+A.num(u.new7)+" "+t("ad.o.new7","in 7 days")}),kpi(P.ok,act,t("ad.s.active","Active")),kpi(P.pause,(u.frozen||0)+(u.blocked||0),t("ad.u.restricted","Frozen or blocked"),{sub:A.num(u.frozen||0)+" / "+A.num(u.blocked||0)}),kpi(P.flag,c.flags_open,t("ad.o.flags","Open review flags"),{href:"/app/admin/review/",hot:!!c.flags_open})])+'<div class="ak-bar" id="adTool"></div><section class="ak-card" id="adBody">'+A.loading()+"</section>");
  usersTool({total:u.total,active:act,frozen:u.frozen,blocked:u.blocked});users(true)
 },function(x){fail(x,"adRetry")})
}
function usersPage(){
 var p=new URLSearchParams(location.search);["status","q","plan","flag"].forEach(function(k){if(p.get(k)&&!F[k])F[k]=p.get(k)});
 Promise.all([A.api("/admin/overview"),cnt()]).then(function(r){
  var u=r[0].users||{},c=r[1],act=Math.max(0,u.total-u.frozen-u.blocked);
  shell(kpis([kpi(P.users,u.total,t("ad.o.users","Accounts"),{sub:"+"+A.num(u.new7)+" "+t("ad.o.new7","in 7 days")}),kpi(P.ok,act,t("ad.s.active","Active")),kpi(P.pause,u.frozen,t("ad.o.frozen","Frozen")),kpi(P.ban,u.blocked,t("ad.o.blocked","Blocked"))])+'<div class="ak-bar" id="adTool"></div><section class="ak-card" id="adBody">'+A.loading()+"</section>");
  usersTool({total:u.total,active:act,frozen:u.frozen,blocked:u.blocked,flags:c.flags_open});users(true)
 },function(x){fail(x,"adRetry")})
}
function usersPage(){
 var p=new URLSearchParams(location.search);["status","q","plan","flag"].forEach(function(k){if(p.get(k)&&!F[k])F[k]=p.get(k)});
 Promise.all([A.api("/admin/overview"),cnt()]).then(function(r){
  var u=r[0].users||{},c=r[1],act=Math.max(0,u.total-u.frozen-u.blocked);
  shell(kpis([kpi(P.users,u.total,t("ad.o.users","Accounts"),{sub:"+"+A.num(u.new7)+" "+t("ad.o.new7","in 7 days")}),kpi(P.ok,act,t("ad.s.active","Active")),kpi(P.pause,u.frozen,t("ad.o.frozen","Frozen")),kpi(P.ban,u.blocked,t("ad.o.blocked","Blocked"))])+'<div class="ak-bar" id="adTool"></div><section class="ak-card" id="adBody">'+A.loading()+"</section>");
  usersTool({total:u.total,active:act,frozen:u.frozen,blocked:u.blocked,flags:c.flags_open});users(true)
 },function(x){fail(x,"adRetry")})
}
function usersPage(){
 var p=new URLSearchParams(location.search);["status","q","plan","flag"].forEach(function(k){if(p.get(k)&&!F[k])F[k]=p.get(k)});
 Promise.all([A.api("/admin/overview"),cnt()]).then(function(r){
  var u=r[0].users||{},c=r[1],act=Math.max(0,u.total-u.frozen-u.blocked);
  shell(kpis([kpi(P.users,u.total,t("ad.o.users","Accounts"),{sub:"+"+A.num(u.new7)+" "+t("ad.o.new7","in 7 days")}),kpi(P.ok,act,t("ad.s.active","Active")),kpi(P.pause,u.frozen,t("ad.o.frozen","Frozen")),kpi(P.ban,u.blocked,t("ad.o.blocked","Blocked"))])+'<div class="ak-bar" id="adTool"></div><section class="ak-card" id="adBody">'+A.loading()+"</section>");
  usersTool({total:u.total,active:act,frozen:u.frozen,blocked:u.blocked,flags:c.flags_open});users(true)
 },function(x){fail(x,"adRetry")})
}
function usersPage(){
 var p=new URLSearchParams(location.search);["status","q","plan","flag"].forEach(function(k){if(p.get(k)&&!F[k])F[k]=p.get(k)});
 Promise.all([A.api("/admin/overview"),cnt()]).then(function(r){
  var u=r[0].users||{},c=r[1],act=Math.max(0,u.total-u.frozen-u.blocked);
  shell(kpis([kpi(P.users,u.total,t("ad.o.users","Accounts"),{sub:"+"+A.num(u.new7)+" "+t("ad.o.new7","in 7 days")}),kpi(P.ok,act,t("ad.s.active","Active")),kpi(P.pause,u.frozen,t("ad.o.frozen","Frozen")),kpi(P.ban,u.blocked,t("ad.o.blocked","Blocked"))])+'<div class="ak-bar" id="adTool"></div><section class="ak-card" id="adBody">'+A.loading()+"</section>");
  usersTool({total:u.total,active:act,frozen:u.frozen,blocked:u.blocked,flags:c.flags_open});users(true)
 },function(x){fail(x,"adRetry")})
}
function usersPage(){
 var p=new URLSearchParams(location.search);["status","q","plan","flag"].forEach(function(k){if(p.get(k)&&!F[k])F[k]=p.get(k)});
 Promise.all([A.api("/admin/overview"),cnt()]).then(function(r){
  var u=r[0].users||{},c=r[1],act=Math.max(0,u.total-u.frozen-u.blocked);
  shell(kpis([kpi(P.users,u.total,t("ad.o.users","Accounts"),{sub:"+"+A.num(u.new7)+" "+t("ad.o.new7","in 7 days")}),kpi(P.ok,act,t("ad.s.active","Active")),kpi(P.pause,u.frozen,t("ad.o.frozen","Frozen")),kpi(P.ban,u.blocked,t("ad.o.blocked","Blocked"))])+'<div class="ak-bar" id="adTool"></div><section class="ak-card" id="adBody">'+A.loading()+"</section>");
  usersTool({total:u.total,active:act,frozen:u.frozen,blocked:u.blocked,flags:c.flags_open});users(true)
 },function(x){fail(x,"adRetry")})
}
function usersPage(){
 var p=new URLSearchParams(location.search);["status","q","plan","flag"].forEach(function(k){if(p.get(k)&&!F[k])F[k]=p.get(k)});
 Promise.all([A.api("/admin/overview"),cnt()]).then(function(r){
  var u=r[0].users||{},c=r[1],act=Math.max(0,u.total-u.frozen-u.blocked);
  shell(kpis([kpi(P.users,u.total,t("ad.o.users","Accounts"),{sub:"+"+A.num(u.new7)+" "+t("ad.o.new7","in 7 days")}),kpi(P.ok,act,t("ad.s.active","Active")),kpi(P.pause,u.frozen,t("ad.o.frozen","Frozen")),kpi(P.ban,u.blocked,t("ad.o.blocked","Blocked"))])+'<div class="ak-bar" id="adTool"></div><section class="ak-card" id="adBody">'+A.loading()+"</section>");
  usersTool({total:u.total,active:act,frozen:u.frozen,blocked:u.blocked,flags:c.flags_open});users(true)
 },function(x){fail(x,"adRetry")})
}
function usersPage(){
 var p=new URLSearchParams(location.search);["status","q","plan","flag"].forEach(function(k){if(p.get(k)&&!F[k])F[k]=p.get(k)});
 Promise.all([A.api("/admin/overview"),cnt()]).then(function(r){
  var u=r[0].users||{},c=r[1],act=Math.max(0,u.total-u.frozen-u.blocked);
  shell(kpis([kpi(P.users,u.total,t("ad.o.users","Accounts"),{sub:"+"+A.num(u.new7)+" "+t("ad.o.new7","in 7 days")}),kpi(P.ok,act,t("ad.s.active","Active")),kpi(P.pause,u.frozen,t("ad.o.frozen","Frozen")),kpi(P.ban,u.blocked,t("ad.o.blocked","Blocked"))])+'<div class="ak-bar" id="adTool"></div><section class="ak-card" id="adBody">'+A.loading()+"</section>");
  usersTool({total:u.total,active:act,frozen:u.frozen,blocked:u.blocked,flags:c.flags_open});users(true)
 },function(x){fail(x,"adRetry")})
}
function usersPage(){
 var p=new URLSearchParams(location.search);["status","q","plan","flag"].forEach(function(k){if(p.get(k)&&!F[k])F[k]=p.get(k)});
 Promise.all([A.api("/admin/overview"),cnt()]).then(function(r){
  var u=r[0].users||{},c=r[1],act=Math.max(0,u.total-u.frozen-u.blocked);
  shell(kpis([kpi(P.users,u.total,t("ad.o.users","Accounts"),{sub:"+"+A.num(u.new7)+" "+t("ad.o.new7","in 7 days")}),kpi(P.ok,act,t("ad.s.active","Active")),kpi(P.pause,u.frozen,t("ad.o.frozen","Frozen")),kpi(P.ban,u.blocked,t("ad.o.blocked","Blocked"))])+'<div class="ak-bar" id="adTool"></div><section class="ak-card" id="adBody">'+A.loading()+"</section>");
  usersTool({total:u.total,active:act,frozen:u.frozen,blocked:u.blocked,flags:c.flags_open});users(true)
 },function(x){fail(x,"adRetry")})
}
function usersPage(){
 var p=new URLSearchParams(location.search);["status","q","plan","flag"].forEach(function(k){if(p.get(k)&&!F[k])F[k]=p.get(k)});
 Promise.all([A.api("/admin/overview"),cnt()]).then(function(r){
  var u=r[0].users||{},c=r[1],act=Math.max(0,u.total-u.frozen-u.blocked);
  shell(kpis([kpi(P.users,u.total,t("ad.o.users","Accounts"),{sub:"+"+A.num(u.new7)+" "+t("ad.o.new7","in 7 days")}),kpi(P.ok,act,t("ad.s.active","Active")),kpi(P.pause,u.frozen,t("ad.o.frozen","Frozen")),kpi(P.ban,u.blocked,t("ad.o.blocked","Blocked"))])+'<div class="ak-bar" id="adTool"></div><section class="ak-card" id="adBody">'+A.loading()+"</section>");
  usersTool({total:u.total,active:act,frozen:u.frozen,blocked:u.blocked,flags:c.flags_open});users(true)
 },function(x){fail(x,"adRetry")})
}
function usersPage(){
 var p=new URLSearchParams(location.search);["status","q","plan","flag"].forEach(function(k){if(p.get(k)&&!F[k])F[k]=p.get(k)});
 Promise.all([A.api("/admin/overview"),cnt()]).then(function(r){
  var u=r[0].users||{},c=r[1],act=Math.max(0,u.total-u.frozen-u.blocked);
  shell(kpis([kpi(P.users,u.total,t("ad.o.users","Accounts"),{sub:"+"+A.num(u.new7)+" "+t("ad.o.new7","in 7 days")}),kpi(P.ok,act,t("ad.s.active","Active")),kpi(P.pause,u.frozen,t("ad.o.frozen","Frozen")),kpi(P.ban,u.blocked,t("ad.o.blocked","Blocked"))])+'<div class="ak-bar" id="adTool"></div><section class="ak-card" id="adBody">'+A.loading()+"</section>");
  usersTool({total:u.total,active:act,frozen:u.frozen,blocked:u.blocked,flags:c.flags_open});users(true)
 },function(x){fail(x,"adRetry")})
}
function users(reset){
 if(reset){U.off=0;U.rows=[]}
 var qs=["limit=50","offset="+U.off];["q","status","plan","flag"].forEach(function(k){if(F[k])qs.push(k+"="+encodeURIComponent(F[k]))});
 var cols="minmax(0,2.4fr) 110px 150px 100px minmax(0,1fr) 64px 20px";
 var dn;try{dn=new Intl.DisplayNames([A.lang()],{type:"region"})}catch(x){dn=null}
 function cn(c){c=String(c||"").toUpperCase();if(!c)return"—";try{return dn?dn.of(c)||c:c}catch(x){return c}}
 A.api("/admin/users?"+qs.join("&")).then(function(d){
  U.rows=U.rows.concat(d.data);U.total=d.total;U.off=U.rows.length;
  var b=document.getElementById("adBody");
  if(!U.rows.length){b.innerHTML='<div class="ak-empty"><span class="ak-ei">'+ic(P.users,32)+"</span><h3>"+e(t("ad.u.none","No accounts match"))+"</h3><p>"+e(t("ad.u.none.p","Try another search or filter."))+"</p></div>";return}
  b.innerHTML='<div class="ak-th" style="--cols:'+cols+'"><span>'+e(t("ad.u.acc","Account"))+"</span><span>"+e(t("ad.u.plan","Plan"))+"</span><span>"+e(t("ad.u.status","Status"))+"</span><span>"+e(t("ad.u.country","Country"))+"</span><span>"+e(t("ad.u.seen","Last seen"))+"</span><span>"+e(t("ad.u.flags","Flags"))+"</span><span></span></div>"+U.rows.map(function(r){return'<a class="ak-tr" href="/app/admin/users/view/?id='+r.id+'" style="--cols:'+cols+'"><div class="c">'+av(r.name||r.email)+'<span class="ak-nm"><b>'+e(r.email)+"</b><small>"+e(r.name||"")+(r.is_admin?" · "+e(t("ad.u.admin","admin")):"")+"</small></span></div><div class=\"c\">"+A.pill("dim",t("app.plan."+r.plan,r.plan))+'</div><div class="c">'+pill(r.status)+'</div><div class="c dim">'+e(cn(r.country||r.region))+'</div><div class="c dim">'+e(r.last_seen?A.ago(r.last_seen):t("au.never","Never"))+'</div><div class="c">'+(r.flags?'<b class="ak-n">'+r.flags+"</b>":'<b class="ak-n z">0</b>')+'</div><span class="go">'+ic(P.next,18)+"</span></a>"}).join("")+'<div class="ak-pg"><span>'+e(t("ap.lg.showing","Showing {a} of {b}",{a:A.num(U.rows.length),b:A.num(U.total)}))+"</span>"+(U.rows.length<U.total?'<button type="button" class="abtn lg" id="adMore">'+e(t("au.more","Load more"))+"</button>":"")+"</div>";
  var mb=document.getElementById("adMore");if(mb)mb.onclick=function(){mb.disabled=true;users(false)}
 },function(x){document.getElementById("adBody").innerHTML=A.failed(x,"adRetry");document.getElementById("adRetry").onclick=function(){users(true)}})
}
function stateModal(u,st,done){
 var tt={frozen:t("ad.m.freeze","Freeze this account?"),blocked:t("ad.m.block","Block this account?"),active:t("ad.m.unfreeze","Restore this account?")}[st];
 var m=A.modal({title:tt,body:'<p class="dim">'+e(st==="active"?t("ad.m.restore.p","The user will be told that the account is active again."):t("ad.m.state.p","The user is notified by email and in the dashboard. Sending stops; a blocked user cannot sign in to the dashboard or use API keys."))+'</p>'+(st==="active"?"":'<div class="pfld"><label for="adRs">'+e(t("ad.m.reason","Internal reason"))+'</label><input id="adRs" maxlength="300"></div>')+'<div class="prow"><button type="button" class="abtn" id="adNo">'+e(t("au.cancel","Cancel"))+'</button><button type="button" class="abtn pri" id="adYes">'+e(t("ad.m.go","Confirm"))+"</button></div>"});
 m.body.querySelector("#adNo").onclick=m.close;
 m.body.querySelector("#adYes").onclick=function(){var b=this;b.disabled=true;var rs=m.body.querySelector("#adRs");A.api("/admin/users/"+u.id,{method:"PATCH",body:{status:st,reason:rs?rs.value:""}}).then(function(){m.close();A.toast(t("ad.m.done","Saved"));done()},function(x){b.disabled=false;A.toast(A.err(x),"err")})}
}
function dl(rows){return'<dl class="meta">'+rows.filter(function(r){return r[1]!=null&&r[1]!==""}).map(function(r){return"<div><dt>"+e(r[0])+'</dt><dd class="brk">'+e(r[1])+"</dd></div>"}).join("")+"</dl>"}
function flagHtml(f){
 var d=f.details||{},chips=[];
 if(d.same_email)chips.push(t("ad.f.alias","Same email once aliases are removed"));
 if(d.shared_ip_sessions)chips.push(t("ad.f.ip","Shared IP in {n} sign-ins",{n:d.shared_ip_sessions}));
 if(d.same_browser)chips.push(t("ad.f.ua","Same browser"));
 if(d.same_browser_id)chips.push(t("ad.f.did","Same browser identifier (local storage)"));
 if(d.same_device_profile)chips.push(t("ad.f.dev","Same device profile: screen, time zone, language, platform"));
 if(d.same_phone)chips.push(t("ad.f.phone","Same phone number in applications"));
 if(d.created_close)chips.push(t("ad.f.close","Created within 48 hours"));
 if(d.same_inn)chips.push(t("ad.f.inn","Same tax ID in applications"));
 if(d.shared_api_ip)chips.push(t("ad.f.api","API used from the same IP"));
 if(d.disposable_email)chips.push(t("ad.f.disp","Disposable email domain"));
 if(d.other_account_restricted)chips.push(t("ad.f.restr","The other account is {s}",{s:t("ad.s."+d.other_account_restricted,d.other_account_restricted)}));
 if(d.audit_reason)chips.push(d.audit_reason);
 if(d.accounts_24h)chips.push(t("ad.f.burst","{n} accounts from one IP in 24 hours",{n:d.accounts_24h}));
 return chips.map(function(c){return'<span class="ak-chip">'+ic(P.alert,15)+e(c)+"</span>"}).join("")
}
function ring(n){var c=2*Math.PI*30,v=Math.min(100,Math.max(0,n))/100*c;return'<span class="ak-ring"><svg viewBox="0 0 72 72" width="72" height="72"><circle cx="36" cy="36" r="30" fill="none" stroke="currentColor" stroke-opacity=".12" stroke-width="5"/><circle cx="36" cy="36" r="30" fill="none" stroke="currentColor" stroke-width="5" stroke-linecap="round" stroke-dasharray="'+v.toFixed(1)+" "+c.toFixed(1)+'"/></svg><b>'+n+"</b></span>"}
function ring(n){var c=2*Math.PI*30,v=Math.min(100,Math.max(0,n))/100*c;return'<span class="ak-ring"><svg viewBox="0 0 72 72" width="72" height="72"><circle cx="36" cy="36" r="30" fill="none" stroke="currentColor" stroke-opacity=".12" stroke-width="5"/><circle cx="36" cy="36" r="30" fill="none" stroke="currentColor" stroke-width="5" stroke-linecap="round" stroke-dasharray="'+v.toFixed(1)+" "+c.toFixed(1)+'"/></svg><b>'+n+"</b></span>"}
function ring(n){var c=2*Math.PI*30,v=Math.min(100,Math.max(0,n))/100*c;return'<span class="ak-ring"><svg viewBox="0 0 72 72" width="72" height="72"><circle cx="36" cy="36" r="30" fill="none" stroke="currentColor" stroke-opacity=".12" stroke-width="5"/><circle cx="36" cy="36" r="30" fill="none" stroke="currentColor" stroke-width="5" stroke-linecap="round" stroke-dasharray="'+v.toFixed(1)+" "+c.toFixed(1)+'"/></svg><b>'+n+"</b></span>"}
function ring(n){var c=2*Math.PI*30,v=Math.min(100,Math.max(0,n))/100*c;return'<span class="ak-ring"><svg viewBox="0 0 72 72" width="72" height="72"><circle cx="36" cy="36" r="30" fill="none" stroke="currentColor" stroke-opacity=".12" stroke-width="5"/><circle cx="36" cy="36" r="30" fill="none" stroke="currentColor" stroke-width="5" stroke-linecap="round" stroke-dasharray="'+v.toFixed(1)+" "+c.toFixed(1)+'"/></svg><b>'+n+"</b></span>"}
function ring(n){var c=2*Math.PI*30,v=Math.min(100,Math.max(0,n))/100*c;return'<span class="ak-ring"><svg viewBox="0 0 72 72" width="72" height="72"><circle cx="36" cy="36" r="30" fill="none" stroke="currentColor" stroke-opacity=".12" stroke-width="5"/><circle cx="36" cy="36" r="30" fill="none" stroke="currentColor" stroke-width="5" stroke-linecap="round" stroke-dasharray="'+v.toFixed(1)+" "+c.toFixed(1)+'"/></svg><b>'+n+"</b></span>"}
function ring(n){var c=2*Math.PI*30,v=Math.min(100,Math.max(0,n))/100*c;return'<span class="ak-ring"><svg viewBox="0 0 72 72" width="72" height="72"><circle cx="36" cy="36" r="30" fill="none" stroke="currentColor" stroke-opacity=".12" stroke-width="5"/><circle cx="36" cy="36" r="30" fill="none" stroke="currentColor" stroke-width="5" stroke-linecap="round" stroke-dasharray="'+v.toFixed(1)+" "+c.toFixed(1)+'"/></svg><b>'+n+"</b></span>"}
function ring(n){var c=2*Math.PI*30,v=Math.min(100,Math.max(0,n))/100*c;return'<span class="ak-ring"><svg viewBox="0 0 72 72" width="72" height="72"><circle cx="36" cy="36" r="30" fill="none" stroke="currentColor" stroke-opacity=".12" stroke-width="5"/><circle cx="36" cy="36" r="30" fill="none" stroke="currentColor" stroke-width="5" stroke-linecap="round" stroke-dasharray="'+v.toFixed(1)+" "+c.toFixed(1)+'"/></svg><b>'+n+"</b></span>"}
function ring(n){var c=2*Math.PI*30,v=Math.min(100,Math.max(0,n))/100*c;return'<span class="ak-ring"><svg viewBox="0 0 72 72" width="72" height="72"><circle cx="36" cy="36" r="30" fill="none" stroke="currentColor" stroke-opacity=".12" stroke-width="5"/><circle cx="36" cy="36" r="30" fill="none" stroke="currentColor" stroke-width="5" stroke-linecap="round" stroke-dasharray="'+v.toFixed(1)+" "+c.toFixed(1)+'"/></svg><b>'+n+"</b></span>"}
function ring(n){var c=2*Math.PI*30,v=Math.min(100,Math.max(0,n))/100*c;return'<span class="ak-ring"><svg viewBox="0 0 72 72" width="72" height="72"><circle cx="36" cy="36" r="30" fill="none" stroke="currentColor" stroke-opacity=".12" stroke-width="5"/><circle cx="36" cy="36" r="30" fill="none" stroke="currentColor" stroke-width="5" stroke-linecap="round" stroke-dasharray="'+v.toFixed(1)+" "+c.toFixed(1)+'"/></svg><b>'+n+"</b></span>"}
function ring(n){var c=2*Math.PI*30,v=Math.min(100,Math.max(0,n))/100*c;return'<span class="ak-ring"><svg viewBox="0 0 72 72" width="72" height="72"><circle cx="36" cy="36" r="30" fill="none" stroke="currentColor" stroke-opacity=".12" stroke-width="5"/><circle cx="36" cy="36" r="30" fill="none" stroke="currentColor" stroke-width="5" stroke-linecap="round" stroke-dasharray="'+v.toFixed(1)+" "+c.toFixed(1)+'"/></svg><b>'+n+"</b></span>"}
function ring(n){var c=2*Math.PI*30,v=Math.min(100,Math.max(0,n))/100*c;return'<span class="ak-ring"><svg viewBox="0 0 72 72" width="72" height="72"><circle cx="36" cy="36" r="30" fill="none" stroke="currentColor" stroke-opacity=".12" stroke-width="5"/><circle cx="36" cy="36" r="30" fill="none" stroke="currentColor" stroke-width="5" stroke-linecap="round" stroke-dasharray="'+v.toFixed(1)+" "+c.toFixed(1)+'"/></svg><b>'+n+"</b></span>"}
function user(){
 var id=new URLSearchParams(location.search).get("id");
 A.api("/admin/users/"+encodeURIComponent(id)).then(function(u){
  var r=u.rating,m=u.mail30,c=u.counts;
  function sec(i,ti,body){return'<section class="ak-card pad">'+cardHead(i,ti)+body+"</section>"}
  function none(){return'<p class="dim">'+e(t("ad.none","Nothing here yet."))+"</p>"}
  function tbl(cols,rows){return rows.length?'<div class="ad-tbl"><table><thead><tr>'+cols.map(function(x){return"<th>"+e(x)+"</th>"}).join("")+"</tr></thead><tbody>"+rows.map(function(x){return"<tr>"+x.map(function(y){return"<td>"+y+"</td>"}).join("")+"</tr>"}).join("")+"</tbody></table></div>":none()}
  var acts='<div class="ak-btns">'+(u.status!=="frozen"&&u.status!=="blocked"?"":'<button type="button" class="abtn pri" data-s="active">'+ic(P.ok,16)+"<span>"+e(t("ad.a.restore","Restore"))+"</span></button>")+(u.status==="active"&&!u.is_admin?'<button type="button" class="abtn" data-s="frozen">'+ic(P.pause,16)+"<span>"+e(t("ad.a.freeze","Freeze"))+"</span></button>":"")+(u.status!=="blocked"&&!u.is_admin?'<button type="button" class="abtn bad" data-s="blocked">'+ic(P.ban,16)+"<span>"+e(t("ad.a.block","Block"))+"</span></button>":"")+"</div>";
  var head1='<a class="backlnk" href="/app/admin/users/">'+A.icon(P.back,16)+"<span>"+e(t("ad.back","All accounts"))+'</span></a><section class="ak-card ak-uh">'+av(u.name||u.email,"lg")+'<div class="ak-un"><h2>'+e(u.email)+"</h2><p>"+e(u.name||"")+'</p><div class="ak-chips">'+pill(u.status)+A.pill("dim",t("app.plan."+u.plan,u.plan))+(u.tariff==="siberia"?A.pill("dim",t("ad.o.siberia","Siberia tariff")):"")+(u.is_admin?A.pill("dim",t("ad.u.admin","admin")):"")+"</div>"+(u.status_reason?'<p class="dim sm" style="margin-top:12px">'+e(t("ad.reason","Reason: {x}",{x:u.status_reason}))+"</p>":"")+"</div>"+acts+"</section>";
  var rate=sec(P.star,t("ad.d.rating","Account rating"),'<div class="ak-fh" style="margin-bottom:18px">'+ring(r.score)+"<div><h2>"+e(t("rt.l."+r.level,r.level))+'</h2><div class="meta">/ 100</div></div></div><dl class="ak-kv" style="margin-bottom:18px">'+r.factors.map(function(f){return"<div><dt>"+e(t("rt.f."+f.id,f.id))+"</dt><dd>"+f.points+" / "+f.max+"</dd></div>"}).join("")+'</dl><div class="ak-fld"><label for="adAdj">'+e(t("ad.d.adjust","Manual adjustment (−100 to 100)"))+'</label><div style="display:flex;gap:10px"><input id="adAdj" type="number" min="-100" max="100" value="'+(u.rating_adjust||0)+'"><button type="button" class="abtn lg" id="adAdjGo">'+e(t("ad.d.save","Save"))+"</button></div></div>");
  function kv(rows){return'<dl class="ak-kv">'+rows.filter(function(x){return x[1]!=null&&x[1]!==""}).map(function(x){return"<div><dt>"+e(x[0])+"</dt><dd>"+e(x[1])+"</dd></div>"}).join("")+"</dl>"}
  var prof=sec(P.users,t("ad.d.profile","Account"),kv([[t("ad.d.id","ID"),u.id],[t("ad.d.region","Region"),(u.region||"")+(u.account_country?" · "+u.account_country:"")],[t("ad.d.lang","Language"),u.lang],[t("ad.d.created","Created"),A.date(u.created_at)],[t("ad.d.onb","Setup finished"),u.onboarded_at?A.date(u.onboarded_at):"—"]])+'<div class="ak-fld" style="margin-top:18px"><label>'+e(t("ad.d.plan","Plan"))+'</label><div id="adPlan"></div></div>');
  var act=kpis([kpi(P.mail,m.sent,t("ad.o.sent","Sent")),kpi(P.ok,m.delivered,t("au.e.st.delivered","Delivered")),kpi(P.ban,m.bounced,t("ad.o.bounced","Bounced")),kpi(P.alert,m.complained,t("ad.o.compl","Complained"))])+kpis([kpi(P.globe,c.domains,t("app.nav.domains","Domains")),kpi(P.key,c.keys,t("app.nav.apikeys","API keys")),kpi(P.users,c.audiences,t("app.nav.audiences","Audiences")),kpi(P.chat,c.tickets,t("ad.t.tickets","Tickets"))]);
  root.innerHTML=head()+head1+'<div class="ak-two" style="margin-bottom:20px">'+rate+prof+"</div>"+'<h2 class="sh2" style="margin-top:8px">'+e(t("ad.d.act","Activity in 30 days"))+"</h2>"+act+
   sec(P.flag,t("ad.d.flags","Review flags"),u.flags.length?u.flags.map(function(f){return'<div style="display:grid;gap:10px;margin-bottom:14px"><div class="ak-chips" style="align-items:center">'+pill(f.status)+'<b class="ak-n">'+f.score+'</b><span class="dim">'+e(t("ad.k."+f.kind,f.kind))+(f.related_email?" · "+e(f.related_email):"")+'</span></div><div class="ak-chips">'+flagHtml(f)+"</div></div>"}).join(""):none())+
   sec(P.lock,t("ad.d.sess","Sign-ins"),tbl([t("ad.d.ip","IP"),t("ad.d.ua","Browser"),t("ad.d.when","When")],u.sessions.map(function(s){return[e(s.ip||""),'<span class="ell ad-ua">'+e(s.ua||"")+"</span>",e(A.date(s.created_at))]})))+
   sec(P.key,t("ad.d.keys","API keys"),tbl([t("ad.d.name","Name"),t("ad.d.prefix","Prefix"),t("ad.d.last","Last used"),t("ad.u.status","Status")],u.keys.map(function(k){return[e(k.name),"<code>"+e(k.prefix)+"…</code>",k.last_used_at?e(A.ago(k.last_used_at)):"—",k.revoked_at?pill("revoked"):pill("active")]})))+
   sec(P.globe,t("ad.d.dom","Domains"),tbl([t("ad.d.name","Name"),t("ad.u.status","Status"),t("ad.u.created","Created")],u.domains.map(function(d){return[e(d.name),e(d.status),e(A.ago(d.created_at))]})))+
   sec(P.map,t("ad.d.app","Siberia applications"),u.applications.length?u.applications.map(function(a){return'<div class="ak-chips" style="margin-bottom:10px">'+pill(a.status)+"<b>"+e(a.org_name)+'</b><span class="dim">'+e(t("sb.r."+a.region,a.region))+" · "+e(a.inn)+"</span></div>"}).join(""):none())+
   sec(P.chart,t("ad.d.req","Recent API requests"),tbl([t("ap.lg.endpoint","Endpoint"),t("au.e.status","Status"),t("ad.d.ip","IP"),t("ad.d.when","When")],u.requests.map(function(q){return['<b class="lg-m">'+e(q.method)+"</b> "+e(q.path),e(q.status),e(q.ip||""),e(A.ago(q.created_at))]})))+
   sec(P.page,t("ad.d.log","Admin log"),'<div class="ak-fld"><label for="adNote">'+e(t("ad.d.note","Add a private note"))+'</label><div style="display:flex;gap:10px"><input id="adNote" maxlength="1000"><button type="button" class="abtn lg" id="adNoteGo">'+e(t("ad.d.add","Add"))+"</button></div></div>"+(u.actions.length?u.actions.map(function(a){var d=a.details||{};return'<div style="padding:12px 0;box-shadow:inset 0 1px 0 var(--g-bd)"><b>'+e(t("ad.act."+a.action,a.action))+'</b> <span class="dim">'+e(A.date(a.created_at))+(a.admin?" · "+e(a.admin):"")+"</span>"+(d.reason||d.note||d.to!==undefined?'<div class="dim">'+e(d.reason||d.note||String(d.from)+" → "+String(d.to))+"</div>":"")+"</div>"}).join(""):none()));
  root.querySelectorAll("[data-s]").forEach(function(b){b.onclick=function(){stateModal(u,b.dataset.s,function(){user()})}});
  var pl=document.getElementById("adPlan");pl.appendChild(A.dropdown([["free",t("app.plan.free","Free")],["pro",t("app.plan.pro","Pro")],["business",t("app.plan.business","Business")],["enterprise",t("app.plan.enterprise","Enterprise")]],u.plan,function(v){if(v===u.plan)return;A.api("/admin/users/"+u.id,{method:"PATCH",body:{plan:v}}).then(function(){A.toast(t("ad.m.done","Saved"));user()},function(x){A.toast(A.err(x),"err")})}));
  document.getElementById("adAdjGo").onclick=function(){A.api("/admin/users/"+u.id,{method:"PATCH",body:{rating_adjust:parseInt(document.getElementById("adAdj").value,10)||0}}).then(function(){A.toast(t("ad.m.done","Saved"));user()},function(x){A.toast(A.err(x),"err")})};
  document.getElementById("adNoteGo").onclick=function(){var v=document.getElementById("adNote").value.trim();if(!v)return;A.api("/admin/users/"+u.id,{method:"PATCH",body:{note:v}}).then(function(){user()},function(x){A.toast(A.err(x),"err")})}
 },function(x){if(x&&x.status===404){location.replace("/app/admin/users/");return}fail(x,"adRetry")})
}
function review(){
 var st=F.rstate||"open";
 Promise.all([A.api("/admin/risk?status="+st),cnt()]).then(function(res){
  var rows=res[0],c=res[1];
  shell(kpis([kpi(P.flag,c.flags_open,t("ad.o.flags","Open review flags"),{hot:!!c.flags_open}),kpi(P.pause,c.flags_auto,t("ad.r.autofreeze","Frozen automatically")),kpi(P.ok,c.flags_reviewed,t("ad.s.reviewed","Reviewed")),kpi(P.ban,c.flags_dismissed,t("ad.s.dismissed","Dismissed"))])+'<div class="ak-bar">'+segc("adSt",[["open",t("ad.s.open","Open"),c.flags_open],["reviewed",t("ad.s.reviewed","Reviewed"),c.flags_reviewed],["dismissed",t("ad.s.dismissed","Dismissed"),c.flags_dismissed]],st)+'</div><div id="adBody"></div>');
  bindSeg("adSt",function(v){F.rstate=v;review()});
  var b=document.getElementById("adBody");
  if(!rows.length){b.innerHTML=emptyBox(P.flag,t("ad.r.none","Nothing to review"),t("ad.r.none.p","Suspicious accounts will appear here."),"",true);return}
  b.innerHTML=rows.map(function(f){
   return'<section class="ak-card ak-flag" data-id="'+f.id+'"><div class="ak-fh">'+ring(f.score)+'<div><h2>'+e(t("ad.k."+f.kind,f.kind))+'</h2><div class="meta">'+pill(f.status)+(f.review_notice?A.pill("wait",t("ad.r.noticed","Notice shown to the owner")):"")+(f.auto_action==="freeze"?A.pill("wait",t("ad.r.autofreeze","Frozen automatically")):"")+"<span>"+e(A.ago(f.created_at))+'</span></div></div></div><div class="ak-pair'+(f.related_id?"":" one")+'"><a class="ak-acc" href="/app/admin/users/view/?id='+f.user_id+'">'+av(f.email)+'<span class="ak-nm"><b>'+e(f.email)+"</b><small>"+e(t("ad.r.flagged","Flagged account"))+"</small></span>"+pill(f.user_status)+"</a>"+(f.related_id?'<span class="ak-vs">'+ic('<path d="M7 7h10l-3-3M17 17H7l3 3"/>',18)+'</span><a class="ak-acc" href="/app/admin/users/view/?id='+f.related_id+'">'+av(f.related_email)+'<span class="ak-nm"><b>'+e(f.related_email||"")+"</b><small>"+e(t("ad.r.related","Linked account"))+"</small></span>"+pill(f.related_status)+"</a>":"")+'</div><div class="ak-chips">'+flagHtml(f)+"</div>"+(f.status==="open"?'<div class="ak-btns"><button type="button" class="abtn" data-d="notice"'+(f.review_notice?" disabled":"")+">"+ic(P.chat,16)+"<span>"+e(t("ad.r.notice","Ask the owner to explain"))+'</span></button><button type="button" class="abtn" data-d="dismiss">'+ic(P.ok,16)+"<span>"+e(t("ad.r.dismiss","Not a problem"))+'</span></button><button type="button" class="abtn" data-d="confirm">'+ic(P.flag,16)+"<span>"+e(t("ad.r.confirm","Confirm, keep state"))+'</span></button><button type="button" class="abtn bad" data-d="block">'+ic(P.ban,16)+"<span>"+e(t("ad.r.block","Block the flagged account"))+"</span></button></div>":"")+"</section>"}).join("");
  b.querySelectorAll("[data-d]").forEach(function(btn){btn.onclick=function(){var id=btn.closest("[data-id]").dataset.id,d=btn.dataset.d;btn.disabled=true;A.api("/admin/risk/"+id,{method:"PATCH",body:{decision:d}}).then(function(){A.toast(t("ad.m.done","Saved"));review()},function(x){btn.disabled=false;A.toast(A.err(x),"err")})}})
 },function(x){fail(x,"adRetry")})
}
function sib(){
 var st=F.sstate||"pending";
 Promise.all([A.api("/admin/siberia?status="+st),cnt()]).then(function(res){
  var rows=res[0],c=res[1];
  shell(kpis([kpi(P.map,c.sib_pending,t("ad.s.pending","Pending"),{hot:!!c.sib_pending}),kpi(P.ok,c.sib_approved,t("ad.s.approved","Approved")),kpi(P.ban,c.sib_rejected,t("ad.s.rejected","Rejected")),kpi(P.pause,c.sib_revoked,t("ad.s.revoked","Revoked"))])+'<div class="ak-bar">'+segc("adSt",[["pending",t("ad.s.pending","Pending"),c.sib_pending],["approved",t("ad.s.approved","Approved"),c.sib_approved],["rejected",t("ad.s.rejected","Rejected"),c.sib_rejected],["revoked",t("ad.s.revoked","Revoked"),c.sib_revoked]],st)+'</div><div id="adBody"></div>');
  bindSeg("adSt",function(v){F.sstate=v;sib()});
  var b=document.getElementById("adBody");
  if(!rows.length){b.innerHTML=emptyBox(P.map,t("ad.sb.none","No applications"),t("ad.sb.none.p","Applications for the Siberia tariff appear here."),"",true);return}
  b.innerHTML=rows.map(function(a){
   return'<section class="ak-card ak-flag" data-id="'+a.id+'"><div class="ak-fh">'+av(a.org_name,"lg")+"<div><h2>"+e(a.org_name)+'</h2><div class="meta">'+pill(a.status)+"<span>"+e(t("sb.f.k."+(a.kind==="sole_proprietor"?"sole":a.kind==="self_employed"?"self":"company"),a.kind))+" · "+e(t("sb.r."+a.region,a.region))+" · "+e(A.ago(a.created_at))+'</span></div></div></div><dl class="ak-kv">'+[[t("ad.sb.email","Email"),a.email],[t("sb.f.inn","Tax ID (INN)"),a.inn],[t("sb.f.site","Website"),a.site],[t("sb.f.phone","Phone"),a.phone],[t("ad.sb.acct","Account"),a.user_id?t("ad.sb.has","exists, tariff applies on approval"):t("ad.sb.no","none yet, applies at first sign-in")]].filter(function(x){return x[1]}).map(function(x){return"<div><dt>"+e(x[0])+"</dt><dd>"+e(x[1])+"</dd></div>"}).join("")+'</dl><div><h3 class="sh3" style="margin:0 0 10px">'+e(t("sb.f.purpose","What will you use Geserd for?"))+'</h3><p class="ak-quote">'+e(a.purpose)+"</p></div>"+(a.note?'<p class="dim">'+e(t("ad.reason","Reason: {x}",{x:a.note}))+"</p>":"")+(a.status==="pending"?'<div class="ak-btns"><button type="button" class="abtn pri" data-d="approved">'+ic(P.ok,16)+"<span>"+e(t("ad.sb.approve","Approve"))+'</span></button><button type="button" class="abtn bad" data-d="rejected">'+ic(P.ban,16)+"<span>"+e(t("ad.sb.reject","Reject"))+"</span></button></div>":a.status==="approved"?'<div class="ak-btns"><button type="button" class="abtn bad" data-d="revoked">'+ic(P.pause,16)+"<span>"+e(t("ad.sb.revoke","End the tariff"))+"</span></button></div>":"")+"</section>"}).join("");
  b.querySelectorAll("[data-d]").forEach(function(btn){btn.onclick=function(){
   var id=btn.closest("[data-id]").dataset.id,d=btn.dataset.d;
   var m=A.modal({title:t("ad.sb.m."+d,"Decision"),body:'<div class="pfld"><label for="adNt">'+e(t("ad.sb.note","Message to the applicant (optional, shown in the email)"))+'</label><textarea id="adNt" rows="3" maxlength="500"></textarea></div><div class="prow"><button type="button" class="abtn" id="adNo">'+e(t("au.cancel","Cancel"))+'</button><button type="button" class="abtn pri" id="adYes">'+e(t("ad.m.go","Confirm"))+"</button></div>"});
   m.body.querySelector("#adNo").onclick=m.close;
   m.body.querySelector("#adYes").onclick=function(){var y=this;y.disabled=true;A.api("/admin/siberia/"+id,{method:"PATCH",body:{status:d,note:m.body.querySelector("#adNt").value}}).then(function(){m.close();A.toast(t("ad.m.done","Saved"));sib()},function(x){y.disabled=false;A.toast(A.err(x),"err")})}
  }})
 },function(x){fail(x,"adRetry")})
}
function tickets(){
 var st=F.tstate||"open";
 Promise.all([A.api("/admin/tickets?status="+st),cnt()]).then(function(res){
  var rows=res[0],c=res[1];
  shell(kpis([kpi(P.chat,c.tk_open,t("ad.s.open","Open"),{hot:!!c.tk_open}),kpi(P.clock,c.tk_wait,t("ad.tk.wait","Waiting for you")),kpi(P.ok,Math.max(0,(c.tk_open||0)-(c.tk_wait||0)),t("ad.tk.ans","Answered")),kpi(P.lock,c.tk_closed,t("hp.st.closed","Closed"))])+'<div class="ak-bar">'+segc("adSt",[["open",t("ad.s.open","Open"),c.tk_open],["closed",t("hp.st.closed","Closed"),c.tk_closed]],st)+'</div><div id="adBody"></div>');
  bindSeg("adSt",function(v){F.tstate=v;F.tsel=null;tickets()});
  var b=document.getElementById("adBody");
  if(!rows.length){b.innerHTML=emptyBox(P.chat,t("ad.tk.none","No tickets"),t("ad.tk.none.p","Questions from the help center appear here."),"",true);return}
  var sel=rows.filter(function(r){return r.id===F.tsel})[0]||(window.innerWidth>1100?rows[0]:null);
  function status(r){return r.last_author==="user"&&r.status==="open"?A.pill("wait",t("ad.tk.wait","Waiting for you")):A.pill("dim",r.status==="closed"?t("hp.st.closed","Closed"):t("ad.tk.ans","Answered"))}
  b.innerHTML='<div class="ak-split"><section class="ak-card ak-list" id="tkL">'+rows.map(function(r){return'<button type="button" class="ak-li'+(sel&&sel.id===r.id?" on":"")+'" data-id="'+r.id+'">'+av(r.email)+'<span class="ak-nm"><b>'+e(r.subject)+"</b><small>"+e(r.email)+"</small></span><time>"+e(A.ago(r.updated_at))+"</time></button>"}).join("")+'</section><section class="ak-card ak-th2" id="tkT"></section></div>';
  var T=document.getElementById("tkT");
  function open(r){
   F.tsel=r.id;T.classList.remove("ak-th2-empty");b.querySelectorAll(".ak-li").forEach(function(x){x.classList.toggle("on",x.dataset.id===r.id)});
   T.innerHTML='<div class="ak-empty" style="margin:auto">'+A.loading()+"</div>";
   A.api("/admin/tickets/"+r.id).then(function(d){
    T.innerHTML='<div class="ak-thh">'+av(d.email)+'<div style="flex:1;min-width:0"><h2>'+e(r.subject)+"</h2><p>"+e(d.email)+" · "+e(t("hp.topic."+d.topic,d.topic))+"</p></div>"+status(r)+'</div><div class="ak-msgs">'+d.messages.map(function(x){var sf=x.author==="staff";return'<div class="ak-m'+(sf?" me":"")+'"><small>'+e(sf?t("ad.tk.you","Staff"):d.email)+" · "+e(A.ago(x.created_at))+"</small>"+e(x.body)+"</div>"}).join("")+'</div><div class="ak-cmp"><textarea id="adRp" rows="4" maxlength="5000" placeholder="'+e(t("ad.tk.reply","Your reply"))+'"></textarea><div class="row"><label class="ak-chk"><input type="checkbox" id="adCl"><span>'+e(t("ad.tk.close","Close the ticket after this reply"))+'</span></label><button type="button" class="abtn pri" id="adSend">'+ic(P.send,16)+"<span>"+e(t("ad.tk.send","Send reply"))+"</span></button></div></div>";
    var ms=T.querySelector(".ak-msgs");ms.scrollTop=ms.scrollHeight;
    T.querySelector("#adSend").onclick=function(){var bt=this,v=T.querySelector("#adRp").value.trim();if(!v)return;bt.disabled=true;A.api("/admin/tickets/"+r.id+"/reply",{method:"POST",body:{message:v,close:T.querySelector("#adCl").checked}}).then(function(){A.toast(t("ad.m.done","Saved"));tickets()},function(x){bt.disabled=false;A.toast(A.err(x),"err")})}
   },function(x){T.innerHTML='<p class="ferr" style="padding:24px">'+e(A.err(x))+"</p>"})
  }
  b.querySelectorAll(".ak-li").forEach(function(x){x.onclick=function(){open(rows.filter(function(r){return r.id===x.dataset.id})[0]);if(window.innerWidth<=1100)T.scrollIntoView({behavior:"smooth",block:"start"})}});
  if(sel)open(sel);else{T.classList.add("ak-th2-empty");T.innerHTML='<div class="ak-empty" style="margin:auto"><span class="ak-ei">'+ic(P.chat,32)+"</span><h3>"+e(t("ad.tk.pick","Pick a ticket"))+"</h3><p>"+e(t("ad.tk.pick.p","The conversation opens here and you can answer right below it."))+"</p></div>"}
 },function(x){fail(x,"adRetry")})
}
var FL=[["deliverability","max","ad.ru.f.deliverability","Delivery quality"],["domain","max","ad.ru.f.domain","Own domain"],["history","max","ad.ru.f.history","Account age"],["conduct","max","ad.ru.f.conduct","Broadcast conduct"],["profile","max","ad.ru.f.profile","Profile completeness"]];
var EX={deliverability:[["min_sends","ad.ru.min_sends","Sends needed to score",1],["pending_share","ad.ru.pending_share","Share given before that (0 to 1)",.05],["days","ad.ru.days","Window in days",1]],domain:[["subdomain_share","ad.ru.sub_share","Share for a Geserd address only (0 to 1)",.05]],history:[["full_days","ad.ru.full_days","Days to full points",1]],conduct:[["complaint_full","ad.ru.c_full","Complaint rate with full points, %",.01],["complaint_zero","ad.ru.c_zero","Complaint rate with zero points, %",.01],["unsub_full","ad.ru.u_full","Unsubscribe rate with full points, %",.1],["unsub_zero","ad.ru.u_zero","Unsubscribe rate with zero points, %",.1],["broadcasts","ad.ru.bc","Broadcasts counted",1]],profile:[]};
function rating(){
 A.api("/admin/rating-rules").then(function(d){
  var R=JSON.parse(JSON.stringify(d.rules));
  var ICN={deliverability:P.mail,domain:P.globe,history:P.clock,conduct:P.chat,profile:P.users};
  var DESC={deliverability:["ad.ru.d.deliverability","How many of the sent emails arrive without bounces and complaints."],domain:["ad.ru.d.domain","Whether the account sends from its own verified domain."],history:["ad.ru.d.history","Older accounts earn more trust."],conduct:["ad.ru.d.conduct","Complaints and unsubscribes in the latest broadcasts."],profile:["ad.ru.d.profile","Name, region and finished setup."]};
  function num(id,v,step){return'<div class="ak-num" data-step="'+step+'"><button type="button" data-d="-1" tabindex="-1" aria-label="−">'+A.icon('<path d="M5 12h14"/>',14)+'</button><input type="text" inputmode="decimal" autocomplete="off" id="'+id+'" value="'+v+'"><button type="button" data-d="1" tabindex="-1" aria-label="+">'+A.icon('<path d="M12 5v14M5 12h14"/>',14)+"</button></div>"}
  var h='<section class="ak-card ak-sum"><span class="ak-ci">'+ic(P.star)+'</span><div class="ak-100" id="adBar"></div><b class="ak-tot" id="adSum"></b></section><section class="ak-card">';
  FL.forEach(function(f){h+='<div class="ak-fac"><span class="ak-ci">'+ic(ICN[f[0]])+"</span><div><h3>"+e(t(f[2],f[3]))+"</h3><p>"+e(t(DESC[f[0]][0],DESC[f[0]][1]))+'</p></div><div class="in">'+num("m_"+f[0],R.factors[f[0]].max,1)+"</div>"+(EX[f[0]].length?'<div class="ak-subs">'+EX[f[0]].map(function(x){return'<div class="ak-sub-r"><label for="x_'+f[0]+"_"+x[0]+'">'+e(t(x[1],x[2]))+"</label>"+num("x_"+f[0]+"_"+x[0],R.factors[f[0]][x[0]],x[3])+"</div>"}).join("")+"</div>":"")+"</div>"});
  h+='</section><section class="ak-card pad">'+cardHead(P.chart,t("ad.ru.lv","Level thresholds"),t("ad.ru.lv.p","Where each level of the rating begins."))+'<div class="ak-lv" id="adLv"></div><div class="ak-lvr">'+R.levels.map(function(l){return"<div><label for=\"l_"+l.id+'">'+e(t("rt.l."+l.id,l.id))+" "+e(t("ad.ru.from","from"))+"</label>"+(l.id==="low"?'<div class="ak-num off"><input id="l_low" value="0" disabled></div>':num("l_"+l.id,l.min,1))+"</div>"}).join("")+'</div></section><div class="ak-save"><button type="button" class="abtn pri lg" id="adSave">'+e(t("ad.d.save","Save"))+'</button><button type="button" class="abtn lg" id="adReset">'+e(t("ad.ru.reset","Restore defaults"))+'</button><span class="sp"></span><p class="ferr" id="adRe" hidden></p></div>';
  shell(h);
  function read(){var o=JSON.parse(JSON.stringify(R));FL.forEach(function(f){o.factors[f[0]].max=parseFloat(document.getElementById("m_"+f[0]).value);EX[f[0]].forEach(function(x){o.factors[f[0]][x[0]]=parseFloat(document.getElementById("x_"+f[0]+"_"+x[0]).value)})});o.levels.forEach(function(l){if(l.id!=="low")l.min=parseFloat(document.getElementById("l_"+l.id).value)});return o}
  function paint(){
   var s=0,bar="";FL.forEach(function(f){var v=parseFloat(document.getElementById("m_"+f[0]).value)||0;s+=v;bar+='<i style="flex:'+Math.max(v,.0001)+'" title="'+e(t(f[2],f[3]))+": "+v+'"></i>'});
   document.getElementById("adBar").innerHTML=bar;
   var el=document.getElementById("adSum");el.textContent=t("ad.ru.sum","Total: {n} of 100",{n:s});el.className="ak-tot "+(s===100?"ok":"bad");
   var lv="";R.levels.forEach(function(l){if(l.id==="low")return;var v=parseFloat(document.getElementById("l_"+l.id).value)||0;lv+='<i style="left:'+Math.min(100,Math.max(0,v))+'%"></i><span style="left:'+Math.min(100,Math.max(0,v))+'%">'+e(t("rt.l."+l.id,l.id))+"</span>"});document.getElementById("adLv").innerHTML=lv
  }
  root.addEventListener("input",paint);paint();root.onclick=function(ev){var b=ev.target.closest(".ak-num button");if(!b)return;var w=b.parentNode,i=w.querySelector("input"),st=parseFloat(w.dataset.step)||1,v=(parseFloat(String(i.value).replace(",","."))||0)+parseFloat(b.dataset.d)*st;v=Math.round(v*1000)/1000;if(v<0)v=0;i.value=v;paint()};
  document.getElementById("adSave").onclick=function(){var b=this,er=document.getElementById("adRe");er.hidden=true;b.disabled=true;A.api("/admin/rating-rules",{method:"PUT",body:{rules:read()}}).then(function(){b.disabled=false;A.toast(t("ad.m.done","Saved"))},function(x){b.disabled=false;er.textContent=t("ad.ru.err","These values are not accepted: {x}",{x:(x.data&&x.data.fields||[]).join(", ")});er.hidden=false})};
  document.getElementById("adReset").onclick=function(){A.api("/admin/rating-rules/reset",{method:"POST"}).then(function(){A.toast(t("ad.m.done","Saved"));rating()})}
 },function(x){fail(x,"adRetry")})
}
function roleName(r){return t("ad.role."+r,r)}
function sso(){
 A.api("/admin/sso").then(function(d){
  var n=d.items.length,on=d.items.filter(function(x){return x.enabled}).length;
  var h=kpis([kpi(P.id,n,t("ad.sso.k.all","Connections")),kpi(P.ok,on,t("ad.sso.on","On")),kpi(P.pause,n-on,t("ad.sso.off","Off")),kpi(P.users,d.users||0,t("ad.sso.k.users","People signed in via SSO"))]);
  h+='<div class="ak-two" style="margin-bottom:20px"><section class="ak-card pad">'+cardHead(P.link,t("ad.sso.uri","Redirect URI"),t("ad.sso.uri.p","Give this address to the customer to register in their identity provider."))+'<button type="button" class="abtn" id="ssCp">'+A.icon(A.IC.copy,16)+"<span>"+e(t("au.copy","Copy"))+'</span></button><code class="ak-uri">'+e(d.redirect_uri)+'</code></section><section class="ak-card pad">'+cardHead(P.list,t("ad.sso.how","How to connect a customer"))+'<ol class="ak-steps"><li><div><b>'+e(t("ad.sso.s1","Send the Redirect URI"))+"</b><span>"+e(t("ad.sso.s1.p","The customer registers it in their identity provider."))+"</span></div></li><li><div><b>"+e(t("ad.sso.s2","Receive the issuer and client data"))+"</b><span>"+e(t("ad.sso.s2.p","Issuer address, Client ID and Client secret."))+"</span></div></li><li><div><b>"+e(t("ad.sso.s3","Add the connection and check it"))+"</b><span>"+e(t("ad.sso.s3.p","Use “Check provider” before turning it on."))+"</span></div></li></ol></section></div>";
  h+='<div class="ak-bar"><button type="button" class="abtn pri lg" id="ssAdd">'+ic(P.plus,16)+"<span>"+e(t("ad.sso.add","Add connection"))+"</span></button></div>";
  if(!n)h+=emptyBox(P.id,t("ad.sso.none","No SSO connections"),t("ad.sso.none.p","Enterprise customers sign in with their own identity provider. Add the first connection when a contract is signed."),"",true);
  else h+='<section class="ak-card">'+d.items.map(function(x,i){return'<div class="ak-conn" data-i="'+i+'">'+av(x.domain,"lg")+'<div style="min-width:0"><h3>'+e(x.domain)+"</h3><p>"+e(x.issuer)+'</p></div><div class="ak-btns">'+A.pill(x.enabled?"ok":"dim",x.enabled?t("ad.sso.on","On"):t("ad.sso.off","Off"))+'<button type="button" class="abtn" data-a="tg">'+e(x.enabled?t("ad.sso.disable","Turn off"):t("ad.sso.enable","Turn on"))+'</button><button type="button" class="abtn" data-a="ed">'+e(t("ad.sso.edit","Edit"))+'</button><button type="button" class="abtn dng" data-a="rm">'+e(t("ad.sso.rm","Delete"))+"</button></div></div>"}).join("")+"</section>";
  shell(h);
  document.getElementById("ssCp").onclick=function(){A.copy(d.redirect_uri,this)};
  document.getElementById("ssAdd").onclick=function(){form(null)};
  root.querySelectorAll(".ak-conn").forEach(function(row){var x=d.items[+row.dataset.i];row.querySelectorAll("[data-a]").forEach(function(b){b.onclick=function(){var a=b.dataset.a;
   if(a==="ed")return form(x);
   if(a==="tg"){b.disabled=true;return A.api("/admin/sso/"+encodeURIComponent(x.domain),{method:"PATCH",body:{enabled:!x.enabled}}).then(function(){A.toast(t("ad.m.done","Saved"));sso()},function(z){b.disabled=false;A.toast(A.err(z),"err")})}
   var m=A.modal({title:t("ad.sso.del.t","Delete this connection?"),body:'<p class="dim">'+e(t("ad.sso.del.p","People from {d} will no longer be able to sign in with SSO, and their identity links are removed. Their accounts stay.",{d:x.domain}))+'</p><div class="prow"><button type="button" class="abtn" id="adNo">'+e(t("au.cancel","Cancel"))+'</button><button type="button" class="abtn pri" id="adYes">'+e(t("ad.sso.rm","Delete"))+"</button></div>"});
   m.body.querySelector("#adNo").onclick=m.close;
   m.body.querySelector("#adYes").onclick=function(){var y=this;y.disabled=true;A.api("/admin/sso/"+encodeURIComponent(x.domain),{method:"DELETE"}).then(function(){m.close();A.toast(t("ad.m.done","Saved"));sso()},function(z){y.disabled=false;A.toast(A.err(z),"err")})}
  }})});
  function form(x){
   var ed=!!x;
   var m=A.modal({title:ed?t("ad.sso.edit.t","Edit connection"):t("ad.sso.add","Add connection"),wide:true,body:'<div class="pfld"><label for="ssD">'+e(t("ad.sso.domain","Domain"))+'</label><input id="ssD" autocomplete="off" maxlength="253" placeholder="company.com" value="'+e(ed?x.domain:"")+'"'+(ed?" disabled":"")+'><small class="dim">'+e(t("ad.sso.domain.h","People with an email on this domain sign in through this provider."))+'</small></div><div class="pfld"><label for="ssI">'+e(t("ad.sso.issuer","Issuer"))+'</label><input id="ssI" autocomplete="off" maxlength="300" placeholder="https://login.company.com" value="'+e(ed?x.issuer:"")+'"><small class="dim">'+e(t("ad.sso.issuer.h","The OpenID Connect issuer address. We find the rest from its discovery document."))+'</small></div><div class="pfld"><label for="ssC">'+e(t("ad.sso.cid","Client ID"))+'</label><input id="ssC" autocomplete="off" maxlength="300" value="'+e(ed?x.client_id:"")+'"></div><div class="pfld"><label for="ssS">'+e(t("ad.sso.sec","Client secret"))+'</label><input id="ssS" type="password" autocomplete="new-password" maxlength="2000" placeholder="'+e(ed?t("ad.sso.sec.keep","Leave empty to keep the current secret"):"")+'"></div><p class="ferr" id="ssE" hidden></p><div class="prow"><button type="button" class="abtn" id="ssT">'+e(t("ad.sso.test","Check provider"))+'</button><button type="button" class="abtn" id="adNo">'+e(t("au.cancel","Cancel"))+'</button><button type="button" class="abtn pri" id="adYes">'+e(t("ad.d.save","Save"))+"</button></div>"});
   var er=m.body.querySelector("#ssE");
   function show(c){er.textContent=c;er.hidden=!c}
   m.body.querySelector("#adNo").onclick=m.close;
   m.body.querySelector("#ssT").onclick=function(){var b=this;show("");b.disabled=true;A.api("/admin/sso/check",{method:"POST",body:{issuer:m.body.querySelector("#ssI").value}}).then(function(){b.disabled=false;A.toast(t("ad.sso.test.ok","The provider answered correctly"))},function(z){b.disabled=false;show(t("ad.sso.test.bad","The provider could not be reached or its settings are wrong."))})};
   m.body.querySelector("#adYes").onclick=function(){var b=this;show("");b.disabled=true;
    var body={issuer:m.body.querySelector("#ssI").value,client_id:m.body.querySelector("#ssC").value,client_secret:m.body.querySelector("#ssS").value};
    var rq=ed?A.api("/admin/sso/"+encodeURIComponent(x.domain),{method:"PATCH",body:body}):A.api("/admin/sso",{method:"POST",body:Object.assign({domain:m.body.querySelector("#ssD").value},body)});
    rq.then(function(){m.close();A.toast(t("ad.m.done","Saved"));sso()},function(z){b.disabled=false;show(A.err(z))})}
  }
 },function(x){fail(x,"adRetry")})
}
function staff(){
 A.api("/admin/staff").then(function(d){
  var cn={owner:0,director:0,admin:0,support:0};d.items.forEach(function(x){if(cn[x.role]!=null)cn[x.role]++});
  var RI={owner:P.shield,director:P.star,admin:P.lock,support:P.chat};
  var AR=[["overview","ad.t.over","Overview"],["users","ad.t.users","Users"],["tickets","ad.t.tickets","Tickets"],["mail","ad.t.mail","Mail"],["review","ad.t.review","Review"],["siberia","ad.t.sib","Applications"],["newsletter","ad.t.nl","Newsletter"],["maintenance","ad.t.maint","Technical works"],["analytics","ad.t.an","Analytics"],["rating-rules","ad.t.rating","Rating rules"],["sso","ad.t.sso","SSO"],["staff","ad.t.staff","Team"]];
  var RL=["owner","director","admin","support"],mx=d.areas||{};
  var h=kpis(RL.map(function(r){return kpi(RI[r],cn[r],roleName(r))}));
  h+='<div class="ak-bar"><button type="button" class="abtn pri lg" id="stAdd">'+ic(P.plus,16)+"<span>"+e(t("ad.st.add","Add employee"))+"</span></button></div>";
  h+='<section class="ak-card"><div class="ak-th" style="--cols:minmax(0,2.4fr) 160px 150px 230px"><span>'+e(t("ad.u.acc","Account"))+"</span><span>"+e(t("ad.st.role","Role"))+"</span><span>"+e(t("ad.st.seen","Last seen"))+"</span><span></span></div>"+d.items.map(function(x,i){var mine=x.id===d.me,can=!mine&&d.assignable.indexOf(x.role)>-1;return'<div class="ak-tr ad-str" data-i="'+i+'" style="--cols:minmax(0,2.4fr) 160px 150px 230px"><div class="c">'+av(x.name||x.email)+'<span class="ak-nm"><b>'+e(x.email)+"</b><small>"+e(x.name||"")+(mine?" · "+e(t("app.team.you","You")):"")+'</small></span></div><div class="c">'+A.pill(x.role==="owner"?"ok":x.role==="director"?"wait":"dim",roleName(x.role))+'</div><div class="c dim">'+e(x.last_seen?A.ago(x.last_seen):t("au.never","Never"))+'</div><div class="c ak-btns" style="justify-content:flex-end">'+(can?'<button type="button" class="abtn" data-a="ro">'+e(t("ad.st.change","Change role"))+'</button><button type="button" class="abtn dng" data-a="rm">'+e(t("ad.st.remove","Remove"))+"</button>":"")+"</div></div>"}).join("")+"</section>";
  h+='<h2 class="sh2">'+e(t("ad.st.what","What each role can do"))+'</h2><div class="ak-roles">'+RL.map(function(r){return'<div class="ak-role"><span class="ki">'+ic(RI[r])+"</span><b>"+e(roleName(r))+"</b><span>"+e(t("ad.role."+r+".d",""))+"</span></div>"}).join("")+"</div>";
  h+='<section class="ak-card"><table class="ak-mx"><thead><tr><th>'+e(t("ad.st.area","Section"))+"</th>"+RL.map(function(r){return"<th>"+e(roleName(r))+"</th>"}).join("")+"</tr></thead><tbody>"+AR.map(function(a){return"<tr><td>"+e(t(a[1],a[2]))+"</td>"+RL.map(function(r){var y=(mx[a[0]]||[]).indexOf(r)>-1;return'<td class="'+(y?"y":"")+'">'+(y?ic(P.ok,18):"—")+"</td>"}).join("")+"</tr>"}).join("")+"</tbody></table></section>";
  shell(h);
  var opts=d.assignable.map(function(r){return[r,roleName(r)]});
  document.getElementById("stAdd").onclick=function(){
   var role=opts[opts.length-1][0];
   var m=A.modal({title:t("ad.st.add","Add employee"),body:'<div class="pfld"><label for="stE">'+e(t("ad.sb.email","Email"))+'</label><input id="stE" type="email" autocomplete="off" maxlength="200"><small class="dim">'+e(t("ad.st.add.h","The person must have signed in to Geserd at least once."))+'</small></div><div class="pfld"><label>'+e(t("ad.st.role","Role"))+'</label><div id="stR"></div></div><p class="ferr" id="stX" hidden></p><div class="prow"><button type="button" class="abtn" id="adNo">'+e(t("au.cancel","Cancel"))+'</button><button type="button" class="abtn pri" id="adYes">'+e(t("ad.st.add","Add employee"))+"</button></div>"});
   m.body.querySelector("#stR").appendChild(A.dropdown(opts,role,function(v){role=v}));
   m.body.querySelector("#adNo").onclick=m.close;
   m.body.querySelector("#adYes").onclick=function(){var b=this,er=m.body.querySelector("#stX");er.hidden=true;b.disabled=true;A.api("/admin/staff",{method:"POST",body:{email:m.body.querySelector("#stE").value,role:role}}).then(function(){m.close();A.toast(t("ad.m.done","Saved"));staff()},function(z){b.disabled=false;er.textContent=A.err(z);er.hidden=false})}
  };
  root.querySelectorAll(".ad-str").forEach(function(row){var x=d.items[+row.dataset.i];row.querySelectorAll("[data-a]").forEach(function(b){b.onclick=function(){
   if(b.dataset.a==="rm"){var m=A.modal({title:t("ad.st.rm.t","Remove this employee?"),body:'<p class="dim">'+e(t("ad.st.rm.p","{e} loses access to the control panel. The account itself stays.",{e:x.email}))+'</p><div class="prow"><button type="button" class="abtn" id="adNo">'+e(t("au.cancel","Cancel"))+'</button><button type="button" class="abtn pri" id="adYes">'+e(t("ad.st.remove","Remove"))+"</button></div>"});m.body.querySelector("#adNo").onclick=m.close;m.body.querySelector("#adYes").onclick=function(){var y=this;y.disabled=true;A.api("/admin/staff/"+x.id,{method:"DELETE"}).then(function(){m.close();A.toast(t("ad.m.done","Saved"));staff()},function(z){y.disabled=false;A.toast(A.err(z),"err")})};return}
   var role=x.role;var m2=A.modal({title:t("ad.st.change","Change role"),body:'<div class="pfld"><label>'+e(t("ad.st.role","Role"))+'</label><div id="stR"></div></div><div class="prow"><button type="button" class="abtn" id="adNo">'+e(t("au.cancel","Cancel"))+'</button><button type="button" class="abtn pri" id="adYes">'+e(t("ad.d.save","Save"))+"</button></div>"});
   m2.body.querySelector("#stR").appendChild(A.dropdown(opts,role,function(v){role=v}));
   m2.body.querySelector("#adNo").onclick=m2.close;
   m2.body.querySelector("#adYes").onclick=function(){var y=this;y.disabled=true;A.api("/admin/staff/"+x.id,{method:"PATCH",body:{role:role}}).then(function(){m2.close();A.toast(t("ad.m.done","Saved"));staff()},function(z){y.disabled=false;A.toast(A.err(z),"err")})}
  }})})
 },function(x){fail(x,"adRetry")})
}
function newsletter(){
 A.api("/admin/newsletter").then(function(d){
  function tile(n,l){return'<div class="gcard nl-t"><b>'+A.num(n)+'</b><span>'+e(l)+'</span></div>'}
  var recent=(d.recent||[]).map(function(x){return'<li><span>'+e(x.email)+'</span><em>'+e(x.lang||"")+'</em></li>'}).join("");
  var sends=(d.sends||[]).map(function(x){return'<li><span>'+e(x.subject)+'</span><em>'+A.num(x.sent)+"/"+A.num(x.total)+(x.failed?" · "+A.num(x.failed)+" "+e(t("ad.nl.failed","failed")):"")+'</em></li>'}).join("");
  shell('<div class="nl-g">'+tile(d.confirmed,t("ad.nl.conf","Subscribers"))+tile(d.pending,t("ad.nl.pend","Waiting for confirmation"))+tile(d.unsubscribed,t("ad.nl.unsub","Unsubscribed"))+'</div>'+
  '<h2 class="sh3">'+e(t("ad.nl.write","New message"))+'</h2><section class="gcard"><div class="pfld"><label for="nlS">'+e(t("ad.nl.subj","Subject"))+'</label><input id="nlS" maxlength="200" autocomplete="off"></div><div class="pfld"><label for="nlH">'+e(t("ad.nl.html","HTML of the email"))+'</label><textarea id="nlH" class="nl-code" rows="14" spellcheck="false" placeholder="<!doctype html>..."></textarea><span class="fhint">'+e(t("ad.nl.hint","Paste ready HTML. Put {{unsubscribe}} where the unsubscribe link should be. If you do not, a small footer with the link is added at the end."))+'</span></div><div class="prow"><button type="button" class="abtn lg" id="nlPv">'+e(t("ad.nl.prev","Preview"))+'</button><button type="button" class="abtn lg" id="nlTest">'+e(t("ad.nl.test","Send a test to me"))+'</button><button type="button" class="abtn pri lg" id="nlSend">'+e(t("ad.nl.send","Send to subscribers"))+'</button></div><p class="dim" id="nlMsg" role="status"></p><iframe id="nlFr" class="nl-fr" sandbox="" hidden title="preview"></iframe></section>'+
  '<div class="dsh-g2"><section class="dsh-p"><header><h3>'+e(t("ad.nl.last","Last sends"))+'</h3></header><ul class="nl-ls">'+(sends||'<li><span class="dim">'+e(t("ad.nl.none","Nothing sent yet"))+'</span></li>')+'</ul></section><section class="dsh-p"><header><h3>'+e(t("ad.nl.new","Newest subscribers"))+'</h3></header><ul class="nl-ls">'+(recent||'<li><span class="dim">'+e(t("ad.nl.nosub","No subscribers yet"))+'</span></li>')+'</ul></section></div>');
  var S=document.getElementById("nlS"),H=document.getElementById("nlH"),M=document.getElementById("nlMsg"),F=document.getElementById("nlFr");
  function say(k,def,v){M.textContent=t(k,def,v)}
  document.getElementById("nlPv").onclick=function(){F.hidden=!F.hidden;if(!F.hidden)F.srcdoc=H.value.split("{{unsubscribe}}").join("#")};
  function go(test){var b={subject:S.value,html:H.value,test:test};
   A.api("/admin/newsletter/send",{method:"POST",body:b}).then(function(r){say(test?"ad.nl.tsent":"ad.nl.qd",test?"Test sent to {to}.":"Sending to {total} subscribers has started.",r)}).catch(function(x){say("ad.nl.err","Could not send. Check the subject and the HTML.")})}
  document.getElementById("nlTest").onclick=function(){go(true)};
  document.getElementById("nlSend").onclick=function(){if(!S.value.trim()||H.value.length<10){say("ad.nl.err","Could not send. Check the subject and the HTML.");return}if(window.confirm(t("ad.nl.ask","Send this message to {n} subscribers?",{n:d.confirmed})))go(false)}
 },function(x){fail(x,"adRetry")})
}
function mtTabs(cur){return'<nav class="mt-tabs" aria-label="tabs"><a href="/app/admin/maintenance/"'+(cur==="m"?' class="on" aria-current="page"':'')+'>'+e(t("ad.mt.tab1","Right now"))+'</a><a href="/app/admin/notice/"'+(cur==="n"?' class="on" aria-current="page"':'')+'>'+e(t("ad.mt.tab2","Announcement in advance"))+'</a></nav>'}
function notice(){
 A.api("/admin/maintenance/notice").then(function(n){
  var LG=["ru","en","fr","de"],names={ru:"Русский",en:"English",fr:"Français",de:"Deutsch"},cur=(window.GESERD&&GESERD.lang)||"ru";if(LG.indexOf(cur)<0)cur="en";
  var texts=JSON.parse(JSON.stringify(n.texts||{})),on=!!n.active;
  LG.forEach(function(l){if(!texts[l])texts[l]={title:"",message:""}});
  shell(mtTabs("n")+'<section class="gcard mt-st'+(on?" hot":"")+'"><div class="trow"><div><b id="ntSt">'+e(t(on?"ad.nt.on":"ad.nt.off",on?"The notice is shown":"The notice is hidden"))+'</b><span>'+e(t("ad.nt.state","People see it as a banner in the dashboard, on the sign-in page and on the sign-up page. Nothing stops working."))+'</span></div><button type="button" class="tg'+(on?" on":"")+'" id="ntTg" role="switch" aria-checked="'+(on?"true":"false")+'"><i></i></button></div></section>'+
  '<h2 class="sh3">'+e(t("ad.nt.text","Text"))+'</h2><section class="gcard"><div class="opts ad-lg" id="ntLg" role="tablist"></div><div class="pfld"><label for="ntT">'+e(t("ad.mt.title","Title"))+'</label><input id="ntT" maxlength="120" autocomplete="off" placeholder="'+e(t("ad.nt.title.p","Planned maintenance on Saturday"))+'"></div><div class="pfld"><label for="ntM">'+e(t("ad.mt.text","Details"))+'</label><textarea id="ntM" rows="4" maxlength="1000" placeholder="'+e(t("ad.nt.text.p","We will update the servers. Sending may pause for a few minutes."))+'"></textarea><span class="fhint">'+e(t("ad.nt.lang.h","Write each language you can. People whose language is empty see the English text."))+'</span></div></section>'+
  '<h2 class="sh3">'+e(t("ad.nt.when","When"))+'</h2><section class="gcard"><div class="pfld"><label for="ntS">'+e(t("ad.nt.from","Starts"))+'</label><input id="ntS" type="datetime-local" value="'+e(mtDt(n.starts_at))+'"></div><div class="pfld"><label for="ntE">'+e(t("ad.nt.to","Ends"))+'</label><input id="ntE" type="datetime-local" value="'+e(mtDt(n.ends_at))+'"><span class="fhint">'+e(t("ad.nt.to.h","After this time the banner disappears by itself."))+'</span></div><div class="prow"><button type="button" class="abtn pri lg" id="ntSave">'+e(t("ac.save","Save"))+'</button><button type="button" class="abtn lg" id="ntMail">'+e(t("ad.nt.mail","Email everyone"))+'</button></div>'+(n.emailed_at?'<p class="dim ad-sent">'+e(t("ad.nt.sent","Last email: {n} people, {d}",{n:n.emailed_count,d:new Date(n.emailed_at).toLocaleString()}))+'</p>':'')+'</section>');
  var lg=document.getElementById("ntLg"),ti=document.getElementById("ntT"),me=document.getElementById("ntM");
  function keep(){texts[cur]={title:ti.value,message:me.value}}
  function paint(){lg.innerHTML=LG.map(function(l){var f=texts[l].title||texts[l].message;return'<button type="button" class="opt'+(l===cur?" on":"")+'" data-l="'+l+'" role="tab" aria-selected="'+(l===cur?"true":"false")+'"><b>'+e(names[l])+'</b><span>'+e(f?t("ad.nt.filled","Filled"):t("ad.nt.empty","Empty"))+'</span></button>'}).join("");ti.value=texts[cur].title;me.value=texts[cur].message;lg.querySelectorAll("[data-l]").forEach(function(b){b.onclick=function(){keep();cur=b.dataset.l;paint()}})}
  paint();
  function body(a){keep();var s=document.getElementById("ntS").value,en=document.getElementById("ntE").value;return{active:a,texts:texts,starts_at:s?new Date(s).toISOString():null,ends_at:en?new Date(en).toISOString():null}}
  function save(a,btn){if(btn)btn.disabled=true;return A.api("/admin/maintenance/notice",{method:"PUT",body:body(a)}).then(function(){if(btn)btn.disabled=false;A.toast(t("ad.m.done","Saved"));return true},function(z){if(btn)btn.disabled=false;A.toast(A.err(z),"err");return false})}
  document.getElementById("ntSave").onclick=function(){save(on,this).then(function(ok){if(ok)notice()})};
  document.getElementById("ntTg").onclick=function(){var b=this;save(!on,b).then(function(ok){if(ok)notice()})};
  document.getElementById("ntMail").onclick=function(){
   var m=A.modal({title:t("ad.nt.mail.t","Email everyone?"),body:'<p class="dim">'+e(t("ad.nt.mail.p","Every account that is not blocked gets a branded email in its own language, and a notification in the dashboard. The saved text is sent, so save first. This cannot be undone."))+'</p><div class="prow"><button type="button" class="abtn" id="adNo">'+e(t("au.cancel","Cancel"))+'</button><button type="button" class="abtn pri" id="adYes">'+e(t("ad.nt.mail","Email everyone"))+"</button></div>"});
   m.body.querySelector("#adNo").onclick=m.close;
   m.body.querySelector("#adYes").onclick=function(){var y=this;y.disabled=true;save(on).then(function(ok){if(!ok){y.disabled=false;return}A.api("/admin/maintenance/notice/email",{method:"POST"}).then(function(r){m.close();A.toast(t("ad.nt.done","Sent to {n} people",{n:r.sent}));notice()},function(z){y.disabled=false;A.toast(A.err(z),"err")})})}
  }
 },function(x){fail(x,"adRetry")})
}
function mtDt(v){if(!v)return"";var d=new Date(v);if(isNaN(d))return"";var o=d.getTimezoneOffset()*60000;return new Date(d.getTime()-o).toISOString().slice(0,16)}
function maint(){
 A.api("/admin/maintenance").then(function(m){
  var on=!!m.active,sc=m.scope==="sending"?"sending":"all";
  function opt(v,title,desc){return'<button type="button" class="opt'+(v===sc?" on":"")+'" data-v="'+v+'" role="radio" aria-checked="'+(v===sc?"true":"false")+'"><b>'+e(title)+"</b><span>"+e(desc)+"</span></button>"}
  shell(mtTabs("m")+'<section class="gcard mt-st'+(on?" hot":"")+'"><div class="trow"><div><b>'+e(t(on?"ad.mt.on":"ad.mt.off",on?"Maintenance is on":"Maintenance is off"))+"</b><span>"+e(t("ad.mt.state","While it is on, visitors see the maintenance page. Administrators can still sign in and use this panel."))+'</span></div><button type="button" class="tg'+(on?" on":"")+'" id="mtTg" role="switch" aria-checked="'+(on?"true":"false")+'"><i></i></button></div></section>'+
  '<h2 class="sh3">'+e(t("ad.mt.scope","What stops"))+'</h2><div class="opts" id="mtSc" role="radiogroup">'+opt("all",t("ad.mt.all","Whole service"),t("ad.mt.all.d","Website, dashboard and API show the maintenance page. The status, health and admin endpoints keep working."))+opt("sending",t("ad.mt.snd","Sending only"),t("ad.mt.snd.d","The dashboard stays open. Only sending emails and starting broadcasts is paused with a clear error."))+"</div>"+
  '<h2 class="sh3">'+e(t("ad.mt.msg","Message for visitors"))+'</h2><section class="gcard"><div class="pfld"><label for="mtT">'+e(t("ad.mt.title","Title"))+'</label><input id="mtT" maxlength="120" autocomplete="off" value="'+e(m.title||"")+'" placeholder="'+e(t("ad.mt.title.p","We are upgrading the servers"))+'"></div><div class="pfld"><label for="mtM">'+e(t("ad.mt.text","Details"))+'</label><textarea id="mtM" rows="4" maxlength="1000" placeholder="'+e(t("ad.mt.text.p","Sending will be back in about an hour."))+'">'+e(m.message||"")+'</textarea></div><div class="pfld"><label for="mtE">'+e(t("ad.mt.eta","Expected to finish"))+'</label><input id="mtE" type="datetime-local" value="'+e(mtDt(m.eta))+'"><span class="fhint">'+e(t("ad.mt.eta.h","Optional. Shown on the maintenance page in the visitor\'s own time zone."))+'</span></div><div class="prow"><button type="button" class="abtn pri lg" id="mtSave">'+e(t("ac.save","Save"))+'</button><a class="abtn lg" href="/maintenance/" target="_blank" rel="noopener">'+e(t("ad.mt.view","Open the page"))+"</a></div></section>");
  function body(a){var v=document.getElementById("mtE").value;return{active:a,scope:sc,title:document.getElementById("mtT").value,message:document.getElementById("mtM").value,eta:v?new Date(v).toISOString():null}}
  function save(a){return A.api("/admin/maintenance",{method:"PUT",body:body(a)}).then(function(){A.toast(t("ad.mt.saved","Saved"));return a})}
  root.querySelectorAll("#mtSc .opt").forEach(function(b){b.onclick=function(){sc=b.dataset.v;root.querySelectorAll("#mtSc .opt").forEach(function(x){var o=x===b;x.classList.toggle("on",o);x.setAttribute("aria-checked",o)})}});
  document.getElementById("mtSave").onclick=function(){save(on).then(maint)};
  document.getElementById("mtTg").onclick=function(){var nx=!on;if(nx&&!window.confirm(t("ad.mt.confirm","Turn maintenance on? Visitors will see the maintenance page right away.")))return;save(nx).then(maint)}
 },function(x){root.innerHTML=head()+A.failed(x,"adRt");document.getElementById("adRt").onclick=maint})
}
function analytics(){
 var days=+(new URLSearchParams(location.search).get("days"))||7;
 root.innerHTML=head()+A.loading();
 A.api("/admin/analytics?days="+days).then(function(d){
  var dn;try{dn=new Intl.DisplayNames([document.documentElement.lang||"en"],{type:"region"})}catch(x){dn=null}
  function cn(c){try{return dn?dn.of(c):c}catch(x){return c}}
  var tt=d.totals||{},sr=d.series||[];
  var empty=!(tt.views||tt.visitors||tt.clicks);
  var ppv=tt.visitors?Math.round(tt.views/tt.visitors*10)/10:0;
  var sg='<div class="ak-bar">'+segc("anSeg",[[7,t("ad.an.d7","7 days")],[30,t("ad.an.d30","30 days")],[90,t("ad.an.d90","90 days")]],days)+"</div>";
  var kp=kpis([kpi(P.users,tt.visitors,t("ad.an.vis","Visitors")),kpi(P.page,tt.views,t("ad.an.views","Page views")),kpi(P.click,tt.clicks,t("ad.an.clicks","Clicks")),kpi(P.chart,ppv,t("ad.an.ppv","Pages per visit"))]);
  var mx=Math.max.apply(null,[1].concat(sr.map(function(x){return x.views})));
  var chart=sr.length?'<div class="ak-an">'+sr.map(function(x){return'<div title="'+e(x.d)+": "+x.views+'"><i style="height:'+Math.max(3,Math.round(x.views/mx*100))+'%"></i><small>'+e(x.d.slice(5))+"</small></div>"}).join("")+"</div>":'<div class="ak-an ghost" aria-hidden="true">'+[30,52,40,70,55,86,62,44,78,58,36,66].map(function(h){return'<div><i style="height:'+h+'%"></i></div>'}).join("")+'</div><p class="dim" style="margin:18px 0 0;text-align:center">'+e(t("ad.an.empty","No data yet. It appears once visitors accept analytics cookies."))+"</p>";
  function lst(i,ttl,list,lab,val){var tot=list.reduce(function(a,x){return a+val(x)},0);var body=list.length?'<div class="ak-lst">'+list.map(function(x){var w=tot?Math.max(4,Math.round(val(x)/tot*100)):0;return'<div class="ak-lr"><i style="width:'+w+'%"></i><span>'+lab(x)+"</span><b>"+A.num(val(x))+"</b></div>"}).join("")+"</div>":'<div class="ak-soon">'+ic(P.clock,18)+"<span>"+e(t("ad.an.wait","Nothing here yet."))+"</span></div>";return'<section class="ak-card pad">'+cardHead(i,ttl)+body+"</section>"}
  var devs=(d.devices||[]).map(function(x){return{l:e(t(x.device==="mobile"?"ad.an.mobile":"ad.an.desktop",x.device)),v:x.visitors}});
  var dtot=devs.reduce(function(a,x){return a+x.v},0);
  var dev='<section class="ak-card pad">'+cardHead(P.phone,t("ad.an.dev","Devices"))+(devs.length?'<div class="ak-lst">'+devs.map(function(x){return'<div class="ak-lr"><i style="width:'+(dtot?Math.round(x.v/dtot*100):0)+'%"></i><span>'+x.l+"</span><b>"+A.num(x.v)+"</b></div>"}).join("")+"</div>":'<div class="ak-soon">'+ic(P.clock,18)+"<span>"+e(t("ad.an.wait","Nothing here yet."))+"</span></div>")+"</section>";
  shell(sg+kp+'<section class="ak-card pad">'+cardHead(P.chart,t("ad.an.perday","By day"))+chart+'</section><div class="ak-two">'+lst(P.page,t("ad.an.pages","Pages"),d.pages||[],function(x){return e(x.path)},function(x){return x.views})+lst(P.globe,t("ad.an.countries","Countries"),d.countries||[],function(x){return e(cn(x.country))},function(x){return x.visitors})+lst(P.click,t("ad.an.tclicks","What people click"),d.clicks||[],function(x){return e(x.label)},function(x){return x.n})+lst(P.link,t("ad.an.refs","Where they came from"),d.refs||[],function(x){return e(x.ref)},function(x){return x.visitors})+dev+"</div>");
  bindSeg("anSeg",function(v){history.replaceState(null,"","?days="+v);analytics()})
 },function(x){fail(x,"adRt")})
}
function audit(){
 var tab=(location.hash||"#export").slice(1);if(["export","verdicts","history"].indexOf(tab)<0)tab="export";
 var hrs=+sessionStorage.getItem("ad_audit_h")||24;
 A.api("/admin/audit/summary?hours="+hrs).then(function(d){
  var tt=d.totals||{};
  shell(segc("auTab",[["export",t("ad.au.tab1","Export")],["verdicts",t("ad.au.tab2","Verdicts")],["history",t("ad.au.tab3","History"),d.runs.length]],tab)+'<div style="height:22px"></div><div id="adBody"></div>');
  bindSeg("auTab",function(v){history.replaceState(null,"","#"+v);audit()});
  var b=document.getElementById("adBody");
  if(tab==="export"){
   var HL={1:"1 "+t("ad.au.h","h"),3:"3 "+t("ad.au.h","h"),5:"5 "+t("ad.au.h","h"),12:"12 "+t("ad.au.h","h"),24:"24 "+t("ad.au.h","h"),48:"2 "+t("ad.au.d","d"),72:"3 "+t("ad.au.d","d")};
   var top=d.top.length?'<div class="ak-lst">'+d.top.map(function(x){var w=Math.max(4,Math.round(x.sent/d.top[0].sent*100));return'<a class="ak-lr" href="/app/admin/users/view/?id='+x.id+'" style="text-decoration:none;color:inherit"><i style="width:'+w+'%"></i><span>'+e(x.email)+"</span><b>"+A.num(x.sent)+"</b></a>"}).join("")+"</div>":'<div class="ak-soon">'+ic(P.clock,18)+"<span>"+e(t("ad.au.nomail","No emails in this period."))+"</span></div>";
   b.innerHTML='<section class="ak-card pad"><div class="ak-ch"><span class="ak-ci">'+ic(P.clock)+"</span><div><h3>"+e(t("ad.au.period","Period"))+"</h3><p>"+e(t("ad.au.period.p","Emails sent by every account in this time."))+'</p></div></div><div class="ak-seg" id="auH" style="margin-bottom:20px">'+d.hours_list.map(function(h){return'<button type="button" data-v="'+h+'"'+(h===d.hours?' class="on"':"")+">"+e(HL[h])+"</button>"}).join("")+"</div>"+kpis([kpi(P.mail,tt.emails,t("ad.au.k.mail","Emails")),kpi(P.users,tt.accounts,t("ad.au.k.acc","Accounts")),kpi(P.ban,tt.bounced,t("ad.o.bounced","Bounced")),kpi(P.alert,tt.complained,t("ad.o.compl","Complained"))]).replace('class="ak-k4"','class="ak-k4" style="margin:0"')+'</section><div class="ak-two" style="margin-bottom:20px"><section class="ak-card pad">'+cardHead(P.chart,t("ad.au.top","Who sent the most"))+top+'</section><section class="ak-card pad">'+cardHead(P.list,t("ad.au.how","How it works"))+'<ol class="ak-steps"><li><div><b>'+e(t("ad.au.s1","Download the file"))+"</b><span>"+e(t("ad.au.s1.p","Messages are grouped by account. Recipient addresses are masked."))+"</span></div></li><li><div><b>"+e(t("ad.au.s2","Give it to an AI with the prompt"))+"</b><span>"+e(t("ad.au.s2.p","Any assistant works. Attach the file and paste the prompt below."))+"</span></div></li><li><div><b>"+e(t("ad.au.s3","Bring the answer back"))+"</b><span>"+e(t("ad.au.s3.p","Open Verdicts, paste or upload the answer, check it and apply."))+'</span></div></li></ol><div class="ak-btns" style="margin-top:22px"><a class="abtn pri lg" href="/api/admin/audit/export?hours='+d.hours+'" download>'+ic(P.dl,16)+"<span>"+e(t("ad.au.dl","Download file"))+"</span></a></div></section></div>"+'<section class="ak-card pad">'+cardHead(P.chat,t("ad.au.prompt.t","Prompt for the AI"),t("ad.au.prompt.p","Paste it together with the file. It asks for an answer in the exact format this panel reads."))+'<pre class="ak-pre">'+e(t("ad.au.prompt",""))+'</pre><div class="ak-btns" style="margin-top:16px"><button type="button" class="abtn" id="auCp">'+A.icon(A.IC.copy,16)+"<span>"+e(t("ad.au.copy","Copy prompt"))+"</span></button></div></section>";
   document.getElementById("auH").onclick=function(ev){var bt=ev.target.closest("button");if(!bt)return;sessionStorage.setItem("ad_audit_h",bt.dataset.v);audit()};
   document.getElementById("auCp").onclick=function(){A.copy(t("ad.au.prompt",""),this)}
  }else if(tab==="verdicts"){
   var items=[];
   b.innerHTML='<section class="ak-card pad">'+cardHead(P.ok,t("ad.au.paste","The AI answer"),t("ad.au.paste.p","Paste the text or upload the file. Extra words around the JSON are fine."))+'<label class="ak-drop" id="auDrop"><input type="file" id="auF" accept=".json,.txt,application/json,text/plain" hidden><span class="ak-ei" style="width:56px;height:56px;border-radius:19px;margin:0">'+ic(P.up,24)+'</span><b>'+e(t("ad.au.drop","Drop the file here or choose it"))+'</b><span class="dim sm">'+e(t("ad.au.drop.p","JSON or text file with the answer"))+'</span></label><div class="ak-fld" style="margin-top:18px"><textarea id="auT" rows="8" placeholder="{&quot;format&quot;:&quot;geserd-audit-verdict/1&quot;,&quot;verdicts&quot;:[…]}"></textarea></div><p class="ferr" id="auE" hidden></p><div class="ak-btns"><button type="button" class="abtn pri lg" id="auGo">'+ic(P.ok,16)+"<span>"+e(t("ad.au.check","Check the answer"))+'</span></button></div></section><div id="auRes"></div>';
   var F2=document.getElementById("auF"),T=document.getElementById("auT"),dz=document.getElementById("auDrop");
   function readFile(f){if(!f)return;f.text().then(function(x){T.value=x;go()})}
   F2.onchange=function(){readFile(F2.files[0])};
   ["dragenter","dragover"].forEach(function(n){dz.addEventListener(n,function(ev){ev.preventDefault();dz.classList.add("on")})});
   ["dragleave","drop"].forEach(function(n){dz.addEventListener(n,function(ev){ev.preventDefault();dz.classList.remove("on")})});
   dz.addEventListener("drop",function(ev){readFile(ev.dataTransfer.files[0])});
   function go(){
    var er=document.getElementById("auE");er.hidden=true;
    if(!T.value.trim())return;
    A.api("/admin/audit/preview",{method:"POST",body:{text:T.value}}).then(function(r){items=r.items;draw()},function(x){er.textContent=x&&x.code==="invalid_json"?t("ad.au.err.json","This is not valid JSON. Ask the AI to return only JSON."):A.err(x);er.hidden=false})
   }
   document.getElementById("auGo").onclick=go;
   function draw(){
    var res=document.getElementById("auRes");
    if(!items.length){res.innerHTML=emptyBox(P.ok,t("ad.au.clean","No violations found"),t("ad.au.clean.p","The answer has no verdicts. Nothing to apply."),"",false);return}
    var okN=items.filter(function(x){return x.ok}).length;
    var cols="36px minmax(0,1.6fr) 150px minmax(0,2.4fr)";
    res.innerHTML='<div class="ak-save" style="position:static;margin:20px 0 16px"><span id="auN" class="dim"></span><span class="sp"></span><button type="button" class="abtn pri lg" id="auApply">'+ic(P.ok,16)+"<span>"+e(t("ad.au.apply","Apply selected"))+'</span></button></div><section class="ak-card"><div class="ak-th" style="--cols:'+cols+'"><span></span><span>'+e(t("ad.u.acc","Account"))+"</span><span>"+e(t("ad.au.verdict","Verdict"))+"</span><span>"+e(t("ad.au.reason","Reason"))+"</span></div>"+items.map(function(x,i){var eff=x.effective||x.action;return'<label class="ak-tr" style="--cols:'+cols+';cursor:'+(x.ok?"pointer":"default")+'"><div class="c"><input type="checkbox" class="auC" data-i="'+i+'"'+(x.ok?" checked":" disabled")+' style="width:18px;height:18px;accent-color:var(--a-pri)"></div><div class="c"><span class="ak-nm"><b>'+e(x.email||"—")+"</b><small>"+(x.status?e(t("ad.s."+x.status,x.status)):"")+(x.category?" · "+e(t("ad.au.cat."+x.category,x.category)):"")+'</small></span></div><div class="c">'+(x.ok?A.pill(eff==="block"?"bad":eff==="freeze"?"wait":"dim",t("ad.au.act."+eff,eff))+'<span class="ak-n z">'+x.severity+"</span>":A.pill("dim",t("ad.au.skip","Skipped")))+'</div><div class="c" style="display:block"><span>'+e(x.reason||"")+"</span>"+(x.error?'<small class="dim" style="display:block;margin-top:4px">'+e(t("ad.au.e."+x.error,x.error))+"</small>":x.note?'<small class="dim" style="display:block;margin-top:4px">'+e(t("ad.au.e."+x.note,x.note))+"</small>":"")+"</div></label>"}).join("")+'</section>';
    function cnt2(){var n=res.querySelectorAll(".auC:checked").length;document.getElementById("auN").textContent=t("ad.au.sel","Selected: {n} of {m}",{n:n,m:okN});document.getElementById("auApply").disabled=!n}
    res.onchange=cnt2;cnt2();
    document.getElementById("auApply").onclick=function(){
     var pick=[];res.querySelectorAll(".auC:checked").forEach(function(c){var x=items[+c.dataset.i];pick.push({account_id:x.account_id,action:x.action,severity:x.severity,category:x.category,reason:x.reason,evidence:x.evidence})});
     if(!pick.length)return;
     var m=A.modal({title:t("ad.au.confirm","Apply these decisions?"),body:'<p class="dim">'+e(t("ad.au.confirm.p","Accounts will be frozen or blocked right away and the owners get an email. Every decision is written to the admin log with its reason."))+'</p><div class="prow"><button type="button" class="abtn" id="adNo">'+e(t("au.cancel","Cancel"))+'</button><button type="button" class="abtn pri" id="adYes">'+e(t("ad.au.apply","Apply selected"))+" ("+pick.length+")</button></div>"});
     m.body.querySelector("#adNo").onclick=m.close;
     m.body.querySelector("#adYes").onclick=function(){var y=this;y.disabled=true;A.api("/admin/audit/apply",{method:"POST",body:{hours:hrs,verdicts:pick}}).then(function(r){m.close();A.toast(t("ad.au.done","Applied: frozen {f}, blocked {b}, flagged {w}",{f:r.frozen,b:r.blocked,w:r.watched}));history.replaceState(null,"","#history");audit()},function(z){y.disabled=false;A.toast(A.err(z),"err")})}
    }
   }
  }else{
   b.innerHTML=d.runs.length?'<section class="ak-card"><div class="ak-th" style="--cols:170px minmax(0,1.4fr) 90px repeat(4,90px)"><span>'+e(t("ad.u.created","Date"))+"</span><span>"+e(t("ad.au.by","Who"))+"</span><span>"+e(t("ad.au.period","Period"))+"</span><span>"+e(t("ad.au.act.freeze","Freeze"))+"</span><span>"+e(t("ad.au.act.block","Block"))+"</span><span>"+e(t("ad.au.act.watch","Flag"))+"</span><span>"+e(t("ad.au.skip","Skipped"))+"</span></div>"+d.runs.map(function(x){return'<div class="ak-tr" style="--cols:170px minmax(0,1.4fr) 90px repeat(4,90px)"><div class="c dim">'+e(A.date(x.created_at))+'</div><div class="c">'+e(x.admin||"—")+'</div><div class="c dim">'+(x.window_hours?x.window_hours+" "+e(t("ad.au.h","h")):"—")+'</div><div class="c">'+x.frozen+'</div><div class="c">'+x.blocked+'</div><div class="c">'+x.watched+'</div><div class="c dim">'+x.skipped+"</div></div>"}).join("")+"</section>":emptyBox(P.clock,t("ad.au.nohist","No checks yet"),t("ad.au.nohist.p","Applied checks appear here."),"",true)
  }
 },function(x){fail(x,"adRetry")})
}
function load(){
 root.innerHTML=head()+A.loading();
 if(page==="")ov();else if(page==="users")usersPage();else if(page==="maint")maint();else if(page==="user")user();else if(page==="review")review();else if(page==="siberia")sib();else if(page==="tickets")tickets();else if(page==="rating")rating();else if(page==="notice")notice();else if(page==="analytics")analytics();else if(page==="sso")sso();else if(page==="staff")staff();else if(page==="mail")window.GSAdminMail.run(root,head);else if(page==="newsletter")newsletter();else if(page==="audit")audit()
}
A.ready(function(){
 root=document.getElementById("app-root");if(!root)return;page=root.dataset.page||"";
 A.api("/auth/me").then(function(me){if(!me.is_admin){location.replace("/app/");return}A.api("/admin/me").then(function(r){window.GSRole=r;var map={"":"overview",users:"users",user:"users",review:"review",siberia:"siberia",tickets:"tickets",rating:"rating-rules",maint:"maintenance",notice:"maintenance",analytics:"analytics",sso:"sso",staff:"staff",mail:"mail",newsletter:"newsletter",audit:"audit"};if(r.areas.indexOf(map[page])<0){location.replace("/app/admin/");return}document.querySelectorAll('a[href^="/app/admin/"]').forEach(function(a){var h=a.getAttribute("href"),k={"/app/admin/":"overview","/app/admin/users/":"users","/app/admin/review/":"review","/app/admin/siberia/":"siberia","/app/admin/tickets/":"tickets","/app/admin/rating/":"rating-rules","/app/admin/maintenance/":"maintenance","/app/admin/notice/":"maintenance","/app/admin/analytics/":"analytics","/app/admin/sso/":"sso","/app/admin/staff/":"staff","/app/admin/mail/":"mail"}[h];if(k&&r.areas.indexOf(k)<0){var li=a.parentNode.tagName==="LI"?a.parentNode:a;li.style.display="none"}});load()},function(){location.replace("/app/")})},function(){location.replace("/app/")})
})
})();
