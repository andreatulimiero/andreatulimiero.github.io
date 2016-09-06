/* Menu */
function initMenu(){
  if( mobileDevice )
    initMobileMenu();
  else
    initDesktopMenu();
}

function initDesktopMenu(){
  var menu = document.querySelector('.desktop .menu');
  var titles =  menu.querySelector('.titles');
  var bar = menu.querySelector('.titles + .bar');
  var barStartX = parseInt( window.getComputedStyle(titles).marginLeft );
  bar.style.width = titles.querySelector('span').offsetWidth + 'px';
        bar.style.transform = 'translateX(+'+ barStartX +'px)';
  titles.querySelectorAll('span').forEach( titlesItem => {
    titlesItem.addEventListener('click', e => { 
        menu.querySelector('.titles .selected').classList.remove('selected');
      e.target.classList.add('selected');
      if( e.target.classList.contains('home') ){
        bar.style.transform = 'translateX(+'+ barStartX +'px)';
      } else {
        var headerLeft = 
          parseInt(window.getComputedStyle(titles).marginLeft);
        bar.style.transform = 'translateX('+ (e.target.offsetLeft + barStartX - headerLeft) +'px)';
      }
    });
  });
}

function initMobileMenu(){
  var menuIcon = document.querySelector('#menu-icon');
  var menu = document.querySelector('.mobile .side-menu');
  var topBar = document.querySelector('.mobile .top-bar');
  var topBarThreshold = document.querySelector('.home section:first-of-type').offsetTop;
  menuIcon.addEventListener('click', e => {
    if( menu.classList.contains('opened') )
      menu.classList.remove('opened');
    else{
      menu.classList.add('opened');
      topBar.classList.add('idle');
    }
  });
  // Top fixed menu
  document.addEventListener('scroll', e => {
    if( document.querySelector('body').scrollTop <= topBarThreshold ) {
      topBar.classList.add('idle');
      return;
    }
    topBar.classList.remove('idle');
  });
  // Sliding menu
  document.querySelector('body').addEventListener('click', e => {
    if( !checkHit(e, menu) && !checkHit(e, menuIcon) ){
      menu.classList.remove('opened');
      if( document.querySelector('body').scrollTop > topBarThreshold ) topBar.classList.remove('idle');
    }
  });
  var startX, deltaX;
  document.querySelector('body').addEventListener('touchstart', e => {
    startX = parseInt( e.touches[0].pageX );
  });
  document.querySelector('body').addEventListener('touchmove', e => {
    if( !menu.classList.contains('opened') ) return;
    menu.style.transition = 'none';
    deltaX = parseInt( e.touches[0].pageX ) - startX;
    if( deltaX >= 0 ) return;
    menu.style.transform = 'translateX('+ deltaX +'px)';
  });
  document.querySelector('body').addEventListener('touchend', e => {
    if( !menu.classList.contains('opened') ) return;
    menu.style.transform = '';
    menu.style.transition = '';
    if( deltaX < -150 ){
      menu.classList.remove('opened');
      if( document.querySelector('body').scrollTop > topBarThreshold ) topBar.classList.remove('idle');
    }
  });
  menu.querySelectorAll('.titles span').forEach( title => {
    title.addEventListener('click', e => {
      if( e.target.id == 'home' ) console.log('Home');
      else if( e.target.id == 'ethos' ) console.log('Ethos');
      else if( e.target.id == 'works' ) console.log('Works');
    });
  });
}

/* Works */
function initWorks(){
  var worksContainers = document.querySelectorAll('article.works .works-container .work-container');
  if( worksContainers.length == 0 ) return;
  worksContainers.forEach( workContainer => {
    var width = window.getComputedStyle(workContainer).width;
    workContainer.style.height = width;
  });
}

/* Views Utils */
function checkHit(event, target){
  for( var element = event.target; element.tagName != 'HTML'; element = element.parentNode ){
    if( element == target )
      return true;
  }
  return false;
}