import React from "react";
import "../styles/AboutUs.css";

const AboutUs = () => {
  return (
    <div className="about-page">
      <header className="about-header">
        {/* <h1 className="about-title"> ShopD</h1>
        <p className="about-tagline">Chất lượng - Uy tín - Giá tốt</p> */}
      </header>

      <section className="about-intro">
        <img
          src="https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&w=800&q=80"
          alt="Điện thoại"
          className="about-image"
        />
        <div className="about-text-content">
          <h2>Về chúng tôi</h2>
          <p>
            ShopD mobile tự hào là nhà cung cấp điện thoại chính hãng hàng đầu Việt Nam.
            Với hơn 1 năm kinh nghiệm, chúng tôi cam kết mang đến sản phẩm chất lượng với giá cả cạnh tranh.
          </p>
          <p>
            Chúng tôi luôn đặt khách hàng làm trọng tâm với dịch vụ hậu mãi tận tâm và đội ngũ tư vấn chuyên nghiệp.
          </p>
        </div>
      </section>

      <section className="about-mission">
        <h2>Sứ mệnh của chúng tôi</h2>
        <p>
          Cung cấp những sản phẩm công nghệ tiên tiến nhất, giúp khách hàng kết nối và trải nghiệm cuộc sống tốt đẹp hơn.
        </p>
      </section>

      <section className="about-values">
        <h2>Giá trị cốt lõi</h2>
        <ul>
          <li>Chính hãng - Cam kết chất lượng</li>
          <li>Giá cả minh bạch, cạnh tranh</li>
          <li>Dịch vụ khách hàng tận tâm 24/7</li>
          <li>Hỗ trợ kỹ thuật chuyên nghiệp</li>
        </ul>
      </section>

      <section className="about-contact">
        <h2>Liên hệ với chúng tôi</h2>
        <address>
          <p>Địa chỉ: Làng Lân, xã IaO, huyện Iagrai, Tỉnh Gia Lai</p>
          <p>Hotline: <a href="">0862438242</a></p>
          <p>Email: <a href="">nvdsupport@gmail.com</a></p>
        </address>
      </section>

      <footer className="about-footer">
        <p>© 2025 ShopD mobile. Bảo lưu mọi quyền.</p>
      </footer>
    </div>
  );
};

export default AboutUs;
