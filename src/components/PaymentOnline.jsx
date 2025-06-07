import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import paymentService from '../services/paymentService';
import orderService from "../services/orderService";
import '../styles/PaymentOnline.css';

export default function PaymentOnline() {
  const { orderId } = useParams();
  const [loading, setLoading] = useState(false);
  const [loadingOrders, setLoadingOrders] = useState(false);
  const [error, setError] = useState(null);
  const [orders, setOrders] = useState([]);
  const [currentOrder, setCurrentOrder] = useState(null);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    setLoadingOrders(true);
    setError("");
    try {
      const data = await orderService.getOrdersByToken();

      if (Array.isArray(data)) {
        setOrders(data);
        const matchedOrder = data.find(order => String(order.id) === orderId);
        setCurrentOrder(matchedOrder || null);
      } else {
        setOrders([]);
        setCurrentOrder(null);
      }
    } catch (err) {
      console.error(err);
      setError("Bạn chưa đăng nhập hoặc phiên đăng nhập đã hết hạn.");
    } finally {
      setLoadingOrders(false);
    }
  };

  const handlePayment = async () => {
    setError(null);
    if (!orderId) {
      setError('Không có orderId trong URL');
      return;
    }

    if (!currentOrder) {
      setError('Không tìm thấy đơn hàng để thanh toán');
      return;
    }

    setLoading(true);
    try {
      const result = await paymentService.createPayment(Number(orderId));
      console.log('Response payment:', result);

      if (result.status === 'OK' && result.url) {
        window.location.href = result.url; 
      } else {
        setError('Không lấy được URL thanh toán');
      }
    } catch (err) {
      setError('Lỗi tạo đơn thanh toán: ' + err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="payment-container">
      <h2 className="payment-title">Thanh toán online cho đơn </h2>

      {loadingOrders ? (
        <p>Đang tải thông tin đơn hàng...</p>
      ) : error ? (
        <p className="payment-error">{error}</p>
      ) : currentOrder ? (
        <div className="payment-order-info">
          <p><strong>Ngày đặt:</strong> {new Date(currentOrder.orderdate).toLocaleString()}</p>
          <p><strong>Địa chỉ giao hàng:</strong> {currentOrder.shippingaddress}</p>
          <p><strong>Tổng tiền:</strong> {currentOrder.totalamount.toLocaleString()} VNĐ</p>
          <p><strong>Phương thức thanh toán:</strong> {currentOrder.paymentmethod}</p>
          <p><strong>Trạng thái:</strong> {currentOrder.status}</p>

          <div style={{ marginTop: 10 }}>
            <strong>Chi tiết sản phẩm:</strong>
            {Array.isArray(currentOrder.details) && currentOrder.details.map(item => (
              <div key={item.id} className="payment-product">
                <img
                  src={item.product.main_image_url || "/default-product.png"}
                  alt={item.product.name}
                />
                <div className="payment-product-info">
                  <p>{item.product.name}</p>
                  <p>Số lượng: {item.quantity}</p>
                  <p>Giá: {item.price.toLocaleString()} VNĐ</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <p>Không tìm thấy đơn hàng có mã #{orderId}.</p>
      )}

      <button
        className="payment-button"
        onClick={handlePayment}
        disabled={loading || !currentOrder}
      >
        {loading ? 'Đang tạo đơn...' : 'Thanh toán'}
      </button>
    </div>
  );
}
