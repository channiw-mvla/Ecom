import React, { useEffect, useState } from 'react';
import { useCookies } from 'react-cookie';
import axios from 'axios';
import Navbar from '../../components/Navbar/Navbar';
const Cart = () => {
  const [cookies,setCookie] = useCookies(['cart']);
  const [products, setProducts] = useState([]);
  const [total, setTotal] = useState(0)
  const handleDeleteFromCart = item => {
    const updatedCart = cookies.cart.filter(product =>  product.id !== item )
    const updatedProducts = products.filter(product =>  product._id !== item )
    setCookie('cart',updatedCart)
    setProducts(updatedProducts)
  }
  useEffect(() => {
    const fetchProducts = async () => {
        let fetchedProducts = [];
        let fetchedTotal = 0;
        for (const item of cookies.cart) {
          const response = await axios.get(`http://localhost:8000/api/products/${item.id}`);
          fetchedProducts.push(response.data);
            fetchedTotal += response.data.price
        }
        setProducts(fetchedProducts);
        setTotal(fetchedTotal)
    }
    if(cookies.cart)
      fetchProducts();
  }, [cookies.cart]);
  return (
    <>
    <Navbar/>
    {
        products.length===0 ? (
            <div className="container">
            <h1>Your Cart</h1>
                <div className="card">
                    <div className="card-body">
                        <h5 className="card-title">No Products in Cart</h5>
                        <p className="card-text">Your cart is currently empty.</p>
                    </div>
                </div>
            </div>
        ):(
            <div className="container">
                <h1>Your Cart</h1>
                <table className="table">
                  <thead>
                    <tr>
                      <th>Product</th>
                      <th>Size</th>
                      <th>Price</th>
                      <th>Quanity</th>
                      <th>Total</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {products.map((product, index) => (
                      <tr key={product._id} className=''>
                        <td className='d-flex align-items-center'>
                          <img src={product.images[0]} alt={product.name} style={{ width: '50px' }} />
                          <p className='mx-2'>{product.name}</p>
                        </td>
                        <td>{cookies.cart[index].size}</td>
                        <td>${product.price.toFixed(2)}</td>
                        <td>{cookies.cart[index].quantity}</td>
                        <td>${(product.price * cookies.cart[index].quantity).toFixed(2)}</td>
                        <td><button className="btn btn-danger" onClick={()=>handleDeleteFromCart(product._id)}>Delete</button></td>
                      </tr>
                        ))}
                        <tr>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td >Total</td>
                            <td>${total.toFixed(2)}</td>
                        </tr>
                  </tbody>
                </table>
              </div>
        )
    }
    </>
  );
};

export default Cart;
