// scripts.js

const form = document.querySelector("[data-form]");
const result = document.querySelector("[data-result]");

form.addEventListener("submit", (event) => {
  event.preventDefault();
  const entries = new FormData(event.target);
  const { dividend, divider } = Object.fromEntries(entries);

  /**
   * Function will convert the submitted string into a number and then check the submitted information for the following: 
   * 1. That there is a value being added when submitted, if there is no value added to the input field and the
   * value is just an empy string then throw an error and show user an error message.
   * 2. If the number submitted is a negative number in either side, throw an error and display a message to the user
   * stating that the number provided is invalid.
   * 3. If the value sumbitted is not a number then throw an error and crash the page with a message displayed 
   * to the user stating to reload the page.
   * @param {string} inputEntries 
   * @returns {number}
   */

  const checkTheNumbers = (inputEntries) => {
        const toNumber = parseInt(inputEntries);
        
        if (inputEntries === '') { 
            clearErrors()
            result.innerText = 'Division not performed. Both values are required in inputs. Try again'
            throw new Error('Inputs cannot be empty') 
            
        };
        if (checkIfNeg(toNumber) === -1) {
            clearErrors()
            result.innerText = 'Division not performed. Invalid number provided. Try again'
            throw new Error('Negative number was used') 
            
        };
        if (isNaN(toNumber)) {
            document.body.innerHTML = 'Something critical went wrong. Please reload the page'
            throw new Error('Something critical went wrong')
        };
        return toNumber;
  }

  /**
   * To check if a number submitted is a negative, positive or zero and return either
   * 1 for positive, -1 for negative, 0 for a zero, 
   * @param {number} check
   * @returns {number}
   */
  
  const checkIfNeg = (check) => {
        return Math.sign(check)
    }

    /**
     * clears current innertext value to an empty string after 5seconds
     */
    const clearErrors = () => {
        setTimeout(() => {  result.innerText = '' }, 5000);
    }

    result.innerText = Math.trunc(checkTheNumbers(dividend) / checkTheNumbers(divider))

});
