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