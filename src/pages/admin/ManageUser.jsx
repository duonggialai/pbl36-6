import React, { useEffect, useState } from "react";
import userService from "../../services/userService";
import "../../styles/ManageUser.css";

const ManageUser = () => {
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [error, setError] = useState("");
  const [successMsg, setSuccessMsg] = useState("");
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({
    username: "",
    fullname: "",
    email: "",
    address: "",
    phonenumber: "",
    role: "",
  });

  const fetchUsers = async () => {
    try {
      setLoading(true);
      const data = await userService.getAllUsers();
      setUsers(data);
    } catch (error) {
      setError("Lỗi khi lấy danh sách người dùng.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleSelectUser = (user) => {
    setSelectedUser(user);
    setFormData({
      username: user.username || "",
      fullname: user.fullname || "",
      email: user.email || "",
      address: user.address || "",
      phonenumber: user.phonenumber || "",
      role: user.role || "",
    });
    setIsEditing(true);
    setError("");
    setSuccessMsg("");
  };

  const handleCancel = () => {
    if (selectedUser) {
      setFormData({
        username: selectedUser.username || "",
        fullname: selectedUser.fullname || "",
        email: selectedUser.email || "",
        address: selectedUser.address || "",
        phonenumber: selectedUser.phonenumber || "",
        role: selectedUser.role || "",
      });
    }
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
      if (!selectedUser || !selectedUser.id) {
        setError("Không có người dùng được chọn để cập nhật.");
        return;
      }

      const payload = {
        username: formData.username,
        passwordhash: selectedUser.passwordhash,
        fullname: formData.fullname,
        email: formData.email,
        address: formData.address,
        phonenumber: formData.phonenumber,
        roleId: formData.role,
      };

      console.log("Dữ liệu gửi lên:", payload);

      await userService.updateUserInfo(payload, selectedUser.id);

      // Cập nhật selectedUser và formData ngay sau khi update thành công
      const updatedUser = {
        ...selectedUser,
        fullname: formData.fullname,
        email: formData.email,
        address: formData.address,
        phonenumber: formData.phonenumber,
        role: formData.role,
      };

      setSelectedUser(updatedUser);
      setFormData({
        username: updatedUser.username,
        fullname: updatedUser.fullname,
        email: updatedUser.email,
        address: updatedUser.address,
        phonenumber: updatedUser.phonenumber,
        role: updatedUser.role,
      });

      setSuccessMsg("Cập nhật người dùng thành công!");
      setError("");
      setIsEditing(false);

      fetchUsers();
    } catch (err) {
      console.error("Lỗi chi tiết:", err);
      setError("Cập nhật thất bại, vui lòng thử lại.");
      setSuccessMsg("");
    }
  };

  // const handleDelete = async (id) => {
  //   if (window.confirm("Bạn có chắc chắn muốn xóa người dùng này?")) {
  //     try {
  //       await userService.deleteUser(id);
  //       setSuccessMsg("Xóa người dùng thành công!");
  //       setError("");
  //       if (selectedUser && selectedUser.id === id) {
  //         setSelectedUser(null);
  //         setIsEditing(false);
  //       }
  //       fetchUsers();
  //     } catch (error) {
  //       setError("Không thể xóa người dùng.");
  //       setSuccessMsg("");
  //     }
  //   }
  // };

  if (loading) {
    return (
      <div className="manage-user-container">
        <p>Đang tải danh sách người dùng...</p>
      </div>
    );
  }

  return (
    <div className="manage-user-container">
      <h2>Quản lý người dùng</h2>

      {error && <p className="error-message">{error}</p>}
      {successMsg && <p className="success-message">{successMsg}</p>}

      <div className="manage-user-content">
        <div className="user-list">
          <table className="user-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Tên đăng nhập</th>
                <th>Email</th>
                <th>Vai trò</th>
                <th>Hành động</th>
              </tr>
            </thead>
            <tbody>
              {users.map((u) => (
                <tr
                  key={u.id}
                  className={selectedUser && selectedUser.id === u.id ? "selected" : ""}
                >
                  <td>{u.id}</td>
                  <td>{u.username}</td>
                  <td>{u.email}</td>
                  <td>{u.role}</td>
                  <td>
                    <button className="btnedit" onClick={() => handleSelectUser(u)}>Sửa</button>
                    {/* <button onClick={() => handleDelete(u.id)}>Xóa</button> */}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {selectedUser && (
          <div className="edit-user-box">
            <h3>Chỉnh sửa người dùng: {selectedUser.username}</h3>

            {isEditing ? (
              <>
                <div className="info-item">
                  <label>Tên đăng nhập:</label>
                  <input type="text" name="username" value={formData.username} disabled />
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
                <div className="info-item">
                  <label>Vai trò:</label>
                  <input type="text" name="role" value={formData.role} onChange={handleChange} />
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
                <p>Họ và tên: {selectedUser.fullname}</p>
                <p>Email: {selectedUser.email}</p>
                <p>Địa chỉ: {selectedUser.address}</p>
                <p>Số điện thoại: {selectedUser.phonenumber}</p>
                <p>Vai trò: {selectedUser.role}</p>
                <button onClick={() => setIsEditing(true)} className="edit-btn">
                  Chỉnh sửa thông tin
                </button>
              </>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default ManageUser;
