import React, { useEffect, useState } from "react";
import orderService from "../../services/orderService";
import "../../styles/ManageOrders.css";

const ManageOrders = () => {
  const [orders, setOrders] = useState([]);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");

  const fetchOrders = async () => {
    try {
      const data = await orderService.getAllOrders();
      console.log(data);
      setOrders(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error("Lỗi khi lấy đơn hàng:", err);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const handleAccept = async (id) => {
    await orderService.acceptOrder(id);
    fetchOrders();
  };

  const handleComplete = async (id) => {
    await orderService.completeOrder(id);
    fetchOrders();
  };

  const handleCancel = async (id) => {
    await orderService.cancelOrder(id);
    fetchOrders();
  };

  const getStatusClass = (status) => {
    switch (status.toLowerCase()) {
      case "pending":
        return "status-pending";
      case "processing":
        return "status-processing";
      case "shipped":
        return "status-shipped";
      case "cancelled":
        return "status-cancelled";
      default:
        return "";
    }
  };

  const filteredOrders = orders.filter((order) => {
    const orderDate = new Date(order.orderdate);
    const from = fromDate ? new Date(fromDate) : null;
    const to = toDate ? new Date(toDate) : null;
    return (
      (!from || orderDate >= from) &&
      (!to || orderDate <= to)
    );
  });

  return (
    <div className="manage-orders">
      <h2>Quản lý đơn hàng</h2>
      <div className="filter-group">
        <div>
          <label>Từ ngày:</label>
          <input
            type="date"
            value={fromDate}
            onChange={(e) => setFromDate(e.target.value)}
          />
        </div>
        <div>
          <label>Đến ngày:</label>
          <input
            type="date"
            value={toDate}
            onChange={(e) => setToDate(e.target.value)}
          />
        </div>
      </div>

      <table className="orders-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Khách hàng</th>
            <th>SĐT</th>
            <th>Tổng tiền</th>
            <th>Ngày đặt</th>
            <th>Trạng thái</th>
            <th>Hành động</th>
            <th>Chi tiết</th>
          </tr>
        </thead>
        <tbody>
          {filteredOrders.length === 0 ? (
            <tr>
              <td colSpan="8" className="no-orders">
                Không tìm thấy đơn hàng nào.
              </td>
            </tr>
          ) : (
            filteredOrders.map((order) => (
              <tr key={order.id}>
                <td>{order.id}</td>
                <td>{order.user?.fullname}</td>
                <td>{order.user?.phonenumber}</td>
                <td>{order.totalamount.toLocaleString()}₫</td>
                <td>{new Date(order.orderdate).toLocaleDateString()}</td>
                <td className={getStatusClass(order.status)}>
                  {order.status}
                </td>
                <td className="actions-cell">
                  {order.status === "pending" && (
                    <>
                      <button
                        className="action-btn btn-accept"
                        onClick={() => handleAccept(order.id)}
                      >
                        Xác nhận
                      </button>
                      <button
                        className="action-btn btn-cancel"
                        onClick={() => handleCancel(order.id)}
                      >
                        Hủy
                      </button>
                    </>
                  )}
                  {order.status === "processing" && (
                    <button
                      className="action-btn btn-complete"
                      onClick={() => handleComplete(order.id)}
                    >
                      Giao hàng
                    </button>
                  )}
                 
                </td>
                <td>
                    <button
                    className="action-btn btn-detail"
                    onClick={() => setSelectedOrder(order)}
                  >
                    Chi tiết
                  </button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>

    
      {selectedOrder && (
        <div className="order-details">
          <h3>Chi tiết đơn hàng #{selectedOrder.id}</h3>
          <p>
            <strong>Khách hàng:</strong> {selectedOrder.user?.fullname}
          </p>
          <p>
            <strong>Địa chỉ giao hàng:</strong> {selectedOrder.shippingaddress}
          </p>
          <p>
            <strong>Phương thức thanh toán:</strong> {selectedOrder.paymentmethod}
          </p>
          <p>
            <strong>Tổng tiền:</strong> {selectedOrder.totalamount.toLocaleString()}₫
          </p>
          <h4>Sản phẩm:</h4>
          <ul>
            {selectedOrder.details?.map((item) => (
              <li key={item.id}>
                {item.product?.name} - SL: {item.quantity} - Giá:{" "}
                {item.price.toLocaleString()}₫
              </li>
            ))}
          </ul>
          <button className="close-btn" onClick={() => setSelectedOrder(null)}>
            Đóng
          </button>
        </div>
      )}
    </div>
  );
};

export default ManageOrders;
