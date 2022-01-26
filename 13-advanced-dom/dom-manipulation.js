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

// 9. Add event listeners
const navLinks = document.querySelector('.nav__links');
navLinks.addEventListener('click', (e) => {
  // Stop bubbling (or capturing if the handler is attached to the first phase)
  // e.stopPropagation();
  console.log(e);
  // e.target - actual target element where event fires
  // e.currentTarget - element which currently handles the event according to event phases
}); // By default, adding to bubbling phase, however we can pass third param = true to attach on capturing phase (top to down)

// 10. DOM traversing

// Downwards
const h1 = document.querySelector('h1');
console.log(h1.querySelectorAll('.highlight'));
console.log(h1.childNodes); // NodeList
console.log(h1.children); // HtmlCollection
console.log(h1.firstElementChild);
console.log(h1.lastElementChild);

// Upwards
console.log(h1.parentElement); // h1.parentNode
const header = h1.closest('.header');

// Siblings
console.log(h1.nextElementSibling);
console.log(h1.previousElementSibling);