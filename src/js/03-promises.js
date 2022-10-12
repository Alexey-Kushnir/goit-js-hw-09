import Notiflix from 'notiflix';

const form = document.querySelector('.form');
const inputDelay = document.querySelector('input[name="delay"]');
const inputStep = document.querySelector('input[name="step"]');
const inputAmount = document.querySelector('input[name="amount"]');
let delayStepCounter = 0;
let promisePosition = 0;

form.addEventListener('submit', submitForm);

function submitForm(e) {
  e.preventDefault();
  for (let i = 0; i < Number(inputAmount.value); i += 1) {
    promisePosition += 1;
    // console.log(promisePosition);
    delayStepCounter = Number(inputDelay.value) + Number(inputStep.value) * i;

    createPromise(promisePosition, delayStepCounter)
      .then(({ position, delay }) => {
        Notiflix.Notify.success(
          `✅ Fulfilled promise ${position} in ${delay}ms`
        );
      })
      .catch(({ position, delay }) => {
        Notiflix.Notify.failure(
          `❌ Rejected promise ${position} in ${delay}ms`
        );
      });
  }
}

function createPromise(position, delay) {
  const shouldResolve = Math.random() > 0.3;

  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (shouldResolve) {
        resolve({ position, delay });
      } else {
        reject({ position, delay });
      }
      // console.log(promisePosition);
      promisePosition = 0;
    }, delay);
  });
}
