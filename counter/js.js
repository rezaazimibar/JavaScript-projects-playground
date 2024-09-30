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

  //not a number

  if (isNaN(seconde) || seconde === 0) {
    inputCounter.style.borderColor = "red";
    NaNError.textContent = "please enter a correct number";
    NaNError.classList.add("active");
    sucMes.style.display = "none";
    return;
  }

  //timer starting

  inputCounter.style.borderColor = "black";
  inputCounter.value = "";
  NaNError.classList.remove("active");
  startBox.classList.remove("active");
  sucMes.style.display = "none";
  circleNum.style.display = "block";
  timerNum.textContent = seconde;
  loadMes.style.display = "block";

  //timer finished

  let timerId = setInterval(() => {
    if (seconde <= 1) {
      clearInterval(timerId);
      startBox.classList.add("active");
      sucMes.style.display = "block";
      loadMes.style.display = "none";
      circleNum.style.display = "none";
    }

    //timer counting

    seconde -= 1;
    timerNum.textContent = seconde;
  }, 100);
});
