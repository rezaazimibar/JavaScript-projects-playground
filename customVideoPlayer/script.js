let playerArea = document.querySelector(".myplayer");
let media = playerArea.querySelector("video");
let controls = playerArea.querySelector(".myplayer__controls");

let playButton = controls.querySelector(".play");
let rewindButton = controls.querySelector(".rewind");
let forwardButton = controls.querySelector(".forward");
let volumeButton = controls.querySelector(".volume");
let fullscreenButton = controls.querySelector(".fullscreen");

let timeArea = document.querySelector(".timer");
let videoCurrentTime = timeArea.querySelector(".currentTime");
let videoTime = timeArea.querySelector(".videoTime");

//play video
playButton.addEventListener("click", function () {
  videoTime.textContent = getTime(media.duration);
  if (media.paused) {
    togglePlayButton();
    media.play();
  } else {
    togglePlayButton();
    media.pause();
  }
});

media.addEventListener("timeupdate", function () {
  videoCurrentTime.textContent = getTime(media.currentTime);
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

//get the current time and show
function getTime(time) {
  let minutes = Math.floor(time / 60);
  let second = Math.floor(time - minutes * 60);

  let minuteValue;
  let secondValue;

  if (minutes < 10) {
    minuteValue = `0${minutes}`;
  } else {
    minuteValue = minutes;
  }
  if (second < 10) {
    secondValue = `0${second}`;
  } else {
    secondValue = second;
  }
  return `${minuteValue} : ${secondValue}`;
}
