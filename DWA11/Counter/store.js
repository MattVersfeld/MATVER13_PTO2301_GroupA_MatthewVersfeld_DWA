import { counterReducer } from "./reducers.js"
import { reset, subtract, add } from "./actions.js"

const state = {
    value: 0,
};

export let states = [state];
let subscribers = [];

export const getState = () => {
    return Object.freeze({ ...states[0] });
};

export const dispatch = (action) => {
    const prev = getState();
    const next = counterReducer(prev, action);

    subscribers.forEach((item) => item(prev, next));
    states.unshift(next);
};

export const subscribe = (subscription) => {
    subscribers.push(subscription);
    const handler = (item) => { item !== subscription };

    const unsubscribe = () => {
        const newSubscribers = subscribers.filter(handler);
        subscribers = newSubscribers;
    }

    return unsubscribe;
};