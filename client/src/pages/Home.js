import { useEffect, useState } from 'react';
import Navbar from '../components/Navbar/Navbar';
import ProductView from '../components/Product/ProductView';
import axios from 'axios'

export default function Home() {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  useEffect(() => {
    const getProducts = async () => {
      await axios.get("http://localhost:8000/api/products/")  
      .then(res => setProducts(res.data))
      .catch(err => console.log(err))
    }
    getProducts()
    setLoading(false)
  }, [])
  if(loading)
    return <h1>Loading</h1>
  else
    return (
      <div>
        <Navbar />
        {/* <h1>Home</h1> */}
        <div class="container my-3 ">
          <div className="row row-cols-1 row-cols-md-3 g-4">
            {products.map((product,index) => {
              return(
                <div class="col-md-4">
                    < ProductView key={index} image1={product.images[0]} image2={product.images[1]} name={product.name} price={product.price} sizes = {product.sizes}/>
                  </div>
                  );
                  
                })}
          </div>
        </div>
      </div>
  );
}
