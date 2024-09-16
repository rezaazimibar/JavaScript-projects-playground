'use strict';

//selecting elements
const score0El = document.querySelector('#score--0');
const score1El = document.getElementById('score--1');
const current0 = document.getElementById('current--0');
const current1 = document.getElementById('current--1');
const player1 = document.querySelector('.player--0');
const player2 = document.querySelector('.player--1');
const diceEl = document.querySelector('.dice');
const rolBtn = document.querySelector('.btn--roll');
//default condition
score1El.textContent = 0;
score0El.textContent = 0;
diceEl.classList.add('hidden');

const scores = [0, 0];
let currentScore = 0;
let activePlayer = 0;
//event handler
rolBtn.addEventListener('click', function () {
  //generate random number
  const ranNum = Math.trunc(Math.random() * 6) + 1;
  //display dice
  diceEl.classList.remove('hidden');
  diceEl.src = `assets/dice-${ranNum}.png`;
  console.log(ranNum);
  //check roll
  if (ranNum !== 1) {
    currentScore += ranNum;
    document.getElementById(`current--${activePlayer}`).textContent =
      currentScore;
  } else {
    //switch
    currentScore = 0;
    document.getElementById(`current--${activePlayer}`).textContent =
      currentScore;
    activePlayer = activePlayer === 0 ? 1 : 0;
    // if (activePlayer === 0) {
    //   activePlayer = 1;
    //   player1.classList.remove('player--active');
    //   player2.classList.add('player--active');
    // } else {
    //   activePlayer = 0;
    //   player1.classList.add('player--active');
    //   player2.classList.remove('player--active');
    // }
    player1.classList.toggle('player--active');
    player2.classList.toggle('player--active');
  }
});
