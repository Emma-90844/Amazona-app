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
import OrderScreen from './screens/OrderScreen';
import OrderHistoryScreen from './screens/OrderHistoryScreen';
import ProfileScreen from './screens/ProfileScreen';
import PrivateRoute from './components/PrivateRoute';

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
            <Link to="/cart"><i className="fa-lg fa fa-shopping-cart"></i>
              {cartItems.length > 0 && (
                <span className="badge">{cartItems.length}</span>
              )}
            </Link>
            {/* Conditional rendering of user signin name in place of sign in button */}


            {
              userInfo ? (
                <div className="dropdown">
                  <Link to="#">{userInfo.name}{' '}<i className="fa fa-caret-down"></i></Link>
                  <ul className="dropdown-content">
                    <li>
                      <Link to="/profile">User Profile</Link>
                    </li>
                    <li>
                      <Link to="/orderhistory">Order history</Link>
                    </li>
                    <li>
                      <Link to="#signout" onClick={signoutHandler}>Sign Out</Link>
                    </li>

                  </ul>
                </div>

              ) : (<Link to="/signin">Sign In</Link>)
            }
            {
              userInfo && userInfo.isAdmin && (
                <div className="dropdown">
                  <Link to="#admin">
                    Admin{' '}<i className="fa fa-caret-down"></i>
                  </Link>
                  <ul className="dropdown-content">
                    <li>
                      <Link to="/dashboard">Dashboard</Link>
                    </li>
                    <li>
                      <Link to="/productlist">Products</Link>
                    </li>
                    <li>
                      <Link to="/orderlist">Orders</Link>
                    </li>
                    <li>
                      <Link to="/userlist">Users</Link>
                    </li>

                  </ul>
                </div>)
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
          <Route path="/order/:id" component={OrderScreen} ></Route>
          <Route path="/orderHistory" component={OrderHistoryScreen} ></Route>
          <PrivateRoute path="/profile" component={ProfileScreen} ></PrivateRoute>
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
