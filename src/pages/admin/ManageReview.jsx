import React, { useEffect, useState } from 'react';
import productServices from '../../services/ProductServices';
import reviewService from '../../services/reviewService';
import '../../styles/ManageReview.css'; 

const ManageReview = () => {
  const [products, setProducts] = useState([]);
  const [reviewsByProduct, setReviewsByProduct] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProductsAndReviews = async () => {
      try {
        const productData = await productServices.getAllProduct();
        setProducts(productData.result || productData); 

        const reviewsMap = {};

        for (const product of productData.result || productData) {
          try {
            const reviewRes = await reviewService.getReviewById(product.id);
            reviewsMap[product.id] = reviewRes.result || [];
          } catch (reviewError) {
            console.error(`Lỗi khi lấy review cho sản phẩm ${product.id}:`, reviewError);
            reviewsMap[product.id] = [];
          }
        }

        setReviewsByProduct(reviewsMap);
      } catch (error) {
        console.error('Lỗi khi tải sản phẩm và đánh giá:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProductsAndReviews();
  }, []);

  if (loading) return <p>Đang tải dữ liệu...</p>;

  return (
    <div className="manage-review">
      <h2>Quản lý đánh giá sản phẩm</h2>
      {products.map((product) => (
        <div key={product.id} className="product-review-section">
          <h3>{product.name}</h3>
          <p><strong>ID:</strong> {product.id}</p>
          <p><strong>Giá:</strong> {product.price?.toLocaleString()} ₫</p>
          <img src={product.main_image_url} alt={product.name} className="product-thumbnail" />

          <div className="review-list">
            {reviewsByProduct[product.id] && reviewsByProduct[product.id].length > 0 ? (
              reviewsByProduct[product.id].map((review) => (
                <div className="review-card" key={review.id}>
                  <p><strong>Người dùng:</strong> {review.username}</p>
                  <p><strong>Đánh giá:</strong> {'★'.repeat(review.rating)}{'☆'.repeat(5 - review.rating)}</p>
                  <p><strong>Bình luận:</strong> {review.comment}</p>
                </div>
              ))
            ) : (
              <p className="no-review">Chưa có đánh giá.</p>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

export default ManageReview;
