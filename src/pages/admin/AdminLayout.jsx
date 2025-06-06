import React from 'react';
import { NavLink, Outlet } from 'react-router-dom';
import HeaderAdmin from './HeaderAdmin';

import '../../styles/AdminLayout.css';

const AdminLayout = () => {
  return (
    <div className="admin-layout">
      <HeaderAdmin />
      <div className="admin-body">
        <div className="sidebar">
          <h2>Quản trị</h2>
          <nav>
            <NavLink to="/admin/dashboard" className={({ isActive }) => isActive ? 'active' : ''}>Dashboard</NavLink>
            <NavLink to="/admin/users" className={({ isActive }) => isActive ? 'active' : ''}>Người dùng</NavLink>
            <NavLink to="/admin/products" className={({ isActive }) => isActive ? 'active' : ''}>Sản phẩm</NavLink>
            <NavLink to="/admin/orders" className={({ isActive }) => isActive ? 'active' : ''}>Đơn hàng</NavLink>
            <NavLink to="/admin/reviews" className={({ isActive }) => isActive ? 'active' : ''}>Đánh giá</NavLink>
           
            <NavLink to="/admin/shipping" className={({ isActive }) => isActive ? 'active' : ''}>Shipping</NavLink>
             <NavLink to="/admin/supplier" className={({ isActive }) => isActive ? 'active' : ''}>Hãng</NavLink>
              <NavLink to="/admin/profile" className={({ isActive }) => isActive ? 'active' : ''}>Tài khoản</NavLink>
          </nav>
        </div>

        <main className="content">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
