'use strict';

let highscore = 0;
let score = 20;
let randomNumber = generateGuessNumber();
console.log(randomNumber); // Target number

const checkButton = document.querySelector('.btn.check');

const changeMessage = function(msg) {
  document.querySelector('.message').textContent = msg;
}

checkButton.addEventListener('click', (event) => {
  const value = Number(document.querySelector('.guess').value);
  console.log('Current value:', value)

  if (score === 0) {
    changeMessage('Game over');
    return;
  }

  if (!value) {
    changeMessage('⛔ Wrong Number!');
  } else if (randomNumber === value) {
    changeMessage('🎉 Correct!');
    document.querySelector('.number').textContent = value;
    score = value;

    if (score> highscore) {
      highscore = score;
      document.querySelector('.highscore').textContent = score;
    }

    document.querySelector('.score').textContent = score;
    document.body.style.backgroundColor = '#60b347';
    document.querySelector('.number').style.width = '30rem';
  } else if (randomNumber !== value) {
    updateGameState(randomNumber < value ? 'Too high!' : 'Too low!')
  }

  // Reset
  document.querySelector('.guess').value = '';
})

function updateGameState(msg) {
  if (score > 1) {
    changeMessage(msg);
    score--;
    document.querySelector('.score').textContent = score;
  } else {
    changeMessage('You lost the game');
    score = 0;
    document.querySelector('.score').textContent = score;
  }
}


function generateGuessNumber() {
  return Math.floor(Math.random() * 20) + 1;
}

function onAgainClick() {
  score = 20;
  randomNumber = generateGuessNumber();
  document.body.style.backgroundColor = '#222';

  changeMessage('Start guessing...');
  document.querySelector('.number').style.width = '15 rem';
  document.querySelector('.number').textContent = '?';
  document.querySelector('.score').textContent = score;
}

document.querySelector('.again').onclick = onAgainClick;