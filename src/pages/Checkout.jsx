import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { resetCheckout } from '../redux-toolkit/checkoutSlice';
import orderService from '../services/orderService';
import '../styles/Checkout.css';

const PAYMENT_METHODS = [
  { label: 'Thanh toán khi nhận hàng (COD)', value: 'COD' },
 
  { label: 'Chuyển khoản ngân hàng', value: 'BankTransfer' },
 
];

const Checkout = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const products = useSelector(state => state.checkout.products);
  const token = useSelector(state => state.auth.token);

  const [address, setAddress] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('COD');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    return () => {
      dispatch(resetCheckout());
    };
  }, [dispatch]);

  if (!products || products.length === 0) {
    return <div>Không có sản phẩm để đặt hàng.</div>;
  }

  const totalPrice = products.reduce(
    (sum, p) => sum + (p.price * (p.quantity || 1)),
    0
  );

  const handleOrder = async () => {
    if (!address.trim()) {
      alert('Vui lòng nhập địa chỉ giao hàng!');
      return;
    }

    if (!token) {
      alert('Vui lòng đăng nhập để đặt hàng!');
      return;
    }

    const items = products.map(p => ({
      productid: p.id,
      quantity: p.quantity || 1,
    }));

    const orderData = {
      shippingaddress: address,
      paymentmethod: paymentMethod,
      items,
    };

    try {
      setLoading(true);
      await orderService.createOrder(orderData, token);
      alert('Đặt hàng thành công!');
      setAddress('');
      setPaymentMethod('COD');
      dispatch(resetCheckout());
      navigate('/');
    } catch (error) {
      console.error('Lỗi khi đặt hàng:', error);
      alert('Đặt hàng thất bại!');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="checkout-container">
      <div className="checkout-box">
        <h2 className="checkout-title">Xác nhận đơn hàng</h2>

        {products.map(product => (
          <div key={product.id} className="checkout-product">
            <img
              src={product.image}
              alt={product.name}
              className="checkout-image"
              onError={e => {
                e.target.src = '/images/placeholder.png';
              }}
            />
            <div className="product-info">
              <h3 className="product-name">{product.name}</h3>
              <p className="product-price">{product.price.toLocaleString()} ₫</p>
              <p>Số lượng: {product.quantity || 1}</p>
            </div>
          </div>
        ))}

        <h3 style={{ textAlign: 'right', marginTop: 10 }}>
          Tổng tiền: {totalPrice.toLocaleString()} ₫
        </h3>

        <form
          className="checkout-form"
          onSubmit={e => {
            e.preventDefault();
            if (!loading) {
              handleOrder();
            }
          }}
        >
          <div className="form-group">
            <label htmlFor="address" className="checkout-label">
              Địa chỉ giao hàng
            </label>
            <input
              id="address"
              type="text"
              value={address}
              onChange={e => setAddress(e.target.value)}
              className="checkout-input"
              placeholder="Ví dụ: 123 Nguyễn Văn Cừ, Q.5, TP.HCM"
              required
              disabled={loading}
            />
          </div>

          <div className="form-group">
            <label htmlFor="payment" className="checkout-label">
              Phương thức thanh toán
            </label>
            <select
              id="payment"
              value={paymentMethod}
              onChange={e => setPaymentMethod(e.target.value)}
              className="checkout-select"
              required
              disabled={loading}
            >
              {PAYMENT_METHODS.map(method => (
                <option key={method.value} value={method.value}>
                  {method.label}
                </option>
              ))}
            </select>
          </div>

          <button type="submit" className="checkout-button" disabled={loading}>
            {loading ? 'Đang xử lý...' : 'Đặt hàng ngay'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Checkout;
