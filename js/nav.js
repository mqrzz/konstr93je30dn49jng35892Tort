(function(){
var t=function(k,d){return window.GESERD&&GESERD.t?GESERD.t(k,d):d};
var ic=function(p){return '<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#c9c9d1" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round">'+p+'</svg>'};
var I={send:ic('<path d="M22 2 11 13M22 2l-7 20-4-9-9-4z"/>'),mail:ic('<rect x="3" y="5" width="18" height="14" rx="2"/><path d="m3 7 9 6 9-6"/>'),book:ic('<path d="M4 4h12a3 3 0 0 1 3 3v13H7a3 3 0 0 1-3-3zM4 17a3 3 0 0 1 3-3h12"/>'),pulse:ic('<path d="M3 12h4l3-8 4 16 3-8h4"/>')};
function M(){return [
{k:'features',l:t('nav.features','Features'),links:[[t('nav.sub.sending','Sending'),'/features/sending/'],[t('nav.sub.receiving','Receiving'),'/features/receiving/'],[t('nav.sub.domains','Domains'),'/features/domains/'],[t('nav.sub.webhooks','Webhooks'),'/features/webhooks/']],cards:[[t('nav.card.send.t','Send'),t('nav.card.send.d','One API call'),'/docs/',I.send],[t('nav.card.inbound.t','Inbound'),t('nav.card.inbound.d','Receive and reply'),'/features/receiving/',I.mail]]},
{k:'company',l:t('nav.company','Company'),links:[[t('nav.sub.about','About'),'/about/'],[t('nav.sub.blog','Blog'),'/blog/'],[t('nav.sub.contact','Contact'),'/contact/'],[t('nav.sub.legal','Legal'),'/legal/']],cards:[[t('nav.card.philosophy.t','Philosophy'),t('nav.card.philosophy.d','What we value'),'/about/',I.book],[t('nav.card.status.t','Status'),t('nav.card.status.d','Live availability'),'/status/',I.pulse]]},
{k:'docs',l:t('nav.docs','Docs'),links:[[t('nav.sub.intro','Introduction'),'/docs/'],[t('nav.sub.quickstart','Quickstart'),'/docs/quickstart/'],[t('nav.sub.apiref','API reference'),'/docs/api/'],[t('nav.sub.webhooks','Webhooks'),'/docs/api/#receiving']],cards:[[t('nav.card.quickstart.t','Quickstart'),t('nav.card.quickstart.d','Send in minutes'),'/docs/quickstart/',I.send],[t('nav.card.apiref.t','API reference'),t('nav.card.apiref.d','Every endpoint'),'/docs/api/',I.book]]}
]}
var ch='<svg width="14" height="14" viewBox="0 0 24 24"><path fill="currentColor" d="M17.7 10.7a1 1 0 1 0-1.4-1.4l-3.6 3.6a1 1 0 0 1-1.4 0L7.7 9.3a1 1 0 0 0-1.4 1.4l5 5a1 1 0 0 0 1.4 0z"/></svg>';
var GL='<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="9"/><path d="M3 12h18M12 3a14 14 0 0 1 0 18M12 3a14 14 0 0 0 0 18"/></svg>';
var CK='<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m5 12 5 5 9-10"/></svg>';
function langMenu(){var L=(window.GESERD&&GESERD.languages)||[{code:'en',name:'English'}],cur=(window.GESERD&&GESERD.lang)||'en',c=L.filter(function(x){return x.code===cur})[0]||L[0];
 return '<div class="lg"><button type="button" class="lgb" aria-haspopup="listbox" aria-expanded="false">'+GL+'<span>'+c.name+'</span>'+ch+'</button><div class="lgp" role="listbox">'+
  L.map(function(x){return '<button type="button" role="option" class="lgi'+(x.code===cur?' on':'')+'" data-l="'+x.code+'"><span>'+x.name+'</span>'+(x.code===cur?CK:'')+'</button>'}).join('')+'</div></div>'}
function bindLang(root){(root||document).querySelectorAll('.lg').forEach(function(g){if(g.__b)return;g.__b=1;var b=g.querySelector('.lgb'),p=g.querySelector('.lgp');
 b.addEventListener('click',function(e){e.stopPropagation();var o=g.classList.contains('open');document.querySelectorAll('.lg.open').forEach(function(x){x.classList.remove('open');x.querySelector('.lgb').setAttribute('aria-expanded','false')});if(!o){g.classList.add('open');b.setAttribute('aria-expanded','true')}});
 p.addEventListener('click',function(e){var i=e.target.closest('.lgi');if(i&&!i.classList.contains('on'))GESERD.setLang(i.dataset.l)})})}
document.addEventListener('click',function(e){if(!e.target.closest('.lg'))document.querySelectorAll('.lg.open').forEach(function(x){x.classList.remove('open');x.querySelector('.lgb').setAttribute('aria-expanded','false')})});
window.GESERD&&(GESERD.langMenu=langMenu,GESERD.bindLang=bindLang);
function signedIn(r){fetch(((window.GESERD&&GESERD.api)||'/api')+'/auth/me',{credentials:'same-origin',cache:'no-store'}).then(function(x){return x.ok?x.json():Promise.reject()}).then(function(){
 [].forEach.call(r.querySelectorAll('.side,.mob-cta'),function(box){var a=box.querySelectorAll('a.btn');if(!a.length)return;a[0].href='/app/';a[0].className='btn pri'+(box.classList.contains('side')?' sm':'');a[0].textContent=t('nav.dashboard','Dashboard');for(var i=1;i<a.length;i++)a[i].remove();if(box.classList.contains('mob-cta'))box.style.gridTemplateColumns='1fr'})}).catch(function(){})}
function build(){
var Mm=M();
var h='<header class="hdr"><div class="wrap"><a class="logo" href="/" aria-label="Geserd"><img src="/assets/logo.svg" alt="Geserd"></a><ul>';
Mm.forEach(function(m){h+='<li><button class="tr" type="button" aria-expanded="false" data-m="'+m.k+'">'+m.l+ch+'</button><div class="pop" id="pop-'+m.k+'"><div class="ls">'+m.links.map(function(x){return '<a href="'+x[1]+'">'+x[0]+'</a>'}).join('')+'</div><div class="cs">'+m.cards.map(function(c){return '<a class="pc" href="'+c[2]+'"><i>'+c[3]+'</i><div><b>'+c[0]+'</b><span>'+c[1]+'</span></div></a>'}).join('')+'</div></div></li>'});
h+='<li><a href="/pricing/">'+t('nav.pricing','Pricing')+'</a></li></ul><div class="side">'+langMenu()+'<a class="btn ghost sm" href="/login/">'+t('nav.login','Log in')+'</a><a class="btn sm" href="/signup/">'+t('nav.start','Get started')+'</a></div>'+
'<button class="burger" aria-label="menu" aria-expanded="false"><svg class="i-o" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"><path d="M4 7h16M4 12h16M4 17h16"/></svg><svg class="i-c" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"><path d="m6 6 12 12M18 6 6 18"/></svg></button></div></header>'+
'<nav class="mob" id="mob" aria-label="Menu"><div class="mob-in">'+Mm.map(function(m){return '<details class="ma"><summary>'+m.l+ch+'</summary><div class="mal">'+m.links.map(function(x){return '<a href="'+x[1]+'">'+x[0]+'</a>'}).join('')+'</div></details>'}).join('')+
'<a class="ml" href="/pricing/">'+t('nav.pricing','Pricing')+'</a>'+langMenu()+'</div><div class="mob-cta"><a class="btn" href="/login/">'+t('nav.login','Log in')+'</a><a class="btn pri" href="/signup/">'+t('nav.start','Get started')+'</a></div></nav>';
return h;
}
function mount(){var r=document.getElementById('site-header');if(!r)return;r.innerHTML=build();bindLang(r);signedIn(r);var H=r.querySelector('.hdr');function sc(){H.classList.toggle('sc',(window.scrollY||0)>8)}sc();window.addEventListener('scroll',sc,{passive:true});var open=null,tm;
function close(){if(!open)return;open.b.setAttribute('aria-expanded','false');open.p.classList.remove('on');open=null}
function show(b){var p=document.getElementById('pop-'+b.dataset.m);if(open&&open.b===b)return;close();b.setAttribute('aria-expanded','true');p.classList.add('on');open={b:b,p:p}}
r.querySelectorAll('.tr').forEach(function(b){b.addEventListener('click',function(){open&&open.b===b?close():show(b)});
b.parentNode.addEventListener('mouseenter',function(){if(matchMedia('(hover:hover)').matches){clearTimeout(tm);show(b)}});
b.parentNode.addEventListener('mouseleave',function(){tm=setTimeout(close,140)})});
document.addEventListener('click',function(e){if(!e.target.closest('.hdr'))close()});
document.addEventListener('keydown',function(e){if(e.key==='Escape'){close();mob(false)}});
var bg=r.querySelector('.burger'),mb=document.getElementById('mob');function mob(v){mb.classList.toggle('on',v);H.classList.toggle('mo',v);document.documentElement.classList.toggle('lock',v);bg.setAttribute('aria-expanded',v)}
matchMedia('(min-width:861px)').addEventListener('change',function(q){if(q.matches)mob(false)});
bg.addEventListener('click',function(){mob(!mb.classList.contains('on'))})}
var go=function(){document.readyState==='loading'?document.addEventListener('DOMContentLoaded',mount):mount()};(window.GESERD&&GESERD.ready?GESERD.ready:Promise.resolve()).then(go)})();
