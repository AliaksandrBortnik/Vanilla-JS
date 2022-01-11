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