'use strict';

// const jonas = {
//   firstName: 'Jonas',
//   lastName: 'Shmdt',
//   age: 30,
//   job: 'teacher',
//   friends: ['a', 'b', 'c'],
//   hasDriverLicense: true,
//   getSummary: function () {
//     return `${this.firstName} ${this.lastName} is ${this.age} years old`;
//   },
// };
//
// console.log(jonas['getSummary']())

// function Person(firstName, lastName, mass, height) {
//   this.firstName = firstName;
//   this.lastName = lastName;
//   this.mass = mass;
//   this.height = height;
// }
//
// Person.prototype.calcBMI = calcBMI;
// Person.prototype.getFullName = getFullName;

// class Person {
//   constructor(firstName, lastName, mass, height) {
//     this.firstName = firstName;
//     this.lastName = lastName;
//     this.mass = mass;
//     this.height = height;
//   }
//
//   calcBMI() {
//     return this.mass / (this.height ** 2);
//   }
//
//   getFullName = () => {
//     return `${this.firstName} ${this.lastName}`;
//   }
// }
//
// const mark = new Person('Mark', 'Black', 78, 1.69);
// const john = new Person('John', 'White', 92, 1.95);
//
//
//
// // function getFullName() {
// //   return `${this.firstName} ${this.lastName}`;
// // }
// //
// // function calcBMI() {
// //   return this.mass / (this.height ** 2);
// // }
//
// const isJohnBigger = john.calcBMI() > mark.calcBMI();
//
// console.log(isJohnBigger ? 'John is bigger' : 'Mark is bigger')
// console.log(mark)
// console.log(mark.getFullName())

// const bills = [22, 295, 76, 440, 37, 105];
// const tips = [];
// const totals = [];

// const calcTip = function (bill) {
//   return bill * 0.1;
// };

// for (let i = 0; i < bills.length; i++) {
//   const bill = bills[i];
//   const tip = calcTip(bill);
//   tips.push(tip);
//   totals.push(bill + tip);
// }

// console.log(bills);
// console.log(tips);
// console.log(totals);

// const calcAverage = function (arr) {
//   return arr.reduce((a, b) => a + b, 0) / arr.length;
// };

// console.log(calcAverage(totals));

// function name() {
//   return 'sad';
// }

const temperatures = [17, 21, 23];

const printForecast = function (tempratures) {
  let finalText = temperatures.reduce(
    (accum, temp, index) => (accum += ` ... ${temp}C in ${index + 1} days`),
    ''
  );

  console.log(finalText);
};

printForecast(temperatures);
