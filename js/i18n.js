/* i18n.js — languages come from /i18n/languages.json. Order: saved choice > visitor country > browser language > default.
   Add a language: create /i18n/<code>.json and add one line to languages.json. English text lives in the HTML (default). */
(function(){var O=window.GESERD,K="geserd_lang";
function get(u){return fetch(u,{cache:"no-cache"}).then(function(r){if(!r.ok)throw 0;return r.json()})}
O.setLang=function(l){try{localStorage.setItem(K,l)}catch(e){}document.cookie=K+"="+l+";path=/;max-age=31536000;samesite=lax";location.reload()};
function apply(d){O.t=function(k,def){return d[k]!=null?d[k]:def};document.querySelectorAll("[data-i18n]").forEach(function(el){var v=d[el.getAttribute("data-i18n")];if(v!=null)el.innerHTML=v})}
O.ready=get("/i18n/languages.json").catch(function(){return[{code:O.defaultLang,name:"English",countries:[]}]}).then(function(L){
 O.languages=L;var codes=L.map(function(x){return x.code}),saved=null;
 try{saved=localStorage.getItem(K)}catch(e){}
 var q=new URLSearchParams(location.search).get("lang");if(q&&codes.indexOf(q)>-1){saved=q;try{localStorage.setItem(K,q)}catch(e){}}
 if(codes.indexOf(saved)<0)saved=null;
 return(saved?Promise.resolve():(O.geo||Promise.resolve())).then(function(cc){var l=saved;
  if(!l){var m=L.filter(function(x){return(x.countries||[]).indexOf(cc)>-1})[0];l=m&&m.code;
   if(!l)(navigator.languages||[navigator.language||""]).some(function(n){n=n.slice(0,2).toLowerCase();if(codes.indexOf(n)>-1){l=n;return true}});
   l=l||O.defaultLang}
  O.lang=l;document.documentElement.lang=l;var i=L.filter(function(x){return x.code===l})[0]||{};document.documentElement.dir=i.dir||"ltr";
  if(l===O.defaultLang)return;return get("/i18n/"+l+".json").then(apply).catch(function(){})})})})();
