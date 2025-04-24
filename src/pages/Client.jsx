import React from 'react';
import '../styles/Client.css';

const Client = () => {
  const user = {
    name: "Nguyễn Văn Dương",
    email: "nguyenvanduong@example.com",
    phone: "0862438242",
    address: "Iao - Iagrai - Gia Lai",
    avatar: "../img/avt.jpg",
  };

  return (
    <div className="client-container">
      <aside className="client-sidebar">
        <div className="sidebar-header">
          <img src={user.avatar} alt="avatar" className="sidebar-avatar" />
          <h3>{user.name}</h3>
        </div>
        <ul className="sidebar-menu">
          <li>Thông tin tài khoản</li>
          <li>Đơn hàng</li>
          <li>Đổi mật khẩu</li>
          <li>Đăng xuất</li>
        </ul>
      </aside>

      <section className="client-content">
        <h2>Thông tin tài khoản</h2>
        <div className="info-row"><strong>Họ tên:</strong> {user.name}</div>
        <div className="info-row"><strong>Email:</strong> {user.email}</div>
        <div className="info-row"><strong>SĐT:</strong> {user.phone}</div>
        <div className="info-row"><strong>Địa chỉ:</strong> {user.address}</div>
        <button className="edit-btn">Chỉnh sửa thông tin</button>
      </section>
    </div>
  );
};

export default Client;
