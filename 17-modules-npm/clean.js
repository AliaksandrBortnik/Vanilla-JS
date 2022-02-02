'use strict';

let budget = Object.freeze([ // High-level freeze only, no deep
  { value: 250, description: 'Sold old TV 📺', user: 'jonas' },
  { value: -45, description: 'Groceries 🥑', user: 'jonas' },
  { value: 3500, description: 'Monthly salary 👩‍💻', user: 'jonas' },
  { value: 300, description: 'Freelancing 👩‍💻', user: 'jonas' },
  { value: -1100, description: 'New iPhone 📱', user: 'jonas' },
  { value: -20, description: 'Candy 🍭', user: 'matilda' },
  { value: -125, description: 'Toys 🚂', user: 'matilda' },
  { value: -1800, description: 'New Laptop 💻', user: 'jonas' },
]) ;

// Immutable
const allowedLimits = Object.freeze({
  jonas: 1500,
  matilda: 100,
});

const getUserLimit = (limits, user) => limits[user] || 0;

// Pure function (no side-effects)
const addExpense = (state, limits, value, description, user = 'jonas') => {
  const convertedUser = user.toLowerCase();
  const limit = getUserLimit(limits, convertedUser);
  return value > limit ? state :
    [...state, { value: -value, description, user: convertedUser }];
};

budget = addExpense(budget, allowedLimits, 10, 'Pizza 🍕');
// budget = addExpense(budget, allowedLimits,100, 'Going to movies 🍿', 'Matilda');
// budget = addExpense(budget, allowedLimits,200, 'Stuff', 'Jay');

const analyzeExpenses = (budget, limits) => {
  return budget.map(entry =>
    entry.value < -getUserLimit(limits, entry.user) ?
      { ...entry, flag: 'limit' } : entry);
};
budget = analyzeExpenses(budget, allowedLimits);

const getHighExpenses = (state, topLimit) => {
  return state
    .filter(entry => entry.value <= -topLimit)
    .map(exp => exp.description.slice(-2))
    .join(' / ');
};

const highestExpense = getHighExpenses(budget, 1000);
console.warn('Highest expenses:', highestExpense);