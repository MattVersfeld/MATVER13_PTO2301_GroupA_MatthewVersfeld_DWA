
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

//Bounce 
const container = document.querySelector('.animation-form');
const animation = container.querySelector('sl-animation');
const button = container.querySelector('sl-button');

button.addEventListener('click', () => {
    animation.play = true;
    valueRef.value = 0
});

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
