import { htmlQuerieSelectors } from "./data.js"

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
