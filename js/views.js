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
  var bar = menu.querySelector('.bar');
  var barStartX = parseInt( window.getComputedStyle(titles).marginLeft );
  bar.style.width = titles.querySelector('span').offsetWidth + 'px';
        bar.style.left = barStartX +'px';
  titles.querySelectorAll('span').forEach( titlesItem => {
    titlesItem.addEventListener('click', e => { 
      titles.querySelector('.selected').classList.remove('selected');
      e.target.classList.add('selected');
      var target = '';
      if( e.target.classList.contains('home') ){
        bar.style.transform = 'translateX(0)';
        target = 'home';
      } else {
        bar.style.transform = 'translateX('+ (e.target.offsetLeft - barStartX) +'px)';
        if( e.target.classList.contains('ethos') ) target = 'ethos';
        else if( e.target.classList.contains('works') ) target = 'works';
      }
      smoothScrollTo( document.querySelector('article.' + target) );
    });
  });
}

function initMobileMenu(){
  var menuIcon = document.querySelector('#menu-icon');
  var menu = document.querySelector('.mobile .side-menu');
  var titles = menu.querySelector('.mobile .side-menu .titles');
  var topBar = document.querySelector('.mobile .top-bar');
  var topBarThreshold = document.querySelector('.home section:first-of-type').offsetTop;
  var openMenu = function () {
    menu.classList.add('opened');
    topBar.classList.add('idle');
  };
  var closeMenu = function(){ 
    menu.classList.remove('opened');
    if( document.querySelector('body').scrollTop > topBarThreshold ) topBar.classList.remove('idle');
  };
  menuIcon.addEventListener('click', e => {
    if( menu.classList.contains('opened') ) closeMenu();
    else openMenu();
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
    if( !checkHit(e, menu) && !checkHit(e, menuIcon) ) closeMenu();
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
    if( deltaX < -150 ) closeMenu();
  });
  titles.querySelectorAll('span').forEach( title => {
    title.addEventListener('click', e => {
      var target = '';
      if( e.target.classList.contains('home') ) target = 'home';
      else if( e.target.classList.contains('ethos') ) target = 'ethos';
      else if( e.target.classList.contains('works') ) target = 'works';
      smoothScrollTo( document.querySelector('article.' + target) );
      closeMenu();
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

function scrollTo(target){
  var body = document.querySelector('body');
  var scrollDelta = target.offsetTop - body.scrollTop;
  body.scrollTop = scrollDelta;
}

function smoothScrollTo(target){
  var body = document.querySelector('body');
  var menuHeight = 0;
  if( mobileDevice )
    menuHeight = parseInt( window.getComputedStyle( document.querySelector('.mobile .top-bar') ).height);
  else 
    menuHeight = parseInt( window.getComputedStyle( document.querySelector('.desktop .menu') ).height);
  var scrollDelta = target.offsetTop - (menuHeight + body.scrollTop);
  // Implement smooth scroll option
  body.scrollTop = body.scrollTop + scrollDelta;
}