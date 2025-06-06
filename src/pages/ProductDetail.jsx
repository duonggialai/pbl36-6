import React, { useEffect, useState } from 'react';
import productServices from '../services/ProductServices';
import supplierService from '../services/supplierService';
import { useParams, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { addProductToCart } from '../redux-toolkit/cartThunk'; 
import { setCheckoutProducts } from '../redux-toolkit/checkoutSlice';
import Review from '../components/Review';
import '../styles/ProductDetail.css';
import productImageService from '../services/productImageService';

const ProductDetail = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [productImages, setProductImages] = useState([]);
  const token = useSelector(state => state.auth.token) || localStorage.getItem('token');

  const [product, setProduct] = useState(null);
  const [supplier, setSupplier] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [mainImage, setMainImage] = useState('');  // ảnh chính để thay đổi khi click ảnh phụ

  // Lấy thông tin sản phẩm
  useEffect(() => {
    if (!id) return;
    (async () => {
      try {
        const res = await productServices.getProductById(id);
        setProduct(res);
        setMainImage(res.main_image_url);  // đặt ảnh chính mặc định
      } catch (err) {
        console.error('Lỗi tải sản phẩm:', err);
      }
    })();
  }, [id]);

  // Lấy thông tin nhà cung cấp
  useEffect(() => {
    if (product?.supplierid) {
      (async () => {
        try {
          const res = await supplierService.getSupplierById(product.supplierid);
          setSupplier(res.data.result);
        } catch (err) {
          console.error('Lỗi tải nhà cung cấp:', err);
        }
      })();
    }
  }, [product]);

  // Lấy ảnh phụ sản phẩm
  useEffect(() => {
    if (!id) return;
    (async () => {
      try {
       const res = await productImageService.getProductImagesByProductId(id);
       setProductImages(res.result || []);
      } catch (err) {
        console.error('Lỗi tải ảnh phụ:', err);
      }
    })();
  }, [id]);

  const increaseQuantity = () => setQuantity(q => q + 1);
  const decreaseQuantity = () => setQuantity(q => (q > 1 ? q - 1 : 1));

  const handleAddToCart = () => {
    if (!token) {
      alert('Vui lòng đăng nhập để thêm sản phẩm vào giỏ hàng.');
      navigate('/login');
      return;
    }
    alert('Thêm sản phẩm vào giỏ hàng thành công!');
    setQuantity(1);
    dispatch(addProductToCart({ productId: product.id, quantity, token }));
  };

  const handleBuyNow = () => {
    const productToCheckout = [{
      id: product.id,
      name: product.name,
      price: product.price,
      quantity,
      image: mainImage,
    }];
    dispatch(setCheckoutProducts(productToCheckout));
    navigate('/checkout');
  };

  if (!product) return <div className="product-detail">Đang tải thông tin sản phẩm...</div>;

  // Tạo mảng ảnh gồm ảnh chính + ảnh phụ để hiển thị ảnh phụ cho phép click lại ảnh chính
  const allImages = [product.main_image_url, ...productImages.map(img => img.imageurl)];

  return (
    <>
      <div className="product-detail">
        <h1 className="product-title">{product.name}</h1>

        <div className="product-detail-top">
          <div className="product-main-image-container">
            <img src={mainImage} alt={product.name} className="product-image" />

            <div className="product-sub-images">
              {/* Hiển thị ảnh chính và ảnh phụ */}
              {allImages.length > 0 ? allImages.map((imgUrl, index) => (
                <img
                  key={index}
                  src={imgUrl}
                  alt={`Ảnh sản phẩm ${index}`}
                  className={`sub-image ${mainImage === imgUrl ? 'active' : ''}`}
                  onClick={() => setMainImage(imgUrl)}
                  style={{ cursor: 'pointer' }}
                />
              )) : <p>Không có ảnh phụ</p>}
            </div>
          </div>

          <div className="side-actions">
            <p className="product-price">Giá: {product.price.toLocaleString()} ₫</p>

            <div className="quantity-control">
              <button className="qty-btn" onClick={decreaseQuantity}>-</button>
              <span className="qty-number">{quantity}</span>
              <button className="qty-btn" onClick={increaseQuantity}>+</button>
            </div>

            <div className="button-group">
              <button className="add-to-cart-button" onClick={handleAddToCart}>Thêm vào giỏ hàng</button>
              <button className="buy" onClick={handleBuyNow}>Mua hàng</button>
            </div>
          </div>
        </div>

        {/* phần chi tiết sản phẩm */}
        <div className="detail"><p>Chi Tiết Sản Phẩm</p></div>
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

      {/* Thông tin nhà cung cấp */}
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

      {/* Review sản phẩm */}
      <Review id={product.id} />
    </>
  );
};

export default ProductDetail;
