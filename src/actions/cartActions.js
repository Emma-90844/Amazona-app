import Axios from "axios";
import Cookie from 'js-cookie'
import { CART_ADD_ITEM, CART_REMOVE_ITEM } from '../constants/cartConstants';


export const addToCart = (productId, qty) => async (dispatch, getState) => {
    //  Add to Cart action  
    const { data } = await Axios.get(`/api/products/${productId}`);
    dispatch({
        type: CART_ADD_ITEM,
        payload: {
            name: data.name,
            image: data.image,
            price: data.price,
            countInStock: data.countInStock,
            product: data._id,
            qty,
        }
    });
    //  Saving the added cart item to the local storage
    localStorage.setItem(
        'cartItems',
        JSON.stringify(getState().cart.cartItems));

}

// Remove item from Cart
export const removeFromCart = (productId) => (dispatch, getState) => {
    dispatch({ type: CART_REMOVE_ITEM, payload: productId });
    localStorage.setItem('cartItems', JSON.stringify(getState().cart.cartItems));
}








