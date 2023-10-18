'use strict';

// Adding overlay to every home
const homesContent = document.querySelector('.homes-content');
const previewHome = function (e) {
  if (!e.target.closest('.home-name-btn')) return;
  const home = e.target.closest('.home');
  home.classList.toggle('home-active');
};
homesContent.addEventListener('click', previewHome);
