'use strict';

// Adding Media queries Variables

const phoneMedia = window.matchMedia('(max-width: 37.5em)');
const tabPortMedia = window.matchMedia('(max-width: 56.25em)');
const tabLandMedia = window.matchMedia('(max-width: 75em)');
const smallLaptopMedia = window.matchMedia('(max-width: 98.5em)');
const bigDesktopMedia = window.matchMedia('(min-width: 120em)');
const tabPortBiggerMedia = window.matchMedia('(min-width: 56.25em)');
const homesMedia = window.matchMedia('(max-width: 800px)');
const homesMediaBigger = window.matchMedia('(min-width: 800px)');

const homes = document.querySelector('.homes-content');
const homeArray = document.querySelectorAll('.home');

// Adding overlay to every home

const findDetailsWidth = function (home, homes) {
  let columns = 3;
  const homePreview = home.querySelector('.home__preview');
  if (tabPortMedia.matches) columns = 2;

  const homePreviewWidth =
    Number.parseFloat(homePreview.getBoundingClientRect().width, 10) *
    (columns - 1);
  const homesGap =
    Number.parseFloat(getComputedStyle(homes).gap, 10) * (columns - 1);
  return homesGap + homePreviewWidth;
};

const previewHome = function (e) {
  if (!e.target.closest('.home-name-btn')) return;
  const home = e.target.closest('.home');
  const homeDetails = home.querySelector('.home__details');
  const homeDetailsWidth = findDetailsWidth(home, this);
  const btnIcon = home.querySelector('.home-name-btn__icon');

  homeArray.forEach((otherHome) => {
    if (otherHome !== home) {
      otherHome.style.setProperty('grid-row', 'auto');
      const homeDetails = otherHome.querySelector('.home__details');
      const btnIcon = otherHome.querySelector('.home-name-btn__icon');
      btnIcon.classList.remove('rotated');
      otherHome.classList.remove('home-active');
      homeDetails.classList.add('display-none');
    }
  });
  btnIcon.classList.toggle('rotated');
  homeDetails.style.setProperty('flex-basis', `${homeDetailsWidth}px`);
  home.classList.toggle('home-active');
  homeDetails.classList.toggle('display-none');
  home.scrollIntoView({ behavior: 'smooth', block: 'center' });
};
homes.addEventListener('click', previewHome);
