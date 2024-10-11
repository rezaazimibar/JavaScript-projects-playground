let playerArea = document.querySelector(".myplayer");
let media = playerArea.querySelector("video");
let controls = playerArea.querySelector(".myplayer__controls");

let playButton = controls.querySelector(".play");
let rewindButton = controls.querySelector(".rewind");
let forwardButton = controls.querySelector(".forward");
let volumeButton = controls.querySelector(".volume");
let fullscreenButton = controls.querySelector(".fullscreen");
let timerBar = controls.querySelector(".controls__progressbar-current");

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

//when time updating
media.addEventListener("timeupdate", function () {
  videoCurrentTime.textContent = getTime(media.currentTime); //show the current time
  let barLength = Math.floor((media.currentTime / media.duration) * 100);
  timerBar.style = `background: linear-gradient(90deg, rgba(230, 126, 34, 1) ${barLength}%, #e1e1e1 0%)`;
  timerBar.value = barLength;
});

//-5 second rewind
rewindButton.addEventListener("click", function () {
  media.currentTime = media.currentTime - 5;
});

//+5 second forward
forwardButton.addEventListener("click", function () {
  media.currentTime = media.currentTime + 5;
});

//progress bar
timerBar.addEventListener("input", function () {
  media.currentTime = (this.value / 100) * media.duration;
});

//___functions___

//toggle pause and play button
function togglePlayButton() {
  let icon = playButton.querySelector("i");
  icon.classList.toggle("ion-md-pause");
  icon.classList.toggle("ion-md-play");
  media.onended = function () {
    icon.classList.remove("ion-md-pause");
    icon.classList.add("ion-md-play");
  };
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
