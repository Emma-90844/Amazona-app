import React from 'react';
import Rating from '../components/Rating';
import data from '../data';
import Product from '../components/Product'
import { Link } from 'react-router-dom';


export default function ProductScreen(props) {
    const product = data.products.find((x) => x._id === props.match.params.id);
    if (!product) {
        return <div>Product Not Found</div>;
    }
    return (
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
                                        {product.countInStock>0?<span className="success"><b>In Stock</b></span>:
                                        <span className="danger"><b>Unavailable</b></span>}
                                    </div>
                                </div>
                            </li>
                            {/* button */}
                            <li>
                                <button className="primary block">Add to Cart</button>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
}
