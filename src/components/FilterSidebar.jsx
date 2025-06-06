import React from 'react';
import '../styles/FilterSidebar.css'; // bạn tự style như UI e-commerce hiện đại

const FilterSidebar = ({ filters, setFilters }) => {
  const handleChange = (e) => {
    const { name, value, checked } = e.target;
    setFilters(prev => ({
      ...prev,
      [name]: checked ? [...prev[name], value] : prev[name].filter(v => v !== value)
    }));
  };

  return (
    <div className="filter-sidebar">
      <h3>Lọc sản phẩm</h3>

      <div className="filter-section">
        <h4>Hãng sản xuất</h4>
        {['Samsung', 'Apple', 'Xiaomi'].map(sup => (
          <label key={sup}><input type="checkbox" name="brand" value={sup} onChange={handleChange}/> {sup}</label>
        ))}
      </div>

      <div className="filter-section">
        <h4>RAM</h4>
        {['4GB', '6GB', '8GB', '12GB'].map(ram => (
          <label key={ram}><input type="checkbox" name="ram" value={ram} onChange={handleChange}/> {ram}</label>
        ))}
      </div>

      <div className="filter-section">
        <h4>ROM</h4>
        {['64GB', '128GB', '256GB', '512GB'].map(rom => (
          <label key={rom}><input type="checkbox" name="rom" value={rom} onChange={handleChange}/> {rom}</label>
        ))}
      </div>

      <div className="filter-section">
        <h4>Màu sắc</h4>
        {['Đen', 'Trắng', 'Đỏ', 'Xanh'].map(color => (
          <label key={color}><input type="checkbox" name="color" value={color} onChange={handleChange}/> {color}</label>
        ))}
      </div>

      <div className="filter-section">
        <h4>Đánh giá</h4>
        {[5, 4, 3, 2, 1].map(rate => (
          <label key={rate}><input type="checkbox" name="rating" value={rate} onChange={handleChange}/> {rate} sao trở lên</label>
        ))}
      </div>

      <div className="filter-section">
        <h4>Trạng thái</h4>
        {['Còn hàng', 'Hết hàng'].map(status => (
          <label key={status}><input type="checkbox" name="status" value={status} onChange={handleChange}/> {status}</label>
        ))}
      </div>
    </div>
  );
};

export default FilterSidebar;
