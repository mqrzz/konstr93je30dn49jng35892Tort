/* nav.js — site header + dropdown menus. Mounts into <div id="site-header"></div> */
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
function build(){
var Mm=M();
var h='<header class="hdr"><div class="wrap"><a class="logo" href="/" aria-label="geserd"><img src="/assets/logo.svg" alt="geserd"></a><ul>';
Mm.forEach(function(m){h+='<li><button class="tr" type="button" aria-expanded="false" data-m="'+m.k+'">'+m.l+ch+'</button><div class="pop" id="pop-'+m.k+'"><div class="ls">'+m.links.map(function(x){return '<a href="'+x[1]+'">'+x[0]+'</a>'}).join('')+'</div><div class="cs">'+m.cards.map(function(c){return '<a class="pc" href="'+c[2]+'"><i>'+c[3]+'</i><div><b>'+c[0]+'</b><span>'+c[1]+'</span></div></a>'}).join('')+'</div></div></li>'});
h+='<li><a href="/pricing/">'+t('nav.pricing','Pricing')+'</a></li></ul><div class="side"><select class="lang" aria-label="Language"></select><a class="btn ghost sm" href="/login/">'+t('nav.login','Log in')+'</a><a class="btn sm" href="/signup/">'+t('nav.start','Get started')+'</a></div>'+
'<button class="burger" aria-label="menu" aria-expanded="false"><svg width="20" height="20" viewBox="0 0 24 24"><path fill="currentColor" d="M21 18a1 1 0 1 1 0 2H3a1 1 0 1 1 0-2zm0-7a1 1 0 1 1 0 2H3a1 1 0 1 1 0-2zm0-7a1 1 0 1 1 0 2H3a1 1 0 0 1 0-2z"/></svg></button></div></header>'+
'<nav class="mob" id="mob">'+Mm.map(function(m){return m.links.map(function(x){return '<a href="'+x[1]+'">'+x[0]+'</a>'}).join('')}).join('')+'<select class="lang" aria-label="Language"></select><a href="/pricing/">'+t('nav.pricing','Pricing')+'</a><a href="/login/">'+t('nav.login','Log in')+'</a><a class="btn" href="/signup/">'+t('nav.start','Get started')+'</a></nav>';
return h;
}
function mount(){var r=document.getElementById('site-header');if(!r)return;r.innerHTML=build();r.querySelectorAll('.lang').forEach(function(s){s.innerHTML=((window.GESERD&&GESERD.languages)||[{code:'en',name:'English'}]).map(function(x){return '<option value="'+x.code+'">'+x.name+'</option>'}).join('');s.value=(window.GESERD&&GESERD.lang)||'en';s.onchange=function(){GESERD.setLang(s.value)}});var open=null,tm;
function close(){if(!open)return;open.b.setAttribute('aria-expanded','false');open.p.classList.remove('on');open=null}
function show(b){var p=document.getElementById('pop-'+b.dataset.m);if(open&&open.b===b)return;close();b.setAttribute('aria-expanded','true');p.classList.add('on');open={b:b,p:p}}
r.querySelectorAll('.tr').forEach(function(b){b.addEventListener('click',function(){open&&open.b===b?close():show(b)});
b.parentNode.addEventListener('mouseenter',function(){if(matchMedia('(hover:hover)').matches){clearTimeout(tm);show(b)}});
b.parentNode.addEventListener('mouseleave',function(){tm=setTimeout(close,140)})});
document.addEventListener('click',function(e){if(!e.target.closest('.hdr'))close()});
document.addEventListener('keydown',function(e){if(e.key==='Escape'){close();mob(false)}});
var bg=r.querySelector('.burger'),mb=document.getElementById('mob');function mob(v){mb.classList.toggle('on',v);bg.setAttribute('aria-expanded',v)}
bg.addEventListener('click',function(){mob(!mb.classList.contains('on'))})}
var go=function(){document.readyState==='loading'?document.addEventListener('DOMContentLoaded',mount):mount()};(window.GESERD&&GESERD.ready?GESERD.ready:Promise.resolve()).then(go)})();
