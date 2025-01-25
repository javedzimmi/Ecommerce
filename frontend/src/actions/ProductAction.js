import axios from "axios";
import {
    ALL_PRODUCT_FAIL,
    ALL_PRODUCT_REQUEST,
    ALL_PRODUCT_SUCCESS,

    PRODUCT_DETAILS_REQUEST,
    PRODUCT_DETAILS_SUCCESS,
    PRODUCT_DETAILS_FAIL,

    CLEAR_ERRORS
} from "../constants/ProductConstants";

// Action to get products
export const getProduct = (keyword=" ") => async (dispatch) => {
    try {
        dispatch({
            type: ALL_PRODUCT_REQUEST
        });

        // Make the API request
        const { data } = await axios.get(`/products/products?keyword=${keyword}`);

        // Dispatch success action with the fetched products
        dispatch({
            type: ALL_PRODUCT_SUCCESS,
            payload: data, // Here we send the data (products) from the API response
        });

    } catch (error) {
        // Dispatch failure action with the error message
        const message = error.response && error.response.data.message 
            ? error.response.data.message 
            : error.message;
        dispatch({
            type: ALL_PRODUCT_FAIL,
            payload: message,  // Handle cases where error.response is undefined
        });
    }
};


export const getProductDetails = (id) => async (dispatch) => {
    try {
        dispatch({
            type: PRODUCT_DETAILS_REQUEST
        });

        // Make the API request
        const { data } = await axios.get(`/products/product/${id}`);

        // Dispatch success action with the fetched products
        dispatch({
            type: PRODUCT_DETAILS_SUCCESS,
            payload: data.product, // Here we send the data (products) from the API response
        });

    } catch (error) {
        // Dispatch failure action with the error message
        const message = error.response && error.response.data.message 
            ? error.response.data.message 
            : error.message;
        dispatch({
            type: PRODUCT_DETAILS_FAIL,
            payload: message,  // Handle cases where error.response is undefined
        });
    }
};




// Action to clear errors
export const clearErrors = () => async (dispatch) => {
    dispatch({
        type: CLEAR_ERRORS
    });
};
