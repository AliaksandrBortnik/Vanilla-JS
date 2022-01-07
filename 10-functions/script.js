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


// 2. bind

