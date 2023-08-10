import { authors, genres, books, BOOKS_PER_PAGE, htmlQuerieSelectors } from "./data.js";
import { createSearchList, createSearchData, filterSearchData, displaySearchData } from "./Modules/searchUtility.js";
import { BookDisplay, checkPreviewID, generatePreview } from "./Modules/bookUtility.js";
import { settingsCheck, settingToggle } from "./Modules/settingUtility.js";

const matches = books
let page = 1;
const range = [0, 36]



/**
 * Creates, filters and displays a list of books depending on the customers filtered choices
 * @param {SubmitEvent} event 
 */
const handlerSearchForm = (event) => {

    let searchData = createSearchData(event)
    let filter = filterSearchData(searchData)
    displaySearchData(filter)

}
htmlQuerieSelectors.searchForm.addEventListener('submit', handlerSearchForm)


/**
 * Controlling the settings option of Day and night mode.
 * first fuction checks window
 * second function toggles between day and night mode on submit 
 */

settingsCheck()

const handlerSettingsSubmit = (event) => {

    settingToggle(event)
}
htmlQuerieSelectors.settingsForm.addEventListener('submit', handlerSettingsSubmit)


/**
 * creating the list of drop downs for when you click on the search option
 * 1. Creating the genres list 
 * 2. Creating the authors list
 */
createSearchList('Genres', genres)
createSearchList('Authors', authors)



//Create list of first 36 books on main webpage
BookDisplay(books.slice(range[0], range[1]))



// View preview summary of each book that is currently active on screen
const previewButtons = document.querySelectorAll('.preview')
const handlerListItems = (event) => {

    generatePreview(checkPreviewID(event))

}
previewButtons.forEach(b => b.addEventListener('click', handlerListItems))




//Once the button on page is clicked, loads another 36 more books to the page
const dataListButton = document.querySelector('[data-list-button]')
const handlerListButton = (event) => {
    BookDisplay(books.slice(page * range[1], (page + 1) * range[1]))
    page = page + 1


    const initial = matches.length - [page * BOOKS_PER_PAGE]
    let hasRemaining = initial - [page * BOOKS_PER_PAGE]
    const remaining = hasRemaining ? initial : 0
    dataListButton.disabled = initial < 0

    dataListButton.innerHTML = /* html */ `
        <span>Show more</span>
        <span class="list__remaining"> (${remaining})</span>
    `

    const newButtons = document.querySelectorAll('.preview')
    newButtons.forEach(b => b.addEventListener('click', handlerListItems))
    dataListMessage.style.display = 'none'
}
dataListButton.addEventListener('click', handlerListButton)

dataListButton.innerText = `Show more ${books.length - BOOKS_PER_PAGE}`
dataListButton.disabled = (matches.length - [page * BOOKS_PER_PAGE] > 0)
dataListButton.innerHTML = /* html */[
    `<span>Show more 
    ${matches.length - [page * BOOKS_PER_PAGE] > 0 ? matches.length - [page * BOOKS_PER_PAGE] : 0}
    </span>`
]

// Search Cancel button
const dataSearchCancel = document.querySelector('[data-search-cancel]')
const dataSearchOverlay = document.querySelector('[data-search-overlay]')
const handlerSearchCancel = (event) => {
    dataSearchOverlay.style.display = 'none'
}
dataSearchCancel.addEventListener('click', handlerSearchCancel)



// Settings cancel button
const dataSettingsCancel = document.querySelector('[data-settings-cancel]')
const dataSettingsOverlay = document.querySelector('[data-settings-overlay]')
const handelerSettingsCancel = (event) => {
    dataSettingsOverlay.style.display = 'none'
}
dataSettingsCancel.addEventListener('click', handelerSettingsCancel)



// Settings open
const dataHeaderSettings = document.querySelector('[data-header-settings]')
const handlerHeaderSettings = () => {

    if (dataSearchOverlay.style.display === 'block') {
        dataSearchOverlay.style.display = 'none'

    }
    dataSettingsOverlay.style.display = 'block'
}
dataHeaderSettings.addEventListener('click', handlerHeaderSettings)



// Search Open
const dataHeaderSearch = document.querySelector('[data-header-search]')
const handlerHeaderSearch = (event) => {

    if (dataSettingsOverlay.style.display === 'block') {
        dataSettingsOverlay.style.display = 'none'

    }
    dataSearchOverlay.style.display = 'block';

}
dataHeaderSearch.addEventListener('click', handlerHeaderSearch)
dataHeaderSearch.focus();


// Close Summary 
const dataListClose = document.querySelector('[data-list-close]')
const handlerListClose = (event) => {
    htmlQuerieSelectors.active.style.display = 'none'
}
dataListClose.addEventListener('click', handlerListClose)


// Filter Books by title, author or genre
// const dataSearchForm = document.querySelector('[data-search-form]')
// const dataListMessage = document.querySelector('[data-list-message]')

// const handlerSearchForm = (event) => {
//     event.preventDefault()
//     const formData = new FormData(event.target)
//     const filters = Object.fromEntries(formData)
//     let result = []

//     for (const book of books) {
//         let titleMatch = filters.title.trim() === '' || book.title.toLowerCase().includes(filters.title.toLowerCase())
//         let authorMatch = filters.author === 'any' || book.author === filters.author
//         let genreMatch = filters.genre === 'any' || book.genres === filters.genre

//         if (!genreMatch) {
//             for (const singleGenre of book.genres) {
//                 if (singleGenre === filters.genre) {
//                     genreMatch = true
//                 }
//             }
//         }
//         if (titleMatch && authorMatch && genreMatch) {
//             result.push(book)

//         }

//     }

//     if (result.length < 1) {
//         dataListMessage.style.display = 'block'
//     } else {
//         dataListMessage.style.display = 'none'
//     }

//     BookDisplay(result)
//     event.target.reset()
//     dataSearchOverlay.style.display = 'none'
// }


// if (!books && !Array.isArray(books)) {
//     throw new Error('Source required')
// }
// if (!range && range.length < 2) {
//     throw new Error('Range must be an array with two numbers')
// }

// //remaning books on button
// const initial = matches.length - [page * BOOKS_PER_PAGE]
// let hasRemaining = initial - [page * BOOKS_PER_PAGE]
// const remaining = hasRemaining ? initial : 0
// dataListButton.disabled = initial < 0

// dataListButton.innerHTML = /* html */ `
//         <span>Show more</span>
//         <span class="list__remaining"> (${remaining})</span>
//     `

// dataSearchForm.addEventListener('submit', handlerSearchForm)





