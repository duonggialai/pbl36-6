import React from 'react';
import '../styles/Cart.css';
import { useSelector } from 'react-redux';

const Cart = () => {
  const carts = useSelector((state) => state.cart.carts);

  const totalPrice = carts.reduce((total, item) => {
    const quantity = item.quantity || 1;
    return total + item.price * quantity;
  }, 0);

  return (
    <div className="cart-page">
      <h2>Giỏ hàng của bạn</h2>
      {carts.length === 0 ? (
        <p>Giỏ hàng đang trống.</p>
      ) : (
        <>
          <ul className="cart-list">
            {carts.map((item, index) => (
              <li key={index} className="cart-item">
                <img src={item.thumbnail} alt={item.title} className="cart-img" />
                <div className="cart-info">
                  <h3>{item.title}</h3>
                  <p>Giá: {item.price.toLocaleString()} ₫</p>
                  <p>Số lượng: {item.quantity || 1}</p>
                  <p>Tổng: {(item.price * (item.quantity || 1)).toLocaleString()} ₫</p>
                </div>
              </li>
            ))}
          </ul>
          <h3>Tổng cộng: {totalPrice.toLocaleString()} ₫</h3>
        </>
      )}
    </div>
  );
};

export default Cart;
