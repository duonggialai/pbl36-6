import React, { useState } from 'react';
import '../styles/Login.css';
import LoginServices from '../services/LoginServices';

const Login = () => {
  const [formData, setFormData] = useState({
    username: "",
    password: ""
  });
  const [userInfo, setUserInfo] = useState(null);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const handleLogin = () =>{
    
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      const data = await LoginServices.login(formData.username, formData.password);
      setUserInfo(data);
     
    } catch (err) {
      setError("Đăng nhập thất bại! Kiểm tra lại tài khoản.");
    }
  };

  return (
    <main className="login-page">
      <div className="main_head">
        <h2>Login</h2>
        <form onSubmit={handleSubmit}>
          <div className="input_field">
            <label htmlFor="username">Email</label>
            <input
              type="email"
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
          <button onClick={handleLogin} type="submit">Login</button>
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
