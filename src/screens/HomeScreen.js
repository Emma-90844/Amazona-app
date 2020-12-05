import React, { useEffect, useState } from 'react';
import Product from '../components/Product';
import axios from 'axios';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';

export default function HomeScreen() {
  // React hook to set products
  const [products, setProducts] = useState([]);
  // Hook for Loading while fetching data from the backend
  const [loading, setLoading] = useState(false);
  //Hook for error
  const [error, setError] = useState(false);






  //Fetch data from the server
  useEffect(() => {
    const fetchData = async () => {
      try {
        // Before fetching set loading to true and false after loading
        setLoading(true);
        //Sending an Ajax request to fetch data
        const { data } = await axios.get('/api/products');
        setLoading(false);
        // Set fetch data to products
        setProducts(data);
      } catch (err) {
        setError(err.message);
        setLoading(false)
      }

    };
    fetchData();
  }, [])
  // console.log(products)






// Check for loading and error conditions before rendering the content
  return (
    <div>
      {loading ? (<LoadingBox></LoadingBox>
       ) : error ? (
       <MessageBox variant="danger">{error}</MessageBox>
         ) : <div className="row center">
            {
              products.map(product => (
                <Product key={product._id} product={product}></Product>
              ))
            }
          </div>
      }
    </div>
  );
}
