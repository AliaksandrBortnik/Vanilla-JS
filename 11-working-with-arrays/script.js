'use strict';

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// BANKIST APP

// Data
const account1 = {
  owner: 'Jonas Schmedtmann',
  movements: [200, 450, -400, 3000, -650, -130, 70, 1300],
  interestRate: 1.2, // %
  pin: 1111,
};

const account2 = {
  owner: 'Jessica Davis',
  movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  interestRate: 1.5,
  pin: 2222,
};

const account3 = {
  owner: 'Steven Thomas Williams',
  movements: [200, -200, 340, -300, -20, 50, 400, -460],
  interestRate: 0.7,
  pin: 3333,
};

const account4 = {
  owner: 'Sarah Smith',
  movements: [430, 1000, 700, 50, 90],
  interestRate: 1,
  pin: 4444,
};

const accounts = [account1, account2, account3, account4];

// Elements
const labelWelcome = document.querySelector('.welcome');
const labelDate = document.querySelector('.date');
const labelBalance = document.querySelector('.balance__value');
const labelSumIn = document.querySelector('.summary__value--in');
const labelSumOut = document.querySelector('.summary__value--out');
const labelSumInterest = document.querySelector('.summary__value--interest');
const labelTimer = document.querySelector('.timer');

const containerApp = document.querySelector('.app');
const containerMovements = document.querySelector('.movements');

const btnLogin = document.querySelector('.login__btn');
const btnTransfer = document.querySelector('.form__btn--transfer');
const btnLoan = document.querySelector('.form__btn--loan');
const btnClose = document.querySelector('.form__btn--close');
const btnSort = document.querySelector('.btn--sort');

const inputLoginUsername = document.querySelector('.login__input--user');
const inputLoginPin = document.querySelector('.login__input--pin');
const inputTransferTo = document.querySelector('.form__input--to');
const inputTransferAmount = document.querySelector('.form__input--amount');
const inputLoanAmount = document.querySelector('.form__input--loan-amount');
const inputCloseUsername = document.querySelector('.form__input--user');
const inputClosePin = document.querySelector('.form__input--pin');

/////////////////////////////////////////////////
/////////////////////////////////////////////////

// 1. slice
const arr = ['a', 'b', 'c', 'd', 'e'];
console.log(arr.slice(1, 3));
console.log(arr.slice(-1)); // take the last one
console.log(arr.slice(1, -1)); // except first and last

const copyArray = [...arr]; // arr.slice();

// 2. splice
arr.splice(-1); // remove the last  item
console.log(arr);

// 3. reverse
console.log(arr.reverse()); // mutable

// 4. concat
const letters = ['q', 'w'];
console.log(letters.concat('a', 'd')); // [...arr1, ...arr2]

// 5. join
console.log(letters.join('+'));

// 6. at
const numbers = [23, 11, 64];
console.log(numbers.at(-1)); // arr[arr.length - 1]
console.log('AK344499_5'.at(-1));

// 7. forEach
const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];

for (const [movement, i] of movements.entries()) {
  if (movement > 0) {
    console.log(`${i + 1}: You deposited ${movement}`);
  } else {
    console.log(`${i + 1}: You withdrew ${Math.abs(movement)}`);
  }
}

console.warn('---- forEach ------'); // Not possible to break since its nature of calling a callback per each item
movements.forEach((movement, i, array) => {
  if (movement > 0) {
    console.log(`${i + 1}: You deposited ${movement}`);
  } else {
    console.log(`${i + 1}: You withdrew ${Math.abs(movement)}`);
  }
});

const currencies = new Map([
  ['USD', 'United States dollar'],
  ['EUR', 'Euro'],
  ['GBP', 'Pound sterling'],
]);

currencies.forEach((value, key, map) => {
  console.log(`${key}: ${value}`);
});

const uniqueCurrencies = new Set(['USD', 'EUR', 'USD', 'GBP']);
console.log(uniqueCurrencies);

uniqueCurrencies.forEach((value, value2, set) => {
  console.log(`${value}`); // value2 is useless, added to Set for compability with interface
});

for (const uniqueCurrency of uniqueCurrencies) {
  console.log(uniqueCurrency)
}