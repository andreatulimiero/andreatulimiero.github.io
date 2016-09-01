/* Menu */
function initMenu(){
  if( mobileDevice )
    initMobileMenu();
  else
    initDesktopMenu();
}

function initDesktopMenu(){
  var titles = document.querySelector('.desktop .titles');
  var bar = document.querySelector('.desktop .titles + .bar');
  bar.style.width = titles.querySelector('span').offsetWidth + 'px';
  titles.querySelectorAll('span').forEach( titlesItem => {
    titlesItem.addEventListener('click', e => {
      if( e.target.id == 'home' ){
        bar.style.transform = 'translateX(0)';
      } else {
        var headerLeft = 
          parseInt(window.getComputedStyle(document.querySelector('.desktop .menu')).marginLeft);
        bar.style.transform = 'translateX('+ (e.target.offsetLeft - headerLeft) +'px)';
      }
    });
  });
}

function initMobileMenu(){
  var menuIcon = document.querySelector('#menu-icon');
  var menu = document.querySelector('.mobile .menu');
  menuIcon.addEventListener('click', e => {
    if( menu.classList.contains('opened') )
      menu.classList.remove('opened');
    else
      menu.classList.add('opened');
  });
  document.querySelector('body').addEventListener('click', e => {
    if( !checkHit(e, menu) && !checkHit(e, menuIcon) )
      menu.classList.remove('opened');
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
    if( deltaX < -150 )
      menu.classList.remove('opened');
  });
  menu.querySelectorAll('.titles span').forEach( title => {
    title.addEventListener('click', e => {
      if( e.target.id == 'home' ) console.log('Home');
      else if( e.target.id == 'ethos' ) console.log('Ethos');
      else if( e.target.id == 'works' ) console.log('Works');
    });
  });
}

function checkHit(event, target){
  for( var element = event.target; element.tagName != 'HTML'; element = element.parentNode ){
    if( element == target )
      return true;
  }
  return false;
}