'use strict';

const buttons = document.querySelectorAll('.show-modal');
const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const closeModalButton = document.querySelector('.close-modal');

const closeModal = () => {
  modal.classList.add('hidden');
  overlay.classList.add('hidden');
};

closeModalButton.addEventListener('pointerdown', closeModal);
overlay.addEventListener('pointerdown', closeModal);

buttons.forEach(btn => {
  btn.addEventListener('pointerdown', (event) => {
    event.stopPropagation();
    modal.classList.remove('hidden');
    overlay.classList.remove('hidden');
  });
});

document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape') {
    event.preventDefault();
    closeModal();
  }
});