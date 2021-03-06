'use strict';

// DIFFERENT DATA! Contains movement dates, currency and locale

const account1 = {
  owner: 'Jonas Schmedtmann',
  movements: [200, 455.23, -306.5, 25000, -642.21, -133.9, 79.97, 1300],
  interestRate: 1.2, // %
  pin: 1111,

  movementsDates: [
    '2019-11-18T21:31:17.178Z',
    '2019-12-23T07:42:02.383Z',
    '2020-01-28T09:15:04.904Z',
    '2020-04-01T10:17:24.185Z',
    '2020-05-08T14:11:59.604Z',
    '2020-05-27T17:01:17.194Z',
    '2020-07-11T23:36:17.929Z',
    '2020-07-12T10:51:36.790Z',
  ],
  currency: 'EUR',
  locale: 'pt-PT', // de-DE
};

const account2 = {
  owner: 'Jessica Davis',
  movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  interestRate: 1.5,
  pin: 2222,

  movementsDates: [
    '2019-11-01T13:15:33.035Z',
    '2019-11-30T09:48:16.867Z',
    '2019-12-25T06:04:23.907Z',
    '2020-01-25T14:18:46.235Z',
    '2020-02-05T16:33:06.386Z',
    '2020-04-10T14:43:26.374Z',
    '2020-06-25T18:49:59.371Z',
    '2020-07-26T12:01:20.894Z',
  ],
  currency: 'USD',
  locale: 'en-US',
};

const accounts = [account1, account2];

// 1. Number API

/// Refresh knowledge
console.log(23 === 23.0); // false
console.log(0.1 + 0.2); // 3.0000000000004
console.log(0.1 + 0.2 === 0.3); // false

// Conversion
console.log(Number('55'));
console.log(+'77');

// Parsing
console.log(Number.parseInt('5.25'));
console.log(Number.parseFloat('5.25'));

console.log(Number.parseInt('10px'));
console.log(Number.parseFloat('10px'));

console.log(Number.parseFloat('  1.15rem  '));
console.log(Number.parseInt('1000', 2));

// Not a Number - NaN
console.log(Number.isNaN(20));
console.log(Number.isNaN(23 / 0));
console.log(Number.isNaN(+'e123')); // true

// Check if a value is number except infinity
console.log(Number.isFinite(10.5)); // true
console.log(Number.isFinite('17')); // false

// Check if a value is integer
console.log(Number.isInteger(10.5)); // false
console.log(Number.isInteger(10)); // true


// 2. Math
console.log(Math.sqrt(25));
console.log(25 ** (1 / 2));
console.log(27 ** (1 / 3));
console.log(Math.max(1, 5, 8, 2, 77));
console.log(Math.max(1, 5, 8, 2, '77')); // Doesn't parse, but convert to number
console.log(Math.PI);
console.log(Math.PI * Number.parseFloat('5px') ** 2);

const randomInt = (min, max) => Math.floor(Math.random() * (max - min) + 1) + min;
console.log(randomInt(2, 5));

// Math.round, Math.ceil, Math.trunc, Math.floor

// 3. Remainder
console.log(7 % 2, 7 / 2);

// 4. Numeric separator for huge number
console.log(2_123_456_000_000);

// 5. BigInt - ES2020
console.log(2 ** 53 - 1); // max safe value for number
console.log(Number.MAX_SAFE_INTEGER);
// if value is higher, precision might be lost

// Use n or BigInt
console.log(1235000000053455000005555500555n); // n - postfix to make a value as BigInt
console.log(BigInt(7777333444));

const huge = 12222333333444555555888888888889999999n;
const multiplier = 5;
console.log(huge * BigInt(multiplier)); // explicit convertion is required, otherwise error of type mixing

console.log(15n > 5); // true
console.log(15n == 15); // true
console.log(typeof 15n); // "bigint"
console.log(10n / 3n); // 3, not like 3.33333333335

// 6. Date (+ time)
const now = new Date();
console.log(now);

console.log(new Date('12-05-2025'));
console.log(new Date('Wed Jan 19 2022'));

console.log(new Date(account1.movementsDates[0])); // New date based on serialized string
console.log(new Date(2035, 13, 12, 1, 1,1, 1)); // JS auto-fixes dates
console.log(new Date(0)); // 01-01-1970

const date = new Date(2025, 0, 15);
console.log(date.getFullYear());
console.log(date.getMonth());
console.log(date.getDate());
console.log(date.getDay());
console.log(date.getHours());
console.log(date.toISOString()); // serialize

date.setFullYear(2111);
console.log(date);

console.log(typeof now); // object
console.log(Date.now());

const plannedDate = new Date(2030, 1, 1);
console.log(Number(plannedDate));

const calcDaysBetween = (date1, date2) =>
  Math.trunc((Math.abs(date1 - date2)) / 1000 / 3600 / 24);

console.warn('Days between: ' + calcDaysBetween(new Date(2022,1, 4), new Date(2022, 1, 25)));

// 7. Intl (i18n, l10n)
const localizedDateNow = new Date();
const options = {
  year: 'numeric',
  month: '2-digit',
  day: '2-digit',
  hour: 'numeric',
  minute: 'numeric',
  weekday: 'long'
};
const locale = navigator.language;
console.log(new Intl.DateTimeFormat(locale, options).format(localizedDateNow));

const numOptions = {
  style: 'unit',
  unit: 'mile-per-hour' // celsius
}

const num = 4888999.12;
console.log(new Intl.NumberFormat(locale).format(num));

console.log('Browser: ' + new Intl.NumberFormat(navigator.language, numOptions).format(num));
console.log('Germany: ' + new Intl.NumberFormat('de-DE', numOptions).format(num));
console.log('US: ' + new Intl.NumberFormat('en-US', numOptions).format(num));
console.log('UK: ' + new Intl.NumberFormat('en-GB', numOptions).format(num));

const currencyOptions = {
  style: 'currency',
  currency: 'EUR'
};

console.log(new Intl.NumberFormat(navigator.language, currencyOptions).format(100.55))

// 8. Timers: setTimeout / setInterval
const taskParams = ['Print', 'High']

const timeoutId = setTimeout((taskName, priority) => {
  console.warn(`Received [${taskName}] with priority=${priority} in 3 seconds`);
}, 3000, ...taskParams);


const [taskName, priority] = taskParams;

if (taskName === 'Print') {
  clearTimeout(timeoutId);
}

// Same stuff for setInterval / clearInterval