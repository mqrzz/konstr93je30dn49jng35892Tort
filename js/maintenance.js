/* maintenance.js — redirects to /maintenance/ when /maintenance-status.json says on. */
(function(){if(/^\/(maintenance|assets|css|js|i18n)/.test(location.pathname))return;
fetch("/maintenance-status.json",{cache:"no-store"}).then(function(r){return r.ok?r.json():null}).then(function(j){if(j&&(j.on||j.active||j.enabled||j.maintenance))location.replace("/maintenance/")}).catch(function(){})})();
