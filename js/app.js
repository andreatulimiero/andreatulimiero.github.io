// Media rules
var mobileDevice = true;

window.onload = e => {
  if( parseInt(window.innerWidth) > 767 ) mobileDevice = false;
  registerAnalytics();

  initViews();
};

function initViews(){
 initMenu(); 
 initArticles();
}

function registerAnalytics(){
  (function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
  (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
  m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
  })(window,document,'script','https://www.google-analytics.com/analytics.js','ga');

  ga('create', 'UA-83819121-1', 'auto');
  ga('send', 'pageview');
}