//selecting
let startBox = document.querySelector(".start-box");
let inputCounter = startBox.querySelector("#input-counter");
let startButton = startBox.querySelector("#start-counter");
let NaNError = document.querySelector("#error-message");
let circleNum = document.querySelector(".c100");
let timerNum = document.querySelector(".c100 > span");
let sucMes = document.querySelector(".success");
let loadMes = document.querySelector(".loading");
let lastPercent;
let originalSecond, seconde, timerId;

startButton.addEventListener("click", function (e) {
  seconde = Number(inputCounter.value);

  //if input is not a number

  if (isNaN(seconde) || seconde === 0)
    return toggleErrorMessage({
      show: true,
      message: "please enter a correct number",
    });

  //timer started
  lastPercent = "p100";
  toggleErrorMessage({ show: false });
  toggleStartBox({ show: false });
  toggleLoadingMessage({ show: true });
  toggleCircle({ show: true, seconde });

  //timer finished

  originalSecond = seconde;

  //timer running

  timerId = setInterval(startTimer, 1000);
});

function toggleErrorMessage({ show, message }) {
  if (show) {
    inputCounter.style.borderColor = "red";
    NaNError.textContent = message;
    NaNError.classList.add("active");
    sucMes.style.display = "none";
  } else {
    inputCounter.style.borderColor = "black";
    NaNError.classList.remove("active");
  }
}

let toggleStartBox = ({ show }) => {
  if (show) {
    startBox.classList.add("active");
  } else {
    startBox.classList.remove("active");
    inputCounter.value = "";
  }
};

let toggleLoadingMessage = ({ show }) => {
  if (show) {
    loadMes.style.display = "block";
    sucMes.style.display = "none";
  } else {
    sucMes.style.display = "block";
    loadMes.style.display = "none";
  }
};

let toggleCircle = ({ show, seconde }) => {
  if (show) {
    circleNum.style.display = "block";
    timerNum.textContent = seconde;
  } else {
    circleNum.style.display = "none";
  }
};

let startTimer = () => {
  if (lastPercent) circleNum.classList.remove(lastPercent);
  if (seconde <= 0) {
    circleNum.classList.add("p100");
    clearInterval(timerId);
    toggleStartBox({ show: true });
    toggleLoadingMessage({ show: false });
    toggleCircle({ show: false });
    return;
  }

  //timer counting

  seconde -= 1;
  timerNum.textContent = seconde;
  let percent = (lastPercent = `p${Math.abs(
    Math.floor(((originalSecond - seconde) * 100) / originalSecond) - 100
  )}`);
  circleNum.classList.add(percent);
};
