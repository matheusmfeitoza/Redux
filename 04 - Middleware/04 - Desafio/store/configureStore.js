import { thunk } from "./middleware/thunk.js";
import { localStorage } from "./middleware/localStorage.js";
import { userReducer } from "./user.js";
import { tokenReducer } from "./token.js";

const { applyMiddleware, compose } = Redux;

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const enhancer = composeEnhancers(applyMiddleware(thunk, localStorage));

const reducer = Redux.combineReducers({ userReducer, tokenReducer });

export const store = Redux.createStore(reducer, enhancer);
