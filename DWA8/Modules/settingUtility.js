import { htmlQuerieSelectors } from "../data.js"



const day = {
    dark: '10, 10, 20',
    light: '255, 255, 255',
}

const night = {
    dark: '255, 255, 255',
    light: '10, 10, 20',
}

const css = {
    day,
    night,
}

/**
 * Function checks the current theme of the window and sets the setting option to the correct choice being night or day 
 */
export const settingsCheck = () => {
    htmlQuerieSelectors.settings.value = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches ? 'night' : 'day'
    const v = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches ? 'night' : 'day'

    document.documentElement.style.setProperty('--color-dark', css[v].dark);
    document.documentElement.style.setProperty('--color-light', css[v].light);
}

/**
 * On Submit the function takes in form data and sets the document css property to the desired result then updates the page
 * @param {SubmitEvent} event 
 */
export const settingToggle = (event) => {
    event.preventDefault()
    const formData = new FormData(event.target)
    const result = Object.fromEntries(formData)
    document.documentElement.style.setProperty('--color-dark', css[result.theme].dark);
    document.documentElement.style.setProperty('--color-light', css[result.theme].light);
}