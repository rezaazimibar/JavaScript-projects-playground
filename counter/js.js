//selecting
let startBox=document.querySelector('.start-box')
let inputCounter = startBox.querySelector("#input-counter");
let startButton = startBox.querySelector("#start-counter");
let NaNError = document.querySelector("#error-message");
let circleNum = document.querySelector(".c100");

startButton.addEventListener("click", function (e) {
  let seconde = Number(inputCounter.value);
  if (isNaN(seconde) || seconde === 0) {
    inputCounter.style.borderColor = "red";
    NaNError.textContent = "please enter a correct number";
    NaNError.classList.add("active");
    return;
  }
  inputCounter.style.borderColor = "black";
  NaNError.classList.remove("active");
  startBox.classList.remove('active')
  circleNum.style.display = "block";
});
