import {
    ALL_PRODUCT_FAIL,
    ALL_PRODUCT_REQUEST,
    ALL_PRODUCT_SUCCESS,

    PRODUCT_DETAILS_REQUEST,
    PRODUCT_DETAILS_SUCCESS,
    PRODUCT_DETAILS_FAIL,



    CLEAR_ERRORS
} from "../constants/ProductConstants";

// Rename productReducers to productsReducer for clarity
export const productsReducer = (state = { products: [] }, action) => {
    switch (action.type) {
        case ALL_PRODUCT_REQUEST:
            return {
                ...state, // Preserve previous state properties
                loading: true, // Set loading to true
                products: [], // Reset products to an empty array while loading
            };

        case ALL_PRODUCT_SUCCESS:
            return {
                loading: false, // Set loading to false when the request is successful
                products: action.payload.products, // Set the fetched products
                productsCount: action.payload.productsCount, // Add product count to state if necessary
            };

        case ALL_PRODUCT_FAIL:
            return {
                loading: false, // Set loading to false in case of failure
                error: action.payload, // Set the error message from the action payload
            };

        case CLEAR_ERRORS:
            return {
                ...state, // Retain the current state
                error: null, // Clear the error
            };

        default:
            return state; // Return the current state if no matching action
    }
};



const initialState = {
  loading: false,
  product: {}, // Initialize product as an empty object
  error: null
};


export const productDetailsReducer = (state = initialState, action) => {
  switch (action.type) {
      case PRODUCT_DETAILS_REQUEST:
          return { ...state, loading: true };
      case PRODUCT_DETAILS_SUCCESS:
          return { ...state, loading: false, product: action.payload };
      case PRODUCT_DETAILS_FAIL:
          return { ...state, loading: false, error: action.payload };
      default:
          return state;
  }
};
  