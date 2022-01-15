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

// 8. map
const eurToUsd = 1.1;
const convertedMovements = movements.map(movement => movement * eurToUsd);
console.log(convertedMovements)

const movementDescriptions = movements.map((mov, i) =>
  `Movement ${i + 1}: You ${mov > 0 ? 'deposited' : 'withdrew'} ${Math.abs(mov)}`);

console.log(movementDescriptions);

// 9. filter
const deposits = movements.filter(mov => mov > 0);
console.warn('Deposits', deposits);

// 10. reduce
const balance = movements.reduce((accum, movement) => accum + movement, 0);

const highestMovement = movements.reduce((currentMax, value) =>
  value > currentMax ? value : currentMax);

console.warn(`Highest using reduce: ${highestMovement}`);

// 11. Method chaining
const totalDepositsUSD = movements
  .filter(mov => mov > 0)
  .map(mov => mov * eurToUsd)
  .reduce((sum, mov) => sum + mov, 0);

// 12. find
const firstWithdrawal = movements.find(mov => mov < 0);
const account = accounts.find(account => account.owner === 'Jess');

// 13. findIndex
const accountIndex = accounts.findIndex(account => account.username === 'js');
accounts.splice(accountIndex, 1);

// 14. some
const hasWithdrawal = movements.some(m => m < 0);

// 15. every
const isDeposit = m => m > 0;
const isOnlyDeposits = movements.every(isDeposit);

// 16. includes
console.log(movements.includes(-10000));

// 17. flat ES2019
const flatten = [[1, 2, [3, 4]], 5].flat(2); // 1 is default

// 18. flatMap ES2019
const overallBalance = accounts
  // .map(acc => acc.movements)
  // .flat()
  .flatMap(acc => acc.movements) // flat + map, 2 in 1. Note: 1 depth only
  .reduce((accum, mov) => accum + mov, 0);

// 19. sort
const sortedOwnersByName = accounts.map(acc => acc.owner).sort(); // string based sorting
const sortedAccountsByInterestRate = accounts.sort((acc1, acc2) => acc1.interestRate - acc2.interestRate);

// 20. fill new array
const arr = new Array(10); // arrayLength. 10 empty values
arr.fill('s8');

const filledArr = Array.from({ length: 10 }, (_, i) => i + 1);

const movementsUI = Array.from(
  document.querySelectorAll('.movements__value'),
  el => Number(el.textContent.replace('€', '')));


// All together
const bankDepositSum = accounts
  .flatMap(acc => acc.movements)
  .filter(mov => mov > 0)
  .reduce((accum, mov) => accum + mov, 0);

const {deposits, withdrawals} = accounts
  .flatMap(acc => acc.movements)
  .reduce((sums, cur) => {
    sums[cur > 0 ? 'deposits' : 'withdrawals'] += 1;
    return sums;
  }, {deposits: 0, withdrawals: 0});


// Coding Challenge #1
/*
Julia and Kate are doing a study on dogs. So each of them asked 5 dog owners about their dog's age, and stored the data into an array (one array for each).
For now, they are just interested in knowing whether a dog is an adult or a puppy. A dog is an adult if
it is at least 3 years old, and it's a puppy if it's less than 3 years old.
*/

// Create a function 'checkDogs', which accepts 2 arrays of dog's ages ('dogsJulia' and 'dogsKate'), and does the following things:
const checkDogs = function (dogsJulia, dogsKate) {
  // 1. Julia found out that the owners of the FIRST and the LAST TWO dogs actually have cats, not dogs! So create a shallow copy of Julia's array,
  // and remove the cat ages from that copied array (because it's a bad practice to mutate function parameters)
  const filteredDogsJulia = dogsJulia.slice(1, -2);

  // 2. Create an array with both Julia's (corrected) and Kate's data
  const allDogs = filteredDogsJulia.concat(dogsKate);

  // 3. For each remaining dog, log to the console whether it's an adult ("Dog number 1 is an adult, and is 5 years old") or a puppy ("Dog number 2 is still a puppy 🐶")
  allDogs.forEach((dog, i) => {
    if (dog >= 3) {
      console.warn(`Dog number ${i + 1} is an adult, and is ${dog} years old`);
    } else {
      console.warn(`Dog number ${i + 1} is still a puppy 🐶`);
    }
  });
};

