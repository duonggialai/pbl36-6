// Navbar.jsx
import React from "react";
import { NavLink } from "react-router-dom";
import '../styles/Navbar.css'

const Navbar = () => {
  return (
    <nav className="navbar">
      <ul className="nav-list">
        <li>
          <NavLink to="/" end className="nav-link">
            TRANG CHỦ
          </NavLink>
        </li>
        <li>
          <NavLink to="/products" className="nav-link">
            SẢN PHẨM
          </NavLink>
        </li>
        <li>
          <NavLink to="/hot" className="nav-link">
            HOT DEALS 
          </NavLink>
        </li>
        <li>
          <NavLink to="/suppliers" className="nav-link">
            HÃNG
          </NavLink>
        </li>
        
        
        <li>
          <NavLink to="/news" className="nav-link">
            TIN TỨC
          </NavLink>
        </li>
        <li>
          <NavLink to="/about" className="nav-link">
            GIỚI THIỆU
          </NavLink>
        </li>
        <li>
          <NavLink to="/contact" className="nav-link">
            LIÊN HỆ
          </NavLink>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
