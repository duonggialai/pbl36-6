import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  fetchCartFromServer,
  removeProductFromCart,
  updateProductQuantity,
} from '../redux-toolkit/cartThunk';
import '../styles/Cart.css';
import { useNavigate } from 'react-router-dom';
import { setCheckoutProducts } from '../redux-toolkit/checkoutSlice';

const Cart = () => {
  const dispatch = useDispatch();
  const { carts, loading, error } = useSelector((state) => state.cart);
  const token = useSelector((state) => state.auth.token) || localStorage.getItem('token');
  const navigate = useNavigate();

  const [selectedItems, setSelectedItems] = useState([]);

  useEffect(() => {
    if (token) {
      dispatch(fetchCartFromServer(token));
    }
  }, [dispatch, token]);

  const handleRemove = (id) => {
    dispatch(removeProductFromCart({ id, token }));
    setSelectedItems(prev => prev.filter(itemId => itemId !== id));
  };

  const handleUpdateQuantity = (id, quantity) => {
    if (quantity <= 0) return;
    dispatch(updateProductQuantity({ id, quantity, token }));
  };

  const toggleSelectItem = (id) => {
    setSelectedItems(prev =>
      prev.includes(id) ? prev.filter(itemId => itemId !== id) : [...prev, id]
    );
  };

  const toggleSelectAll = () => {
    if (selectedItems.length === carts.length) {
      setSelectedItems([]);
    } else {
      setSelectedItems(carts.map(item => item.id));
    }
  };

  const totalPrice = carts.reduce((total, item) => {
    if (!selectedItems.includes(item.id)) return total;
    const quantity = item.quantity || 1;
    const price = item.product?.price ?? 0;
    return total + price * quantity;
  }, 0);


  const handleBuyNow = (item) => {
    const product = {
      id: item.product.id,
      name: item.product.name,
      price: item.product.price,
      quantity: item.quantity,
      image: item.product.main_image_url,
    };
    dispatch(setCheckoutProducts([product]));
    navigate('/checkout');
  };

  const handleBuySelected = () => {
    if (selectedItems.length === 0) {
      alert('Vui lòng chọn sản phẩm để mua.');
      return;
    }

    const selectedProducts = carts
      .filter(item => selectedItems.includes(item.id))
      .map(item => ({
        id: item.product.id,
        name: item.product.name,
        price: item.product.price,
        quantity: item.quantity,
        image: item.product.main_image_url,
      }));

    dispatch(setCheckoutProducts(selectedProducts));
    navigate('/checkout');
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
          <div className="cart-select-all">
            <input
              type="checkbox"
              checked={selectedItems.length === carts.length}
              onChange={toggleSelectAll}
              id="select-all"
            />
            <label htmlFor="select-all">Chọn tất cả ({carts.length} sản phẩm)</label>
          </div>

          <ul className="cart-list">
            {carts.map((item) => (
              <li key={item.id} className="cart-item">
                <input
                  type="checkbox"
                  checked={selectedItems.includes(item.id)}
                  onChange={() => toggleSelectItem(item.id)}
                  className="item-checkbox"
                />
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

          <div className="cart-footer">
            <div>
              <strong>Tổng tiền:</strong> {totalPrice.toLocaleString()} ₫
            </div>
            <button onClick={handleBuySelected} className="buy-selected-btn">
              Mua hàng
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default Cart;
