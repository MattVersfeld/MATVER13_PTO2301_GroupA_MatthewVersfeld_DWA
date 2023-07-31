import { authors, genres, books, BOOKS_PER_PAGE } from "./data.js";
import { createSearchList } from "./searchUtility.js";
import { BookDisplay } from "./bookUtility.js";

// const dataListItems = document.querySelector('[data-list-items]')
const dataActive = document.querySelector('[data-list-active]')

let active = false;
const matches = books
let page = 1;
const range = [0, 36]

//Search drop down lists
createSearchList('Genres', genres)
createSearchList('Authors', authors)

//Create list of first 36 books on main webpage
BookDisplay(books.slice(range[0], range[1]))

//Night & day mode
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

const dataSettingsTheme = document.querySelector('[data-settings-theme]')
dataSettingsTheme.value = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches ? 'night' : 'day'
const v = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches ? 'night' : 'day'

document.documentElement.style.setProperty('--color-dark', css[v].dark);
document.documentElement.style.setProperty('--color-light', css[v].light);

const dataSettingsForm = document.querySelector('[data-settings-form]')
const handlerSettingsSubmit = (event) => {
    event.preventDefault()
    const formData = new FormData(event.target)
    const result = Object.fromEntries(formData)
    document.documentElement.style.setProperty('--color-dark', css[result.theme].dark);
    document.documentElement.style.setProperty('--color-light', css[result.theme].light);
}
dataSettingsForm.addEventListener('submit', handlerSettingsSubmit)



//data Button for More previews
const dataListButton = document.querySelector('[data-list-button]')
const handlerListButton = (event) => {
    const previews = document.createDocumentFragment()
    const appendBooks = books.slice(page * range[1], (page + 1) * range[1])

    for (const prop of appendBooks) {

        const { author: authorId, id, image, title } = prop

        const elementMain = document.createElement('button')
        elementMain.classList = 'preview'
        elementMain.setAttribute('data-preview', id)

        elementMain.innerHTML = /* html */ `
            <img
                class="preview__image"
                src="${image}"
            />
            
            <div class="preview__info">
                <h3 class="preview__title">${title}</h3>
                <div class="preview__author">${authors[authorId]}</div>
            </div>
        `

        previews.appendChild(elementMain)
    }
    
    dataListItems.appendChild(previews)
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
dataListButton.innerHTML = /* html */ [
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

    if (dataSearchOverlay.style.display === 'block'){
        dataSearchOverlay.style.display = 'none'
        
    }
    dataSettingsOverlay.style.display = 'block'
}
dataHeaderSettings.addEventListener('click', handlerHeaderSettings)



// Search Open
const dataHeaderSearch = document.querySelector('[data-header-search]')
const handlerHeaderSearch = (event) => {
    
    if (dataSettingsOverlay.style.display === 'block'){
        dataSettingsOverlay.style.display = 'none'
        
    }
    dataSearchOverlay.style.display = 'block';
    
}
dataHeaderSearch.addEventListener('click', handlerHeaderSearch)
dataHeaderSearch.focus();


// Close Summary 
const dataListClose = document.querySelector('[data-list-close]')
const handlerListClose = (event) => {
    dataActive.style.display = 'none'
    active = false
}
dataListClose.addEventListener('click', handlerListClose)


// Filter Books by title, author or genre
const dataSearchForm = document.querySelector('[data-search-form]')
const dataListMessage = document.querySelector('[data-list-message]')

const handlerSearchForm = (event) => {
    event.preventDefault()
    const formData = new FormData(event.target)
    const filters = Object.fromEntries(formData)
    let result = []

    for (const book of books) {
        let titleMatch = filters.title.trim() === '' || book.title.toLowerCase().includes(filters.title.toLowerCase())
        let authorMatch = filters.author === 'any' || book.author === filters.author
        let genreMatch = filters.genre === 'any' || book.genres === filters.genre
            
        if (!genreMatch){
            for (const singleGenre of book.genres) {
                if (singleGenre === filters.genre) {
                    genreMatch = true 
               }
           }
        }
            if (titleMatch && authorMatch && genreMatch){
                result.push(book)
                
            } 

        }
   
    if (result.length < 1){
        dataListMessage.style.display = 'block'
    }else { 
        dataListMessage.style.display = 'none'
    }

    BookDisplay(result)
    event.target.reset()
    dataSearchOverlay.style.display = 'none'
}
    
// /**
//  * To display all books in array
//  * 
//  * @param {array} array
//  */
// const BookDisplay = (array) => {
    
//     dataListItems.innerHTML = ''
//     const dataFrag = document.createDocumentFragment()
//     const extractedBooks = array

//     for (const prop of extractedBooks) {

//         const { author: authorId, id, image, title } = prop

//         const elementMain = document.createElement('button')
//         elementMain.classList = 'preview'
//         elementMain.setAttribute('data-preview', id)

//         elementMain.innerHTML = /* html */ `
//             <img
//                 class="preview__image"
//                 src="${image}"
//             />
            
//             <div class="preview__info">
//                 <h3 class="preview__title">${title}</h3>
//                 <div class="preview__author">${authors[authorId]}</div>
//             </div>
//         `

//         dataFrag.appendChild(elementMain)
//     }
    
//     dataListItems.appendChild(dataFrag)
// }
// creating the books on main page 


    if (!books && !Array.isArray(books)) {
        throw new Error('Source required') 
    } 
    if (!range && range.length < 2) {
        throw new Error('Range must be an array with two numbers')
    } 
    
    //remaning books on button
    const initial = matches.length - [page * BOOKS_PER_PAGE]
    let hasRemaining = initial - [page * BOOKS_PER_PAGE]
    const remaining = hasRemaining ? initial : 0
    dataListButton.disabled = initial < 0

    dataListButton.innerHTML = /* html */ `
        <span>Show more</span>
        <span class="list__remaining"> (${remaining})</span>
    `
    
dataSearchForm.addEventListener('submit', handlerSearchForm)





// Preview Summary
const summaryButtons = document.querySelectorAll('.preview')
const handlerListItems = (event) => {
    const pathArray = Array.from(event.path || event.composedPath())
    

    for (let i = 0; i <= pathArray.length; i++) {
        if (active) break;
        const previewId = pathArray[i].dataset.preview
    
        for (const singleBook of books) {
            if (singleBook.id === previewId) active = singleBook
        } 
    }
    
    if (!active) return

    const dataImage = document.querySelector('[data-list-image]')
    const dataTitle = document.querySelector('[data-list-title]')
    const dataDescription = document.querySelector('[data-list-description]')
    const dataSubtitle = document.querySelector('[data-list-subtitle]')
    const dataBlur = document.querySelector('[data-list-blur]')

    dataActive.style.display = 'block'
    dataImage.src = active.image
    dataBlur.src = active.image
    dataTitle.innerText = active.title
    
    dataSubtitle.innerText = `${authors[active.author]} (${new Date(active.published).getFullYear()})`
    dataDescription.innerText = active.description
}
summaryButtons.forEach(b => b.addEventListener('click', handlerListItems))