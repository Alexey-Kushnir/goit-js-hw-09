import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';

const buttonStart = document.querySelector('button[data-start]');
const input = document.querySelector('#datetime-picker');
const days = document.querySelector('span[data-days]');
const hours = document.querySelector('span[data-hours]');
const minutes = document.querySelector('span[data-minutes]');
const seconds = document.querySelector('span[data-seconds]');

buttonStart.disabled = true;

// const startTime = null;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    if (selectedDates[0] > new Date()) {
      buttonStart.disabled = false;
    } else {
      window.alert('Please choose a date in the future');
      buttonStart.disabled = true;
    }
  },
};

flatpickr('#datetime-picker', options);

const timer = {
  start() {
    let intervalId = null;
    const startTime = new Date(input.value);
    buttonStart.disabled = true;

    intervalId = setInterval(() => {
      const currentTime = Date.now();
      const deltaTime = Math.abs(startTime - currentTime);
      const time = convertMs(deltaTime);
      updateClockface(time);

      if (
        time.days === '00' &&
        time.hours === '00' &&
        time.minutes === '00' &&
        time.seconds === '00'
      ) {
        clearInterval(intervalId);
      }
    }, 1000);
  },
};

buttonStart.addEventListener('click', () => {
  timer.start();
});

function addLeadingZero(value) {
  return String(value).padStart(2, '0');
}

function updateClockface(time) {
  seconds.textContent = time.seconds;
  minutes.textContent = time.minutes;
  hours.textContent = time.hours;
  days.textContent = time.days;
}

function convertMs(ms) {
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  const days = addLeadingZero(Math.floor(ms / day));
  const hours = addLeadingZero(Math.floor((ms % day) / hour));
  const minutes = addLeadingZero(Math.floor(((ms % day) % hour) / minute));
  const seconds = addLeadingZero(
    Math.floor((((ms % day) % hour) % minute) / second)
  );

  return { days, hours, minutes, seconds };
}
