/* menuElement */
var menu = {
  height: 0,
  selectArticle: undefined,
  highlightTitle: undefined
}

function OnPageLoadFinished(){
  document.querySelectorAll('.loading-idle').forEach( item => {
    item.classList.remove('loading-idle');
  });
  document.querySelector('body').removeChild(document.querySelector('.splash-container'));
}

function initMenu(){
  mobileDevice ? initMobileMenu() : initDesktopMenu();
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
      else if( articleTitle.classList.contains('projects') ) target = 'projects';
    }
  };
  titles.querySelectorAll('span').forEach( titlesItem => {
    titlesItem.addEventListener('click', e => {
      menu.selectArticle(e.target);
    });
  });
}

function initMobileMenu(){
  var menuIcon = document.querySelector('#menu-icon');
  var menuElement = document.querySelector('.mobile .side-menu');
  var titles = menuElement.querySelector('.mobile .side-menu .titles');
  var topBar = document.querySelector('.mobile .top-bar');
  menu.height = parseInt( window.getComputedStyle(topBar).height );
  var topBarThreshold = document.querySelector('.home section:first-of-type').offsetTop;
  var closingThreshold = window.innerWidth / 3;
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
    if( Math.abs( deltaX ) > closingThreshold ) closeMenu();
  });
  titles.querySelectorAll('span').forEach( title => {
    title.addEventListener('click', e => {
      menu.selectArticle(e.target);
    });
  });
}

/* Articles */
function initArticles(){
  initHome();
  initprojects();
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
    if( pageIsScrolling ) return;
    if( scrollUpdate.isHanging ) return;
    scrollUpdate.hang();
    var windowScrollY = Math.round(window.scrollY);
    if( windowScrollY >= document.querySelector('article.projects').offsetTop - menu.height ) 
      menu.highlightTitle( document.querySelector('.titles .projects') );
    else if ( windowScrollY >= document.querySelector('article.ethos').offsetTop - menu.height ) 
      menu.highlightTitle( document.querySelector('.titles .ethos') );
    else 
      menu.highlightTitle( document.querySelector('.titles .home') );
    
  }, {passive: false});
}

/* Single articles */
function initHome(){
  var article = document.querySelector('article.home');
  var articleContainer = article.querySelector('.container');
  article.style.height = window.getComputedStyle(articleContainer).height;
  articleContainer.style.height = Utils.toPx( parseFloat(article.style.height) + (mobileDevice ? 32 : 64) );
}

function initprojects(){
  var projectsContainer = document.querySelectorAll('article.projects .projects-container .project-container');
  if( !projectsContainer.length ) return;
  var projectsRevealer = {
    projects: [],
    shouldCheck: true,
    checkReveal : function() {
      if( !this.shouldCheck ) return;
      this.projects.forEach( project => {
        this.shouldCheck = false;
        if(project.classList.contains('hidden')){
          this.shouldCheck = true;
          var offsetTop = project.offsetTop;
          var height = parseInt( window.getComputedStyle(project).height );
          var visibleArea = window.innerHeight + window.scrollY;
          if( visibleArea > offsetTop + height/3 ){
            var offsetLeft = project.offsetLeft;
            var width = parseFloat( window.getComputedStyle(project).height );
            var position = parseInt( offsetLeft / width );
            project.style.transitionDelay = Utils.toSeconds( position * .1 );
            project.classList.remove('hidden');
          }
        }
      });
    }
  };
  projectsContainer.forEach( projectContainer => {
    var width = window.getComputedStyle(projectContainer).width;
    projectContainer.style.height = width;
    projectsRevealer.projects.push(projectContainer.querySelector('.project'));
  });
  projectsRevealer.checkReveal();
  window.addEventListener('scroll', e => { projectsRevealer.checkReveal(); }, {'passive': true});
}

/* Views Utils */
var Utils = {
  toPx: pixels => {
    return pixels + 'px';
  },
  toSeconds: seconds => {
    return seconds + 's';
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