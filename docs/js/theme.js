/* docs/js/theme.js — must load in <head>, before docs.css paints, so there is no flash.
   Independent of the dashboard's app-theme.js: the dashboard defaults to dark by design,
   the docs default to "system" (like the Resend reference) unless the visitor picks one. */
(function(){
var K="geserd_doctheme";
function get(){try{return localStorage.getItem(K)||"system"}catch(e){return "system"}}
function apply(m){if(m==="system")document.documentElement.removeAttribute("data-theme");else document.documentElement.setAttribute("data-theme",m)}
function set(m){try{localStorage.setItem(K,m)}catch(e){}apply(m)}
apply(get());
window.GSDocTheme={get:get,set:set};
})();
