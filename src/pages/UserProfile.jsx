import React, { useEffect, useState } from "react";
import authServices from "../services/authServices";
import "../styles/UserProfile.css";

const UserProfile = () => {
  const [user, setUser] = useState(null);
  const [error, setError] = useState("");
  const [successMsg, setSuccessMsg] = useState("");
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    username: "",
    fullname: "",
    email: "",
    address: "",
    phonenumber: "",
  });

  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const userData = await authServices.getCurrentUser();
        setUser(userData);
        setFormData({
          username: userData.username || "",
          fullname: userData.fullname || "",
          email: userData.email || "",
          address: userData.address || "",
          phonenumber: userData.phonenumber || "",
        });
      } catch (err) {
        setError("Không thể tải thông tin người dùng.");
      } finally {
        setLoading(false);
      }
    };

    fetchUserInfo();
  }, []);

  const handleEditClick = () => {
    setIsEditing(true);
    setSuccessMsg("");
    setError("");
  };

  const handleCancel = () => {
    setFormData({
      username: user.username || "",
      fullname: user.fullname || "",
      email: user.email || "",
      address: user.address || "",
      phonenumber: user.phonenumber || "",
    });
    setIsEditing(false);
    setError("");
    setSuccessMsg("");
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = async () => {
    try {
      if (!user || !user.id) {
        setError("Không có ID người dùng để cập nhật.");
        return;
      }

      const payload = {
        username: formData.username, 
        passwordhash: user.passwordhash || "", 
        email: formData.email,
        fullname: formData.fullname,
        address: formData.address,
        phonenumber: formData.phonenumber,
        roleid: user.roleid || 1, 
      };

  //    console.log("Dữ liệu ", payload);
      await authServices.updateUserInfo(payload, user.id);

      setUser((prev) => ({ ...prev, ...payload }));
      setIsEditing(false);
      setError("");
      setSuccessMsg("Cập nhật thông tin thành công!");
    } catch (err) {
      if (err.response && err.response.data) {
      //  console.error("Chi tiết lỗi từ backend:", err.response.data);
        setError(
          `Cập nhật thất bại: ${err.response.data.message || JSON.stringify(err.response.data)}`
        );
      } else {
        setError("Cập nhật thông tin thất bại.");
      }
      setSuccessMsg("");
    }
  };

  if (loading) {
    return (
      <div className="user-profile-container">
        <p>Đang tải thông tin người dùng...</p>
      </div>
    );
  }

  return (
    <div className="user-profile-container">
      {error && <p className="error-message">{error}</p>}
      {successMsg && <p className="success-message">{successMsg}</p>}
      <div className="user-info">
        <div className="user-header">
          <div className="user-avatar">
            <img src="/img/avt.jpg" alt="User Avatar" />
          </div>
          <div className="user-details">
            <h2>{user.fullname}</h2>
            <p className="username">@{user.username}</p>
          </div>
        </div>

        <div className="user-details-section">
          <h3>Thông Tin Cá Nhân</h3>

          {isEditing ? (
            <>
              <div className="info-item">
                <label>Username:</label>
                <input
                  type="text"
                  name="username"
                  value={formData.username}
                  disabled
                />
              </div>
             
              <div className="info-item">
                <label>Họ và tên:</label>
                <input
                  type="text"
                  name="fullname"
                  value={formData.fullname}
                  onChange={handleChange}
                />
              </div>
              <div className="info-item">
                <label>Email:</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                />
              </div>
              <div className="info-item">
                <label>Địa chỉ:</label>
                <input
                  type="text"
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                />
              </div>
              <div className="info-item">
                <label>Số điện thoại:</label>
                <input
                  type="text"
                  name="phonenumber"
                  value={formData.phonenumber}
                  onChange={handleChange}
                />
              </div>
              <div className="btn-group">
                <button onClick={handleSave} className="save-btn">
                  Lưu
                </button>
                <button onClick={handleCancel} className="cancel-btn">
                  Hủy
                </button>
              </div>
            </>
          ) : (
            <>
              <div className="info-item">
                <p>Username: {user.username}</p>
              </div>
              <div className="info-item">
                <p>Email: {user.email}</p>
              </div>
              <div className="info-item">
                <p>Họ và tên: {user.fullname}</p>
              </div>
              <div className="info-item">
                <p>Địa chỉ: {user.address}</p>
              </div>
              <div className="info-item">
                <p>Số điện thoại: {user.phonenumber}</p>
              </div>
              <button onClick={handleEditClick} className="edit-btn">
                Chỉnh sửa thông tin
              </button>
            </>
          )}
        </div>

        <div className="user-orders-section">
          <h3>Lịch Sử Mua Sắm</h3>
          <p>Chưa có đơn hàng nào.</p>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
