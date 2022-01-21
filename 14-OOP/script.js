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