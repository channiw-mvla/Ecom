import React, { useEffect } from 'react';
import './ProductView.css';
import { useNavigate } from 'react-router-dom';

const ProductView = ({ _id, image1, image2, name, price, sizes }) => {
  const navigate = useNavigate();
  useEffect(() => {
    console.log(_id);
  }, []);
  return (
    <div className='product-view'>
      <img
        src={image1}
        alt='Product'
        className='img-fluid'
        onMouseOver={(e) => (e.target.src = image2)}
        onMouseOut={(e) => (e.target.src = image1)}
        onClick={() => navigate('/products/' + _id)}
      />
      <h3 className='product-title'>{name}</h3>
      <p className='product-price'>Price: ${price.toFixed(2)}</p>
      <select className='form-select mb-3'>
        <option value=''>Select Size</option>
        {sizes.map((value, index) => {
          return (
            <option key={index} value={value}>
              {value}
            </option>
          );
        })}
      </select>
      <button
        className='btn btn-primary w-100'
        onClick={() => navigate('/cart')}
      >
        Add to Cart
      </button>
    </div>
  );
};

export default ProductView;
