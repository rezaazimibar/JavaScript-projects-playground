//selecting
let startBox = document.querySelector(".start-box");
let inputCounter = startBox.querySelector("#input-counter");
let startButton = startBox.querySelector("#start-counter");
let NaNError = document.querySelector("#error-message");
let circleNum = document.querySelector(".c100");
let timerNum = document.querySelector(".c100 > span");
let sucMes = document.querySelector(".success");
let loadMes = document.querySelector(".loading");

startButton.addEventListener("click", function (e) {
  let seconde = Number(inputCounter.value);

  //if input is not a number

  if (isNaN(seconde) || seconde === 0) {
    inputCounter.style.borderColor = "red";
    NaNError.textContent = "please enter a correct number";
    NaNError.classList.add("active");
    sucMes.style.display = "none";
    return;
  }

  //timer started

  inputCounter.style.borderColor = "black";
  inputCounter.value = "";
  NaNError.classList.remove("active");
  startBox.classList.remove("active");
  sucMes.style.display = "none";
  circleNum.style.display = "block";
  timerNum.textContent = seconde;
  loadMes.style.display = "block";

  //timer finished

  let originalSecond = seconde;
  let lastPercent = "p100";

  //timer running

  let timerId = setInterval(() => {
    if (lastPercent) circleNum.classList.remove(lastPercent);
    if (seconde <= 0) {
      circleNum.classList.add('p100')
      clearInterval(timerId);
      startBox.classList.add("active");
      sucMes.style.display = "block";
      loadMes.style.display = "none";
      circleNum.style.display = "none";
      return;
    }
    
    //timer counting

    seconde -= 1;
    let percent = Math.abs(
      Math.floor(( (originalSecond - seconde) * 100) / originalSecond)-100
    );
    lastPercent = `p${percent}`;
    circleNum.classList.add(`p${percent}`);

    timerNum.textContent = seconde;
  }, 1000);
});
