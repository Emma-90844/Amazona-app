import React, { useEffect, useState } from 'react';
import Rating from '../components/Rating';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import LoadingBox from './../components/LoadingBox';
import MessageBox from './../components/MessageBox';
import { useSelector } from 'react-redux';
import { detailsProduct } from '../actions/productActions';


export default function ProductScreen(props) {
    const dispatch = useDispatch();
    const productId = props.match.params.id;
    // Add to cart qty
    const [qty, setQty] = useState(1)
    const productDetails = useSelector((state) => state.productDetails);
    const { loading, error, product } = productDetails;

    //Dispatching details product action
    useEffect(() => {
        dispatch(detailsProduct(productId));
    }, [dispatch, productId]);

    // Add to card handler in the Add to cart button 
    const addToCartHandler = () => {
        props.history.push(`/cart/${productId}?qty=${qty}`);
    };


    return (
        <div>
            {loading ? (<LoadingBox></LoadingBox>
            ) : error ? (
                <MessageBox variant="danger">{error}</MessageBox>
            ) : (
                        <div>
                            <Link to="/">Back to result</Link>
                            <div class="row top">
                                <div className="col-2">
                                    <img className="large" src={product.image} alt={product.name}></img>
                                </div>
                                <div className="col-1">
                                    <ul>
                                        <li><h1>{product.name}</h1></li>
                                        <Rating rating={product.rating} numReviews={product.numReviews} />
                                        <li>Price : ${product.price}</li>
                                        <li>Description:  <p>{product.description}</p></li>
                                    </ul>
                                </div>
                                {/* Middle section of the product screen */}
                                <div className="col-1">
                                    <div className="card card-body">
                                        <ul>
                                            {/* price */}
                                            <li>
                                                <div className="row">
                                                    <div>Price</div>
                                                    <div className="price" >${product.price}</div>
                                                </div>
                                            </li>
                                            {/* status */}
                                            <li>
                                                <div className="row">
                                                    <div>Status </div>
                                                    <div>
                                                        {product.countInStock > 0 ? <span className="success"><b>In Stock</b></span> :
                                                            <span className="danger"><b>Unavailable</b></span>}
                                                    </div>
                                                </div>
                                            </li>
                                            {/* Check  If products are less than zero , donnot show the Add to Cart Button */}
                                            {
                                                product.countInStock > 0 && (
                                                    <>
                                                        <li>
                                                            <div className="row">
                                                                <div>Qty</div>
                                                                <div>
                                                                    <select className="selectBox" value={qty} onChange={e => setQty(e.target.value)}>
                                                                        {
                                                                            [...Array(product.countInStock).keys()].map((x) => (
                                                                                // For the first element set the key , key={x}
                                                                                <option key={x + 1} value={x + 1}>{x + 1}</option>
                                                                            ))
                                                                        }
                                                                    </select>
                                                                </div>
                                                            </div>
                                                        </li>
                                                        <li>
                                                            <button onClick={addToCartHandler} className="primary block">Add to Cart</button>
                                                        </li>
                                                    </>
                                                )
                                            }

                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
        </div>
    );
}
