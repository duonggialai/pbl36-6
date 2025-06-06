import React, { useEffect, useState } from "react";
import authServices from "../services/authServices";
import "../styles/UserProfile.css";
import UserOrders from "./UserOrders";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const UserProfile = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [error, setError] = useState("");
  const [successMsg, setSuccessMsg] = useState("");
  const [loading, setLoading] = useState(true);

 
  const [isEditingAccount, setIsEditingAccount] = useState(false);
  const [isEditingPassword, setIsEditingPassword] = useState(false);

  const [activeTab, setActiveTab] = useState("account");
  const token = useSelector((state) => state.auth.token) || localStorage.getItem("token");

  const [formData, setFormData] = useState({
    username: "",
    fullname: "",
    email: "",
    address: "",
    phonenumber: "",
    roleid: "",
    newPassword: "",
    confirmPassword: "",
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
          roleid: userData.roleid,
          newPassword: "",
          confirmPassword: "",
        });
      } catch (err) {
        setError("Không thể tải thông tin người dùng.");
      } finally {
        setLoading(false);
      }
    };

    fetchUserInfo();
  }, []);

  useEffect(() => {
    if (!token) {
      navigate("/login");
    }
  }, [token, navigate]);

  const handleEditAccountClick = () => {
    setIsEditingAccount(true);
    setSuccessMsg("");
    setError("");
  };

  const handleCancelAccountEdit = () => {
    if (user) {
      setFormData((prev) => ({
        ...prev,
        username: user.username || "",
        fullname: user.fullname || "",
        email: user.email || "",
        address: user.address || "",
        phonenumber: user.phonenumber || "",
        roleid: user.roleid,
        newPassword: "",
        confirmPassword: "",
      }));
    }
    setIsEditingAccount(false);
    setError("");
    setSuccessMsg("");
  };


  const handleEditPasswordClick = () => {
    setIsEditingPassword(true);
    setSuccessMsg("");
    setError("");
  };

  const handleCancelPasswordEdit = () => {
    setFormData((prev) => ({
      ...prev,
      newPassword: "",
      confirmPassword: "",
    }));
    setIsEditingPassword(false);
    setError("");
    setSuccessMsg("");
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSaveAccount = async () => {
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
        roleid: user.roleid,
      };

      await authServices.updateUserInfo(payload, user.id);

      setUser((prev) => ({ ...prev, ...payload }));
      setIsEditingAccount(false);
      setError("");
      setSuccessMsg("Cập nhật thông tin thành công!");
    } catch (err) {
      if (err.response && err.response.data) {
        setError(
          `Cập nhật thất bại: ${
            err.response.data.message || JSON.stringify(err.response.data)
          }`
        );
      } else {
        setError("Cập nhật thông tin thất bại.");
      }
      setSuccessMsg("");
    }
  };


  const handleChangePassword = async () => {
    if (!formData.newPassword || !formData.confirmPassword) {
      setError("Vui lòng nhập đầy đủ mật khẩu.");
      setSuccessMsg("");
      return;
    }

    if (formData.newPassword !== formData.confirmPassword) {
      setError("Mật khẩu xác nhận không khớp.");
      setSuccessMsg("");
      return;
    }

    try {
      const payload = {
        username: formData.username,
        passwordhash: formData.newPassword, // mật khẩu mới
        email: formData.email,
        fullname: formData.fullname,
        address: formData.address,
        phonenumber: formData.phonenumber,
        roleid: user.roleid,
      };

      await authServices.updateUserInfo(payload, user.id);

      setError("");
      setSuccessMsg("Đổi mật khẩu thành công!");
      setFormData((prev) => ({
        ...prev,
        newPassword: "",
        confirmPassword: "",
      }));
      setIsEditingPassword(false);
    } catch (err) {
      setSuccessMsg("");
      setError("Đổi mật khẩu thất bại.");
    }
  };

  if (loading) {
    return (
      <div className="user-profile-container">
        <p>Đang tải thông tin người dùng...</p>
      </div>
    );
  }

  const renderAccountTab = () => (
    <div className="user-details-section">
      <h3>Thông Tin Cá Nhân</h3>
      {isEditingAccount ? (
        <>
          <div className="info-item">
            <label>Username:</label>
            <input type="text" name="username" value={formData.username} disabled />
          </div>
          <div className="info-item">
            <label>Họ và tên:</label>
            <input type="text" name="fullname" value={formData.fullname} onChange={handleChange} />
          </div>
          <div className="info-item">
            <label>Email:</label>
            <input type="email" name="email" value={formData.email} onChange={handleChange} />
          </div>
          <div className="info-item">
            <label>Địa chỉ:</label>
            <input type="text" name="address" value={formData.address} onChange={handleChange} />
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
            <button onClick={handleSaveAccount} className="save-btn">
              Lưu
            </button>
            <button onClick={handleCancelAccountEdit} className="cancel-btn">
              Hủy
            </button>
          </div>
        </>
      ) : (
        <>
          <div className="info-item">
            <label>Username:</label>
            <p>{user.username}</p>
          </div>
          <div className="info-item">
            <label>Email:</label>
            <p>{user.email}</p>
          </div>
          <div className="info-item">
            <label>Họ và tên:</label>
            <p>{user.fullname}</p>
          </div>
          <div className="info-item">
            <label>Địa chỉ:</label>
            <p>{user.address}</p>
          </div>
          <div className="info-item">
            <label>Số điện thoại:</label>
            <p>{user.phonenumber}</p>
          </div>
          <button onClick={handleEditAccountClick} className="edit-btn">
            Chỉnh sửa thông tin
          </button>
        </>
      )}
    </div>
  );

  const renderChangePasswordTab = () => (
    <div className="user-details-section">
      <h3>Đổi mật khẩu</h3>
      {isEditingPassword ? (
        <>
          <div className="info-item">
            <label>Mật khẩu mới:</label>
            <input
              type="password"
              name="newPassword"
              value={formData.newPassword}
              onChange={handleChange}
            />
          </div>
          <div className="info-item">
            <label>Nhập lại mật khẩu mới:</label>
            <input
              type="password"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
            />
          </div>
          <div className="btn-group">
            <button onClick={handleChangePassword} className="save-btn">
              Lưu mật khẩu
            </button>
            <button onClick={handleCancelPasswordEdit} className="cancel-btn">
              Hủy
            </button>
          </div>
        </>
      ) : (
        <button onClick={handleEditPasswordClick} className="edit-btn">
          Đổi mật khẩu
        </button>
      )}
    </div>
  );

  const renderOrdersTab = () => <UserOrders filterStatus={null} />;
  const renderPendingTab = () => <UserOrders filterStatus="pending" />;
  const renderProcessingTab = () => <UserOrders filterStatus="processing" />;
  const renderShippedTab = () => <UserOrders filterStatus="shipped" />;
  const renderCancelledTab = () => <UserOrders filterStatus="cancelled" />;

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

        <div className="tab-navigation">
          <button
            className={activeTab === "account" ? "active" : ""}
            onClick={() => setActiveTab("account")}
          >
            Thông tin cá nhân
          </button>
          <button
            className={activeTab === "changepassword" ? "active" : ""}
            onClick={() => setActiveTab("changepassword")}
          >
            Đổi mật khẩu
          </button>
          <button
            className={activeTab === "orders" ? "active" : ""}
            onClick={() => setActiveTab("orders")}
          >
            Đơn hàng
          </button>
          <button
            className={activeTab === "pending" ? "active" : ""}
            onClick={() => setActiveTab("pending")}
          >
             Đang xử lý
         
          </button>
          <button
            className={activeTab === "processing" ? "active" : ""}
            onClick={() => setActiveTab("processing")}
          >
           Đang giao
          </button>
          <button
            className={activeTab === "shipped" ? "active" : ""}
            onClick={() => setActiveTab("shipped")}
          >
            Đã giao
          </button>
          <button
            className={activeTab === "cancelled" ? "active" : ""}
            onClick={() => setActiveTab("cancelled")}
          >
            Đã hủy
          </button>
        </div>

        <div className="tab-content">
          {activeTab === "account" && renderAccountTab()}
          {activeTab === "changepassword" && renderChangePasswordTab()}
          {activeTab === "orders" && renderOrdersTab()}
          {activeTab === "pending" && renderPendingTab()}
          {activeTab === "processing" && renderProcessingTab()}
          {activeTab === "shipped" && renderShippedTab()}
          {activeTab === "cancelled" && renderCancelledTab()}
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
