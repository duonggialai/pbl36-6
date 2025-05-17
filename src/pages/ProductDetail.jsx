import React, { useEffect, useState } from 'react';
import productServices from '../services/ProductServices';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart } from '../redux-toolkit/cartSlice';
import '../styles/ProductDetail.css';
import { addProductToCart } from '../redux-toolkit/cartThunk';
import supplierService from '../services/supplierService';
import Review from '../components/Review';
import { useNavigate } from 'react-router-dom';
const ProductDetail = () => {
  const [product, setProduct] = useState(null);
  const [supplier, setSupplier] = useState(null);
  const { id } = useParams();
  const dispatch = useDispatch();
const navigate = useNavigate();

  const token = useSelector((state) => state.auth.token) || localStorage.getItem('token');
  useEffect(() => {
    const fetchProductDetail = async () => {
      try {
        const res = await productServices.getProductById(id);
        setProduct(res);
      } catch (error) {
        console.error('Lỗi khi tải thông tin sản phẩm:', error);
      }
    };
    if (id) {
      fetchProductDetail();
    }
  }, [id]);
 
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

  const handleAddToCart = () => {
   if (!token) {
         alert('Vui lòng đăng nhập để thêm sản phẩm vào giỏ hàng.');
         navigate('/login');
         return;
       }
       console.log(product.id);
   
       dispatch(addProductToCart({ productId: product.id, quantity: 1, token }));
  };
  const handleBuyNow = () => {
  navigate('/checkout', { state: { product } });
};

  if (!product) {
    return <div className="product-detail">Đang tải thông tin sản phẩm...</div>;
  }

  return (
    <><div className="product-detail">
      <h1 className="product-title">{product.name}</h1>

      <div className="product-detail-top">
  <img src={product.main_image_url} alt={product.name} className="product-image" />
  <div className="side-actions">
    <p className="product-price">Giá: {product.price.toLocaleString()} ₫</p>
    <div className="button-group">
      <button className="add-to-cart-button" onClick={handleAddToCart}>Thêm vào giỏ hàng</button>
      <button className="buy" onClick={handleBuyNow}>Mua hàng</button>
    </div>
  </div>
</div>

    <div className="detail"> <p>Chi Tiết Sản Phẩm</p></div>
      <div className="product-detail-bottom">
        <p><strong>Giá:</strong> {product.price.toLocaleString()} ₫</p>
        <p><strong>Mô tả:</strong> {product.description}</p>
        <p><strong>Pin:</strong> {product.battery}</p>
        <p><strong>Camera sau:</strong> {product.rear_camera}</p>
        <p><strong>Camera trước:</strong> {product.front_camera}</p>
        <p><strong>RAM:</strong> {product.ram}</p>
        <p><strong>ROM:</strong> {product.rom}</p>
        <p><strong>Màn hình:</strong> {product.screen}</p>
        <p><strong>Thương hiệu:</strong> {product.categoryid}</p>
        <p><strong>Tình trạng:</strong> {product.status}</p>
        <p><strong>Bảo hành:</strong> {product.warranty}</p>
        <p><strong>Cân nặng:</strong> {product.weight}</p>
        <p><strong>Sim:</strong> {product.sim_slot}</p>
      </div>
      
    </div>
      {supplier && (
  <div className="supplier-info">
    <div className="supplier-logo">
      {supplier.suppliername.charAt(0).toUpperCase()}
    </div>
    <div className="supplier-details">
      <h3>{supplier.suppliername}</h3>
      <p><strong>Email:</strong> {supplier.contactemail}</p>
      <p><strong>Điện thoại:</strong> {supplier.contactphone}</p>
    </div>
  </div>
)}
<div> 
  <Review id={product.id} />
</div>


    </>
    
  );
};

export default ProductDetail;
