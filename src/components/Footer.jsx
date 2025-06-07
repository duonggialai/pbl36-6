
import React from 'react';
import '../styles/Footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-section">
          <h4>Thông tin</h4>
          <p>Về chúng tôi</p>
          <p>Liên hệ</p>
          <p>Chính sách bảo mật</p>
        </div>
        <div className="footer-section">
          <h4>Hỗ trợ khách hàng</h4>
          <p>Trung tâm trợ giúp</p>
          <p>Hướng dẫn mua hàng</p>
          <p>Thanh toán & Giao hàng</p>
        </div>
        <div className="footer-section">
          <h4>Kết nối với chúng tôi</h4>
          <p>Facebook</p>
          <p>Zalo</p>
          <p>YouTube</p>
        </div>
      </div>
      <div className="footer-bottom">
        <p>&copy; {new Date().getFullYear()} ShopD. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
