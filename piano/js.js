const runningNote = document.querySelector(".nowplaying");
const allKeys = document.querySelectorAll(".key");
const hints = document.querySelectorAll(".hints");

window.addEventListener("keydown", function (e) {
  const key = document.querySelector(`.key[data-key="${e.keyCode}"]`);
  const audio = document.querySelector(`audio[data-key="${e.keyCode}"]`);

  if (!key) return;

  const keyNote = key.getAttribute("data-note");
  key.classList.add("playing");
  runningNote.innerHTML = keyNote;
  audio.currentTime = 0;
  audio.play();
});

allKeys.forEach((key) =>
  key.addEventListener("transitionend", removeTransition)
);

hints.forEach(function (elem, index) {
  elem.style = `transition-delay : ${index * 10}ms`;
  console.log(elem, index);
});
function removeTransition() {
  this.classList.remove("playing");
}
