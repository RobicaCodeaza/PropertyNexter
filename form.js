// Implementing Form functionality

const allInputsRadio = document.querySelectorAll('.form-input--radio');
console.log(allInputsRadio);

const personalisedOfferInputs = document.querySelectorAll(
  '.contact-us-form__input-box--personalised-offer'
);
const currentOfferInput = document.querySelector(
  '.contact-us-form__input-box--current-offer'
);

allInputsRadio.forEach((inputRadio) =>
  inputRadio.addEventListener('change', function (e) {
    if (e.target.id === 'current-offer') {
      currentOfferInput.classList.remove('display-none');
      personalisedOfferInputs.forEach((input) =>
        input.classList.add('display-none')
      );
    } else {
      currentOfferInput.classList.add('display-none');
      personalisedOfferInputs.forEach((input) =>
        input.classList.remove('display-none')
      );
    }
  })
);
