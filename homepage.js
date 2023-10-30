'use strict';

// Adding Media queries Variables

const phoneMedia = window.matchMedia('(max-width: 37.5em)');
const tabPortMedia = window.matchMedia('(max-width: 56.25em)');
const tabLandMedia = window.matchMedia('(max-width: 75em)');
const smallLaptopMedia = window.matchMedia('(max-width: 98.5em)');
const bigDesktopMedia = window.matchMedia('(min-width: 120em)');
const tabPortBiggerMedia = window.matchMedia('(min-width: 56.25em)');

const homes = document.querySelector('.homes-content');
const homeArray = document.querySelectorAll('.home');

// Adding overlay to every home

const findDetailsWidth = function (home, homes) {
  let columns = 3;
  const homePreview = home.querySelector('.home__preview');
  if (tabPortMedia.matches) {
    console.log('matches');
    columns = 2;
  }

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

const quoteAnimationTestimonials = document.querySelector(
  '.lottie-animation-testimonials'
);

const loadingLottie = async function (player, url, speed = 2) {
  try {
    await player.load(`${url}`);
    // player.setAttribute('background', 'red');
    console.log('Loading', player);

    // setTimeout(() => {
    player.setSpeed(speed);
    player.stop();
    player.play();
    // }, 1000);
  } catch (err) {
    console.log(err);
  }
};
loadingLottie(quoteAnimationTestimonials, quoteAnimationTestimonials.src);

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
      testimonials.forEach(
        (card, i) =>
          (card.style.transform = `translateY(${(i - slide) * 100}%)`)
      );
      loadingLottie(quoteAnimationTestimonials, quoteAnimationTestimonials.src);
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

// Adding smooth scroll from scrollIntoView
let houseRealtor;
const allBtnLinks = document.querySelectorAll('.btn');
allBtnLinks.forEach((btn) => {
  if (btn.classList.contains('home__btn')) {
    return;
  }
  btn.addEventListener('click', function (e) {
    e.preventDefault();

    const id = e.target.getAttribute('href');
    document.querySelector(id).scrollIntoView({ behavior: 'smooth' });
  });
});

const detailsContent = document.querySelector('.details__content');
const detailAll = document.querySelectorAll('.details__content__item');
detailsContent.addEventListener('click', function (e) {
  if (!e.target.closest('.details__content__item')) return;

  const detail = e.target.closest('.details__content__item');

  detailAll.forEach((detailDiff) => {
    if (detail !== detailDiff)
      detailDiff.classList.remove('details__content__item--active');
  });
  detailsContent.scrollTop = detail.clientHeight * detail.dataset.tab - '25';
  detail.classList.add('details__content__item--active');
  const player = detail.querySelector('.lottie-animation-details');
  loadingLottie(player, player.src);
  // player.stop();
  // player.play();
});
// 027BFF

// --------------------
// OBSERVING DETAILS CONTENT

const detailsContentInView = async function (entries, observer) {
  try {
    const [entry] = entries;
    if (!entry.isIntersecting) {
      console.log('is not intersecting');
      return;
    }

    const detailsItemPulsating = document.querySelector(
      `.details__content__item[data-tab="1"]`
    );
    console.log('is intersecting');
    detailsItemPulsating.style.animation = '';
    setTimeout(() => {
      detailsItemPulsating.style.animation = '1.5s linear pulsate 2';
    }, 100);
    const cursorAnimation = document.querySelector(
      '.lottie-animation-details-cursor'
    );
    loadingLottie(cursorAnimation, cursorAnimation.src, 0.65);
    observer.unobserve(detailsContent);
  } catch (err) {
    alert(err);
  }
};
const detailsContentObserverOptions = {
  root: null,
  threshold: 1.0,
};

const detailsContentObserver = new IntersectionObserver(
  detailsContentInView,
  detailsContentObserverOptions
);

detailsContentObserver.observe(detailsContent);

console.log(houseRealtor);
export default houseRealtor;
