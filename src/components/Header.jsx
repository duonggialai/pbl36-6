import React, { useState, useEffect } from 'react';
import '../styles/Style.css';
import { NavLink } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCartFromServer } from '../redux-toolkit/cartThunk';
import { useNavigate, useLocation } from 'react-router-dom';
import authServices from '../services/authServices';
import { setUser } from '../redux-toolkit/userSlice';


const Header = () => {
  const dispatch = useDispatch();
  const [searchTerm, setSearchTerm] = useState('');
   const [keyword, setKeyword] = useState('');
  const navigate = useNavigate();
  const location = useLocation();
 
  const token = useSelector((state) => state.auth.token) || localStorage.getItem('token');
  const carts = useSelector((state) => state.cart.carts);

    useEffect(() => {
       setSearchTerm('');
      }, [location.pathname]);

    useEffect(() => {
          if (token) {
            dispatch(fetchCartFromServer(token));
          }
      }, [token, dispatch]);

    const handleLogout = ( ) =>{
          localStorage.removeItem('authToken');
          window.location.reload();
    }

    const handleSearch = () => {
          const trimmed = searchTerm.trim();
          if (trimmed) {
            navigate(`/search?keyword=${encodeURIComponent(trimmed)}`);
          }
   };
    const handleUserProfileClick = () => {
        if (token) {
          navigate('/userprofile');
        } else {
          navigate('/login'); 
          alert("Bạn cần đăng nhập để truy cập trang cá nhân!");
       
        }
      };

    const handleToCart = () => {
      if (token) {
        navigate('/cart');
      } else {
        navigate('/login'); 
        alert("Bạn cần đăng nhập để truy cập giỏ hàng!");
      
      }
    };

  return (
    <header>
      <div className="header">
        <h1>
          <NavLink to={"/"}>
          <img src="/img/image.png" alt="ShopD" /></NavLink>
        </h1>

        <div className="search-bar">
         <input
                type="text"
                placeholder="Tìm kiếm sản phẩm..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') handleSearch(); 
                }}
              />

          <img
                  src="/img/ico_search.png"
                  alt="Search Icon"
                  className="search-icon"
                  onClick={handleSearch}
                />
        </div>

        <div className="header3">
        <div className="cart">
        
              <img src="/img/ico_bag.png" alt="bag"  onClick={handleToCart}    style={{ cursor: "pointer" }}/>
              <span className="cart-count">{carts.length}</span>
          
          </div>


          <div className="Client">
              <img
                src="/img/ico_user.png"
                alt="client"
                onClick={handleUserProfileClick}
                style={{ cursor: "pointer" }}
              />
            </div>
          {/* <div className="login">
            <NavLink to={"/login"}>  <button>Login</button></NavLink>
          </div>
          <div className="login">
            <NavLink to={"/"}>  <img src="/img/logout.png" alt="logout" /> </NavLink>
          </div> */}
          {token ? (
            <div className="login">
              <NavLink to={"/"}>  <button onClick={handleLogout}>Logout</button> </NavLink>
            </div>
          ) : (
            <div className="login">
              <NavLink to={"/login"}>  <button>Login</button></NavLink>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
