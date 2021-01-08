import Axios from 'axios';
import { ORDER_CREATE_REQUEST, ORDER_CREATE_FAIL, ORDER_CREATE_SUCCESS } from './../constants/orderConstants';
import { CART_EMPTY } from './../constants/cartConstants';

export const createOrder = (order) => async (dispatch, getState) => {
    dispatch({ type: ORDER_CREATE_REQUEST, payload: order });
    try {
        // Below fill in user info from the redux store
        const { userSignin: { userInfo } } = getState()

        const { data } = await Axios.post('/api/orders', order, {
            headers: {
                Authorization: `Bearer ${userInfo.token}`,
            },
        });
        
        dispatch({ type: ORDER_CREATE_SUCCESS, payload: data.order });
        // Below action removes all items from the shopping cart  
        dispatch({ type: CART_EMPTY });
        localStorage.removeItem('cartItems');

    } catch (error) {
        dispatch({
            type: ORDER_CREATE_FAIL,
            payload:
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message,
        });
    }
}









