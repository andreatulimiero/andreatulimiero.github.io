/* menuElement */
var menu = {
  height: 0,
  selectArticle: undefined,
  highlightTitle: undefined
}

function initMenu(){
  if( mobileDevice )
    initMobileMenu();
  else
    initDesktopMenu();
}

function initDesktopMenu(){
  var menuElement = document.querySelector('.desktop .menu');
  menu.height = parseInt( window.getComputedStyle(menuElement).height );
  var titles =  menuElement.querySelector('.titles');
  var bar = menuElement.querySelector('.bar');
  var barStartX = parseInt( window.getComputedStyle(titles).marginLeft );
  bar.style.width = titles.querySelector('span').offsetWidth + 'px';
  bar.style.left = barStartX +'px';
  menu.selectArticle = articleTitle => {
    menu.highlightTitle(articleTitle);
    smoothScrollTo( document.querySelector('article.' + articleTitle.dataset.article) );
  };
  menu.highlightTitle = articleTitle => {
    titles.querySelector('.selected').classList.remove('selected');
    articleTitle.classList.add('selected');
    var target = '';
    if( articleTitle.classList.contains('home') ){
      bar.style.transform = 'translateX(0)';
      target = 'home';
    } else {
      bar.style.transform = 'translateX('+ (articleTitle.offsetLeft - barStartX) +'px)';
      if( articleTitle.classList.contains('ethos') ) target = 'ethos';
      else if( articleTitle.classList.contains('works') ) target = 'works';
    }
  };
  console.log(titles.querySelectorAll('span'));
  titles.querySelectorAll('span').forEach( titlesItem => {
    titlesItem.addEventListener('click', e => {
      menu.selectArticle(e.target);
    });
  });
}

function initMobileMenu(){
  var menuIcon = document.querySelector('#menu-icon');
  var menuElement = document.querySelector('.mobile .side-menu');
  menu.height = parseInt( window.getComputedStyle(menuElement).height );
  var titles = menuElement.querySelector('.mobile .side-menu .titles');
  var topBar = document.querySelector('.mobile .top-bar');
  var topBarThreshold = document.querySelector('.home section:first-of-type').offsetTop;
  var openMenu = function () {
    menuElement.classList.add('opened');
    topBar.classList.add('idle');
  };
  var closeMenu = function(){ 
    menuElement.classList.remove('opened');
    if( document.querySelector('body').scrollTop > topBarThreshold ) topBar.classList.remove('idle');
  };
  menu.selectArticle = articleTitle => {
    smoothScrollTo( document.querySelector('article.' + articleTitle.dataset.article) );
    closeMenu();
  };
  menu.highlightTitle = articleTitle => {
    articleTitle.style.fontWeight = 'bold';
  };
  menuIcon.addEventListener('click', e => {
    if( menuElement.classList.contains('opened') ) closeMenu();
    else openMenu();
  });
  // Top fixed menuElement
  document.addEventListener('scroll', e => {
    if( document.querySelector('body').scrollTop <= topBarThreshold ) {
      topBar.classList.add('idle');
      return;
    }
    topBar.classList.remove('idle');
  });
  // Sliding menuElement
  document.querySelector('body').addEventListener('click', e => {
    if( !checkHit(e, menuElement) && !checkHit(e, menuIcon) ) closeMenu();
  });
  var startX, deltaX;
  document.querySelector('body').addEventListener('touchstart', e => {
    startX = parseInt( e.touches[0].pageX );
  });
  document.querySelector('body').addEventListener('touchmove', e => {
    if( !menuElement.classList.contains('opened') ) return;
    menuElement.style.transition = 'none';
    deltaX = parseInt( e.touches[0].pageX ) - startX;
    if( deltaX >= 0 ) return;
    menuElement.style.transform = 'translateX('+ deltaX +'px)';
  });
  document.querySelector('body').addEventListener('touchend', e => {
    if( !menuElement.classList.contains('opened') ) return;
    menuElement.style.transform = '';
    menuElement.style.transition = '';
    if( deltaX < -150 ) closemenuElement();
  });
  titles.querySelectorAll('span').forEach( title => {
    title.addEventListener('click', e => {
      menu.selectArticle(e.target);
    });
  });
}

function initArticles(){
  initHome();
  initWorks();
  var scrollUpdate = {
    isHanging: false,
    intervalId: undefined,
    waitTime: 100,
    hang: function() {
      mThis = this; 
      mThis.isHanging = true;
      mThis.intervalId = setInterval(() => { mThis.isHanging = false; }, mThis.waitTime);
    }
  };
  window.addEventListener('scroll', e => {
    console.log(pageIsScrolling);
    if( pageIsScrolling ) return;
    if( scrollUpdate.isHanging ) return;
    scrollUpdate.hang();
    if( window.scrollY >= document.querySelector('article.works').offsetTop - menu.height ) 
      menu.highlightTitle( document.querySelector('.titles .works') );
    else if ( window.scrollY >= document.querySelector('article.ethos').offsetTop - menu.height ) 
      menu.highlightTitle( document.querySelector('.titles .ethos') );
    else 
      menu.highlightTitle( document.querySelector('.titles .home') );
    
  });
}

/* Single articles */
function initHome(){
  var article = document.querySelector('article.home');
  article.style.height = window.getComputedStyle(article).height;
  var articleContent = article.querySelector('.container');
  articleContent.style.height = Utils.toPx( parseFloat(article.height) + 32 );
}

function initWorks(){
  var worksContainers = document.querySelectorAll('article.works .works-container .work-container');
  if( worksContainers.length == 0 ) return;
  worksContainers.forEach( workContainer => {
    var width = window.getComputedStyle(workContainer).width;
    workContainer.style.height = width;
  });
}

/* Views Utils */
var Utils = {
  toPx: pixels => {
    return pixels + 'px';
  }
}

function checkHit(event, target){
  for( var element = event.target; element.tagName != 'HTML'; element = element.parentNode ){
    if( element == target )
      return true;
  }
  return false;
}
// Scrolling
var pageIsScrolling = false;
var animationFrameId;
function smoothScrollTo(target){
  if( pageIsScrolling ) cancelAnimationFrame(animationFrameId);
  pageIsScrolling = true;
  var body = document.querySelector('body');
  var scrollDelta = target.offsetTop - (menu.height + body.scrollTop);
  if( !scrollDelta ) return;
  var iteration = 0;
  var from = body.scrollTop;
  duration = 18;
  var scroll = function() {
    if( iteration >= duration ) {
      body.scrollTop = from + scrollDelta;
      pageIsScrolling = false;
      return;
    }
    body.scrollTop = Math.easeInOutSine(iteration, from , scrollDelta, duration);
    iteration++;
    requestAnimationFrame(scroll);
  }
  animationFrameId = requestAnimationFrame(scroll);
}