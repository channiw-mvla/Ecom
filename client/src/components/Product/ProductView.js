import React, { useState }  from 'react';
import { useCookies } from 'react-cookie';
import './ProductView.css';
import { useNavigate } from 'react-router-dom';

const ProductView = ({ _id, image1, image2, name, price, sizes }) => {
  const navigate = useNavigate();
  const [cookies,setCookie] = useCookies(['cart']);
  const [selectedSize, setSelectedSize] = useState('')
  const handleCart = () => {
    if(selectedSize !== '' ){
      const cartItems = cookies.cart || [];
      if(cartItems.length === 0)
        setCookie('cart', [{"id":_id,"quantity":1,"size":selectedSize}]);
      else
        setCookie('cart', [...cartItems, {"id":_id,"quantity":1,"size":selectedSize}]);
      navigate('/cart')
    }

  }
  const handleSizeChange = size => setSelectedSize(size)

  return (
    <div className='product-view'>
      <img
        src={image1}
        alt='Product'
        className='img-fluid'
        onMouseOver={(e) => (e.target.src = image2)}
        onMouseOut={(e) => (e.target.src = image1)}
        onClick={() => selectedSize === "" ? navigate('/products/' + _id) : navigate('/products/' + _id+"/"+selectedSize)}
      />
      <h3 className='product-title'>{name}</h3>
      <p className='product-price'>Price: ${price.toFixed(2)}</p>
      <select className='form-select mb-3' onChange={e=>handleSizeChange(e.target.value)}>
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
        onClick={() => handleCart()}
      >
        Add to Cart
      </button>
    </div>
  );
};

export default ProductView;
