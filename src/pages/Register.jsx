import React, { useState } from 'react';
import '../styles/Register.css';
import RegisterServices from '../services/RegisterServices';
import { useNavigate } from 'react-router-dom';

const Register = () => {
  const [formData, setFormData] = useState({
    username: '',
    passwordhash: '',
    email: '',
    fullname: '',
    address:' ',
    phonenumber: ''
  });

  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    try {
      await RegisterServices.register(formData);
      setSuccess("Đăng ký thành công!");
      setTimeout(() => navigate('/login'), 2000);
    } catch (err) {
      setError(err.message || "Đăng ký thất bại");
    }
  };

  return (
    <div className="register-wrapper">
      <div className="register-form-container">
        <form className="register-form" onSubmit={handleSubmit}>
          <h2>Đăng ký</h2>

          <div className="form-group">
            <label>Tên đăng nhập</label>
            <input type="text" name="username" value={formData.username} onChange={handleChange} required />
          </div>

          <div className="form-group">
            <label>Mật khẩu</label>
            <input type="password" name="passwordhash" value={formData.passwordhash} onChange={handleChange} required />
          </div>

          <div className="form-group">
            <label>Email</label>
            <input type="email" name="email" value={formData.email} onChange={handleChange} required />
          </div>

          <div className="form-group">
            <label>Họ và tên</label>
            <input type="text" name="fullname" value={formData.fullname} onChange={handleChange} required />
          </div>

          <div className="form-group">
            <label>Số điện thoại</label>
            <input type="text" name="phonenumber" value={formData.phonenumber} onChange={handleChange} required />
          </div>

          {error && <p className="form-error">{error}</p>}
          {success && <p className="form-success">{success}</p>}

          <button type="submit">Tạo tài khoản</button>

          <p className="form-footer">
            Đã có tài khoản? <a href="/login">Đăng nhập</a>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Register;
