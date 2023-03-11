'use strict';

///////////////////////////////////////
// Modal window

const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.btn--close-modal');
const btnsOpenModal = document.querySelectorAll('.btn--show-modal');
const buttonScroolTo = document.querySelector('.btn--scroll-to');
const sektionTwo = document.querySelector('#section--1');
const sectionOne = document.querySelector('.header')
// alle knapper 
const buttons = document.querySelectorAll('.operations__tab');
// parent-element til buttons
const buttonContainer = document.querySelector('.operations__tab-container');
// content 
const buttonsContent = document.querySelectorAll('.operations__content');
// whole nav section
const nav = document.querySelector('.nav');
const footer = document.querySelector('.footer__nav')
const allSections = document.querySelectorAll('.section');
const header = document.querySelector('h1');
header.firstElementChild.style.color = 'white'

console.log(nav);

// open modal box
const openModal = function (e) {
  e.preventDefault();
  modal.classList.remove('hidden');
  overlay.classList.remove('hidden');
};
btnsOpenModal.forEach((button) => button.addEventListener('click', openModal))


// close modal box
const closeModal = function () {
  modal.classList.add('hidden');
  overlay.classList.add('hidden');
};
btnCloseModal.addEventListener('click', closeModal);
overlay.addEventListener('click', closeModal);

document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
    closeModal();
  }
});

buttonScroolTo.addEventListener('click', function(e) {
  sektionTwo.scrollIntoView({ behavior: 'smooth' })
})



// COOKIE MESSAGE
const message = document.createElement('div')
message.innerHTML = 'we gør brug af cookies for optimal kundetilfredshed. <button class="btn btn--close-cookie"> Got it! </button>';
message.classList.add('cookie-message')

sectionOne.append(message)

const btnCookie = document.querySelector('.btn--close-cookie');
btnCookie.addEventListener('click', () => {
  message.remove()
})

message.style.backgroundColor = '#37783d';
message.style.width = '120%';
message.style.height = '60px'



// page navigation 
document.querySelector('.nav__links').addEventListener('click', function(e) {
  e.preventDefault();

  // ignores click that does not happen in one of the links
  if(e.target.classList.contains('nav__link')) {
    const id = e.target.getAttribute('href');
    document.querySelector(id).scrollIntoView({behavior: 'smooth'})
  }

});



// adding the functionality to section2 / the tabbed component 
buttonContainer.addEventListener('click', function(e) {

  const clicked = e.target.closest('.operations__tab');

  // Guard clause - means that this if statement will return early if there is nothing clicked and if the clicked result is null
  if(!clicked) return;

  // removes the active classes from both buttons and content
  buttons.forEach(btn => btn.classList.remove('operations__tab--active'));
  buttonsContent.forEach( cnt => cnt.classList.remove('operations__content--active'))

  // puts the active class only on the clicked one.
  clicked.classList.add('operations__tab--active')
  // activate the content
  document.querySelector(`.operations__content--${clicked.dataset.tab}`).classList.add('operations__content--active')

});



// handles the hover effects in NAV
const handleHover = function(e, opacity) {
  if(e.target.classList.contains('nav__link')) {

    const link = e.target;
    const siblings = link.closest('.nav').querySelectorAll('.nav__link');
    console.log(siblings);
    const logo = link.closest('.nav').querySelector('img');

    siblings.forEach(el => {

      if(el !== link) el.style.opacity = this;
      logo.style.opacity = this;

    });

  };
};

// when hover over a link in NAV => every thing other than the link should be faded out / get a opacity 0.5
nav.addEventListener('mouseover', handleHover.bind(0.5));

// when mouse out => whole nav elements should be back to opacity 1
nav.addEventListener('mouseout', handleHover.bind(1));


// make header sticky 
// window.addEventListener('scroll', function() {

//   const nav = document.querySelector('.nav');

//   if(this.window.scrollY > 200) {
//     nav.classList.add('sticky')
//   }
//   else nav.classList.remove('sticky')

// })

const stickyNav = function(entries, observer) {

  const [entry] = entries;

  if(!entry.isIntersecting) nav.classList.add('sticky');
  else nav.classList.remove('sticky')

};

const options = {
  root: null,
  threshold: 0,
  rootMargin: '-90px'
};

const headerObserver = new IntersectionObserver(stickyNav, options);

headerObserver.observe(sectionOne);



