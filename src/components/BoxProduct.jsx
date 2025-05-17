
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/BoxProduct.css';
import { useDispatch, useSelector } from 'react-redux';
import { addProductToCart } from '../redux-toolkit/cartThunk';
import supplierService from '../services/supplierService';
const BoxProduct = ({ product }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [supplier, setSupplier] = useState(null);
  const token = useSelector((state) => state.auth.token) || localStorage.getItem('token');

    useEffect(() => {
        if (product?.supplierid) {
        const fetchSupplier = async () => {
          try { 
            const res = await supplierService.getSupplierById(product.supplierid);
            setSupplier(res.data.result);
            console.log('Nhà cung cấp:', res.data.result);
         
          } catch(error) {
            console.error('Lỗi khi tải thông tin nhà cung cấp:', error);
          }
    };

    fetchSupplier();
  }
}, [product]);
//  console.log(supplier.suppliername);
  const handleAddToCart = () => {
    if (!token) {
      alert('Vui lòng đăng nhập để thêm sản phẩm vào giỏ hàng.');
      navigate('/login');
      return;
    }
    console.log(product.id);

    dispatch(addProductToCart({ productId: product.id, quantity: 1, token }));
  };

  const handleViewDetail = () => {
 navigate(`/product/${product.id}`);
  };

  return (
    <div className="box-product">
      <div className="product-img">
        <img src={product.main_image_url} alt={product.name} />
      </div>
      <div className="product-info">
        <h3 className="title">{product.name}</h3>
        <p className="price">{product.price.toLocaleString()} ₫</p>
        <p className="rating">⭐ {product.total_rating}</p>
        <div className="bottom-info">
            {supplier && (
              <span className="brand">Hãng {supplier.suppliername}</span>
            )}
            <span className="stock">{product.quantity} sp còn lại</span>
          </div>

      </div>
      <div className="button-group">
        <button onClick={handleAddToCart} className="add-button">Thêm giỏ hàng</button>
        <button onClick={handleViewDetail} className="buy-button">Chi tiết</button>
      </div>
    </div>
  );
};

export default BoxProduct;
