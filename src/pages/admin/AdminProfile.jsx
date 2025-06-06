import React, { useEffect, useState } from "react";
import authServices from "../../services/authServices";
import "../../styles/AdminProfile.css"; // Ensure you have this CSS file for styling
const AdminProfile = () => {
  const [user, setUser] = useState(null);
  const [formData, setFormData] = useState({});
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("account");
  const [message, setMessage] = useState({ type: "", text: "" });

  const initFormData = (data) => ({
    username: data.username || "",
    fullname: data.fullname || "",
    email: data.email || "",
    address: data.address || "",
    phonenumber: data.phonenumber || "",
  });

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const userData = await authServices.getCurrentUser();
        setUser(userData);
        setFormData(initFormData(userData));
      } catch {
        setMessage({ type: "error", text: "Không thể tải thông tin người dùng." });
      } finally {
        setLoading(false);
      }
    };
    fetchUser();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = async () => {
    if (!user?.id) return setMessage({ type: "error", text: "Không có ID người dùng." });

    const payload = {
      ...formData,
      passwordhash: user.passwordhash || "",
      roleId: user.roleId || 1,
    };
     console.log(user.roleId);
    try {
      await authServices.updateUserInfo(payload, user.id);
      setUser((prev) => ({ ...prev, ...payload }));
      setIsEditing(false);
      setMessage({ type: "success", text: "Cập nhật thành công!" });
    } catch (err) {
      const msg = err.response?.data?.message || "Cập nhật thất bại.";
      setMessage({ type: "error", text: msg });
    }
  };

  const handleCancel = () => {
    setFormData(initFormData(user));
    setIsEditing(false);
    setMessage({ type: "", text: "" });
  };

  const renderInputField = (label, name, type = "text", disabled = false) => (
    <div className="info-item">
      <label>{label}:</label>
      {isEditing ? (
        <input
          type={type}
          name={name}
          value={formData[name]}
          onChange={handleChange}
          disabled={disabled}
        />
      ) : (
        <p>{user[name]}</p>
      )}
    </div>
  );

  if (loading) return <div className="users-profile-container"><p>Đang tải...</p></div>;

  return (
    <div className="users-profile-container">
      {message.text && (
        <p className={message.type === "error" ? "error-message" : "success-message"}>
          {message.text}
        </p>
      )}

      <div className="users-info">
        <div className="users-header">
          <img src="/img/avt.jpg" alt="Avatar" className="user-avatar" />
          <div>
            <h2>{user.fullname}</h2>
            <p className="usersname">@{user.username}</p>
          </div>
        </div>

        <div className="tab-navigation">
          <button
            className={activeTab === "account" ? "active" : ""}
            onClick={() => setActiveTab("account")}
          >
            Tài khoản của tôi
          </button>
          {/* <button
            className={activeTab === "account" ? "active" : ""}
            onClick={() => setActiveTab("account")}
          >
           Đổi mật khẩu
          </button> */}
        </div>

        {activeTab === "account" && (
          <div className="users-details-section">
            <h3>Thông Tin Cá Nhân</h3>
            {renderInputField("Username", "username", "text", true)}
            {renderInputField("Họ và tên", "fullname")}
            {renderInputField("Email", "email", "email")}
            {renderInputField("Địa chỉ", "address")}
            {renderInputField("Số điện thoại", "phonenumber")}

            {isEditing ? (
              <div className="btn-group">
                <button onClick={handleSave} className="save-btn">Lưu</button>
                <button onClick={handleCancel} className="cancel-btn">Hủy</button>
              </div>
            ) : (
              <button onClick={() => setIsEditing(true)} className="edit-btn">
                Chỉnh sửa thông tin
              </button>

            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminProfile;
