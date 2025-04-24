import React from 'react';
import '../styles/Style.css';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';


const Header = () => {
  const carts = useSelector((state) => {
    return state.cart.carts;
  });
  
  console.log(carts);
  return (
    <header>
      <div className="header">
        <h1>
          <NavLink to={"/"}>
          <img src="/img/image.png" alt="ShopD" /></NavLink>
        </h1>

        <div className="search-bar">
          <input type="text" placeholder="Search..." />
          <img src="/img/ico_search.png" alt="Search Icon" className="search-icon" />
        </div>

        <div className="header3">
        <div className="cart">
  <NavLink to={"/cart"}>
    <img src="/img/ico_bag.png" alt="bag" />
    <span className="cart-count">{carts.length}</span>
  </NavLink>
</div>


          <div className="Client">
            <NavLink to={"/client"}>  <img src="/img/ico_user.png" alt="client" /></NavLink>
          </div>
          <div className="login">
            <NavLink to={"/login"}>  <button>Login</button></NavLink>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
