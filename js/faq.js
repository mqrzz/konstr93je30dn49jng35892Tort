/* faq.js — animates every .faq details/summary sitewide with a real open/close height transition. */
(function(){
  function bodyOf(sum){return sum.nextElementSibling}
  document.addEventListener("click",function(e){
    var sum=e.target.closest(".faq summary");
    if(!sum)return;
    var d=sum.parentElement,body=bodyOf(sum);
    if(!body)return;
    e.preventDefault();
    if(d.hasAttribute("open")){
      body.style.height=body.scrollHeight+"px";
      requestAnimationFrame(function(){body.style.height="0px"});
      body.addEventListener("transitionend",function te(ev){
        if(ev.propertyName!=="height")return;
        d.removeAttribute("open");body.style.height="";
        body.removeEventListener("transitionend",te)
      })
    }else{
      d.setAttribute("open","");
      var h=body.scrollHeight;
      body.style.height="0px";
      requestAnimationFrame(function(){body.style.height=h+"px"});
      body.addEventListener("transitionend",function te2(ev){
        if(ev.propertyName!=="height")return;
        body.style.height="";
        body.removeEventListener("transitionend",te2)
      })
    }
  })
})();
