import { htmlQuerieSelectors } from "../data.js"
import { books } from "../data.js"
import { BookDisplay } from "./bookUtility.js"

/**
 * This fuction creates drop down option list from the entered object located in the
 * data.js file. 
 * @param {string} type - Name of the drop down
 * @param {object} dataList - object list for drop down creation
 */
export const createSearchList = (type, dataList) => {
    const dataSearch = htmlQuerieSelectors[type]
    const fragment = document.createDocumentFragment()
    const element = document.createElement('option')
    element.value = 'any'
    element.innerText = `All ${type}`
    fragment.appendChild(element)

    for (const [id, name] of Object.entries(dataList)) {
        const createOption = document.createElement('option')
        createOption.value = id
        createOption.innerText = name
        fragment.appendChild(createOption)
    }

    dataSearch.appendChild(fragment)
}


/**
 * Creates an object of the submitted choices a customer makes
 * @param {SubmitEvent} event 
 * @returns {object}
 */
export const createSearchData = (event) => {
    event.preventDefault()
    const formData = new FormData(event.target)
    const filters = Object.fromEntries(formData)
    return filters
}


/**
 * Function takes an object and filters through the data.js file and matches the
 * title, author and genre
 * @param {object} prop 
 * @returns {array}
 */
export const filterSearchData = (prop) => {
    let result = []

    for (const book of books) {
        let titleMatch = prop.title.trim() === '' || book.title.toLowerCase().includes(prop.title.toLowerCase())
        let authorMatch = prop.author === 'any' || book.author === prop.author
        let genreMatch = prop.genre === 'any' || book.genres === prop.genre
        if (!genreMatch) {
            for (const singleGenre of book.genres) {
                if (singleGenre === prop.genre) {
                    genreMatch = true
                }
            }
        }
        if (titleMatch && authorMatch && genreMatch) {
            result.push(book)
        }
    }

    if (result.length < 1) {
        htmlQuerieSelectors.searchMessage.style.display = 'block'
    } else {
        htmlQuerieSelectors.searchMessage.style.display = 'none'
    }
    return result
}

/**
 * Uses the bookDisplay function to generate the list of books that were filterd through
 * the filterSearchData function
 * @param {array} array 
 */
export const displaySearchData = (array) => {
    BookDisplay(array)
}