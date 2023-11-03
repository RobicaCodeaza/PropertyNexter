'use strict';

//-------------- Adding Media queries Variables --------------

const phoneMedia = window.matchMedia('(max-width: 37.5em)');
const tabPortMedia = window.matchMedia('(max-width: 56.25em)');
const tabLandMedia = window.matchMedia('(max-width: 75em)');
const smallLaptopMedia = window.matchMedia('(max-width: 98.5em)');
const bigDesktopMedia = window.matchMedia('(min-width: 120em)');
const tabPortBiggerMedia = window.matchMedia('(min-width: 56.25em)');
const homes = document.querySelector('.homes-content');
const homeArray = document.querySelectorAll('.home');

// -------------- Implementing navigation --------------

const navigation = document.querySelector('.navigation');
const navBar = document.querySelector('.navigation__nav');
const navList = document.querySelector('.navigation__list');
const navBtn = document.querySelector('.navigation-btn');
const iconClose = document.querySelector('.icon-close');
const iconOpen = document.querySelector('.icon-open');
const openNavBar = function (e) {
  if (!e.target.closest('.navigation-btn')) return;
  if (phoneMedia.matches) {
    navBar.classList.add('navigation__nav--active');
  } else {
    navigation.classList.add('navigation--active');
  }

  iconClose.classList.remove('display-none');
  iconOpen.classList.add('display-none');
  navBar.classList.add('navigation__nav--active');
  navList.classList.add('navigation__list--active');
};
const closeNavBar = function (e) {
  if (!e.target.closest('.navigation-btn') && this === false) return;
  if (phoneMedia.matches) {
    navBar.classList.remove('navigation__nav--active');
  } else {
    navigation.classList.remove('navigation--active');
  }
  iconClose.classList.add('display-none');
  iconOpen.classList.remove('display-none');
  navBar.classList.remove('navigation__nav--active');
  navList.classList.remove('navigation__list--active');
};
iconOpen.addEventListener('click', openNavBar);
iconClose.addEventListener('click', closeNavBar.bind(false));

// - Making it sticky
const navHeight = navigation.getBoundingClientRect().height;
const header = document.querySelector('.header');
const stickyNav = function (entries) {
  const [entry] = entries;
  if (entry.isIntersecting === false)
    navigation.classList.add('navigation--sticky');
  else navigation.classList.remove('navigation--sticky');
};

const headerObserver = new IntersectionObserver(stickyNav, {
  root: null,
  threshold: 0,
  rootMargin: `${-navHeight}px`,
});
headerObserver.observe(header);

// -------------- Adding smooth scroll from scrollIntoView --------------

let houseRealtor;
const allBtnLinks = document.querySelectorAll('.btn--smooth');
allBtnLinks.forEach((btn) => {
  btn.addEventListener('click', function (e) {
    e.preventDefault();

    const id = e.target.getAttribute('href');
    if (e.target.classList.contains('navigation__link') && phoneMedia.matches) {
      //Auto-close navbar on moving to section when we re on the phone
      closeNavBar.bind(true)(e);
    }
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
  if (phoneMedia.matches) {
    detailsContent.scrollTop = detail.clientHeight * detail.dataset.tab - '35';
  } else detailsContent.scrollTop = detail.clientHeight * detail.dataset.tab - '25';

  detail.classList.add('details__content__item--active');
  const player = detail.querySelector('.lottie-animation-details');
  loadingLottie(player, player.src);
});

//-------------- Implementing loading animation --------------

const quoteAnimationTestimonials = document.querySelector(
  '.lottie-animation-testimonials'
);

const loadingLottie = async function (player, url, speed = 2) {
  try {
    await player.load(`${url}`);

    // setTimeout(() => {
    player.setSpeed(speed);
    player.stop();
    player.play();
    // }, 1000);
  } catch (err) {
    alert(err);
  }
};

// -------------- Implementing Testimonials Sliders --------------

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
      if (currentSlide === maxSlide) {
        currentSlide = 0;
      } else currentSlide++;
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
    alert(err);
  }
};

sliders();

//-------------- Observing Details Content In order to apply animations --------------

const detailsContentInView = async function (entries, observer) {
  try {
    const [entry] = entries;
    if (!entry.isIntersecting) {
      return;
    }

    const detailsItemPulsating = document.querySelector(
      `.details__content__item[data-tab="1"]`
    );
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

//-------------- Adding overlay to every home --------------

const findDetailsWidth = function (home, homes) {
  let columns = 3;
  const homePreview = home.querySelector('.home__preview');
  if (tabPortMedia.matches) {
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
