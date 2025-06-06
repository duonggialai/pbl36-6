import React, { useEffect, useState } from 'react';
import shippingService from '../../services/shippingService';
import '../../styles/ManageShipping.css';

const ManageShipping = () => {
  const [shippings, setShippings] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [editStatusId, setEditStatusId] = useState(null);
  const [newStatus, setNewStatus] = useState('');

  const fetchShippings = async () => {
    setLoading(true);
    try {
      const data = await shippingService.getAllShippings();
      setShippings(data.result || []);
      setError('');
    } catch (err) {
      setError('Lỗi khi tải dữ liệu vận chuyển');
      console.error(err);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchShippings();
  }, []);

  const handleEditClick = (id, currentStatus) => {
    setEditStatusId(id);
    setNewStatus(currentStatus);
  };

  const handleCancelClick = () => {
    setEditStatusId(null);
    setNewStatus('');
  };

  const handleSaveClick = async (id) => {
    try {
      await shippingService.updateShippingStatus(id, { shippingstatus: newStatus });
      setEditStatusId(null);
      setNewStatus('');
      fetchShippings();
    } catch (err) {
      alert('Cập nhật trạng thái thất bại');
      console.error(err);
    }
  };

  return (
    <div className="manage-shipping">
      <h2>Quản lý vận chuyển</h2>

      {loading ? (
        <p>Đang tải dữ liệu...</p>
      ) : error ? (
        <p className="error">{error}</p>
      ) : (
        <table className="shipping-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Ngày gửi</th>
              <th>Ngày dự kiến giao</th>
              <th>Trạng thái</th>
              <th>Mã theo dõi</th>
              {/* <th>Thao tác</th> */}
            </tr>
          </thead>
          <tbody>
            {shippings.length === 0 ? (
              <tr>
                <td colSpan="6">Không có dữ liệu vận chuyển</td>
              </tr>
            ) : (
              shippings.map((ship) => (
                <tr key={ship.id}>
                  <td>{ship.id}</td>
                  <td>{new Date(ship.shippingdate).toLocaleDateString()}</td>
                  <td>{new Date(ship.estimateddeliverydate).toLocaleDateString()}</td>
                  <td>
                    {editStatusId === ship.id ? (
                      <select
                        value={newStatus}
                        onChange={(e) => setNewStatus(e.target.value)}
                      >
                        <option value="Delivered">Delivered</option>
                        <option value="In Transit">In Transit</option>
                        <option value="Shipped">Shipped</option>
                        <option value="Pending">Pending</option>
                      </select>
                    ) : (
                      ship.shippingstatus
                    )}
                  </td>
                  <td>{ship.trackingnumber}</td>
                  {/* <td>
                    {editStatusId === ship.id ? (
                      <>
                        <button onClick={() => handleSaveClick(ship.id)}>Lưu</button>
                        <button onClick={handleCancelClick}>Hủy</button>
                      </>
                    ) : (
                      <button onClick={() => handleEditClick(ship.id, ship.shippingstatus)}>
                        Sửa trạng thái
                      </button>
                    )}
                  </td> */}
                </tr>
              ))
            )}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default ManageShipping;
