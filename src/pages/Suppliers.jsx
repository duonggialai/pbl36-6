import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/Suppliers.css';
import supplierService from '../services/supplierService';

const Suppliers = () => {
  const [suppliers, setSuppliers] = useState([]);
  const navigate = useNavigate();

  const supplierImages = {
    SamSung: '/img/samsung.png',
    iPhone: '/img/apple.png',
    Xiaomi: '/img/xiaomi.png',
    OPPO: '/img/oppo.png',
    VIVO: '/img/vivo.png',
    HONOR: '/img/honor.png',
    Realme: '/img/realme.png',
  };

  useEffect(() => {
    const fetchSuppliers = async () => {
      try {
        const res = await supplierService.getAllSuppliers();
        setSuppliers(res.data.result);
      } catch (error) {
        console.error('Lỗi khi lấy danh sách hãng:', error);
      }
    };

    fetchSuppliers();
  }, []);

  return (
    <div className="suppliers-container">
      <h2>Danh sách các hãng điện thoại</h2>
      <div className="suppliers-grid">
        {suppliers.map((supplier) => {
          const imgSrc = supplierImages[supplier.suppliername] || '/img/avt.jpg';
          return (
            <div
              className="supplier-card"
              key={supplier.id}
              onClick={() => navigate(`/supplier/${supplier.id}`)}
              style={{ cursor: 'pointer' }}
            >
              <img
                src={imgSrc}
                alt={supplier.suppliername}
                onError={(e) => (e.target.src = '/img/avt.jpg')}
              />
              <h3>{supplier.suppliername}</h3>
              <p>{supplier.description}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Suppliers;
