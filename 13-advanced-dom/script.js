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
const appHeader = document.querySelector('.header');
const headerHeight = nav.getBoundingClientRect().height;

const stickyNav = ([entry]) => {
  console.log('intersect', entry)
  if (!entry.isIntersecting) {
    nav.classList.add('sticky');
  } else {
    nav.classList.remove('sticky');
  }
};

const headerObserver = new IntersectionObserver(stickyNav, {
  root: null, // viewport
  threshold: 0,
  rootMargin: `-${headerHeight}px` // space for header itself
});
headerObserver.observe(appHeader);