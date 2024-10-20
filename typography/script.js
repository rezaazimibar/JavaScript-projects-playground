const hero = document.querySelector(".hero");
const txt = document.querySelector("div");
const boxSize = 500; //500px

//mouse move event
hero.addEventListener("mousemove", function (event) {
  const { offsetWidth: width, offsetHeight: height } = hero;
  let { offsetX: x, offsetY: y } = event;
  x += event.target.offsetLeft;
  y += event.target.offsetTop;

  const xWalk = Math.round((x / width) * boxSize - boxSize / 2);
  const yWalk = Math.round((y / height) * boxSize - boxSize / 2);

  txt.style.textShadow = `
  ${xWalk}px ${yWalk *-.7}px 0 rgba(238 ,82,83,0.7),
  ${xWalk * -1}px ${yWalk *.2}px 0 rgba(52 ,31 ,151 ,.7),
  ${yWalk}px ${xWalk * -1.5}px 0 rgba(243 ,104 ,224 ,.7),
  ${yWalk * -1.2}px ${xWalk}px 0 rgba(254 ,202 ,87 ,.7)
  `;
});
