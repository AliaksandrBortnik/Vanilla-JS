'use strict';

/* Coding challenge 1
Suppose we get data from a web service about a certain game (below).
In this challenge we're gonna work with the data.
*/

const game = {
  team1: 'Bayern Munich',
  team2: 'Borrussia Dortmund',
  players: [
    [
      'Neuer',
      'Pavard',
      'Martinez',
      'Alaba',
      'Davies',
      'Kimmich',
      'Goretzka',
      'Coman',
      'Muller',
      'Gnarby',
      'Lewandowski',
    ],
    [
      'Burki',
      'Schulz',
      'Hummels',
      'Akanji',
      'Hakimi',
      'Weigl',
      'Witsel',
      'Hazard',
      'Brandt',
      'Sancho',
      'Gotze',
    ],
  ],
  score: '4:0',
  scored: ['Lewandowski', 'Gnarby', 'Lewandowski', 'Hummels'],
  date: 'Nov 9th, 2037',
  odds: {
    team1: 1.33,
    x: 3.25,
    team2: 6.5,
  },
};

// 1. Create one player array for each team (variables 'players1' and 'players2')
const [players1, players2] = game.players;

// 2. The first player in any player array is the goalkeeper and the others are field players.
// For Bayern Munich (team 1) create one variable ('gk') with the goalkeeper's name, and one
// array ('fieldPlayers') with all the remaining 10 field players

const [gk, ...fieldPlayers] = players1;
// const gk = players1[0];
// const fieldPlayers =  players1.slice(1);

// 3. Create an array 'allPlayers' containing all players of both teams (22 players)
const allPlayers = [...players1, ...players2];

// 4. During the game, Bayern Munich (team 1) used 3 substitute players. So create a new array ('players1Final')
// containing all the original team1 players plus 'Thiago', 'Coutinho' and 'Perisic'
const players1Final = [players1, 'Thiago', 'Coutinho', 'Perisic'];

// 5. Based on the game.odds object, create one variable for each odd (called 'team1', 'draw' and 'team2')
// const team1 = game.odds.team1;
// const draw = game.odds.x;
// const team2 = game.odds.team2;
const { team1, x: draw, team2 } = game.odds;

// 6. Write a function ('printGoals') that receives an arbitrary number of player names (NOT an array)
// and prints each of them to the console, along with the number of goals that were scored in total
// (number of player names passed in)
// TEST DATA FOR 6: Use players 'Davies', 'Muller', 'Lewandowski' and 'Kimmich'. Then, call the function again with players from game.scored
const printGoals = (...players) => {
  for (const player of players) {
    const playerScore = game.scored.filter(p => p === player).length;
    console.log(`${player} has ${playerScore} scores.`);
  }
}

printGoals('Davies', 'Muller', 'Lewandowski', 'Kimmich');

// 7. The team with the lower odd is more likely to win. Print to the console which team is more likely to win,
// WITHOUT using an if/else statement or the ternary operator.
game.odds.team1 < game.odds.team2 && console.log('First team will win');
game.odds.team2 < game.odds.team1 && console.log('Second team will win');


const restaurant = {
  name: 'Classico Italiano',
  location: 'Via Angelo Tavanti 23, Firenze, Italy',
  categories: ['Italian', 'Pizzeria', 'Vegetarian', 'Organic'],
  starterMenu: ['Focaccia', 'Bruschetta', 'Garlic Bread', 'Caprese Salad'],
  mainMenu: ['Pizza', 'Pasta', 'Risotto'],

  openingHours: {
    thu: {
      open: 12,
      close: 22,
    },
    fri: {
      open: 11,
      close: 23,
    },
    sat: {
      open: 0, // Open 24 hours
      close: 24,
    },
  },
};

const { openingHours: workingHours } = restaurant; // destructuring object with property renaming

// Object.entries with destructuring in for-of
for (const [day, { open, close }] of Object.entries(workingHours)) {
  console.warn(`On ${day}, the restaurant is opened at ${open} till ${close}`);
}

// Coding Challenge #2

// 1. Loop over the game.scored array and print each player name to the console, along with the goal number
// (Example: "Goal 1: Lewandowski")
for (const [index, playerName] of Object.entries(game.scored)) {
  console.log(`Goal ${Number(index) + 1}: ${playerName}`)
}

// 2. Use a loop to calculate the average odd and log it to the console
let oddSum = 0;
const odds = Object.values(game.odds);

