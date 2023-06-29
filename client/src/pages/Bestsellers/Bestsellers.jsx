import { useEffect, useState } from 'react';
import Navbar from '../../components/Navbar/Navbar';
import ProductView from '../../components/Product/ProductView';
import axios from 'axios';

export default function Home() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const getProducts = async () => {
      try {
        const response = await axios.get('http://localhost:8000/api/products/');
        setProducts(response.data);
      } catch (error) {
        console.log(error);
      }
    };

    getProducts();
  }, []);

  // Sort products by numOrders before rendering
  const sortedProducts = [...products].sort(
    (a, b) => b.numOrders - a.numOrders
  );

  return (
    <div>
      <Navbar />
      <div className='container my-3'>
        {sortedProducts.length === 0 ? (
          <div className='d-flex justify-content-center'>
            <h1>No Products</h1>
          </div>
        ) : (
          <div className='row row-cols-1 row-cols-md-3 g-4'>
            {sortedProducts.map((product) => (
              <div className='col-md-4' key={product._id}>
                <ProductView
                  _id={product._id}
                  image1={product.images[0]}
                  image2={product.images[1]}
                  name={product.name}
                  price={product.price}
                  sizes={product.sizes}
                />
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
