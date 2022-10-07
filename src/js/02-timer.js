import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import Notiflix from 'notiflix';

const buttonStart = document.querySelector('button[data-start]');
const input = document.querySelector('#datetime-picker');
const days = document.querySelector('span[data-days]');
const hours = document.querySelector('span[data-hours]');
const minutes = document.querySelector('span[data-minutes]');
const seconds = document.querySelector('span[data-seconds]');

buttonStart.disabled = true;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    if (selectedDates[0] > new Date()) {
      buttonStart.disabled = false;
    } else {
      Notiflix.Notify.init({ position: 'center-center' });
      Notiflix.Notify.warning('Please choose a date in the future');
      buttonStart.disabled = true;
    }
  },
};

flatpickr('#datetime-picker', options);

class Timer {
  constructor({ onTick }) {
    this.intervalId = null;
    this.onTick = onTick;
  }

  start() {
    const startTime = new Date(input.value);
    buttonStart.disabled = true;

    this.intervalId = setInterval(() => {
      const currentTime = Date.now();
      const deltaTime = Math.abs(startTime - currentTime);
      const time = this.convertMs(deltaTime);

      this.onTick(time);

      if (
        time.days === '00' &&
        time.hours === '00' &&
        time.minutes === '00' &&
        time.seconds === '00'
      ) {
        clearInterval(this.intervalId);
      }
    }, 1000);
  }

  convertMs(ms) {
    const second = 1000;
    const minute = second * 60;
    const hour = minute * 60;
    const day = hour * 24;

    const days = this.addLeadingZero(Math.floor(ms / day));
    const hours = this.addLeadingZero(Math.floor((ms % day) / hour));
    const minutes = this.addLeadingZero(
      Math.floor(((ms % day) % hour) / minute)
    );
    const seconds = this.addLeadingZero(
      Math.floor((((ms % day) % hour) % minute) / second)
    );
    return { days, hours, minutes, seconds };
  }

  addLeadingZero(value) {
    return String(value).padStart(2, '0');
  }
}

const timer = new Timer({ onTick: updateClockface });

buttonStart.addEventListener('click', timer.start.bind(timer));

function updateClockface(time) {
  seconds.textContent = time.seconds;
  minutes.textContent = time.minutes;
  hours.textContent = time.hours;
  days.textContent = time.days;
}
