const runningNote = document.querySelector(".nowplaying");
const allKeys = document.querySelectorAll(".key");

window.addEventListener("keydown", function (e) {
  const key = document.querySelector(`.key[data-key="${e.keyCode}"]`);

  if (!key) return;

  const keyNote = key.getAttribute("data-note");
  key.classList.add("playing");
  runningNote.innerHTML = keyNote;
});

allKeys.forEach((key) =>
  key.addEventListener("transitionend", removeTransition)
);

function removeTransition() {
  this.classList.remove("playing");
}
