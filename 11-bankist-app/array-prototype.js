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