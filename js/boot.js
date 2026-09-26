/* boot.js — the ONLY script tag pages need. To add/remove a script, edit this list. */
(function(){var L=["config","geo","i18n","nav","footer","maintenance","analytics","site","consent","banners","experiments","events","errors","extra"];
var base=document.currentScript.src.replace(/boot\.js.*$/,"");
L.forEach(function(n){var s=document.createElement("script");s.src=base+n+".js";s.async=false;s.onerror=function(){};document.head.appendChild(s)});
var io="IntersectionObserver"in window&&new IntersectionObserver(function(es){es.forEach(function(e){if(e.isIntersecting){e.target.classList.add("in");io.unobserve(e.target)}})},{threshold:.12});
document.addEventListener("DOMContentLoaded",function(){document.querySelectorAll(".rv").forEach(function(el){io?io.observe(el):el.classList.add("in")})})})();
