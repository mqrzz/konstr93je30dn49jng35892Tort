(function(){
function fmt(iso){var d=new Date(iso+"T12:00:00Z");try{return d.toLocaleDateString((window.GESERD&&GESERD.lang)||"en",{day:"numeric",month:"long",year:"numeric"})}catch(e){return iso}}
function go(){document.querySelectorAll("[data-date]").forEach(function(t){t.textContent=fmt(t.dataset.date)})}
(function wait(n){if(window.GESERD&&GESERD.ready)return GESERD.ready.then(go,go);if(n>400)return go();setTimeout(function(){wait(n+1)},25)})(0)
})();
