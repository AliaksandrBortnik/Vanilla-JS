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

  static calcAvgSalary() {
    return 10000;
  }

  static get baseSalary() {
    return 5000;
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
console.log(`Salary received through static method: ${Human.calcAvgSalary()}`);
console.log(`Salary received through static getter: ${Human.baseSalary}`);

const account = {
  owner: 'josh',
  movements: [100, 50, 300, 700],
  get latestMovement() {
    return this.movements.at(-1);
  }
};

console.log(account.latestMovement);
console.log(account);

// Old way to add a static method to a constructor-function
Person.hey = function() {
  return 'Hey there';
}

// 4. Object.create
const EngineProto = {
  handle() {
    return 'processed...';
  }
};

const engine = Object.create(EngineProto, { name: { value: 'JS'} });
console.log('Object.create() in action', engine);
console.log(engine.__proto__ === EngineProto); // true

// 5. Inheritance between classes
function PersonInh(firstName, lastName) {
  this.firstName = firstName;
  this.lastName = lastName;
}

PersonInh.prototype.getFullName = function() {
  return `${this.firstName} ${this.lastName}`;
};

function Student(firstName, lastName, course) {
  PersonInh.call(this, firstName, lastName);
  this.course = course;
}

Student.prototype = Object.create(PersonInh.prototype); // new PersonInh()
Student.prototype.constructor = Student;
Student.prototype.showCourse = function() {
  console.log(`Current course is ${this.course}`);
};

const josh = new Student('Josh', 'Rally', 'JS advanced');
josh.showCourse();
josh.getFullName();
console.log('Josh protos', josh.__proto__, josh.__proto__.__proto__);

// The same stuff using ES6 class
class PersonCl {
  constructor(fullName, birthYear) {
    this.fullName = fullName;
    this.birthYear = birthYear;
  }
}

class StudentCl extends PersonCl {
  constructor(fullName, birthYear, course) {
    super(fullName, birthYear);
    this.course = course;
  }
}


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

// Coding Challenge #2
/*
1. Re-create challenge 1, but this time using an ES6 class;
2. Add a getter called 'speedUS' which returns the current speed in mi/h (divide by 1.6);
3. Add a setter called 'speedUS' which sets the current speed in mi/h (but converts it to km/h before storing the value, by multiplying the input by 1.6);
4. Create a new car and experiment with the accelerate and brake methods, and with the getter and setter.
DATA CAR 1: 'Ford' going at 120 km/h
*/
class Machine {
  get speedUS() {
    return this.speed / 1.6;
  }

  set speedUS(speed) {
    this.speed = speed * 1.6;
  }

  constructor(make, speed) {
    this.make = make;
    this.speed = speed;
  }

  accelerate() {
    this.speed += 10;
    console.log(`Speed is increasing: ${this.speed}`);
  }

  brake() {
    this.speed -= 5;
    console.log(`Speed is slowing: ${this.speed}`);
  }
}

const ford = new Machine('Ford', 120);
console.log('Speed (mi/h) of ford', ford.speedUS);
ford.speedUS = 100;
console.log('Speed (km/h) of ford', ford.speed);
ford.accelerate();
console.log('Speed (km/h) of ford', ford.speed);


// Coding Challenge #3

// 1. Use a constructor function to implement an Electric Car (called EV) as a CHILD "class" of Car.
// Besides a make and current speed, the EV also has the current battery charge in % ('charge' property);
function ElectricCar(make, speed, charge) {
  Car.call(this, make, speed);
  this.charge = charge; // from 0 to 1
}

ElectricCar.prototype = Object.create(Car.prototype);
ElectricCar.prototype.constructor = ElectricCar;

// 2. Implement a 'chargeBattery' method which takes an argument 'chargeTo' and sets the battery charge to 'chargeTo';
ElectricCar.prototype.chargeBattery = function(chargeTo) {
  this.charge = chargeTo;
};

// 3. Implement an 'accelerate' method that will increase the car's speed by 20, and decrease the charge by 1%.
// Then log a message like this: 'Tesla going at 140 km/h, with a charge of 22%';
ElectricCar.prototype.accelerate = function() {
  this.speed += 20;
  this.charge -= 0.01;
  console.log(`${this.make} going at ${this.speed} km/h, with a charge of ${this.charge * 100}%`);
}

// 4. Create an electric car object and experiment with calling 'accelerate', 'brake' and 'chargeBattery' (charge to 90%).
// Notice what happens when you 'accelerate'! polymorphism
const tesla = new ElectricCar('Tesla', 120, 0.23);
console.log(tesla)
tesla.accelerate();
tesla.chargeBattery(100);
tesla.brake();


// Coding Challenge #4

// 1. Re-create challenge #3, but this time using ES6 classes: create an 'EVCl' child class of the 'CarCl' class
// 2. Make the 'charge' property private;
// 3. Implement the ability to chain the 'accelerate' and 'chargeBattery' methods of this class,
// and also update the 'brake' method in the 'CarCl' class.
class CarCl {
  constructor(make, speed) {
    this.make = make;
    this.speed = speed;
  }
}

class EVCl extends CarCl {
  #charge; // private field

  constructor(make, speed, charge) {
    super(make, speed);
    this.#charge = charge;
  }

  // this method will attach to the prototype of EVCl's function construction
  chargeBattery(chargeTo) {
    this.#charge = chargeTo;
  }

  accelerate() {
    this.speed += 20;
    this.#charge -= 0.01;
    console.log(`${this.make} going at ${this.speed} km/h, with a charge of ${this.#charge * 100}%`);
  }
}

//   DATA CAR 1: 'Rivian' going at 120 km/h, with a charge of 23%
const rivian = new EVCl('Rivian', 120, 0.23);