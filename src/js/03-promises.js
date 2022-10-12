import Notiflix from 'notiflix';

const form = document.querySelector('.form');
form.addEventListener('submit', submitForm);

function submitForm(e) {
  e.preventDefault();
  let {
    elements: { delay, step, amount },
  } = e.currentTarget;
  const inputDelay = Number(delay.value);
  const inputStep = Number(step.value);
  const inputAmount = Number(amount.value);
  let delayStep = inputDelay;

  for (let i = 1; i <= inputAmount; i += 1) {
    let promisePosition = i;
    // console.log(delayStep);
    createPromise(promisePosition, delayStep)
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
    delayStep += inputStep;
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
    }, delay);
  });
}
