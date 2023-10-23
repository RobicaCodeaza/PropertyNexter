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

// -------------------------------------------------------

const player = document.querySelector('lottie-player');

const loadingLottie = async function () {
  try {
    await player.load(
      'https://lottie.host/2c24727f-c0fd-4acd-8d88-3097b9f9a392/zahwGLHCtC.json'
    );
    // player.setAttribute('background', 'red');
    // setTimeout(() => {
    player.setSpeed(2);
    player.play();
    // }, 1000);
  } catch (err) {
    console.log(err);
  }
};
loadingLottie();
const sliders = async function () {
  try {
    const testimonials = document.querySelectorAll('.testimonial');
    const dotsContainer = document.querySelector('.dots');
    let currentSlide = 0;
    let maxSlide = testimonials.length - 1;
    const btnPreviousTestimonial = document.querySelector(
      '.testimonials-box__sidebar__btn--previous'
    );
    const btnNextTestimonial = document.querySelector(
      '.testimonials-box__sidebar__btn--next'
    );

    const createDots = function () {
      testimonials.forEach((_, i) => {
        const dot = `<button class="dots__dot" data-slide="${i}"></button>`;
        dotsContainer.insertAdjacentHTML('beforeend', dot);
      });
    };

    const activateDot = function (slide) {
      const dots = document.querySelectorAll('.dots__dot');
      dots.forEach((dot) => dot.classList.remove('dots__dot--active'));
      const currentDot = document.querySelector(
        `.dots__dot[data-slide ="${slide}" ]`
      );
      currentDot.classList.add('dots__dot--active');
    };

    const goToSlide = async function (slide) {
      try {
        testimonials.forEach(
          (card, i) =>
            (card.style.transform = `translateY(${(i - slide) * 100}%)`)
        );
        player.stop();
        player.play();
      } catch (err) {
        throw err;
      }
    };

    const nextSlide = function () {
      console.log(currentSlide, maxSlide);
      if (currentSlide === maxSlide) {
        console.log('entered');
        currentSlide = 0;
      } else currentSlide++;
      console.log(currentSlide, maxSlide);
      goToSlide(currentSlide);
      activateDot(currentSlide);
    };

    const previousSlide = function () {
      if (currentSlide === 0) currentSlide = maxSlide;
      else currentSlide--;
      goToSlide(currentSlide);
      activateDot(currentSlide);
    };

    const init = function () {
      goToSlide(0);
      createDots();
      activateDot(0);
    };
    init();

    btnNextTestimonial.addEventListener('click', nextSlide);
    btnPreviousTestimonial.addEventListener('click', previousSlide);
    dotsContainer.addEventListener('click', function (e) {
      if (e.target.classList.contains('dots__dot')) {
        const { slide } = e.target.dataset;
        currentSlide = slide;
        goToSlide(currentSlide);
        activateDot(currentSlide);
      }
    });
  } catch (err) {
    console.log(err);
  }
};

sliders();
