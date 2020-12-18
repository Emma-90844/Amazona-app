
import {
    PRODUCT_DETAILS_REQUEST,
    PRODUCT_LIST_FAIL,
    PRODUCT_LIST_REQUEST,
    PRODUCT_LIST_SUCCESS,
    PRODUCT_DETAILS_SUCCESS,
    PRODUCT_DETAILS_FAIL
} from './../constants/productConstants';



// NB: Set products to an empty arrays otherwise the results will be null
export const productListReducer = (state = { loading: true, products: [] }, action) => {
    switch (action.type) {
        case PRODUCT_LIST_REQUEST:
            return { loading: true };
        case PRODUCT_LIST_SUCCESS:
            return { loading: false, products: action.payload };
        case PRODUCT_LIST_FAIL:
            return { loading: false, error: action.payload };
        default: 
            return state;
    }
}
// Product details reducer
export const productDetailsReducer = (state = { product: {}, loading: true }, action) => {
    switch (action.type) {
        case PRODUCT_DETAILS_REQUEST:
            return { loading: true };
        case PRODUCT_DETAILS_SUCCESS:
            return { loading: false, product: action.payload };
        case PRODUCT_DETAILS_FAIL:
            return { loading: false, error: action.payload };
        default:
            return state;
    }
}