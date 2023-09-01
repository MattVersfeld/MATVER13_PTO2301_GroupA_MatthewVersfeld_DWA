import { states } from "./store.js";

export function counterReducer(state, action) {
    switch (action.type) {
        case 'ADD_NUM': {
            return {
                value: state.value + 1
            };
        }
        case 'MINUS_NUM': {
            return {
                value: state.value - 1,
            };
        }
        case 'RESET_NUM': {
            return {
                value: states[states.length - 1].value,
            };
        }

        default: state;
    }

}





