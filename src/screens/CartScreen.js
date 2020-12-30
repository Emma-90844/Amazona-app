import React, { useEffect } from 'react';
import { addToCart, removeFromCart } from '../actions/cartActions';
import { useDispatch, useSelector } from 'react-redux';
import MessageBox from '../components/MessageBox';
import { Link } from 'react-router-dom';

export default function CartScreen(props) {
  const productId = props.match.params.id;
  // props.location.search: this value returns cart/qty={qty} in the product screen redirect history
  const qty = props.location.search
    ? Number(props.location.search.split('=')[1]) : 1;

  // Accessing cart items
  const cart = useSelector(state => state.cart);
  const { cartItems } = cart

  //  Dispatch add to cart action
  const dispatch = useDispatch();

  const removeFromCartHandler = (id) => {
    dispatch(removeFromCart(id));
  }

  useEffect(() => {
    if (productId) {
      dispatch(addToCart(productId, qty))
    }
  }, [dispatch, productId, qty])


  // Checkout handler
  const checkoutHandler = () => {
    props.history.push('signin?redirect=shipping');
  }
  //  Returnig the cart screen page
  return (
    <div className="row">
      <div className="col-2">
        <h1>Shopping Cart</h1>
        {cartItems.length === 0 ? (<MessageBox>
          Cart is Empty     <b><Link to="/">Go Shopping</Link></b>
        </MessageBox>
        ) : (
            <ul>
              {
                cartItems.map((item) => (
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

                      {/* Third coloum of the cart items */}
                      <div>
                        <select
                          value={item.qty}
                          onChange={(e) =>
                            dispatch(addToCart(item.product, Number(e.target.value))
                            )
                          }>

                          {/* Options  inside the select Box*/}
                          {
                            [...Array(item.countInStock).keys()].map((x) => (
                              // For the first element set the key , key={x}
                              <option key={x + 1} value={x + 1}>{x + 1}</option>
                            ))
                          }
                        </select>
                      </div>

                      {/* Forth coloum of the cart items */}
                      <div>
                        ${item.price}
                      </div>

                      {/* Last coloum of the cart items */}
                      <div>
                        <button
                          type="button"
                          className="button"
                          onClick={() => removeFromCartHandler(item.product)}
                        >
                          Delete
                    </button>
                      </div>
                    </div>
                  </li>
                ))
              }
            </ul>
          )}
      </div>
      {/* Cart action coloum */}
      <div className="col-1">
        <div className="card card-body">
          <ul>
            <li>
              <h2>
                Subtotal({cartItems.reduce((a, c) => a + c.qty, 0)}  items) : $ {cartItems.reduce((a, c) => a + c.price * c.qty, 0)}
              </h2>
            </li>
            {/* button */}
            <li>
              <button type="button" onClick={checkoutHandler} className="primary block" disabled={cartItems.length === 0}>Proceed to Checkout</button>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
