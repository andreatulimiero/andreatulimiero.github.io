// Media rules
var mobileDevice = true;
document.addEventListener("DOMContentLoaded", function() {
  if( parseInt(window.innerWidth) > 767 ) mobileDevice = false;
  
  initViews();
});

function initViews(){
 initMenu(); 
}