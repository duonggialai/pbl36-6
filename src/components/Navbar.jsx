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
          <NavLink to="/hot-deals" className="nav-link">
            HOT DEALS 
          </NavLink>
        </li>
        <li>
          <NavLink to="/spa" className="nav-link">
            LÀM ĐẸP & SPA 
          </NavLink>
        </li>
        <li>
          <NavLink to="/fashion" className="nav-link">
            THỜI TRANG 
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
