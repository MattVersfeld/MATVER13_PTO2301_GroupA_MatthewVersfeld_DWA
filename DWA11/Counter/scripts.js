import { dispatch, subscribe, getState } from "./store.js";
import { add, reset, subtract } from "./actions.js";

subscribe((_, next) => console.log(next));

console.log(getState())
dispatch(add())
dispatch(add())
dispatch(add())
dispatch(subtract())
dispatch(reset())