import Notiflix from 'notiflix';
// Notiflix.Notify.warning('Please choose a date in the future');

function createPromise(position, delay) {
  const shouldResolve = Math.random() > 0.3;
  if (shouldResolve) {
    // Fulfill
  } else {
    // Reject
  }
}
