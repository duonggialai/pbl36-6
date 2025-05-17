import React, { useState } from 'react';
import '../styles/Login.css';
import LoginServices from '../services/LoginServices';
import { setToken } from '../redux-toolkit/authSlice';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';  // Thêm useNavigate

const Login = () => {
  const [formData, setFormData] = useState({
    username: "staff022",
    password: "hashed_password_staff2"
  });
  const dispatch = useDispatch();
  const navigate = useNavigate();  // Khởi tạo useNavigate

  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    try {
      const res = await LoginServices.login(formData.username, formData.password);
      console.log("Response từ API:", res);

      if (res && res.result && res.result.token) {
        const token = res.result.token;
        console.log("Token nhận được:", token);
        localStorage.setItem("authToken", token);
        dispatch(setToken(token));

        // Chuyển hướng về trang home khi đăng nhập thành công
        navigate("/");  // Chuyển hướng tới trang home
      } else {
        setError("Không nhận được token từ API.");
      }
    } catch (err) {
      setError(err.message || "Đăng nhập thất bại");
    }
  };

  return (
    <main className="login-page">
      <div className="main_head">
        <h2>Login</h2>
        <form onSubmit={handleLogin}>
          <div className="input_field">
            <label htmlFor="username">Username</label>
            <input
              type="text"
              name="username"
              value={formData.username}
              onChange={handleChange}
              required
            />
          </div>
          <div className="input_field">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>
          <div className="forgot-password">
            <a href="#">Forgot password?</a>
          </div>
          <button type="submit">Login</button>
          <div className="register-link">
            Don't have an account? <a href="#">Sign up</a>
          </div>
        </form>
        {error && <p className="error-message">{error}</p>}
      </div>
    </main>
  );
};

export default Login;
