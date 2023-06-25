import { useEffect, useState } from 'react';
import Navbar from '../components/Navbar/Navbar';
import ProductView from '../components/Product/ProductView';
import axios from 'axios';

export default function Home() {
  const [products, setProducts] = useState([]);
  useEffect(() => {
    const getProducts = async () => {
      await axios
        .get('http://localhost:8000/api/products/')
        .then((res) => setProducts(res.data))
        .catch((err) => console.log(err));
    };
    getProducts();
  }, []);
  return (
    <div>
      <Navbar />
      {/* <h1>Home</h1> */}
      <div class='container my-3 '>
        {products.length === 0 ? (
          <div className='d-flex justify-content-center'>
            <h1>No Products</h1>
          </div>
        ) : (
          <div className='row row-cols-1 row-cols-md-3 g-4'>
            {products.map((product, index) => {
              return (
                <div class='col-md-4'>
                  <ProductView
                    key={index}
                    _id={product._id}
                    image1={product.images[0]}
                    image2={product.images[1]}
                    name={product.name}
                    price={product.price}
                    sizes={product.sizes}
                  />
      await axios.get("http://localhost:8000/api/products/")  
      .then(res => setProducts(res.data))
      .catch(err => console.log(err))
    }
    getProducts()
  }, [])
    return (
      <div>
        <Navbar />
        {/* <h1>Home</h1> */}
        <div className="container my-3 ">
          {products.length === 0 ?
            (
              <div className="d-flex justify-content-center">
                <h1>No Products</h1>
              </div>
            ):
            (
                <div className="row row-cols-1 row-cols-md-3 g-4">
                  {products.map((product) => (
                      <div className="col-md-4" key={product._id}>
                        < ProductView image1={product.images[0]} image2={product.images[1]} name={product.name} price={product.price} sizes = {product.sizes}/>
                      </div>                        
                  ))}
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
