
import React, {  useState } from 'react';
import CheckoutSteps from './../components/CheckoutSteps';
import { useDispatch, useSelector } from 'react-redux';
import { saveShippingAddress } from './../actions/cartActions';

export default function ShippingAddressScreen(props) {
    // Denies shipping url for unsigned in user , redirects 
    const userSignin = useSelector(state => state.userSignin);
    const { userInfo } = userSignin;
    
    const  cart = useSelector(state => state.cart);
    const {shippingAddress} = cart
    
    // If not user redirect to the sign in screen
    if(!userInfo){
        props.history.push('/signin');
    };

    const [fullName, setFullName] = useState(shippingAddress.fullName);
    const [address, setAddress] = useState(shippingAddress.address);
    const [city, setCity] = useState(shippingAddress.city);
    const [postalCode, setPostalCode] = useState(shippingAddress.postalCode);
    const [country, setCountry] = useState(shippingAddress.country);

    const dispatch = useDispatch();

    const submitHandler = (e) => {
        e.preventDefault();
        dispatch(saveShippingAddress({fullName, address, city, postalCode, country}));
        props.history.push('/payment')
    };

    return (
        <div>
            <CheckoutSteps step1 step2></CheckoutSteps>
            <form className="form" onSubmit={submitHandler}>
                <div>
                    <h1>Shipping Address</h1>
                </div>

                <div>
                    <label html="fullName">Full Name</label>
                    <input type="text"
                        id="fullName"
                        placeholder="Enter full name"
                        value={fullName} onChange={(e) => setFullName(e.target.value)}
                        required></input>
                </div>

                <div>
                    <label html="address">Address</label>
                    <input type="text"
                        id="address"
                        placeholder="Enter address"
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                        required></input>
                </div>

                <div> 
                    <label html="city">City</label>
                    <input type="text"
                        id="city"
                        placeholder="Enter city"
                        value={city}
                        onChange={(e) => setCity(e.target.value)}
                        required></input>
                </div>

                <div>
                    <label html="postalCode">Postal Code</label>
                    <input type="text"
                        id="postalCode"
                        placeholder="Enter postal code"
                        value={postalCode}
                        onChange={(e) => setPostalCode(e.target.value)}
                        required></input>
                </div>


                <div>
                    <label html="country">Country</label>
                    <input type="text"
                        id="country"
                        placeholder="Enter country"
                        value={country}
                        onChange={(e) => setCountry(e.target.value)}
                        required></input>
                </div>


                {/* Continue button */}
                <div>
                    <label/>
                    <button className="primary" type="submit">Continue</button>
                </div>

            </form>
        </div>
    );
}
