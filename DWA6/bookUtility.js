import { htmlQuerieSelectors, authors, books } from "./data.js"

/**
 * Takes an array of books from our data.js and creates the first 36 books that appear
 * on the front page.
 * @param {array} bookDataAsArray - can be any number of sliced data, we use 36 books per page
 */
export const BookDisplay = (bookDataAsArray) => {
    htmlQuerieSelectors.books.innerHTML = ''
    const fragment = document.createDocumentFragment()
    const extractedBooks = bookDataAsArray

    for (const prop of extractedBooks) {

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

        fragment.appendChild(elementMain)
    }

    htmlQuerieSelectors.books.appendChild(fragment)
}


/**
 * When a book is clicked, the fuction checks the book that the book selected matches the correct ID
 * and then updates the HTML with the book's image, title, description, subtitle and blur image.
 * @param {event} click - when clicked the function checks and updates information
 */
export const previewSummary = (click) => {
    let active = false
    const pathArray = Array.from(click.path || click.composedPath())

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

    htmlQuerieSelectors.active.style.display = 'block'
    dataImage.src = active.image
    dataBlur.src = active.image
    dataTitle.innerText = active.title

    dataSubtitle.innerText = `${authors[active.author]} (${new Date(active.published).getFullYear()})`
    dataDescription.innerText = active.description
}