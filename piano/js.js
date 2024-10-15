const runningNote = document.querySelector(".nowplaying");

window.addEventListener("keydown", function (e) {
  const key = this.document.querySelector(`.key[data-key="${e.keyCode}"]`);
  
  if (!key) return;
  
  const keyNote = key.getAttribute("data-note");
  runningNote.innerHTML = keyNote;
});
