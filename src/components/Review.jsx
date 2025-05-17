import React, { useEffect, useState } from 'react';
import reviewService from '../services/reviewService';
import '../styles/Review.css';

const Review = ({ id }) => {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchReviews = async () => {
      setLoading(true);
      try {
        const res = await reviewService.getReviewById(id);
        setReviews(res.result);
        console.log("Đánh giá sản phẩm:", res.result);
      } catch (err) {
        setError('Lỗi khi tải đánh giá');
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchReviews();
    }
  }, [id]);

  if (loading) return <p className="review-loading">Đang tải đánh giá...</p>;
  if (error) return <p className="review-error">{error}</p>;

  return (
    <div className="review-section">
      <h3 className="review-heading">Đánh giá sản phẩm</h3>
      {reviews.length === 0 ? (
        <p className="no-reviews">Chưa có đánh giá nào.</p>
      ) : (
        <div className="review-list">
          {reviews.map((review) => (
            <div className="review-card" key={review.id}>
              <div className="review-header">
                <div className="avatar">
                  {review.username?.charAt(0).toUpperCase() || 'U'}
                </div>
                <div>
                  <p className="review-username">{review.username || 'Người dùng'}</p>
                  <div className="stars">
                    {Array.from({ length: review.rating }, (_, i) => (
                      <span key={i} className="star">★</span>
                    ))}
                    {Array.from({ length: 5 - review.rating }, (_, i) => (
                      <span key={i} className="star inactive">☆</span>
                    ))}
                  </div>
                </div>
              </div>
              <p className="review-comment">{review.comment}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Review;
