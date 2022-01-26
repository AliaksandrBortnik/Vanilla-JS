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
