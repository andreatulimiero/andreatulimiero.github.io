// $(document).foundation()

// Building menu
var menu = document.querySelector('.menu');
var bar = document.querySelector('.menu + .bar');
bar.style.width = menu.querySelector('span').offsetWidth + 'px';
menu.querySelectorAll('span').forEach( menuItem => {
  menuItem.addEventListener('click', menuItemClick);
});

function menuItemClick(e){
  if( e.target.id == 'home' ){
    bar.style.transform = 'translateX(0)';
  } else {
    var headerLeft = parseInt(window.getComputedStyle(document.querySelector('header')).marginLeft);
    bar.style.transform = 'translateX('+ (e.target.offsetLeft - headerLeft) +'px)';
  }
}