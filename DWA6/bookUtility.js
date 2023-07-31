import { htmlQuerieSelectors, authors } from "./data.js"

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