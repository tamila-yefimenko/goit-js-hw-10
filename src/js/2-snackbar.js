import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";

const refs = {
    form: document.querySelector(".form"),
    input: document.querySelector("input[name='delay']"),
    inputs: document.querySelectorAll("input[name='state']"),
}

const { form, input, inputs } = refs;

let delay = 0;
input.addEventListener('input', (evt) => {
    delay = Number(evt.currentTarget.value);
});

let promiseStatus = "fulfilled";
inputs.forEach(input => {
    input.addEventListener('change', (evt) => {
        promiseStatus = evt.currentTarget.value;
    });
});

const promiseGenerator = () => {
    const delayValue = delay;
    const status = promiseStatus || "fulfilled";
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if (status === "fulfilled") {
                resolve(`${delayValue}`);
            } else if(status === "rejected") {
                reject(`${delayValue}`);
            } else {
                reject("Unknown promise status");
            }
        }, delay)
    });
}

const handleSubmit = (evt) => {
    evt.preventDefault();
    promiseGenerator()
        .then(value => iziToast.success({
            title: 'OK',
            message: `Fulfilled promise in ${value}ms`,
            messageColor: '#fff',
            titleSize: '16px',
            backgroundColor: '#59a10d',
            position: 'topRight',
            titleColor: '#fff',
            theme: 'dark',
}))
        .catch(error => iziToast.error({
            title: 'Error',
            message: `Rejected promise in ${error}ms`,
            messageColor: '#fff',
            titleSize: '16px',
            backgroundColor: '#ef4040',
            position: 'topRight',
            titleColor: '#fff',
            theme: 'dark',
}));
    form.reset();
};
form.addEventListener('submit', handleSubmit);