import React from 'react';
import '../styles/BoxProduct.css';
import { useDispatch } from 'react-redux';
import { addToCart } from '../redux-toolkit/cartSlice';  

const BoxProduct = ({ product }) => {
  const dispatch = useDispatch();

  
  const handleAddToFormCart = () => {
    dispatch(addToCart(product));  
    // console.log('Sản phẩm đã được thêm vào giỏ hàng:', product);
  }

  return (
    <div className="box-product">
      <div className="product-img">
        <img src={product.thumbnail} alt={product.title} />
      </div>
      <div className="product-info">
        <h3 className="title">{product.title}</h3>
        <p className="price">{product.price.toLocaleString()} ₫</p>
        <p className="rating">⭐ {product.rating}</p>
        <div className="bottom-info">
          <span className="brand">{product.brand}</span>
          <span className="stock">{product.stock} sp</span>
        </div>
       
        
        <button onClick={handleAddToFormCart} className="buy-button">Mua hàng</button>
      </div>
    </div>
  );
};

export default BoxProduct;
