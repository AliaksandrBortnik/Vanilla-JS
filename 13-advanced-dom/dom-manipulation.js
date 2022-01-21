// DOM API

// 1. Selecting
console.log(document.documentElement);
console.log(document.head);
console.log(document.body);

const header = document.querySelector('.header');
const sections = document.querySelectorAll('.section');
const section1 = document.getElementById('section--1');
// document.getElementsByTagName()

// 2. Create and insert elements
const message = document.createElement('div');
message.classList.add('cookie-message');
// message.textContent = 'We use cookie for improved functionality and analytics';
message.innerHTML = 'We use cookie for improved functionality and analytics ' +
  '<button class="btn btn--close-cookie">Got it</button>';

header.prepend(message);
// Children: .append(), .prepend()
// Siblings: .after(), .before

// 3. Delete elements
document.querySelector('.btn--close-cookie')
  .addEventListener('click', (e) => {
    message.remove();
  });