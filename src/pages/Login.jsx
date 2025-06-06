import React, { useState } from "react"; 
import "../styles/Login.css";
import LoginServices from "../services/LoginServices";
import authServices from "../services/authServices";
import { setToken } from "../redux-toolkit/authSlice";
import { setUser } from "../redux-toolkit/userSlice";

import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [formData, setFormData] = useState({
    username: "admin01",
    password: "hashed_password_admin"
  });
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const res = await LoginServices.login(formData.username, formData.password);
      if (res && res.result && res.result.token) {
        const token = res.result.token;
        localStorage.setItem("authToken", token);
        
        dispatch(setToken(token));
        const userData = await authServices.getCurrentUser();
        dispatch(setUser(userData));
       
        if (userData.roleId == 1) {   
          navigate("/admin");
        } else {   
          navigate("/");
        }
      } else {
        setError("Không nhận được token từ API.");
      }
    } catch (err) {
      setError(err.message || "Đăng nhập thất bại");
    }
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <div className="login-left">
          <h1>Welcome</h1>
          <h3>Don't have an account?</h3>
          <p>
            Register to access all the features of our services.
            Manage your business in one place. It's free.
          </p>
          <div className="social-icons">
            <i className="fab fa-facebook-f"></i>
            <i className="fab fa-google"></i>
            <i className="fab fa-github"></i>
          </div>
        </div>
        <div className="login-right">
          <h2>Login</h2>
          <form onSubmit={handleLogin}>
            <label>Email</label>
            <input
              type="text"
              name="username"
              placeholder="VD: staff001"
              value={formData.username}
              onChange={handleChange}
              required
            />
            <label>Password</label>
            <input
              type="password"
              name="password"
              placeholder="Nhập mật khẩu"
              value={formData.password}
              onChange={handleChange}
              required
            />
            <div className="terms">
              <input type="checkbox" required />
              <span>
                I agree to the statements in{" "}
                <a href="#">Terms of Service</a>
              </span>
            </div>
            {error && <p className="error">{error}</p>}
            <button type="submit" className="btn-login">Login</button>
            <div className="signup-link">
              Don't have an account? <a href="/register">Sign up</a>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
