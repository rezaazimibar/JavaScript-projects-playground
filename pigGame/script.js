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
const holdBtn = document.querySelector('.btn--hold');
const newBtn = document.querySelector('.btn--new');
//default condition
score1El.textContent = 0;
score0El.textContent = 0;
diceEl.classList.add('hidden');

let scores = [0, 0];
let currentScore = 0;
let activePlayer = 0;
let playing = true;

//functions

function switching() {
  currentScore = 0;
  document.getElementById(`current--${activePlayer}`).textContent =
    currentScore;
  activePlayer = activePlayer === 0 ? 1 : 0;
  player1.classList.toggle('player--active');
  player2.classList.toggle('player--active');
}

//event handler
rolBtn.addEventListener('click', function () {
  if (playing) {
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
      // currentScore = 0;
      // document.getElementById(`current--${activePlayer}`).textContent =
      //   currentScore;
      // activePlayer = activePlayer === 0 ? 1 : 0;
      // player1.classList.toggle('player--active');
      // player2.classList.toggle('player--active');
      switching();
    }
  }
});

holdBtn.addEventListener('click', function () {
  if (playing) {
    scores[activePlayer] = scores[activePlayer] + currentScore;
    const currentMainScore = document.querySelector(`#score--${activePlayer}`);
    currentMainScore.textContent = scores[activePlayer];

    if (scores[activePlayer] >= 10) {
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add('player--winner');
      playing = false;
      diceEl.classList.add('hidden');
    } else {
      switching();
    }
  }
});

newBtn.addEventListener('click', function () {
  currentScore=0
  document
  .querySelector(`.player--${activePlayer}`)
  .classList.remove('player--winner');
 
  
  playing = true;
  
  scores=[0,0]
  score1El.textContent = scores[1];
  score0El.textContent = scores[0];
  diceEl.classList.add('hidden');
  current0.textContent=currentScore
  current1.textContent=currentScore
  if(activePlayer===1){
  player1.classList.toggle('player--active');
  player2.classList.toggle('player--active');}
  activePlayer=0

  console.log('hey');
});
