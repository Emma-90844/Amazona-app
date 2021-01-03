import React from 'react';
import { useSelector } from 'react-redux';
import CheckoutSteps from './../components/CheckoutSteps';
import { Link } from 'react-router-dom';

export default function PlaceOrderScreen(props) {
    const cart = useSelector((state) => state.cart)
    if (!cart.paymentMethod) {
        props.history.push('/payment')
    }

    const toPrice = (num) => Number(num.toFixed(2)); // 5.123 => "5.12" => 5.12
    cart.itemsPrice =  toPrice(cart.cartItems.reduce((a, c) => a + c.qty * c.price, 0));
    cart.shippingPrice = cart.itemsPrice > 100 ? toPrice(0) : toPrice(10);
    cart.taxPrice = toPrice(0.15 * cart.itemsPrice);
    cart.totalPrice = cart.itemsPrice + cart.shippingPrice + cart.taxPrice;


    const placeOrderHandler = () => {

    }

    return (
        <div>
            <CheckoutSteps step1 step2 step3 step4></CheckoutSteps>
            <div className="row top">
                <div className="col-2">
                    <ul>

                        {/* Shipping Box */}
                        <li>
                            <div className="card card-body">
                                <h2>Shipping</h2>
                                <p>
                                    <strong>Name:  </strong>{cart.shippingAddress.fullName}<br /><br />
                                    <strong>Address:  </strong>{cart.shippingAddress.address},
                                    {cart.shippingAddress.city}, {cart.shippingAddress.postalCode},
                                    {cart.shippingAddress.country}
                                </p>
                            </div>
                        </li>

                        {/* Payment Box */}
                        <li>
                            <div className="card card-body">
                                <h2>Payment</h2>
                                <p>
                                    <strong>Method: </strong>{cart.paymentMethod}
                                </p>
                            </div>
                        </li>


                        {/* Order Items*/}
                        <li>
                            <div className="card card-body">
                                <h2>Order Items</h2>
                                <ul>
                                    {cart.cartItems.map((item) => (
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
                                    <div>${cart.itemsPrice.toFixed(2) }</div>
                                </div>
                            </li>
                            <li>
                                <div className="row">
                                    <div>Shipping Price</div>
                                    <div>${cart.shippingPrice.toFixed(2)}</div>
                                </div>
                            </li>
                            <li>
                                <div className="row">
                                    <div>Tax</div>
                                    <div>${cart.taxPrice.toFixed(2)}</div>
                                </div>
                            </li>
                            <li>
                                <div className="row">
                                    <div>
                                        <strong>Order Total</strong>
                                    </div>
                                    <div>${cart.totalPrice.toFixed(2)}</div>
                                </div>
                            </li>
                            <li>
                                <button type="button"
                                 onClick={placeOrderHandler} 
                                 className="primary block"
                                 disabled={cart.cartItems.length === 0 }
                                 
                                 >Place 0rder</button>
                            </li>



                        </ul>
                    </div>
                </div>

            </div>



        </div>
    );
}































