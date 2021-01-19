import Axios from 'axios';
import {PayPalButton} from 'react-paypal-button-v2'
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { detailsOrder } from '../actions/orderActions';
import MessageBox from '../components/MessageBox';
import LoadingBox from './../components/LoadingBox';
import { payOrder } from './../actions/orderActions';
import { ORDER_PAY_RESET } from './../constants/orderConstants';


export default function OrderScreen(props) {
    const orderId = props.match.params.id;
    // getting the status of paypal SDK
    const [sdkReady, setSdkReady] = useState(false)
    const orderDetails = useSelector((state) => state.orderDetails);
    const { order, loading, error } = orderDetails;

    // getting orderPay from redux
    const orderPay = useSelector((state) => state.orderPay);
    const {loading: loadingPay,  error: errorPay, success:successPay} =orderPay

    const dispatch = useDispatch();

    useEffect(() => {
        // paypal-Adding paypal script
        const addPayPalScript = async () => {
            const {data} = await Axios.get('/api/config/paypal');
            const script = document.createElement('script');
            script.type = 'text/javascript';
            script.src = `https://www.paypal.com/sdk/js?client-id=${data}`;
            script.async = true;
            script.onload = () => {
                setSdkReady(true);
            };
            document.body.appendChild(script);
        };
        
        if(!order || successPay || (order && order._id !== orderId)){
            dispatch({ type: ORDER_PAY_RESET})
            dispatch(detailsOrder(orderId)); 
        } else{
            if(!order.isPaid){
                // this checks if pay pal script isnt yet loaded
                if(!window.paypal){
                    addPayPalScript()
                }else{
                    setSdkReady(true)
                }
            }
        }

    }, [dispatch, order, orderId, sdkReady,successPay])

    // for paypal button
    const successPaymentHandler = (paymentResult) => {
        dispatch(payOrder(order, paymentResult))
    }



// rendering the order screen
    return loading ? <LoadingBox></LoadingBox> :
        error ? (<MessageBox variant="danger">{error}</MessageBox>)
            :
            (
                <div>
                    <h1>Order {order._id}</h1>
                    <div className="row top">
                        <div className="col-2">
                            <ul>

                                {/* Shipping Box */}
                                <li>
                                    <div className="card card-body">
                                        <h2>Shipping</h2>
                                        <p>
                                            <strong>Name:  </strong>{order.shippingAddress.fullName}<br /><br />
                                            <strong>Address:  </strong>{order.shippingAddress.address},
                                    {order.shippingAddress.city}, {order.shippingAddress.postalCode},
                                    {order.shippingAddress.country}
                                        </p>

                                    {/* Delievery status */}
                                    {order.isDelievered? <MessageBox variant="success">Already Delievered</MessageBox>
                                    :
                                    <MessageBox variant="danger">Not Delievered</MessageBox>
                                    }
                                    </div>
                                </li>

                                 {/* Payment Box */}
                                <li>
                                    <div className="card card-body">
                                        <h2>Payment</h2>
                                        <p>
                                            <strong>Method: </strong>{order.paymentMethod}
                                        </p>
                                 {/* Payment status */}
                                 {order.isPaid? <MessageBox variant="success">Paid</MessageBox>
                                    :
                                    <MessageBox variant="danger">Not Paid</MessageBox>
                                    }
                                    </div>
                                </li>


                                {/* Order Items*/}
                                <li>
                                    <div className="card card-body">
                                        <h2>Order Items</h2>
                                        <ul>
                                            {order.orderItems.map((item) => (
                                                <li key={item.product}>
                                                    <div className="row">

                                                        {/* First coloum of the cart items */}
                                                        <div>
                                                            <img
                                                                src={item.image}
                                                                alt={item.name}
                                                                className="small">
                                                            </img>
                                                        </div>

                                                        {/* Second coloum of the cart items */}
                                                        <div className="min-30">
                                                            <Link to={`/product/${item.product}`}>{item.name}</Link>
                                                        </div>



                                                        {/* Forth coloum of the cart items */}
                                                        <div>
                                                            {item.qty} * ${item.price} = ${item.qty * item.price}
                                                        </div>
                                                    </div>
                                                </li>
                                            ))
                                            }
                                        </ul>

                                    </div>
                                </li>


                            </ul>
                        </div>
                        <div className="col-1">
                            <div className="card card-body">
                                <ul>
                                    <li>
                                        <h2>Order Summary</h2>
                                    </li>
                                    <li>
                                        <div className="row">
                                            <div>Items</div>
                                            <div>${order.itemsPrice.toFixed(2)}</div>
                                        </div>
                                    </li>
                                    <li>
                                        <div className="row">
                                            <div>Shipping Price</div>
                                            <div>${order.shippingPrice.toFixed(2)}</div>
                                        </div>
                                    </li>
                                    <li>
                                        <div className="row">
                                            <div>Tax</div>
                                            <div>${order.taxPrice.toFixed(2)}</div>
                                        </div>
                                    </li>
                                    <li>
                                        <div className="row">
                                            <div>
                                                <strong>Order Total</strong>
                                            </div>
                                            <div>${order.totalPrice.toFixed(2)}</div>
                                        </div>
                                    </li>
                                    {/* Conditioning rendering */}
                                    {
                                        !order.isPaid &&  (
                                            <li>
                                                {!sdkReady ? (
                                                <LoadingBox></LoadingBox>
                                                ): (
                                                    <>
                                                    {errorPay && <MessageBox variant="danger">{errorPay}</MessageBox>}
                                                    {loadingPay && <LoadingBox variant="danger">{errorPay}</LoadingBox>}
                                                <PayPalButton 
                                                    amount={order.totalPrice}
                                                    onSuccess={successPaymentHandler}
                                                    ></PayPalButton>
                                                    </>
                                                    )
                                                }
                                            </li>
                                        )
                                    }
                                </ul>
                            </div>
                        </div>
                    </div>



                </div>
            );
}































