import React, { useEffect, useState } from 'react';
import './ProductDetail.css';
import axios from 'axios';
import { useParams } from 'react-router-dom';

import Header from '../../components/Navbar/Navbar';
export default function ProductDetail() {
  const { id } = useParams();
  const [quantity, setQuantity] = useState(1);
  const [product, setProduct] = useState({});

  useEffect(() => {
    const getProductById = async () => {
      await axios
        .get('http://localhost:8000/api/products/' + id)
        .then((res) => setProduct(res.data))
        .catch((err) => console.log(err));
    };
    getProductById();
  }, [id]);

  const increaseQuantity = () => {
    setQuantity(quantity + 1);
  };
  const decreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  return (
    <>
      <Header />
      <section className='product-details-main'>
        <div className='product-detail-left'>
          <div className='product-detail-left-images'>
            {product.images?.map((image, index) => (
              <img src={image} alt={product.name} key={index} />
            ))}
          </div>
        </div>
        <div className='product-detail-right'>
          <span className='brand-name'>FOOTWISE</span>
          <h1>{product.name}</h1>
          <p className='product-detail-right-price'>${product.price} USD</p>
          <div>
            <p className='find-size'>Find your size</p>
            <div className='product-detail-right-size'>
              <div className='product-detail-right-size-box'>
                {product.sizes?.map((size, index) => (
                  <button className='product-size-btn' key={index}>
                    {size}
                  </button>
                ))}
              </div>
            </div>
            <div className='quantity'>
              <span>Quantity</span>
              <div className='quantity-box'>
                <button onClick={decreaseQuantity} className='quantity-btn'>
                  -
                </button>
                <input
                  type='text'
                  className='quantity-input'
                  value={quantity}
                  onChange={(e) => setQuantity(e.target.value)}
                />
                <button onClick={increaseQuantity} className='quantity-btn'>
                  +
                </button>
              </div>
            </div>
            <button className='add-to-cart-btn'>Add to cart</button>
            <div className='product-detail-right-description'>
              <p>Easy. Cool. Breathable.</p>
              <p>
                The Terrus is a thoughtfully designed clog, made for the
                outdoors. Wear them around the city on a light hike, or sitting
                around by the lake with a book in hand. Just throw them on and
                stay easy, cool and comfy all day.
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
