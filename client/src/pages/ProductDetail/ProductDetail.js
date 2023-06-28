import React, { useEffect, useReducer } from 'react';
import './ProductDetail.css';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

import Header from '../../components/Navbar/Navbar';
import { useCookies } from 'react-cookie';

const initialState = {
  quantity: 1,
  product: {},
  firstPrice: 0,
  selectedSize: 0
};
function reducer(state, action) {
  switch (action.type) {
    case 'SET_PRODUCT':
      return {
        ...state,
        product: action.payload,
      };
    case 'SET_FIRST_PRICE':
      return {
        ...state,
        firstPrice: action.payload,
      };
    case 'INCREASE_QUANTITY':
      return {
        ...state,
        quantity: state.quantity + 1,
        product: {
          ...state.product,
          price: state.product.price + state.firstPrice,
        },
      };
    case 'DECREASE_QUANTITY':
      if (state.quantity > 1) {
        return {
          ...state,
          quantity: state.quantity - 1,
          product: {
            ...state.product,
            price: state.product.price - state.firstPrice,
          },
        };
      }
      return state;
    case 'SET_SELECTED_SIZE':
      return {
        ...state,
        selectedSize: action.payload,
      };
    default:
      return state;
  }
}


export default function ProductDetail() {
  const { id, size} = useParams();
  const [state, dispatch] = useReducer(reducer, initialState);
  const { quantity, product, selectedSize  } = state;
  const [cookies,setCookie] = useCookies(['cart']);
  const navigate = useNavigate();

  useEffect(() => {
    const getProductById = async () => {
      try {
        const res = await axios.get('http://localhost:8000/api/products/' + id);
        dispatch({ type: 'SET_PRODUCT', payload: res.data });
        dispatch({ type: 'SET_FIRST_PRICE', payload: res.data.price });
        dispatch({ type: 'SET_SELECTED_SIZE', payload: size ? size : res.data.sizes[0] });
      } catch (err) {
        console.log(err);
      }
    };
    getProductById();
  }, [id,size]);

  const increaseQuantity = () => {
    dispatch({ type: 'INCREASE_QUANTITY' });
  };

  const decreaseQuantity = () => {
    dispatch({ type: 'DECREASE_QUANTITY' });
  };
  const selectSize = (size) => {
    dispatch({ type: 'SET_SELECTED_SIZE', payload: size });
  };

  const handleCart = () => {
    if(selectedSize !== '' ){
      const cartItems = cookies.cart || [];
      if(cartItems.length === 0)
        setCookie('cart', [{"id":product._id,"quantity":quantity,"size":selectedSize}]);
      else
        setCookie('cart', [...cartItems, {"id":product._id,"quantity":quantity,"size":selectedSize}]);
      navigate('/cart')
    }

  }

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
                  <button
                    className={`product-size-btn ${selectedSize === size ? 'selected' : ''}`}
                    key={index}
                    onClick={() => selectSize(size)}
                >
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
                  onChange={(e) =>
                    dispatch({ type: 'SET_QUANTITY', payload: e.target.value })
                  }
                />
                <button onClick={increaseQuantity} className='quantity-btn'>
                  +
                </button>
              </div>
            </div>
            <button className='add-to-cart-btn' onClick={() => handleCart()}>Add to cart</button>
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
