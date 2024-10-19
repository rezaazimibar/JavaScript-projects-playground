const hero = document.querySelector(".hero");
const txt = document.querySelector("div");
const boxSize = 500; //500px

//mouse move event
hero.addEventListener("mousemove", function (event) {
  const { offsetWidth: width, offsetHeight: height } = hero;
  let { offsetX: x, offsetY: y } = event;
  x += event.target.offsetLeft;
  y += event.target.offsetTop;
  console.log(x,y)
});