for (const odd of odds) {
  oddSum += odd;
}

console.log(`Average odd is ${(oddSum / odds.length).toFixed(2)}`);

// 3. Print the 3 odds to the console, but in a nice formatted way, exaclty like this:
// Odd of victory Bayern Munich: 1.33
// Odd of draw: 3.25
// Odd of victory Borrussia Dortmund: 6.5
// Get the team names directly from the game object, don't hardcode them (except for "draw").
// HINT: Note how the odds and the game objects have the same property names 😉
// BONUS: Create an object called 'scorers' which contains the names of the players who scored as properties, and the number of goals as the value. In this game, it will look like this:
// {
//   Gnarby: 1,
//     Hummels: 1,
//   Lewandowski: 2
// }
const gameOdds = Object.entries(game.odds);

console.log(`Odd of victory ${game[gameOdds[0][0]]}: ${gameOdds[0][1]}`);
console.log(`Odd of draw: ${gameOdds[1][1]}`);
console.log(`Odd of victory ${game[gameOdds[1][0]]}: ${gameOdds[1][1]}`);


// Set
const ordersSet = new Set('Heey');
ordersSet.add('z');
ordersSet.delete('H');
console.log(ordersSet)

// Map
const rest = new Map();
rest.set('name', 'Terra pizza')
  .set(1, ' Italy')
  .set('open', true);

console.log(rest)

// Coding Challenge #3
const gameEvents = new Map([
  [17, '⚽️ GOAL'],
  [36, '🔁 Substitution'],
  [47, '⚽️ GOAL'],
  [61, '🔁 Substitution'],
  [64, '🔶 Yellow card'],
  [69, '🔴 Red card'],
  [70, '🔁 Substitution'],
  [72, '🔁 Substitution'],
  [76, '⚽️ GOAL'],
  [80, '⚽️ GOAL'],
  [92, '🔶 Yellow card'],
]);

// 1. Create an array 'events' of the different game events that happened (no duplicates)
const events = [...gameEvents];
console.log(events)

// 2. After the game has finished, is was found that the yellow card from minute 64 was unfair. So remove this event from the game events log.
events.splice(events.findIndex(e => e[0] === 64), 1);
console.log(events)

// 3. Print the following string to the console: "An event happened, on average, every 9 minutes" (keep in mind that a game has 90 minutes)
const eventCount = events.length;
const eventFrequency = 90 / eventCount;
console.log(`An event happened, on average, every ${eventFrequency} minutes`);

// 4. Loop over the events and log them to the console, marking whether it's in the first half or second half (after 45 min) of the game, like this:
//   [FIRST HALF] 17: ⚽️ GOAL
for (const [time, eventType] of events) {
  console.log(`[${ time <= 45 ? 'FIRST' : 'SECOND'} HALF] ${time}: ${eventType}`);
}

// String.prototype
// .includes(), .slice(), .splice(), .startsWith(), .endsWith(), .replace(), .toLowerCase(), .toUpperCase(), .indexOf(), .lastIndexOf(), .split()
// .padStart(), .padEnd(), .repeat(), .trim(), .charAt()

const maskCredit = function (number) {
  const str = String(number);
  return str.slice(-4).padStart(str.length, '*');
}

console.log(maskCredit(1234000055558888));

// Coding Challenge #4

/*
Write a program that receives a list of variable names written in underscore_case and convert them to camelCase.
The input will come from a textarea inserted into the DOM (see code below), and conversion will happen when the button is pressed.
THIS TEST DATA (pasted to textarea)
underscore_case
 first_name
Some_Variable
  calculate_AGE
delayed_departure
SHOULD PRODUCE THIS OUTPUT (5 separate console.log outputs)
underscoreCase      ✅
firstName           ✅✅
someVariable        ✅✅✅
calculateAge        ✅✅✅✅
delayedDeparture    ✅✅✅✅✅
 */

document.body.append(document.createElement('textarea'));
document.body.append(document.createElement('button'));

document.querySelector('button').addEventListener('pointerdown', (event) => {
  const text = document.querySelector('textarea').value;
  const splittedRows = text.split('\n').map(row => row.trim());

  for (const [i, row] of splittedRows.entries()) {
    const words = row.toLowerCase().split('_');
    const outputRow = (words[0] + words[1][0].toUpperCase() + words[1].slice(1)).padEnd(20, ' ') + '✅'.repeat(i + 1);
    console.log(outputRow);
  }
});
