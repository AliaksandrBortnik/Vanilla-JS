'use strict';

///////////////////////////////////////
// 1. Modal window

const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.btn--close-modal');
const btnsOpenModal = document.querySelectorAll('.btn--show-modal');

const openModal = function (e) {
  e.preventDefault();
  modal.classList.remove('hidden');
  overlay.classList.remove('hidden');
};

const closeModal = function () {
  modal.classList.add('hidden');
  overlay.classList.add('hidden');
};

btnsOpenModal.forEach(btn => btn.addEventListener('click', openModal));

btnCloseModal.addEventListener('click', closeModal);
overlay.addEventListener('click', closeModal);

document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
    closeModal();
  }
});


// 2. Add smooth scrolling when click on "Learn more"
const btnScroll = document.querySelector('.btn--scroll-to');
const scn1 = document.querySelector('#section--1');

btnScroll.addEventListener('click', (e) => {
  // Old way
  // const coords = scn1.getBoundingClientRect();
  // console.log('Current scroll X, Y', window.pageXOffset, window.pageYOffset);
  // console.log('Viewport height, width', document.documentElement.clientHeight, document.documentElement.clientWidth);
  //
  // window.scrollTo({
  //   left: coords.left + window.pageXOffset,
  //   top: coords.top + window.pageYOffset,
  //   behavior: 'smooth'
  // });

  // Newer way
  scn1.scrollIntoView({ behavior: "smooth"})
});

// 3. Implement smooth scrolling for nav links using the event delegation
const nav = document.querySelector('.nav');
nav.addEventListener('click', (e) => {
  if (e.target.classList.contains('nav__link')) { // check if delegating clicks on links only
    console.log(`Clicked on: ${e.target.textContent}`);
    e.preventDefault(); // stop using href and anchor of <a>

    const anchorSelector = e.target.getAttribute('href');
    document
      .querySelector(anchorSelector)
      .scrollIntoView({ behavior: 'smooth' });
  }
});

// 4. Tabs
const tabs = document.querySelectorAll('.operations__tab');
const tabsContainer = document.querySelector('.operations__tab-container');
const tabsContent = document.querySelectorAll('.operations__content');

tabsContainer.addEventListener('click', (e) => {
  const clicked = e.target.closest('.btn');
  if (!clicked) return;

  const tabNumber = clicked.dataset.tab;
  // Deactivate all tabs
  tabs.forEach(t => t.classList.remove('operations__tab--active'));
  tabsContent.forEach(c => c.classList.remove('operations__content--active'));

  // Make active the clicked one
  const tabToActivate = [...tabs].find(tab => tab.dataset.tab === tabNumber);
  tabToActivate.classList.add('operations__tab--active');
  // Show content of selected tab
  const tabContentToShow = [...tabsContent].find(c => c.classList.contains(`operations__content--${tabNumber}`));
  tabContentToShow.classList.add('operations__content--active');
});

// 5. Navbar fade animation
const headerNavLinks = nav.querySelectorAll('.nav__links');
const navLogo = nav.querySelector('img');

const handleHover = function(e) {
  const opacity = this; // passed through the bind

  if (e.target.classList.contains('nav__link')) {
    const linkOver = e.target;
    navLogo.style.opacity = opacity;

    headerNavLinks.forEach(link => {
      if (link !== linkOver) {
        link.style.opacity = opacity;
      }
    });
  }
};

nav.addEventListener('mouseover', handleHover.bind(0.5));
nav.addEventListener('mouseout', handleHover.bind(1));

// 6. Sticky navigation (scroll event)
// const initialCoords = scn1.getBoundingClientRect();
// console.log(initialCoords)
//
// window.addEventListener('scroll', () => {
//   if (window.scrollY > initialCoords.top) {
//     nav.classList.add('sticky');
//   } else {
//     nav.classList.remove('sticky');
//   }
// });

// 6.1. Sticky navigation, more efficient way (intersection observer API)
// 6.1.1. Basic test example
// const observerFn = (entries, observer) => {
//   entries.forEach(entry => console.log(entry));
// };
//
// const observerOptions = {
//   root: null, // intersect with an entire viewport
//   //threshold: 0.1 // 10% intersection
//   threshold: [0, 0.2]
// };
//
// const observer = new IntersectionObserver(observerFn, observerOptions);
// observer.observe(scn1); // section1 is a target element to observe

