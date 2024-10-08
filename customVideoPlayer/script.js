let playerArea = document.querySelector(".myplayer");
let media = playerArea.querySelector("video");
let controls = playerArea.querySelector(".myplayer__controls");

let playButton = controls.querySelector(".play");
let rewindButton = controls.querySelector(".rewind");
let forwardButton = controls.querySelector(".forward");
let volumeButton = controls.querySelector(".volume");
let fullscreenButton = controls.querySelector(".fullscreen");

//play video
playButton.addEventListener("click", function () {
  if (media.paused) {
    togglePlayButton();
    media.play();
  } else {
    togglePlayButton();
    media.pause();
  }
});

//-5 second rewind
rewindButton.addEventListener("click", function () {
  media.currentTime = media.currentTime - 5;
});

//+5 second forward
forwardButton.addEventListener("click", function () {
  media.currentTime = media.currentTime + 5;
});

//___functions___

//toggle pause and play button
function togglePlayButton() {
  let icon = playButton.querySelector("i");
  icon.classList.toggle("ion-md-pause");
  icon.classList.toggle("ion-md-play");
}
