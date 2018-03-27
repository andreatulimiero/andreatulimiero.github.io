/* menuElement */
let menu = {
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
  let menuElement = document.querySelector('.desktop .menu');
  menu.height = parseInt( window.getComputedStyle(menuElement).height );
  let titles =  menuElement.querySelector('.titles');
  let bar = menuElement.querySelector('.bar');
  let barStartX = parseInt( window.getComputedStyle(titles).marginLeft );
  bar.style.width = titles.querySelector('span').offsetWidth + 'px';
  bar.style.left = barStartX +'px';
  menu.selectArticle = articleTitle => {
    menu.highlightTitle(articleTitle);
    smoothScrollTo( document.querySelector('article.' + articleTitle.dataset.article) );
  };
  menu.highlightTitle = articleTitle => {
    titles.querySelector('.selected').classList.remove('selected');
    articleTitle.classList.add('selected');
    let target = '';
    if( articleTitle.classList.contains('home') ){
      bar.style.transform = 'translateX(0)';
      target = 'home';
    } else {
      let scaleFactor = articleTitle.offsetWidth / bar.offsetWidth;
      bar.style.transformOrigin = 'left';
      bar.style.transform = 'translateX('+ (articleTitle.offsetLeft - barStartX) +'px) scaleX('+ scaleFactor +')';
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
  let mainContainer = document.querySelector('.main-container');
  let menuIcon = document.querySelector('#menu-icon');
  let menuElement = document.querySelector('.mobile .side-menu');
  let titles = menuElement.querySelector('.mobile .side-menu .titles');
  let topBar = document.querySelector('.mobile .top-bar');
  menu.height = parseInt( window.getComputedStyle(topBar.querySelector('.background')).height );
  let topBarThreshold = document.querySelector('.home section:first-of-type').offsetTop;
  let closingThreshold = window.innerWidth / 3;
  let openMenu = function () {
    menuElement.classList.add('opened');
    topBar.classList.add('idle');
    mainContainer.classList.add('obscured');
  };
  let closeMenu = function(){ 
    menuElement.classList.remove('opened');
    mainContainer.classList.remove('obscured');
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
  let startX, deltaX;
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
  let scrollUpdate = {
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
    let windowScrollY = Math.round(window.scrollY);
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
  let article = document.querySelector('article.home');
  let articleContainer = article.querySelector('.container');
  article.style.height = window.getComputedStyle(articleContainer).height;
  articleContainer.style.height = Utils.toPx( parseFloat(article.style.height) + (mobileDevice ? 32 : 64) );
}

function initprojects(){
  let projectsContainer = document.querySelectorAll('article.projects .projects-container .project-container');
  if( !projectsContainer.length ) return;
  let projectsRevealer = {
    projects: [],
    shouldCheck: true,
    checkReveal : function() {
      if( !this.shouldCheck ) return;
      this.projects.forEach( project => {
        this.shouldCheck = false;
        if(project.classList.contains('hidden')){
          this.shouldCheck = true;
          let offsetTop = project.offsetTop;
          let height = parseInt( window.getComputedStyle(project).height );
          let visibleArea = window.innerHeight + window.scrollY;
          if( visibleArea > offsetTop + height/3 ){
            let offsetLeft = project.offsetLeft;
            let width = parseFloat( window.getComputedStyle(project).height );
            let position = parseInt( offsetLeft / width );
            project.style.transitionDelay = Utils.toSeconds( position * .1 );
            project.classList.remove('hidden');
          }
        }
      });
    }
  };
  projectsContainer.forEach( projectContainer => {
    let width = window.getComputedStyle(projectContainer).width;
    projectContainer.style.height = width;
    projectsRevealer.projects.push(projectContainer.querySelector('.project'));
  });
  projectsRevealer.checkReveal();
  window.addEventListener('scroll', e => { projectsRevealer.checkReveal(); }, {'passive': true});
}

/* Views Utils */
let Utils = {
  toPx: pixels => {
    return pixels + 'px';
  },
  toSeconds: seconds => {
    return seconds + 's';
  }
}

function checkHit(event, target){
  for( let element = event.target; element.tagName != 'HTML'; element = element.parentNode ){
    if( element == target )
      return true;
  }
  return false;
}
// Scrolling
let pageIsScrolling = false;
let animationFrameId;
function smoothScrollTo(target){
  if( pageIsScrolling ) cancelAnimationFrame(animationFrameId);
  pageIsScrolling = true;
  let body = document.querySelector('body');
  let scrollDelta = target.offsetTop - (menu.height + body.scrollTop);
  if( !scrollDelta ) return;
  let iteration = 0;
  let from = body.scrollTop;
  duration = 18;
  let scroll = function() {
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