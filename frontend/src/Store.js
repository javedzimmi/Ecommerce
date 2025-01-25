import { createStore, combineReducers, applyMiddleware } from "redux";
import { thunk } from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import { productDetailsReducer, productsReducer } from "./reducers/ProductReducers";

const reducer = combineReducers({

    products: productsReducer,
    
    productDetails:productDetailsReducer,
});

let initialState = {
};
const Middleware = [thunk];
const store = createStore(
    reducer, // The combined reducers
    initialState, // The initial state
    composeWithDevTools(applyMiddleware(...Middleware)) // Add middleware and DevTools support
);

export default store;


