import React, {useState} from 'react';
import CheckoutSteps from '../components/CheckoutSteps';
import { useDispatch, useSelector } from 'react-redux';
import { savePaymentMethod } from '../actions/cartActions';

export default function PaymentMethodScreen(props) {
    const cart = useSelector(state => state.cart) 
    console.log(cart)
    const { shippingAddress } = cart;
    console.log({shippingAddress})

    if(!shippingAddress.address){
        props.history.push('/shipping');
    }




    const [paymentMethod, setPaymentMethod] = useState('PayPal')
    const dispatch = useDispatch();
    const submitHandler = (e) => {
        e.preventDefault();
        dispatch(savePaymentMethod(paymentMethod));
        props.history.push('/placeorder');
    }

    return (
        <div>
            <CheckoutSteps step1 step2 step3></CheckoutSteps>
            <form className="form" onSubmit={submitHandler} >
                <div>
                    <h1>Payment Method</h1>
                </div>

                <div>
                    <input type="radio"
                        id="mobileMoney"
                        value="mobileMoney"
                        name="paymentMethod"
                        required
                    
                        onChange={(e) => setPaymentMethod(e.target.value)}>
                    </input>
                    <label html="mobileMoney">Mobile Money</label>
                </div>


                <div>
                    <input type="radio"
                        id="paypal"
                        value="PayPal"
                        name="paymentMethod"
                        required
                        checked
                        onChange={(e) => setPaymentMethod(e.target.value)}>
                    </input>
                    <label html="paypal">PayPal</label>
                </div>

                <div>
                    <input type="radio"
                        id="stripe"
                        value="Stripe"
                        name="paymentMethod"
                        required 
                     
                        onChange={(e) => setPaymentMethod(e.target.value)}>
                    </input>
                    <label html="stripe">Stripe</label>
                </div>

                <div>
                    <button className="primary" type="submit">
                        Continue
                    </button>
                </div>



            </form>

        </div>
    );
}
