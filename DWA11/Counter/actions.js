
const increase = {
    type: 'ADD_NUM',
}

const reduce = {
    type: 'MINUS_NUM',
}

const initReset = {
    type: 'RESET_NUM',
}

export const add = () => {
    const { type: typeRef } = increase
    return {
        type: typeRef,
    }
}

export const subtract = () => {
    const { type: typeRef } = reduce
    return {
        type: typeRef,
    }
}

export const reset = () => {
    const { type: typeRef } = initReset
    return {
        type: typeRef,
    }
}