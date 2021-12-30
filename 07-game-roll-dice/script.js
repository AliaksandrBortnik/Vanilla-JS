'use strict';

const dice = document.querySelector('.dice');

const btnNewGame = document.querySelector('.btn--new');
const btnRollDice = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');

const player1 = document.querySelector('.player--0');
const player2 = document.querySelector('.player--1');

const player1TotalScore = document.querySelector(`#score--0`);
const player1CurrentScore = document.querySelector(`#current--0`);
const player2TotalScore = document.querySelector(`#score--1`);
const player2CurrentScore = document.querySelector(`#current--1`);

let activePlayerNum = 0;
let currentScore = 0;
const scores = [0, 0];

let isGameInProgress = true;

btnRollDice.addEventListener('pointerdown', (e) => {
  if (isGameInProgress) {
    dice.classList.remove('hidden'); // At the beginning of the game, dice is hidden
    const diceScore = getRandom1To6();
    changeDice(diceScore);

    if (diceScore !== 1) {
      updatePlayerCurrentScore(diceScore);
    } else {
      currentScore = 0;
      changeActivePlayer();
    }
  }
});

btnHold.addEventListener('pointerdown', (e) => {
  if (isGameInProgress) {
    if (scores[activePlayerNum] + currentScore < 100) {
      updatePlayerTotalScore();
      changeActivePlayer();
    } else {
      finishGame();
    }
  }
});

btnNewGame.addEventListener('pointerdown', startNewGame);

function updatePlayerCurrentScore(diceScore) {
  currentScore += diceScore;
  document.querySelector(`#current--${activePlayerNum}`).textContent = currentScore;
}

function updatePlayerTotalScore() {
  scores[activePlayerNum] += currentScore;
  document.querySelector(`#score--${activePlayerNum}`).textContent = scores[activePlayerNum];
}

function changeDice(diceScore) {
  dice.src = `dice-${diceScore}.png`;
}

function getRandom1To6() {
  return Math.trunc(Math.random() * 6) + 1;
}

function changeActivePlayer() {
  currentScore = 0;
  player1.classList.toggle('player--active');
  player2.classList.toggle('player--active');
  document.querySelector(`#current--${activePlayerNum}`).textContent = 0;
  activePlayerNum = Number(!activePlayerNum);
}

function startNewGame() {
  isGameInProgress = true;
  dice.classList.add('hidden');
  activePlayerNum = 0;

  player1.classList.add('player--active');
  player1.classList.remove('player--winner');
  player2.classList.remove('player--active', 'player--winner');

  player1CurrentScore.textContent = 0;
  player2CurrentScore.textContent = 0;
  player1TotalScore.textContent = 0;
  player2TotalScore.textContent = 0;
}

function finishGame() {
  document.querySelector(`.player--${activePlayerNum}`).classList.add('player--winner');
  document.querySelector(`.player--${activePlayerNum}`).classList.remove('player--active');
  dice.classList.add('hidden');
  isGameInProgress = false;
}