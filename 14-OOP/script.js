'use strict';

// 1. Constructor function differs from a regular one by calling it with `new` and also capital first letter
// Implicit this = {} at the beginning
// Implicit return this at the end
function Person(firstName, birthYear) {
  this.firstName = firstName;
  this.birthYear = birthYear;

  // Inefficient to keep in object itself instead of prototype
  // this.calcAge = function() {
  //   return new Date().getFullYear() - this.birthYear;
  // };
}

const jake = new Person('Jake', 1941);
const ann = new Person('Ann', 1970);
console.log(jake);

console.log(jake instanceof Person);
console.log(jake.__proto__)
console.log(jake.constructor === Person); // under the hood of instanceof likely
console.warn([1,2,3].__proto__.__proto__);

// 2. Prototype
Person.prototype.calcAge = function() {
  return new Date().getFullYear() - this.birthYear;
};

console.log(ann.calcAge());
console.log(Person.prototype === ann.__proto__); // true
console.log(Person.prototype.isPrototypeOf(ann)); // true

Person.prototype.type = 'Human';
console.log(ann.type); // from prototype, base field

console.log(ann.hasOwnProperty('type')); // false because it's taken from prototype. not from object itself

console.log(['a', 'b'].__proto__ === Array.prototype); // true
// 5 -> Number(5)
console.log(Number(5).__proto__ === Number.prototype); // true

// 3. Class (ES6). They always are executed in strict mode
class Human {
  constructor(firstName, birthYear) {
    this._firstName = firstName;
    this.birthYear = birthYear;
  }

  calcAge() {
    return new Date().getFullYear() - this.birthYear;
  }

  // Getter / Setter
  get name() {
    return this._firstName;
  }

  // Adding additional validation logic or whatever
  set name(value) {
    if (value.length > 2) {
      this._firstName = value;
    } else {
      throw new Error('Invalid name length.');
    }
  }
}

const bob = new Human('Bob', 1982);
const bobAge = bob.calcAge();
bob.name = 'Wake';
console.log(bob.name);
// bob.name = 'A'; // throws error

const account = {
  owner: 'josh',
  movements: [100, 50, 300, 700],
  get latestMovement() {
    return this.movements.at(-1);
  }
};

console.log(account.latestMovement);
console.log(account);

// Coding Challenge #1
/*
1. Use a constructor function to implement a Car. A car has a make and a speed property.
The speed property is the current speed of the car in km/h;
2. Implement an 'accelerate' method that will increase the car's speed by 10, and log the new speed to the console;
3. Implement a 'brake' method that will decrease the car's speed by 5, and log the new speed to the console;
4. Create 2 car objects and experiment with calling 'accelerate' and 'brake' multiple times on each of them.
DATA CAR 1: 'BMW' going at 120 km/h
DATA CAR 2: 'Mercedes' going at 95 km/h
*/
function Car(make, speed) {
  this.make = make;
  this.speed = speed;
}

Car.prototype.accelerate = function() {
  this.speed += 10;
  console.log(`Speed: ${this.speed}`);
};

Car.prototype.brake = function() {
  this.speed -= 5;
  console.log(`Speed: ${this.speed}`);
}

const bmw = new Car('BMW', 120);
bmw.accelerate();

const merc = new Car('Mercedes', 95);
merc.brake();
