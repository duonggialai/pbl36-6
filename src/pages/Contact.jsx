// pages/Contact.js
import React from 'react';
import '../styles/Contact.css';

const Contact = () => {
  return (
    <div className="contact-page">
      <h2>Liên hệ với ShopD</h2>
      
      <p className="intro">
        Nếu bạn có bất kỳ thắc mắc nào về sản phẩm, chính sách vận chuyển, đổi trả hoặc hợp tác quảng bá, đừng ngần ngại liên hệ với chúng tôi qua các thông tin bên dưới.
      </p>

      <div className="info-section">
        <h3>🏢 Thông tin liên hệ</h3>
        <p><strong>Địa chỉ:</strong> Iao - IaGrai - GiaLai</p>
        <p><strong>Email:</strong> support@shopd.vn</p>
        <p><strong>Hotline:</strong>  0862438242 (8:00 - 17:00, T2 - T7)</p>
        <p><strong>Fanpage:</strong> <a href="https://facebook.com/shopd.vn" target="_blank" rel="noreferrer">facebook.com/shopd.vn</a></p>
        <p><strong>Zalo:</strong> 0862438242</p>
      </div>

      <div className="info-section">
        <h3>⏰ Thời gian làm việc</h3>
        <p>Thứ 2 - Thứ 7: 08:00 – 17:00</p>
        <p>Chủ nhật và ngày lễ: Nghỉ</p>
      </div>

      <div className="info-section">
        <h3>📍 Bản đồ</h3>
        <iframe
          title="Google Maps"
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3919.1078325789174!2d106.69553401474977!3d10.800218192304226!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x317528cd50e7a2b5%3A0x91f9aafe28b8e8fc!2zMTIzIMSQxrDhu51uZyBBQkMsIFF14bqtbiAxLCBUUC4gSOG7kyBDaMOtbmggTWluaA!5e0!3m2!1svi!2s!4v1649436474532!5m2!1svi!2s"
          width="100%"
          height="350"
          style={{ border: 0 }}
          allowFullScreen=""
          loading="lazy"
        ></iframe>
        
      </div>
    </div>
  );
};

export default Contact;
