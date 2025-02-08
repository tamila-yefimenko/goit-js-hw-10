import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";

const refs = {
    form: document.querySelector(".form"),
    input: document.querySelector("input[name='delay']"),
    inputFulfilled: document.querySelector("input[value='fulfilled']"),
    inputRejected: document.querySelector("input[value='rejected']"),
    button: document.querySelector("button[type='submit']"),
}

const { form, input, inputFulfilled, inputRejected, button } = refs;

let delay = 0;
input.addEventListener('input', (evt) => {
    delay = Number(evt.currentTarget.value);
});

let promiceStatus = "";
inputFulfilled.addEventListener('change', (evt) => {
    promiceStatus = evt.currentTarget.getAttribute("value");
})

inputRejected.addEventListener('change', (evt) => {
    promiceStatus = evt.currentTarget.getAttribute("value");
})

const promiceGenerator = () => {
    const delayValue = delay;
    const status = promiceStatus;
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if (status === "fulfilled") {
                resolve(`${delayValue}`);
            } else {
                reject(`${delayValue}`);
            }
        }, delay)
    });
}

const handleSubmit = (evt) => {
    evt.preventDefault();
    promiceGenerator()
        .then(value => iziToast.success({
            iconUrl: "/public/bi_check2-circle.png",
            title: 'OK',
            message: `Fulfilled promise in ${value}ms`,
            messageColor: '#fff',
            titleSize: '16px',
            backgroundColor: '#59a10d',
            position: 'topRight',
            titleColor: '#fff',
            iconColor: '#fff',
}))
        .catch(error => iziToast.warning({
            iconUrl: "/public/bi_x-octagon.png",
            title: 'Error',
            message: `Rejected promise in ${error}ms`,
            messageColor: '#fff',
            titleSize: '16px',
            backgroundColor: '#ef4040',
            position: 'topRight',
            titleColor: '#fff',
            iconColor: '#fff',

}));
    form.reset();
};
form.addEventListener('submit', handleSubmit);