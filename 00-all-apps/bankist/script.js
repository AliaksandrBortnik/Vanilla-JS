'use strict';

// BANKIST APP

// Data
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
let isSorted = false;

const calcPrintBalance = function (account) {
  account.balance = account.movements.reduce((accum, mov) => accum += mov, 0);
  labelBalance.textContent = account.balance.toFixed(2) + '€';
}

const createUsernames = function (accounts) {
  accounts.forEach(account => { // Side effect - mutating the original value
    account.username = account.owner.toLowerCase()
      .split(' ')
      .map(word => word[0])
      .join('');
  });
}

const formatMovementDate = (date) => {
  const day = String(date.getDate()).padStart(2, '0');
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const year = date.getFullYear();
  const fullDate = `${day}/${month}/${year}`;

  const calcDaysBetween = (date1, date2) =>
    Math.trunc((Math.abs(date1 - date2)) / 1000 / 3600 / 24);

  const daysPassed = calcDaysBetween(new Date(), date);
  return daysPassed === 0 ? 'Today'
    : daysPassed === 1 ? 'Yesterday'
      : daysPassed <= 7 ? `${daysPassed} days ago`
        : fullDate;
}

const displayMovements = function (account, sort = false) {
  containerMovements.innerHTML = ''; // Clean up currently displayed items

  const movs = sort ? account.movements.slice().sort((a, b) => a - b)
    : account.movements;

  movs.forEach((mov, i) => {
    const type = mov > 0 ? 'deposit' : 'withdrawal';
    const displayDate = formatMovementDate(new Date(account.movementsDates[i]));
    const rowTemplate = `
      <div class="movements__row">
        <div class="movements__type movements__type--${type}">${i + 1} ${type}</div>
        <div class="movements__date">${displayDate}</div>
        <div class="movements__value">${mov.toFixed(2)}€</div>
      </div>
    `;

    containerMovements.insertAdjacentHTML('afterbegin', rowTemplate);

    // TODO: remove. simple test of reminder operation
    const rows = Array.from(document.querySelectorAll('.movements__row'));
    rows.forEach((element, i) => {
      element.style.backgroundColor = i % 2 === 0 ? 'yellow' : 'orange';
    });
  });
}

const calcDisplaySummary = function (account) {
  const sumIn = account.movements
    .filter(mov => mov > 0)
    .reduce((accum, mov) => accum + mov, 0);

  labelSumIn.textContent = `${sumIn.toFixed(2)}€`;

  const sumOut = account.movements
    .filter(mov => mov < 0)
    .reduce((accum, mov) => accum + mov, 0);

  labelSumOut.textContent = `${sumOut.toFixed(2)}€`;

  const sumInterest = sumIn > Math.abs(sumOut) ? sumIn - Math.abs(sumOut) : 0;
  labelSumInterest.textContent = `${(sumInterest * account.interestRate / 100).toFixed(2)}€`;
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

const updateUI = (account) => {
  displayMovements(account);
  calcPrintBalance(account);
  calcDisplaySummary(account);
}

// EVENT HANDLERS
const onLogin = (e) => {
  e.preventDefault(); // Stop submitting the form with a page reload
  const login = inputLoginUsername.value;
  const pin = Number(inputLoginPin.value);

  currentAccount = accounts.find(acc => acc.username === login && acc.pin === pin);

  if (currentAccount) {
    displayGreeting();
    updateUI(currentAccount);

    const now = new Date();
    const day = String(now.getDate()).padStart(2, '0');
    const month = String(now.getMonth() + 1).padStart(2, '0');
    const year = now.getFullYear();
    const hour = String(now.getHours()).padStart(2, '0');
    const minute = String(now.getMinutes()).padStart(2, '0');
    labelDate.textContent = `${day}/${month}/${year}, ${hour}:${minute}`;
  }
};

btnLogin.addEventListener('click', onLogin);

const enterPressed = (e) => e.key === 'Enter' && onLogin(e);
inputLoginUsername.addEventListener('keypress', enterPressed);
inputLoginPin.addEventListener('keypress', enterPressed);

btnTransfer.addEventListener('click', (e) => {
  e.preventDefault();

  const amount = Number(inputTransferAmount.value);

  if (amount <= 0) {
    alert('Amount should be positive.')
    return;
  }

  if (amount > currentAccount.balance) {
    alert('Your account must have enough money.')
    return;
  }

  const toAccount = inputTransferTo.value;

  if (toAccount === currentAccount.username) {
    alert('You cannot transfer money to yourself.')
    return;
  }

  const account = accounts.find(acc => acc.username === toAccount);

  if (!account) {
    alert(`Receive account is not found.`)
    return;
  }


  currentAccount.movements.push(-amount);
  account.movements.push(amount);

  const now = new Date().toISOString();
  currentAccount.movementsDates.push(now);
  account.movementsDates.push(now);

  updateUI(currentAccount);
  inputTransferTo.value = inputTransferAmount.value = '';
});

btnClose.addEventListener('click', (e) => {
  const username = inputCloseUsername.value;
  const pin = inputClosePin.value;

  if (currentAccount.username === username && currentAccount.pin === pin) {
    const accountIndexToRemove = accounts.findIndex(acc =>
      acc.username === username && acc.pin === pin);
    accounts.splice(accountIndexToRemove, 1);

    labelWelcome.textContent = 'Log in to get started';
    containerApp.style.opacity = 0;
    inputCloseUsername.value = inputClosePin.value = '';
  }
});

btnLoan.addEventListener('click', (e) => {
  e.preventDefault();
  const amount = Math.floor(inputLoanAmount.value);

  if (amount > 0 && currentAccount.movements.some(mov => mov >= amount * 0.1)) {
    currentAccount.movements.push(amount);
    currentAccount.movementsDates.push(new Date().toISOString());
    updateUI(currentAccount);
  }

  inputLoanAmount.value = '';
});

btnSort.addEventListener('click', (e) => {
  isSorted = !isSorted;
  displayMovements(currentAccount, isSorted);
});