/* geo.js — detects visitor country (cached per session). Sets GESERD.country and GESERD.geo (promise). */
(function(){var O=window.GESERD,K="geserd_cc",c=null;try{c=sessionStorage.getItem(K)}catch(e){}
O.country=c||null;
O.geo=c?Promise.resolve(c):new Promise(function(res){var d=setTimeout(function(){res(null)},1500);
fetch("https://api.country.is/").then(function(r){return r.json()}).then(function(j){clearTimeout(d);O.country=j.country||null;try{sessionStorage.setItem(K,O.country)}catch(e){}res(O.country)}).catch(function(){clearTimeout(d);res(null)})})})();
(function(O){O.geo.then(function(c){if(c&&O.blocked.indexOf(c)>-1&&!/^\/(unavailable|countries|assets|css|js|i18n)/.test(location.pathname))location.replace("/unavailable/")});})(window.GESERD);
