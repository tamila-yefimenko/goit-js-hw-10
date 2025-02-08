import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";
import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";

const refs = {
    button: document.querySelector("[data-start]"),
    days: document.querySelector("[data-days]"),
    hours: document.querySelector("[data-hours]"),
    minutes: document.querySelector("[data-minutes]"),
    seconds: document.querySelector("[data-seconds]"),
    input: document.querySelector("#datetime-picker"),
};
const { button, days, hours, minutes, seconds, input } = refs;

button.setAttribute("disabled", "");
let userSelectedDate = null;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
      console.log(selectedDates[0]);
      if (selectedDates[0] <= Date.now()) {
          button.setAttribute("disabled", "");
          iziToast.warning({
            iconUrl: "/public/bi_exclamation-triangle.png",
            title: 'Error',
            message: 'Please choose a date in the future',
            messageColor: '#fff',
            titleSize: '16px',
            backgroundColor: '#ffa000',
            position: 'topRight',
            titleColor: '#fff',
            iconColor: '#fff',
          });
      } else if (selectedDates[0] > Date.now()) {
          button.removeAttribute("disabled");
          userSelectedDate = selectedDates[0];
      }
  },
};

flatpickr("#datetime-picker", options);

button.addEventListener('click', () => {
    timer.start();
    button.setAttribute("disabled", "");
    input.setAttribute("disabled", "");
});

const timer = {
    intervalId: null,
    resultTime: null,
    start() {
            this.intervalId = setInterval(() => {
                this.timerClick();
                this.printTime();
            }, 1000);
    },
    
    timerClick() {
        const currentTime = Date.now();
        const diff = userSelectedDate - currentTime;
        this.resultTime = convertMs(diff);
        if (diff < 1000) {
            console.log(diff);
            clearInterval(this.intervalId);
            button.removeAttribute("disabled");
            input.removeAttribute("disabled");
        }
    },

    printTime() {
        days.textContent = addLeadingZero(this.resultTime.days);
        hours.textContent = addLeadingZero(this.resultTime.hours);
        minutes.textContent = addLeadingZero(this.resultTime.minutes);
        seconds.textContent = addLeadingZero(this.resultTime.seconds);
    }
}

function addLeadingZero(value) {
    return value.toString().padStart(2, "0");
}

function convertMs(ms) {
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = Math.floor(ms / day);
  // Remaining hours
  const hours = Math.floor((ms % day) / hour);
  // Remaining minutes
  const minutes = Math.floor(((ms % day) % hour) / minute);
  // Remaining seconds
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}
