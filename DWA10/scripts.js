
//user-input
const NUMBER_VALUE = 1;

const valueRef = document.querySelector('[data-value]')
const addRef = document.querySelector('[data-add]')
const subtractRef = document.querySelector('[data-subtract]')

const subtracthandler = () => {
    valueRef.stepDown(NUMBER_VALUE)
}
const addhandler = () => {
    valueRef.stepUp(NUMBER_VALUE)
}

subtractRef.addEventListener('click', subtracthandler)
addRef.addEventListener('click', addhandler)

//reset
const container = document.querySelector('.alert-duration');
const button = container.querySelector('sl-button');
const alert = container.querySelector('sl-alert');

button.addEventListener('click', () => {
    alert.show();
    valueRef.value = 0
})

//day mode
const switchRef = document.querySelector('[data-switch]')
switchRef.addEventListener('click', () => {
    let element = document.querySelector('html')
    if (switchRef.checked == true) {
        element.classList.add("sl-theme-dark")
    } else {
        element.classList.remove("sl-theme-dark")
    }
})
