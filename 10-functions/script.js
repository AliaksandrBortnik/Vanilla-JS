'use strict';

// 1. call / apply
const lufthansa = {
  airline: 'Lufthansa',
  iataCode: 'LH',
  bookings: [],
  book(flightNum, name) {
    console.log(`${name} booked a seat on ${this.airline} flight ${this.iataCode}${flightNum}`);
    this.bookings.push({
      flight: `${this.iataCode}${flightNum}`,
      name
    });
  }
}

let book = lufthansa.book;

lufthansa.book(239, 'Bob');
lufthansa.book(635, 'Rob');

const eurowings = {
  airline: 'Eurowings',
  iataCode: 'EW',
  bookings: []
}

book.call(eurowings, 599, 'Josh');
// or
book.apply(eurowings, [599, 'Josh']);

// 2. bind - provided value binds to this and returns a new function
const bookEW = book.bind(eurowings);
const bookEW23 = book.bind(eurowings, 23); // bind for specific flight number
bookEW(23, 'Steven Williams');
bookEW23('Jacob');

// example with event listeners
lufthansa.planes = 300;
lufthansa.buyPlane = function() {
  console.log(this)
  this.planes++;
  console.log(this.planes)
}

const buy = lufthansa.buyPlane.bind(lufthansa);

document.querySelector('.buy')
  .addEventListener('pointerdown', buy);

// 3. Partial application using bind()
const addTax = (rate, value) => value * (1 + rate);
console.log(addTax(0.1, 200))

const addVAT = addTax.bind(null, 0.23);
console.log(addVAT(200))

// function addTAX_HOF(rate) {
//   return value => value * (1 + rate)
// }

const addTAX_HOF = rate => value => value * (1 + rate);

const addVAT_HOF = addTAX_HOF(0.23);
console.log(addVAT_HOF(200));

// 4. Coding challenge #1
/*
Let's build a simple poll app!
A poll has a question, an array of options from which people can choose, and an array with the number of replies for each option. This data is stored in the starter object below.
*/

const poll = {
  question: 'What is your favourite programming language?',
  options: ['0: JavaScript', '1: Python', '2: Rust', '3: C++'],
  // This generates [0, 0, 0, 0]. More in the next section 😃
  answers: new Array(4).fill(0)
};

/*
4.1. Create a method called 'registerNewAnswer' on the 'poll' object. The method does 2 things:
  4.1.1. Display a prompt window for the user to input the number of the selected option. The prompt should look like this:
        What is your favourite programming language?
        0: JavaScript
        1: Python
        2: Rust
        3: C++
        (Write option number)

  4.1.2. Based on the input number, update the answers array. For example, if the option is 3, increase the value AT POSITION 3 of the array by 1. Make sure to check if the input is a number and if the number makes sense (e.g answer 52 wouldn't make sense, right?)
4.4. Run the 'displayResults' method at the end of each 'registerNewAnswer' method call.
*/
poll.registerNewAnswer = function() {
  const answer = Number(prompt(`What is your favourite programming language?
  0: JavaScript
  1: Python
  2: Rust
  3: C++
  (Write option number)`));

  if (!Number.isInteger(answer) || answer < 0 || answer > this.answers.length - 1) {
    alert('Wrong format of answer');
    return;
  }

  this.answers[answer]++;
  this.displayResults();
}

// 4.2. Call this method whenever the user clicks the "Answer poll" button.
document.querySelector('.poll')
  .addEventListener('pointerdown', poll.registerNewAnswer.bind(poll));

// 4.3. Create a method 'displayResults' which displays the poll results.
// The method takes a string as an input (called 'type'), which can be either 'string' or 'array'.
// If type is 'array', simply display the results array as it is, using console.log().
// This should be the default option. If type is 'string', display a string like "Poll results
// are 13, 2, 4, 1".
poll.displayResults = function(type = 'array') {
  const outputMessage = type === 'array' ?
    `${this.answers}` : `Poll results are ${this.answers}`;
  console.log(outputMessage);
}

// BONUS
// Use the 'displayResults' method to display the 2 arrays in the test data.
// Use both the 'array' and the 'string' option. Do NOT put the arrays in the poll object!
// TEST DATA 1: [5, 2, 3]
// TEST DATA 2: [1, 5, 3, 9, 6, 1]
const display = poll.displayResults;
display.call({ answers: [5, 2, 3] }, 'array');
display.apply({ answers: [1, 5, 3, 9, 6, 1] }, ['string']);
// OR
const displayBinded = poll.displayResults.bind({ answers: [5, 2, 3] });
displayBinded();

// 5. IIFE - Immediately Invoked Function Expression
(function () {
  console.log(' IIFE never run again')
})();

// 6. Closures
// Example 1.
const secureBooking = function() {
  let passengerCount = 0;

  return function() {
    passengerCount++;
    console.log(passengerCount);
  }
}

const booker = secureBooking();
console.dir(booker);
booker();
booker();
booker();

// Example 2.
let f;

const g = function() {
  const a = 23;
  f = function() {
    console.log(a * 2);
  }
}

const h = function() {
  const b = 777;

  f = function() {
    console.log(b * 2)
  }
}

g();
f();
console.dir(f);

h();
f();
console.dir(f);

const boardPassengers = function(n, wait) {
  const perGroup = n / 3;

  setTimeout(function() {
    console.log(`We are now boarding all ${n} passengers`);
    console.log(`There are 3 groups, each with ${perGroup} passengers`)
  }, wait * 1000);

  console.log(`Will start boarding in ${wait}`)
}

const perGroup = 1000; // It won't be used since scope chain has lower priority than a closure scope
boardPassengers(30, 5);
