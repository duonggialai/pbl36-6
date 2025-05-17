import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  fetchCartFromServer,
  removeProductFromCart,
  updateProductQuantity,
} from '../redux-toolkit/cartThunk';
import '../styles/Cart.css';
import { useNavigate } from 'react-router-dom';
const Cart = () => {
  const dispatch = useDispatch();
  const { carts, loading, error } = useSelector((state) => state.cart);
  const token = useSelector((state) => state.auth.token) || localStorage.getItem('token');
const navigate = useNavigate();
  useEffect(() => {
    if (token) {
      dispatch(fetchCartFromServer(token));
    }
  }, [dispatch, token]);

  const totalPrice = carts.reduce((total, item) => {
    const quantity = item.quantity || 1;
    const price = item.product?.price ?? 0;
    return total + price * quantity;
  }, 0);

  const handleRemove = (id) => {
    dispatch(removeProductFromCart({ id, token }));
  };

  const handleUpdateQuantity = (id, quantity) => {
    if (quantity <= 0) return;
    dispatch(updateProductQuantity({ id, quantity, token }));
  };

  const handleBuyNow = (item) => {
    
navigate('/checkout', { state: { product: item.product } });
 

  };

  return (
    <div className="cart-page">
      <h2>Giỏ hàng của bạn</h2>

      {loading ? (
        <p>Đang tải giỏ hàng...</p>
      ) : error ? (
        <p style={{ color: 'red' }}>Lỗi: {error}</p>
      ) : carts.length === 0 ? (
        <p>Giỏ hàng đang trống.</p>
      ) : (
        <>
          <ul className="cart-list">
            {carts.map((item) => (
              <li key={item.id} className="cart-item">
                <img src={item.product?.main_image_url} alt={item.product?.name} className="cart-img" />
                <div className="cart-info">
                  <div className="info-top">
                    <h3 className="cart-item-name">{item.product?.name}</h3>
                  </div>
                  <p>Giá: {(item.product?.price ?? 0).toLocaleString()} ₫</p>
                  <div className="quantity-control">
                    <button
                      className="qty-btn"
                      onClick={() => handleUpdateQuantity(item.id, (item.quantity || 1) - 1)}
                    >
                      -
                    </button>
                    <span className="qty-number">{item.quantity || 1}</span>
                    <button
                      className="qty-btn"
                      onClick={() => handleUpdateQuantity(item.id, (item.quantity || 1) + 1)}
                    >
                      +
                    </button>
                  </div>
                  <p className="item-total">
                    Tổng: {((item.product?.price ?? 0) * (item.quantity || 1)).toLocaleString()} ₫
                  </p>
                </div>
                <div className="cart-actions">
                  <button onClick={() => handleBuyNow(item)} className="buy-now-btn">
                    Mua hàng
                  </button>
                  <button onClick={() => handleRemove(item.id)} className="remove-btn">
                    Xóa
                  </button>
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
