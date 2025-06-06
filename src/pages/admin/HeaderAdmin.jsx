import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { setToken } from '../../redux-toolkit/authSlice';
import { setUser } from '../../redux-toolkit/userSlice';
import '../../styles/HeaderAdmin.css'; 

const HeaderAdmin = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const token = useSelector((state) => state.auth.token) || localStorage.getItem('authToken');

  const handleLogout = () => {
    localStorage.removeItem('authToken');
    dispatch(setToken(null));
    dispatch(setUser(null));
    navigate('/login');
  };

    const handleSearch = () => {
       
    };
 const handleUserProfileClick = () => {
    if (token) {
      navigate('profile'); 
    } else {
      alert("Bạn cần đăng nhập để truy cập trang cá nhân!");
      navigate('/admin'); 
    }
  };

  return (
    <header className="header-admin">
      <div className="header-left">
        <NavLink to="/admin">
          <img src="/img/image.png" alt="Logo" className="logo" />
        </NavLink>
      </div>

      <div className="header-center">
        <input
          type="text"
          placeholder="Tìm kiếm sản phẩm..."
          className="search-input"
        />
        <img
          src="/img/ico_search.png"
          alt="Search Icon"
          className="search-icon"
        />
      </div>

      <div className="header-right">
        <div className="client-icon">
          <img src="/img/ico_user.png" alt="User Icon"   onClick={handleUserProfileClick} style={{ cursor: "pointer" }}/>
        </div>

        {token ? (
          <button className="logout-btn" onClick={handleLogout}>
            Logout
          </button>
        ) : (
          <NavLink to="/login">
            <button className="login-btn">Login</button>
          </NavLink>
        )}
      </div>
    </header>
  );
};

export default HeaderAdmin;
