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

// 4. Styles
message.style.width = '120%';
message.style.backgroundColor = '#36383a';

console.log(message.style.height); // only works for inline-style
console.log(getComputedStyle(message).color);
message.style.height = Number.parseFloat(getComputedStyle(message).height) + 30 + 'px';

// set custom properties
document.documentElement.style.setProperty('--color-primary', 'orange');

// 5. Attributes
const logo = document.querySelector('.nav__logo');
console.log(logo.src); // only works for standard attr
console.log(logo.getAttribute('anyAttrName')); // works for custom attr as well

// 6. Data attributes
console.log(logo.dataset.author); // get custom data-author attribute

// 7. Classes
// logo.classList.add('')
// logo.classList.remove('')
// logo.classList.toggle('')
// logo.classList.contains('')

// 8. Events
const h1 = document.querySelector('h1');
const handleHeaderMouseEnter = (e) => console.log(e);

// Common approach to attach handler. Any number of handlers can be attached
h1.addEventListener('mouseenter', handleHeaderMouseEnter);
// Then it is possible to clean up and deattach
h1.removeEventListener('mouseenter', handleHeaderMouseEnter);

// Old way. Only one handler
h1.onmouseenter = (e) => console.log(e);
