import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import orderService from '../services/orderService';
import '../styles/Checkout.css';

const Checkout = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { product } = location.state || {};

  const [address, setAddress] = useState('');
  const [phone, setPhone] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('COD'); // COD mặc định

  const handleOrder = async () => {
    if (!address || !phone) {
      alert('Vui lòng nhập đầy đủ thông tin!');
      return;
    }

    const orderData = {
      shippingaddress: address,
      paymentmethod: paymentMethod,
      items: [
        {
          productid: product.id,
          quantity: 1
        }
      ]
    };

    try {
      await orderService.createOrder(orderData);
      alert('Đặt hàng thành công!');
      navigate('/');
    } catch (error) {
      console.error('Lỗi khi đặt hàng:', error);
      alert('Đặt hàng thất bại!');
    }
  };

  if (!product) return <div>Không có sản phẩm để đặt hàng.</div>;

  return (
    <div className="checkout-container">
      <div className="checkout-box">
        <h2 className="checkout-title">Xác nhận đơn hàng</h2>

        <div className="checkout-product">
          <img
            src={product.main_image_url}
            alt={product.name}
            className="checkout-image"
          />
          <div className="product-info">
            <h3 className="product-name">{product.name}</h3>
            <p className="product-price">{product.price.toLocaleString()} ₫</p>
          </div>
        </div>

        <form className="checkout-form" onSubmit={(e) => { e.preventDefault(); handleOrder(); }}>
          <div className="form-group">
            <label htmlFor="address" className="checkout-label">Địa chỉ giao hàng</label>
            <input
              id="address"
              type="text"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              className="checkout-input"
              placeholder="Ví dụ: 123 Nguyễn Văn Cừ, Q.5, TP.HCM"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="phone" className="checkout-label">Số điện thoại</label>
            <input
              id="phone"
              type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="checkout-input"
              placeholder="Ví dụ: 0901234567"
              required
              pattern="[0-9]{9,12}"
              title="Số điện thoại chỉ chứa số, từ 9 đến 12 chữ số"
            />
          </div>

          <div className="form-group">
            <label htmlFor="payment" className="checkout-label">Phương thức thanh toán</label>
            <select
              id="payment"
              value={paymentMethod}
              onChange={(e) => setPaymentMethod(e.target.value)}
              className="checkout-select"
              required
            >
              <option value="COD">Thanh toán khi nhận hàng (COD)</option>
              <option value="BANK_TRANSFER">Chuyển khoản ngân hàng</option>
              <option value="MOMO">Ví Momo</option>
              <option value="VNPAY">VNPAY</option>
            </select>
          </div>

          <button type="submit" className="checkout-button">Đặt hàng ngay</button>
        </form>
      </div>
    </div>
  );
};

export default Checkout;
