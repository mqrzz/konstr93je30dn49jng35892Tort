(function(){var n=document.getElementById("tp-n");if(!n)return;
var p=document.getElementById("tp-p"),src=document.getElementById("tp-src"),subj=document.getElementById("tp-subj"),body=document.getElementById("tp-body");
var VAR=/\{\{\{?\s*([a-zA-Z_][a-zA-Z0-9_]{0,39})\s*\}\}\}?/g;
var ESC={"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"};function esc(s){return String(s).replace(/[&<>"']/g,function(c){return ESC[c]})}
function T(k,d){var e=window.__t&&window.__t[k];return e||d}
function tpl(){var h=document.querySelector('[data-i18n="tp.pg.h"]'),b=document.querySelector('[data-i18n="tp.pg.b"]');return{s:"Welcome to Acme, {{{name}}}",h:(h&&h.dataset.src)||"Welcome, {{{name}}}",b:(b&&b.dataset.src)||"Your plan is {{{plan}}}."}}
var cur={s:"Welcome to Acme, {{{name}}}",h:"Welcome, {{{name}}}",b:"Your plan is {{{plan}}}."};
function fill(s,v){return s.replace(VAR,function(m,k){return v[k]==null||v[k]===""?"":'<span class="v">'+esc(v[k])+"</span>"})}
function mark(s){return esc(s).replace(/\{\{\{?\s*[a-zA-Z_][a-zA-Z0-9_]*\s*\}\}\}?/g,function(m){return '<span class="v">'+m+"</span>"})}
function draw(){var v={name:n.value,plan:p.value};
src.innerHTML=mark("<h1>"+cur.h+"</h1>\n<p>"+cur.b+"</p>");
subj.innerHTML=fill(cur.s,v);body.innerHTML="<h1>"+fill(cur.h,v)+"</h1><p>"+fill(cur.b,v)+"</p>"}
n.addEventListener("input",draw);p.addEventListener("input",draw);
document.querySelectorAll("[data-i18n]").forEach(function(){});
var lang=document.documentElement.lang;
var SRC={en:{h:"Welcome, {{{name}}}",b:"Your plan is {{{plan}}}.",s:"Welcome to Acme, {{{name}}}"},ru:{h:"Здравствуйте, {{{name}}}",b:"Ваш тариф {{{plan}}}.",s:"Добро пожаловать в Acme, {{{name}}}"},fr:{h:"Bienvenue, {{{name}}}",b:"Votre offre est {{{plan}}}.",s:"Bienvenue chez Acme, {{{name}}}"},de:{h:"Willkommen, {{{name}}}",b:"Dein Tarif ist {{{plan}}}.",s:"Willkommen bei Acme, {{{name}}}"}};
function setLang(){var l=(document.documentElement.getAttribute("lang")||"en").slice(0,2);cur=SRC[l]||SRC.en;draw()}
setLang();new MutationObserver(setLang).observe(document.documentElement,{attributes:true,attributeFilter:["lang"]});
})();
