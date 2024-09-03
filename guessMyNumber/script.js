'use strict';

// console.log(document.querySelector('.message').textContent)

// document.querySelector('.message').textContent="🎉you were right"

// document.querySelector('.score').textContent=55
// document.querySelector('.number').textContent=42
// console.log(document.querySelector('.guess').value)
// document.querySelector('.guess').value=34
// console.log(document.querySelector('.guess').value)

//________________________________________event_handling___________________________________________
let random_num = Math.trunc(Math.random() * 20) + 1;
let score = 5;
let hightScore = 0;
document.querySelector('.check').addEventListener('click', function () {
  let number = document.querySelector('.number');
  let input = Number(document.querySelector('.guess').value);
  let message = document.querySelector('.message');
  console.log(random_num);
  // let score = Number(document.querySelector('.score').textContent);
  //when there is no number
  if (!input) {
    message.textContent = `🚫please enter a number`;
  }
  //when player win
  else if (input === random_num) {
    message.textContent = `🎉your number is correct`;
    document.querySelector('body').style.backgroundColor = '#60b347';
    document.querySelector('.number').style.width = '30rem';
    document.querySelector('.number').textContent = random_num;
    if (hightScore < score) {
      hightScore = score;
      document.querySelector('.highscore').textContent = hightScore;
    }
    document.querySelector('.check').style.display = 'none';
    document.querySelector('.guess').readOnly = 'true';
  }
  //when the number is high
  else if (input > random_num) {
    score--;
    if (score >= 1) {
      document.querySelector('.score').textContent = score;
      message.textContent = '📈too high';
    } else {
      message.textContent = '🔥you lost';
      document.querySelector('.score').textContent = 0;
      document.querySelector('.number').textContent = random_num;
      document.querySelector('.check').style.display = 'none';
      document.querySelector('body').style.backgroundColor = '#BF3C39';
      document.querySelector('.guess').readOnly = 'true';
    }
  }
  //when the number is low
  else if (input < random_num) {
    score--;
    if (score >= 1) {
      document.querySelector('.score').textContent = score;
      message.textContent = '📉too low';
    } else {
      message.textContent = '🔥you lost';
      document.querySelector('.score').textContent = 0;
      document.querySelector('.number').textContent = random_num;
      document.querySelector('.check').style.display = 'none';
      document.querySelector('body').style.backgroundColor = '#BF3C39';
      document.querySelector('.guess').readOnly = 'true';
    }
  }
});

document.querySelector('.again').addEventListener('click', function () {
  score = 5;
  random_num = Math.trunc(Math.random() * 20) + 1;
  document.querySelector('.score').textContent = score;
  document.querySelector('body').style.backgroundColor = '#222';
  document.querySelector('.number').style.width = '15rem';
  document.querySelector('.number').textContent = '?';
  document.querySelector('.guess').value = '';
  document.querySelector('.message').textContent = 'Start guessing...';
  document.querySelector('.check').style.display = 'block'; //able button
  document.querySelector('.guess').readOnly = false; //able input
});
