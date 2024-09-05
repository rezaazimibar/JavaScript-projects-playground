'use strict';

const modal = document.querySelector('.modal');
const show_modal = document.querySelectorAll('.show-modal');
const close_modal = document.querySelector('.close-modal');
const overlay = document.querySelector('.overlay');

function show_modal_func() {
  overlay.classList.remove('hidden');
  modal.classList.remove('hidden');
}
function close_modal_func() {
  overlay.classList.add('hidden');
  modal.classList.add('hidden');
}
//show modal in each button
for (let i = 0; i < show_modal.length; i++) {
  show_modal[i].addEventListener('click', show_modal_func);
}

//close modal with different event
close_modal.addEventListener('click', close_modal_func);
overlay.addEventListener('click', close_modal_func);

//close modal with key press
document.addEventListener('keydown', function (event) {
  if (event.key === 'Escape' && !modal.classList.contains('hidden')) {
    close_modal_func();
  }
});
