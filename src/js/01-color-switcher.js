const body = document.body;
const buttonStart = document.querySelector('button[data-start]');
const buttonStop = document.querySelector('button[data-stop]');
let timerId = null;

buttonStart.addEventListener('click', () => {
  buttonStart.disabled = true;
  buttonStop.disabled = false;

  timerId = setInterval(() => {
    const randomCollor = getRandomHexColor();
    body.style.backgroundColor = randomCollor;
  }, 1000);
});

buttonStop.addEventListener('click', () => {
  buttonStart.disabled = false;
  buttonStop.disabled = true;

  clearInterval(timerId);
});

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}
