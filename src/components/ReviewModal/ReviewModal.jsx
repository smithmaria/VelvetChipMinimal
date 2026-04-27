import { useState, useEffect } from 'react';
import './ReviewModal.css';

function ReviewModal({ product, onClose }) {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingId, setEditingId] = useState(null);
  const [editForm, setEditForm] = useState({ rating: 0, comment: '' });

  useEffect(() => {
    fetch(`/api/products/${product._id}/reviews`)
      .then(res => res.json())
      .then(data => {
        setReviews(data);
        setLoading(false);
      });
  }, [product._id]);

  function handleEditClick(review) {
    setEditingId(review._id);
    setEditForm({ rating: review.rating, comment: review.comment });
  }

  async function handleSave(reviewId) {
    try {
      const res = await fetch(`/api/reviews/${reviewId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(editForm)
      });
      if (res.ok) {
        setReviews(prev => prev.map(r =>
          r._id === reviewId ? { ...r, ...editForm } : r
        ));
        setEditingId(null);
      }
    } catch (err) {
      console.error('Failed to update review:', err);
    }
  }

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
                {editingId === review._id ? (
                  <div className='edit-form'>
                    <div className='star-select'>
                      {[1,2,3,4,5].map(star => (
                        <span
                          key={star}
                          className={star <= editForm.rating ? 'star star-active' : 'star'}
                          onClick={() => setEditForm(prev => ({ ...prev, rating: star }))}
                        >★</span>
                      ))}
                    </div>
                    <textarea
                      className='edit-textarea'
                      value={editForm.comment}
                      onChange={e => setEditForm(prev => ({ ...prev, comment: e.target.value }))}
                    />
                    <div className='edit-actions'>
                      <button onClick={() => handleSave(review._id)}>Save</button>
                      <button onClick={() => setEditingId(null)}>Cancel</button>
                    </div>
                  </div>
                ) : (
                  <>
                    <div className='review-rating'>
                      {'★'.repeat(review.rating)}{'☆'.repeat(5 - review.rating)}
                    </div>
                    <p>{review.comment}</p>
                    <div className='review-footer'>
                      <small>{new Date(review.createdAt).toLocaleDateString()}</small>
                      <button className='edit-btn' onClick={() => handleEditClick(review)}>Edit</button>
                    </div>
                  </>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default ReviewModal;