// reveal section
const revealSection = function(entries, observer) {
const [entry] = entries;

if(!entry.isIntersecting) return;

entry.target.classList.remove('section--hidden')

observer.unobserve(entry.target);

};

const sectionObserver = new IntersectionObserver(revealSection, {
  root: null,
  threshold: 0.15
});


allSections.forEach(function(section) {

sectionObserver.observe(section);
// section.classList.add('section--hidden')

});



// lazy loading IMG
const imgTarget = document.querySelectorAll('img[data-src]');

const loadImg = function(entries, observer) {
  const [entry] = entries;
  console.log(entry);

  if(!entry.isIntersecting) return;

  entry.target.src = entry.target.dataset.src;

  entry.target.addEventListener('load', function() {
    entry.target.classList.remove('lazy-img');
  });

  observer.unobserve(entry.target);

};

const imgObserve = new IntersectionObserver(loadImg, {
  root: null,
  threshold: 0,
  rootMargin: '200px'
});

imgTarget.forEach(function(img){
  imgObserve.observe(img);
});
 


// HANDLES THE HOVER EFFECTS IN FOOTER NAV
footer.addEventListener('mouseover', function(e, opacity) {
  if(e.target.classList.contains('footer__link')) {

    const clickedlink = e.target;
    const allLinks = clickedlink.closest('.footer__nav').querySelectorAll('.footer__link')

    allLinks.forEach( link => {

      if(link !== clickedlink) {
        link.style.opacity = 0.5;
        clickedlink.style.opacity = 1;
      };
      
    });

  };
  
});

footer.addEventListener('mouseout', function(e, opacity) {

  const clickedlink = e.target;
  const allLinks = clickedlink.closest('.footer__nav').querySelectorAll('.footer__link')

  allLinks.forEach( link => {

    if(link !== clickedlink) {
      link.style.opacity = 1;
      clickedlink.style.opacity = 1;
    };
    
  });
  
});




// slider component

const slides = document.querySelectorAll('.slide');
const slider = document.querySelector('.slider');
const btnLeft = document.querySelector('.slider__btn--left');
const btnRight = document.querySelector('.slider__btn--right');
let currentSlide = 0;
const maxSlide = slides.length;
const dotsContainer = document.querySelector('.dots');



slides.forEach(function(slide, i) {
  slide.style.transform = `translateX( ${100 * i}%)`;
});
// 0, 100%, 200%, 300%


const createDots = function() {
  slides.forEach(function(_, i) {
    dotsContainer.insertAdjacentHTML('beforeend', `<button class="dots__dot" data-slide="${i}"></button>`)
  })
}


const activateDot = function(slide) {

  document.querySelectorAll('.dots__dot').forEach(dot => dot.classList.remove('dots__dot--active'));


  document.querySelector(`.dots__dot[data-slide="${slide}"]`).classList.add('dots__dot--active')

}


const goToSlide = function(slide) {
  slides.forEach(function(s, i) {
    s.style.transform = `translateX( ${100 * (i - slide)}%)`;
  });
}


const nextSlide = function() {

  if(currentSlide === maxSlide -1) {
    currentSlide = 0;
  }else {
    currentSlide++;
  }

  goToSlide(currentSlide);
  activateDot(currentSlide)

}


const prevSlide = function() {

  if(currentSlide === 0){
    currentSlide = maxSlide -1;
  } else {
    currentSlide--;
  }

  goToSlide(currentSlide)
  activateDot(currentSlide)

}


// ngOnInit function as soon as page loads
const init = function() {

  // when page load, it will go to slide 0 as starting point and creates the dots
goToSlide(0);
  // calling the dots as soon as the page loads
createDots();
// make the first dot hightlight when page loads
activateDot(0);

};

init();


// next slide
// we want to make first slide to -100, the new to 0 and the next to it to 100 and the last 200
btnRight.addEventListener('click', nextSlide);

document.addEventListener('keydown', function(e) {
  if(e.key === 'ArrowLeft') {
    prevSlide()
  }
});

btnLeft.addEventListener('click', prevSlide)

document.addEventListener('keydown', function(e) {
  if(e.key === 'ArrowRight') {
    nextSlide()
  }
});

dotsContainer.addEventListener('click', function(e) {
  if(e.target.classList.contains('dots__dot')) {
    console.log("dot!");
    const {slide} = e.target.dataset;
    goToSlide(slide)
    activateDot(slide)
  }
});