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

btnRollDice.addEventListener('pointerdown', (e) => {
  if (dice.classList.contains('hidden')) {
    dice.classList.remove('hidden');
  }

  const diceScore = getRandom1To6();
  changeDice(diceScore);

  if (diceScore === 1) {
    currentScore = 0;
    changeActivePlayer();
    return;
  }

  updatePlayerCurrentScore(activePlayerNum, diceScore);
});

btnHold.addEventListener('pointerdown', (e) => {
  const totalScore = scores[activePlayerNum];
  updatePlayerTotalScore(activePlayerNum, totalScore + currentScore);

  if (totalScore + currentScore >= 100) {
    alert(`Player ${activePlayerNum + 1} has won the game!`);
    return;
  }

  currentScore = 0;
  changeActivePlayer();
});

btnNewGame.addEventListener('pointerdown', startNewGame);

function updatePlayerCurrentScore(playerNumber, diceScore) {
  currentScore += diceScore;

  if (activePlayerNum === 0) {
    player1CurrentScore.textContent = currentScore;
  } else {
    player2CurrentScore.textContent = currentScore;
  }
}

function updatePlayerTotalScore(playerNumber, totalScore) {
  scores[playerNumber] = totalScore;
  document.querySelector(`#score--${playerNumber}`).textContent = totalScore;
}

function changeDice(diceScore) {
  dice.src = `dice-${diceScore}.png`;
}

function getRandom1To6() {
  return Math.trunc(Math.random() * 6) + 1;
}

function changeActivePlayer() {
  activePlayerNum = Number(!activePlayerNum);
  player1.classList.toggle('player--active');
  player2.classList.toggle('player--active');
  player1CurrentScore.textContent = 0;
  player2CurrentScore.textContent = 0;
}

function startNewGame() {
  dice.classList.add('hidden');
  activePlayerNum = 0;

  player1.classList.add('player--active');
  player2.classList.remove('player--active');

  player1CurrentScore.textContent = 0;
  player2CurrentScore.textContent = 0;
  player1TotalScore.textContent = 0;
  player2TotalScore.textContent = 0;
}