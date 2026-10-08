(function(){var O=window.GESERD;
O.country=null;O.geoData=null;O.blocked=[];
function ask(){return new Promise(function(res){var done=false,d=setTimeout(function(){if(!done){done=true;res(null)}},2500);
fetch(O.api+"/geo",{cache:"no-store",credentials:"same-origin"}).then(function(r){if(!r.ok)throw 0;return r.json()}).then(function(j){if(done)return;done=true;clearTimeout(d);res(j)}).catch(function(){if(done)return;done=true;clearTimeout(d);res(null)})})}
O.geoCheck=ask;
O.geo=ask().then(function(j){
 if(!j)return null;
 O.geoData=j;O.country=j.country||null;O.blocked=j.blockedCountries||[];
 if(j.blocked&&!/^\/(unavailable|countries|unsubscribe|assets|css|js|i18n)(\/|$)/.test(location.pathname))location.replace("/unavailable/");
 return O.country});
})();
