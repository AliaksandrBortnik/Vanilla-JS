'use strict';

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

let currentAccount;

const calcPrintBalance = function (movements) {
  const balance = movements.reduce((accum, mov) => accum += mov, 0);
  labelBalance.textContent = balance + '€';
}

const createUsernames = function (accounts) {
  accounts.forEach(account => { // Side effect - mutating the original value
    account.username = account.owner.toLowerCase()
      .split(' ')
      .map(word => word[0])
      .join('');
  });
}

const displayMovements = function (movements) {
  containerMovements.innerHTML = ''; // Clean up currently displayed items

  movements.forEach((mov, i) => {
    const type = mov > 0 ? 'deposit' : 'withdrawal';

    // TODO: add date in template
    const rowTemplate = `
      <div class="movements__row">
        <div class="movements__type movements__type--${type}">${i + 1} ${type}</div>
        <div class="movements__date">3 days ago</div>
        <div class="movements__value">${mov}€</div>
      </div>
    `;

    containerMovements.insertAdjacentHTML('afterbegin', rowTemplate);
  });
}

const calcDisplaySummary = function (account) {
  const sumIn = account.movements
    .filter(mov => mov > 0)
    .reduce((accum, mov) => accum + mov, 0);

  labelSumIn.textContent = `${sumIn}€`;

  const sumOut = account.movements
    .filter(mov => mov < 0)
    .reduce((accum, mov) => accum + mov, 0);

  labelSumOut.textContent = `${sumOut}€`;

  const sumInterest = sumIn > Math.abs(sumOut) ? sumIn - Math.abs(sumOut) : 0;
  labelSumInterest.textContent = `${sumInterest * account.interestRate / 100}€`;
};

createUsernames(accounts);

const resetLogin = () => {
  inputLoginPin.value = '';
  inputLoginUsername.value = '';
  inputLoginPin.blur();
  inputLoginUsername.blur();
}

const displayGreeting = () => {
  labelWelcome.textContent = `Welcome back, ${currentAccount.owner.split(' ')[0]}`;
  containerApp.style.opacity = 1;
  resetLogin();
};

// EVENT HANDLERS
const onLogin = (e) => {
  e.preventDefault(); // Stop submitting the form with a page reload
  const login = inputLoginUsername.value;
  const pin = Number(inputLoginPin.value);

  currentAccount = accounts.find(acc => acc.username === login && acc.pin === pin);

  if (currentAccount) {
    displayGreeting();
    displayMovements(currentAccount.movements);
    calcPrintBalance(currentAccount.movements);
    calcDisplaySummary(currentAccount);
  }
}

btnLogin.addEventListener('click', onLogin);

const enterPressed = (e) => e.key === 'Enter' && onLogin(e);
inputLoginUsername.addEventListener('keypress', enterPressed);
inputLoginPin.addEventListener('keypress', enterPressed);