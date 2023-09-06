const provinces = ['Western Cape', 'Gauteng', 'Northern Cape', 'Eastern Cape', 'KwaZulu-Natal', 'Free State']
const names = ['Ashwin', 'Sibongile', 'Jan-Hendrik', 'Sifso', 'Shailen', 'Frikkie']

// Use forEach to console log each name to the console. You are allowed to call console.log seven times.

names.forEach(item => console.log(item))

/* Use forEach to console log each name with a matching province (for example Ashwin (Western Cape).
 * Note that you are only allowed to call console.log seven times.
 */

provinces.forEach((item1, index) => {
    const item2 = names[index];
    console.log(item1, item2);
});

// Using map loop over all province names and turn the string to all uppercase. Log the new array to the console.

provinces.map(item => console.log(item.toUpperCase()))

// Create a new array with map that has the amount of characters in each name. The result should be: [6, 9, 11, 5, 7, 7]

const newArray = []
names.map(item => {
    newArray.push(item.trim().length)
})
console.log(newArray)

// Using toSorted to sort all provinces alphabetically.

const sort = provinces.toSorted()
console.log(sort)

/* Use filter to remove all provinces that have the word Cape in them.
 *After filtering the array, return the amount of provinces left. The final value should be 3
 */

const newProvincesFilter = provinces.filter(item => (!(item.includes('Cape'))))
// console.log(newProvincesFilter)
console.log(newProvincesFilter.length)

/* Create a boolean array by using map and some to determine whether a name contains an S character.
 * The result should be [true, true, false, true, true, false]
 */

const booleanArray = names.map(item => item.split('').some(char => (char.toLowerCase() === 's')))
console.log(booleanArray)

// Using only reduce, turn the above into an object that indicates the province of an individual.

const objectReduce = names.reduce((acc, name, index) => {
    acc[name] = provinces[index];
    return acc;
}, {});

console.log(objectReduce)

// additional tasks

const products = [
    { product: 'banana', price: "2" },
    { product: 'mango', price: 6 },
    { product: 'potato', price: ' ' },
    { product: 'avocado', price: "8" },
    { product: 'coffee', price: 10 },
    { product: 'tea', price: '' },
];

// Use forEach to console.log each product name to the console.

products.forEach(item => console.log(item.product))

// Use filter to filter out products that have a name longer than 5 characters

console.log(products.filter(item => (!(item.product.length > 5))))

/* Using both filter and map. Convert all prices that are strings to numbers,
 * and remove all products from the array that do not have prices. After this has 
 * been done then use reduce to calculate the combined price of all remaining products.
 */

const map = products.map(item => parseInt(item.price)).filter(item => (item)).reduce((acc, current) => {
    return acc + current
}, 0)
console.log(map)


// Use reduce to concatenate all product names to create the following string: banana, mango, potato, avocado, coffee and tea.

const concat = products.map(item => item.product).reduce((acc, current) => {
    return `${acc}, ${current}`
},)
console.log(concat)

// Use reduce to calculate both the highest and lowest-priced items. The names should be returned as the following string: Highest: coffee. Lowest: banana

const { high, low } = products.reduce((acc, current) => {
    const price = parseInt(current.price)

    if (price > acc.high.price || acc.high.name === '') {
        acc.high = { name: current.product, price };
    }

    if (price < acc.low.price || acc.low.name === '') {
        acc.low = { name: current.product, price };
    }

    return acc;
}, { high: { name: '', price: 0 }, low: { name: '', price: 0 } });

console.log(high, low)
const highLow = `Highest: ${high.name}(${high.price}). Lowest: ${low.name}(${low.price}).`;
console.log(highLow);

/* Using only Object.entries and reduce recreate the object with the exact same values. However, the following object keys should be changed in the new array:
 * product should be changed to name
 * price should be changed to cost
 */

const createArray = products.reduce((acc, current) => {
    const createObj = Object.entries(current).reduce((obj, [key, value]) => {
        if (key === 'product') {
            obj['name'] = value;
        } else if (key === 'price') {
            obj['cost'] = value;
        } else {
            obj[key] = value;
        }
        return obj
    }, {})

    acc.push(createObj)
    return acc
}, []);

console.log(createArray);