// 6.1.2 Implemented: Show sticky header when viewport doesn't include header element at all
// const appHeader = document.querySelector('.header');
// const headerHeight = nav.getBoundingClientRect().height;
//
// const stickyNav = ([entry]) => {
//   console.log('intersect', entry)
//   if (!entry.isIntersecting) {
//     nav.classList.add('sticky');
//   } else {
//     nav.classList.remove('sticky');
//   }
// };
//
// const headerObserver = new IntersectionObserver(stickyNav, {
//   root: null, // viewport
//   threshold: 0,
//   rootMargin: `-${headerHeight}px` // space for header itself
// });
// headerObserver.observe(appHeader);
//
// // 7. Revealing elements on scroll (elements appear while scrolling)
// const allSections = document.querySelectorAll('.section');
//
// const revealSectionFn = (entries, observer) => {
//   const [entry] = entries;
//
//   if (entry.isIntersecting) {
//     entry.target.classList.remove('section--hidden');
//   }
//
//   observer.unobserve(entry.target);
// };
//
// const sectionObserver = new IntersectionObserver(revealSectionFn, {
//   root: null,
//   threshold: 0.1
// });
//
// allSections.forEach(section => {
//   sectionObserver.observe(section);
//   section.classList.add('section--hidden');
// });

// 8. Lazy loading images for performance optimization
// Initially we load very small size (like blurred) img to speed up app start-up, then load the full resolution
// const lazyImages = document.querySelectorAll('img[data-src]');
//
// const loadImg = (entries, observer) => {
//   const [entry] = entries;
//   const imgElem = entry.target;
//   imgElem.setAttribute('src', imgElem.dataset.src);
//
//   // Remove the blur class when a full-resolution img is loaded
//   imgElem.addEventListener('load', (e) => {
//     imgElem.classList.remove('lazy-img');
//   });
//
//   observer.unobserve(entry);
// }
//
// const imageObserver = new IntersectionObserver(loadImg, {
//   root: null,
//   threshold: 0,
//   rootMargin: '200px' // start loading images a little bit beforehand
// });
//
// lazyImages.forEach(img => imageObserver.observe(img));

// 9. Slider component
const carousel = () => {
  const slides = document.querySelectorAll('.slide');
  const btnLeft = document.querySelector('.slider__btn--left');
  const btnRight = document.querySelector('.slider__btn--right');
  const dotContainer = document.querySelector('.dots');

  let currentSlide = 0;
  const maxSlide = slides.length;

  const init = () => {
    createDots();
    goToSlide(0);
  };

  init();

  function createDots() {
    for (let i = 0; i < maxSlide; i++) {
      dotContainer.insertAdjacentHTML('beforeend', `<button class="dots__dot" data-slide="${i}"></button>`);
    }
  }

  function makeDotActive(slide) {
    const dots = dotContainer.querySelectorAll('.dots__dot');
    dots.forEach(dot => dot.classList.remove('dots__dot--active'));

    dotContainer.querySelector(`.dots__dot[data-slide="${slide}"]`)
      .classList.add('dots__dot--active');
  }

  function goToSlide(slide) {
    slides.forEach((s, i) =>
      s.style.transform = `translateX(${100 * (i - slide)}%)`);
    makeDotActive(slide);
  }

  function nextSlide() {
    if (currentSlide === maxSlide - 1) {
      currentSlide = 0;
    } else {
      currentSlide++;
    }

    goToSlide(currentSlide);
  }

  function prevSlide() {
    if (currentSlide === 0) {
      currentSlide = maxSlide - 1;
    } else {
      currentSlide--;
    }

    goToSlide(currentSlide);
  }

  btnLeft.addEventListener('click', prevSlide);
  btnRight.addEventListener('click', nextSlide);

  document.addEventListener('keydown', (e) => {
    switch (e.key) {
      case 'ArrowLeft':
        prevSlide();
        break;
      case 'ArrowRight':
        nextSlide();
        break;
    }
  });

  dotContainer.addEventListener('click', (e) => {
    if (e.target.classList.contains('dots__dot')) {
      const { slide } = e.target.dataset;
      goToSlide(slide);
    }
  });
};

carousel();