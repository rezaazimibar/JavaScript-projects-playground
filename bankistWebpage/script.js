'use strict';

const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.btn--close-modal');
const btnsOpenModal = document.querySelectorAll('.btn--show-modal');

const btnScrollTo = document.querySelector('.btn--scroll-to');
const section1 = document.querySelector('#section--1');

const tabs = document.querySelectorAll('.operations__tab');
const tabsContainer = document.querySelector('.operations__tab-container');
const tabsContent = document.querySelectorAll('.operations__content');

const nav = document.querySelector('.nav');
///////////////////////////////////////
// Modal window

const openModal = function (e) {
  e.preventDefault();
  modal.classList.remove('hidden');
  overlay.classList.remove('hidden');
};

const closeModal = function () {
  modal.classList.add('hidden');
  overlay.classList.add('hidden');
};

btnsOpenModal.forEach(char => char.addEventListener('click', openModal));

btnCloseModal.addEventListener('click', closeModal);
overlay.addEventListener('click', closeModal);

document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
    closeModal();
  }
});
////////////////////////////////////////////////////

btnScrollTo.addEventListener('click', function (e) {
  const s1coords = section1.getBoundingClientRect();

  // window.scrollTo({
  //   left: s1coords.left + window.pageXOffset,
  //   top: s1coords.top + window.pageYOffset,
  //   behavior: 'smooth',
  // });
  // window.scrollTo(s1coords.left + window.pageXOffset, 858)
  section1.scrollIntoView({ behavior: 'smooth' });
});

//////////////////////////////////////
//page navigation

// document.querySelectorAll('.nav__link').forEach(el => {
//   el.addEventListener('click', function (e) {
//     e.preventDefault()
//     const id = this.getAttribute('href');
//     document.querySelector(id).scrollIntoView({behavior: 'smooth'})

//   });
// });

document.querySelector('.nav__links').addEventListener('click', function (e) {
  e.preventDefault();
  if (e.target.classList.contains('nav__link')) {
    const id = e.target.getAttribute('href');
    document.querySelector(id).scrollIntoView({ behavior: 'smooth' });
  }
});

// -----Tabbed component-----

tabsContainer.addEventListener('click', function (e) {
  const clicked = e.target.closest('.operations__tab');
  if (!clicked) return;

  tabs.forEach(r => r.classList.remove('operations__tab--active'));
  clicked.classList.add('operations__tab--active');

  //activate context
  tabsContent.forEach(r => r.classList.remove('operations__content--active'));
  document
    .querySelector(`.operations__content--${clicked.dataset.tab}`)
    .classList.add('operations__content--active');
});

// -----menu fade animation-----
const handleHover = function (e) {
  if (e.target.classList.contains('nav__link')) {
    const link = e.target;
    const siblings = link.closest('.nav').querySelectorAll('.nav__link');
    const logo = link.closest('nav').querySelector('img');

    siblings.forEach(el => {
      if (el !== link) el.style.opacity = this;
    });
    logo.style.opacity = this;
  }
};

nav.addEventListener('mouseover', handleHover.bind(0.5));
nav.addEventListener('mouseout', handleHover.bind(1));

//-----Sticky-navigation-----
// const initialCoords = section1.getBoundingClientRect();

// window.addEventListener('scroll', function () {
//   if (window.scrollY > initialCoords.top) {
//     nav.classList.add('sticky');
//   } else nav.classList.remove('sticky');
// });

// const obsCallback = function (entries, observer) {
//   entries.forEach(entry => {
//     console.log(entry);
//   });
// };

// const obsOptions = {
//   root: null,
//   threshold: 0.1,
// };

// const observer = new IntersectionObserver(obsCallback, obsOptions);
// observer.observe(section1);

const header = document.querySelector('.header');
const navHeight = nav.getBoundingClientRect().height

const stickyNav = function(entries){
  const[entry] = entries;
  console.log(entry)
  if (!entry.isIntersecting) nav.classList.add('sticky')
  else nav.classList.remove('sticky')
}


const headerObserver = new IntersectionObserver(stickyNav, {
  root: null,
  threshold: 0,
  rootMargin: `-${navHeight}px`
});
headerObserver.observe(header)

///////////////////////////////////////////////////
///////////////////////////////////////////////////
///////////////////////////////////////////////////
//section_1

// const message = document.createElement('div');
// message.classList.add('cookie-message');
// message.innerHTML =
//   'we are not happy we are miserable <button class="btn btn--close-cookie">Do it !</button>';

// const header = document.querySelector('.header');
// header.append(message);
// header.prepend(message);

// console.log(getComputedStyle(message).boxSizing);
// console.log(getComputedStyle(message).height);

// message.style.height =
//   Number.parseFloat(getComputedStyle(message).height) + 40 + 'px';

// console.log(document.documentElement);

// const logo = document.querySelector('.nav__logo');
// console.log(logo.alt)

// console.log(logo.getAttribute('alt'))
// logo.setAttribute('company', 'here it is')
// console.log(logo.classList)

// const say_hello = function () {
//   console.log('hello');
//   h1.removeEventListener('mousemove', say_hello);
// };

// const h1 = document.querySelector('h1');
// const header = document.querySelector('.header__title');
// header.addEventListener('click', function () {
//   console.log(this);
// });
// h1.addEventListener('mouseenter', function () {
//   console.log(this);
// });
// h1.addEventListener('mousemove', say_hello)

// rgb(255,255,255)

// const random_num = (min, max) =>
//   Math.floor(Math.random() * (max - min + 1) + min);

// const random_color = () =>
//   `rgb(${random_num(0, 255)},${random_num(0, 255)},${random_num(0, 255)})`;

// document.querySelector('.nav__link').addEventListener("click", function(e){
//   this.style.backgroundColor = random_color()
//   console.log('nav link', e.target)
// })

// document.querySelector('.nav__links').addEventListener("click", function(e){
//   this.style.backgroundColor = random_color()
//   console.log('nav links', e.target)
//   e.stopPropagation()
// })

// document.querySelector('.nav').addEventListener("click", function(e){
//   this.style.backgroundColor = random_color()
//   console.log('nav', e.target)
// })

// const h1 = document.querySelector('h1')
// console.log(h1.childNodes)
// console.log(h1.children)

// console.log(h1.parentNode)
// console.log(h1.closest('.header'))

// console.log(h1.nextElementSibling)
// console.log(h1.parentElement.children)
