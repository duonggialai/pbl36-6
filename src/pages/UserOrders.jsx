import React, { useEffect, useState } from "react";
import orderService from "../services/orderService";
import "../styles/UserOrders.css";

const statusLabels = {
  pending: "Đang xử lý",
  processing: "Đang Giao",
  shipped: "Đã Giao",
  cancelled: "Đơn hủy",
};

const cancellableStatuses = ["pending", "processing"]; 

const UserOrders = ({ filterStatus }) => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [cancelingOrderId, setCancelingOrderId] = useState(null); 

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    setLoading(true);
    setError("");
    try {
      const data = await orderService.getOrdersByToken();

      if (Array.isArray(data)) {
        setOrders(data);
      } else {
        setOrders([]);
      }
    } catch (err) {
      console.error(err);
      setError("Bạn chưa đăng nhập hoặc phiên đăng nhập đã hết hạn.");
    } finally {
      setLoading(false);
    }
  };

  const handleCancelOrder = async (orderId) => {
    if (!window.confirm("Bạn có chắc chắn muốn hủy đơn hàng này không?")) return;

    try {
      setCancelingOrderId(orderId);
      await orderService.cancelOrder(orderId);
      // Cập nhật lại danh sách đơn hàng sau khi hủy thành công
      await fetchOrders();
    } catch (err) {
      console.error(err);
      alert("Bạn không thể hủy đơn hàng. Vui lòng thử lại sau.");
    } finally {
      setCancelingOrderId(null);
    }
  };

  if (loading) return <p>Đang tải đơn hàng...</p>;
  if (error) return <p className="error-message">{error}</p>;

  let filteredOrders = [];
  if (Array.isArray(orders)) {
    filteredOrders = filterStatus
      ? orders.filter((order) => order.status === filterStatus)
      : orders;
  }

  if (!Array.isArray(filteredOrders) || filteredOrders.length === 0) {
    return <p>Không có đơn hàng phù hợp.</p>;
  }

  return (
    <div className="user-orders-section">
      <h3>Lịch Sử Đơn Hàng</h3>
      {filteredOrders.map((order) => (
        <div key={order.id} className="order-card">
          <div className="order-header">
            <div>
              <p><strong>Mã đơn:</strong> {order.id}</p>
              <p><strong>Ngày đặt:</strong> {new Date(order.orderdate).toLocaleString()}</p>
              <p>
                <strong>Trạng thái:</strong>{" "}
                <span className={`order-status ${order.status}`}>
                  {statusLabels[order.status] || order.status}
                </span>
              </p>
            </div>
            <div style={{ textAlign: "right" }}>
              <p><strong>Tổng tiền:</strong> {order.totalamount.toLocaleString()} VNĐ</p>
              <p><strong>Phương thức thanh toán:</strong> {order.paymentmethod}</p>
            </div>
          </div>

          <p className="order-shipping-address">
            <strong>Địa chỉ giao hàng:</strong> {order.shippingaddress}
          </p>

          <div className="order-details">
            <strong>Chi tiết sản phẩm:</strong>
            <div>
              {Array.isArray(order.details) && order.details.map((item) => (
                <div key={item.id} className="order-product">
                  <img
                    src={item.product.main_image_url || "/default-product.png"}
                    alt={item.product.name}
                  />
                  <div className="order-product-info">
                    <p className="order-product-name">{item.product.name}</p>
                    <p className="order-product-qty-price">
                      Số lượng: <strong>{item.quantity}</strong> &nbsp;|&nbsp; Giá:{" "}
                      <strong>{item.price.toLocaleString()} VNĐ</strong>
                    </p>
                    <p className="order-product-code">
                      Mã sản phẩm: {item.product.id || "N/A"}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          
          {cancellableStatuses.includes(order.status) && (
            <button
              disabled={cancelingOrderId === order.id}
              onClick={() => handleCancelOrder(order.id)}
              className="cancel-order-button"
            >
              {cancelingOrderId === order.id ? "Đang hủy..." : "Hủy đặt hàng"}
            </button>
          )}
        </div>
      ))}
    </div>
  );
};

export default UserOrders;