// 4. Run the function for both test datasets
// TEST DATA 1: Julia's data [3, 5, 2, 12, 7], Kate's data [4, 1, 15, 8, 3]
// TEST DATA 2: Julia's data [9, 16, 6, 8, 3], Kate's data [10, 5, 6, 1, 4]
checkDogs([3, 5, 2, 12, 7], [4, 1, 15, 8, 3]);
checkDogs([9, 16, 6, 8, 3],[10, 5, 6, 1, 4]);


// Coding Challenge #2 and #3 (rewrite using arrow function)
// Let's go back to Julia and Kate's study about dogs. This time, they want to convert dog ages to human ages and calculate the average age of the dogs in their study.
// Create a function 'calcAverageHumanAge', which accepts an arrays of dog's ages ('ages'), and does the following things in order:

const calcAverageHumanAge = (ages) => {
  // 1. Calculate the dog age in human years using the following formula: if the dog is <= 2 years old, humanAge = 2 * dogAge.
  // If the dog is > 2 years old, humanAge = 16 + dogAge * 4.
  let humanAges = ages.map(age => age <= 2 ? age * 2 : (16 + age * 4));

  // 2. Exclude all dogs that are less than 18 human years old (which is the same as keeping dogs that are at least 18 years old)
  humanAges = humanAges.filter(age => age >= 18);

  // 3. Calculate the average human age of all adult dogs (you should already know from other challenges how we calculate averages 😉)
  return humanAges.reduce((accum, age) => accum + age, 0) / humanAges.length;
};

// 4. Run the function for both test datasets
// TEST DATA 1: [5, 2, 4, 1, 15, 8, 3]
// TEST DATA 2: [16, 6, 10, 5, 6, 1, 4]
calcAverageHumanAge([5, 2, 4, 1, 15, 8, 3]);
calcAverageHumanAge([16, 6, 10, 5, 6, 1, 4]);


// Coding Challenge #4
/*
Julia and Kate are still studying dogs, and this time they are studying if dogs are eating too much or too little.
Eating too much means the dog's current food portion is larger than the recommended portion, and eating too little is the opposite.
Eating an okay amount means the dog's current food portion is within a range 10% above and 10% below the recommended portion (see hint).
HINT 1: Use many different tools to solve these challenges, you can use the summary lecture to choose between them 😉
HINT 2: Being within a range 10% above and below the recommended portion means: current > (recommended * 0.90) && current < (recommended * 1.10). Basically, the current portion should be between 90% and 110% of the recommended portion.
TEST DATA:
const dogs = [
  { weight: 22, curFood: 250, owners: ['Alice', 'Bob'] },
  { weight: 8, curFood: 200, owners: ['Matilda'] },
  { weight: 13, curFood: 275, owners: ['Sarah', 'John'] },
  { weight: 32, curFood: 340, owners: ['Michael'] }
];
*/

// 1. Loop over the array containing dog objects, and for each dog, calculate the recommended food portion and add it to the object as a new property. Do NOT create a new array, simply loop over the array. Forumla: recommendedFood = weight ** 0.75 * 28. (The result is in grams of food, and the weight needs to be in kg)

// 2. Find Sarah's dog and log to the console whether it's eating too much or too little. HINT: Some dogs have multiple owners, so you first need to find Sarah in the owners array, and so this one is a bit tricky (on purpose) 🤓

// 3. Create an array containing all owners of dogs who eat too much ('ownersEatTooMuch') and an array with all owners of dogs who eat too little ('ownersEatTooLittle').

// 4. Log a string to the console for each array created in 3., like this: "Matilda and Alice and Bob's dogs eat too much!" and "Sarah and John and Michael's dogs eat too little!"

// 5. Log to the console whether there is any dog eating EXACTLY the amount of food that is recommended (just true or false)

// 6. Log to the console whether there is any dog eating an OKAY amount of food (just true or false)

// 7. Create an array containing the dogs that are eating an OKAY amount of food (try to reuse the condition used in 6.)

// 8. Create a shallow copy of the dogs array and sort it by recommended food portion in an ascending order (keep in mind that the portions are inside the array's objects)
