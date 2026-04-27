import { useState, useEffect } from 'react';
import './ReviewModal.css';

function ReviewModal({ product, onClose }) {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`/api/products/${product._id}/reviews`)
      .then(res => res.json())
      .then(data => {
        setReviews(data);
        setLoading(false);
      });
  }, [product._id]);

  return (
    <div className='modal-overlay' onClick={onClose}>
      <div className='modal-content' onClick={e => e.stopPropagation()}>
        <div className='modal-header'>
          <h2>{product.name}</h2>
          <button className='modal-close' onClick={onClose}>✕</button>
        </div>
        {loading ? (
          <p>Loading reviews...</p>
        ) : reviews.length === 0 ? (
          <p>No reviews yet.</p>
        ) : (
          <div className='reviews-list'>
            {reviews.map(review => (
              <div key={review._id} className='review-item'>
                <div className='review-rating'>
                  {'★'.repeat(review.rating)}{'☆'.repeat(5 - review.rating)}
                </div>
                <p>{review.comment}</p>
                <small>{new Date(review.createdAt).toLocaleDateString()}</small>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default ReviewModal;