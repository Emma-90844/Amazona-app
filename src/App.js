import React from 'react';
import { BrowserRouter, Route } from "react-router-dom"
import HomeScreen from './screens/HomeScreen';
import ProductScreen from './screens/ProductScreen';
import CartScreen from './screens/CartScreen';
import { Link } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux';
import logo from './components/logo.png'
import SigninScreen from './screens/SigninScreen';
import { signout } from './actions/userActions';
import RegisterScreen from './screens/RegisterScreen';
import ShippingAddressScreen from './screens/ShippingAddressScreen';
import PaymentMethodScreen from './screens/PaymentMethodScreen';
import PlaceOrderScreen from './screens/PlaceOrderScreen';

function App() {


  const cart = useSelector(state => state.cart);
  const { cartItems } = cart;
  // to get user sigin
  const userSignin = useSelector((state) => state.userSignin)
  const { userInfo } = userSignin;

// 
const dispatch = useDispatch();
const signoutHandler = () => {
  dispatch(signout())
}
  return (
    <BrowserRouter>
      <div className="grid-container">
        <header className="row">
          {/* LOGO */}
          <div>
            <Link className="brand" to="/">

              <img src={logo} alt="logo" className="logo"></img>
            </Link>
          </div>

          {/* LOGO */}
          <div>
            <Link to="/cart">Cart
               {cartItems.length > 0 && (
                <span className="badge">{cartItems.length}</span>
              )}
            </Link>
            {/* Conditional rendering of user signin name in place of sign in button */}
            {
              userInfo ? (
                <div className="dropdown">
                  <Link to="#">{userInfo.name}<i className="fa fa-caret-down"></i></Link>
                  <ul className="dropdown-content">
                    <Link to="#signout" onClick={signoutHandler}>Sign Out</Link>
                  </ul>
                </div>
              ) : (<Link to="/signin">Sign In</Link>)
            }

          </div>


        </header>
        <main>
          <Route path="/cart/:id?" component={CartScreen} ></Route>
          <Route path="/product/:id" component={ProductScreen} exact></Route>
          <Route path="/signin" component={SigninScreen} ></Route>
          <Route path="/register" component={RegisterScreen} ></Route>
          <Route path="/shipping" component={ShippingAddressScreen} ></Route>
          <Route path="/payment" component={PaymentMethodScreen} ></Route>
          <Route path="/placeorder" component={PlaceOrderScreen} ></Route>
          <Route path="/" component={HomeScreen} exact></Route>
        </main>
        <footer className="row center">
          All rights reserved, Incoparated
    </footer>
      </div>
    </BrowserRouter>
  );
}

export default App;
