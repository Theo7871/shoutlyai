/* Dynamic header and footer injector (optional helper) */
(function(){
  function inject(url, targetId, callback){
    var target = document.getElementById(targetId);
    if(!target) return;
    fetch(url)
      .then(function(res){ return res.text(); })
      .then(function(html){
        target.innerHTML = html;
        if(callback) callback();
      })
      .catch(function(err){
        console.error('Error loading ' + url, err);
      });
  }

  function init(){
    inject('/partials/site-header.html', 'site-header-root', function(){
      if(window.initSiteNav) window.initSiteNav();
    });
    inject('/partials/site-footer.html', 'site-footer-root', function(){
      if(window.initSiteFooter) window.initSiteFooter();
    });
  }

  if(document.readyState === 'loading'){
    document.addEventListener('DOMContentLoaded', init);
  }else{
    init();
  }
})();
