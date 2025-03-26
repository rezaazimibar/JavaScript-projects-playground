'use strict';

///////////////////////////////////////
// Modal window

const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.btn--close-modal');
const btnsOpenModal = document.querySelectorAll('.btn--show-modal');

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
const btnScrollTo = document.querySelector('.btn--scroll-to');
const section1 = document.querySelector('#section--1');

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
