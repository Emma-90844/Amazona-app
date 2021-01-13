import Axios from 'axios';
import { ORDER_CREATE_REQUEST, ORDER_CREATE_FAIL, ORDER_CREATE_SUCCESS, ORDER_DETAILS_REQUEST, ORDER_DETAILS_FAIL, ORDER_DETAILS_SUCCESS, ORDER_PAY_REQUEST, ORDER_PAY_FAIL, ORDER_PAY_SUCCESS, ORDER_MINE_LIST_REQUEST, ORDER_MINE_LIST_FAIL, ORDER_MINE_LIST_SUCCESS } from './../constants/orderConstants';
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


// Details order
export const detailsOrder = (orderId) => async (dispatch, getState) => {
    dispatch({ type: ORDER_DETAILS_REQUEST, payload: orderId });
    try {
        const { userSignin: { userInfo } } = getState()
        const { data } = await Axios.get(`/api/orders/${orderId}`, {
            headers: { Authorization: `Bearer ${userInfo.token}` },
        });
        dispatch({ type: ORDER_DETAILS_SUCCESS, payload: data });
    } catch (error) {
        const message = error.response && error.response.data.message
            ? error.response.data.message
            : error.message;
        dispatch({ type: ORDER_DETAILS_FAIL, payload: message })
    }
}

// Pay porder
export const payOrder = (order, paymentResult) => async (dispatch, getState) => {
    dispatch({ type: ORDER_PAY_REQUEST, payload: { order, paymentResult } });
    try {
        const { userSignin: { userInfo } } = getState()
        const { data } = await Axios.put(`/api/orders/${order._id}/pay`, paymentResult, {
            headers: { Authorization: `Bearer ${userInfo.token}` },
        });
        dispatch({ type: ORDER_PAY_SUCCESS, payload: data });
    } catch (error) {
        const message = error.response && error.response.data.message
            ? error.response.data.message
            : error.message;
        dispatch({ type: ORDER_PAY_FAIL, payload: message })
    }
}



// Pay porder
export const listOrderMine = () => async (dispatch, getState) => {
   
    const {
        
 userSignin: { userInfo } } = getState();
    try {
        dispatch({ type: ORDER_MINE_LIST_REQUEST });
         const { data } = await Axios.get('/api/orders/mine', {
            headers: {
                Authorization: `Bearer ${userInfo.token}`,
            },
        });
        dispatch({ type: ORDER_MINE_LIST_SUCCESS, payload: data });
 
    } catch (error) {
        const message =
            error.response && error.response.data.message
                ? error.response.data.message
                : error.message;
        dispatch({ type: ORDER_MINE_LIST_FAIL, payload: message });
    }
};
