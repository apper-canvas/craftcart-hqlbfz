import { useState } from 'react';
import { useSelector } from 'react-redux';
import { format } from 'date-fns';
import { motion } from 'framer-motion';
import getIcon from '../../utils/iconUtils';

const ReviewList = ({ productId }) => {
  const [sortOption, setSortOption] = useState('newest');
  const [filterOption, setFilterOption] = useState('all');
  
  // Get reviews from Redux store
  const reviews = useSelector(state => 
    state.reviews.items.filter(review => 
      review.productId === productId && 
      review.status === 'approved'
    )
  );

  // Calculate average rating
  const averageRating = reviews.length > 0 
    ? reviews.reduce((sum, review) => sum + review.rating, 0) / reviews.length 
    : 0;
  
  // Sort reviews based on selected option
  const getSortedReviews = () => {
    let filteredReviews = [...reviews];
    
    // Apply filter
    if (filterOption !== 'all') {
      const ratingFilter = parseInt(filterOption);
      filteredReviews = filteredReviews.filter(review => review.rating === ratingFilter);
    }
    
    // Apply sort
    switch (sortOption) {
      case 'newest':
        return filteredReviews.sort((a, b) => new Date(b.date) - new Date(a.date));
      case 'oldest':
        return filteredReviews.sort((a, b) => new Date(a.date) - new Date(b.date));
      case 'highest':
        return filteredReviews.sort((a, b) => b.rating - a.rating);
      case 'lowest':
        return filteredReviews.sort((a, b) => a.rating - b.rating);
      default:
        return filteredReviews;
    }
  };
  
  const sortedReviews = getSortedReviews();
  const StarIcon = getIcon('Star');
  const UserIcon = getIcon('User');
  const CalendarIcon = getIcon('Calendar');
  
  // Rating distribution
  const ratingCounts = [5, 4, 3, 2, 1].map(rating => ({
    rating,
    count: reviews.filter(review => review.rating === rating).length,
    percentage: reviews.length > 0 
      ? (reviews.filter(review => review.rating === rating).length / reviews.length) * 100
      : 0
  }));

  return (
    <div className="bg-white dark:bg-surface-800 rounded-xl p-6 border border-surface-200 dark:border-surface-700">
      <h3 className="text-xl font-bold mb-6">Customer Reviews</h3>
      
      {/* Rating summary */}
      <div className="flex flex-col md:flex-row gap-8 mb-8 pb-8 border-b border-surface-200 dark:border-surface-700">
        {/* Average rating */}
        <div className="text-center md:text-left md:border-r md:pr-8 md:border-surface-200 md:dark:border-surface-700">
          <div className="text-5xl font-bold mb-2">{averageRating.toFixed(1)}</div>
          <div className="flex justify-center md:justify-start text-yellow-400 mb-2">
            {[1, 2, 3, 4, 5].map((star) => (
              <StarIcon 
                key={star} 
                className="w-5 h-5" 
                fill={star <= Math.round(averageRating) ? "currentColor" : "none"} 
              />
            ))}
          </div>
          <div className="text-surface-500 dark:text-surface-400 text-sm">
            Based on {reviews.length} reviews
          </div>
        </div>
        
        {/* Rating distribution */}
        <div className="flex-1">
          <div className="space-y-2">
            {ratingCounts.map(({ rating, count, percentage }) => (
              <div key={rating} className="flex items-center gap-2">
                <div className="w-12 text-surface-600 dark:text-surface-400 text-sm">{rating} stars</div>
                <div className="flex-1 bg-surface-200 dark:bg-surface-700 rounded-full h-2.5 overflow-hidden">
                  <div 
                    className="bg-yellow-400 h-full rounded-full" 
                    style={{ width: `${percentage}%` }} 
                  />
                </div>
                <div className="w-12 text-surface-600 dark:text-surface-400 text-sm text-right">{count}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
      
      {/* Sort and filter controls */}
      <div className="flex flex-col sm:flex-row justify-between gap-4 mb-6">
        <div className="flex items-center">
          <label htmlFor="reviewSort" className="mr-2 text-surface-600 dark:text-surface-400 text-sm">Sort by:</label>
          <select 
            id="reviewSort"
            value={sortOption} 
            onChange={(e) => setSortOption(e.target.value)}
            className="input text-sm py-1"
          >
            <option value="newest">Newest</option>
            <option value="oldest">Oldest</option>
            <option value="highest">Highest Rated</option>
            <option value="lowest">Lowest Rated</option>
          </select>
        </div>
        
        <div className="flex items-center">
          <label htmlFor="reviewFilter" className="mr-2 text-surface-600 dark:text-surface-400 text-sm">Filter:</label>
          <select 
            id="reviewFilter"
            value={filterOption} 
            onChange={(e) => setFilterOption(e.target.value)}
            className="input text-sm py-1"
          >
            <option value="all">All Ratings</option>
            <option value="5">5 Stars</option>
            <option value="4">4 Stars</option>
            <option value="3">3 Stars</option>
            <option value="2">2 Stars</option>
            <option value="1">1 Star</option>
          </select>
        </div>
      </div>
      
      {/* Reviews list */}
      {sortedReviews.length > 0 ? (
        <div className="space-y-6">
          {sortedReviews.map((review) => (
            <motion.div 
              key={review.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="border-b border-surface-200 dark:border-surface-700 pb-6 last:border-0"
            >
              <div className="flex justify-between items-start mb-2">
                <div className="flex text-yellow-400">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <StarIcon 
                      key={star} 
                      className="w-4 h-4" 
                      fill={star <= review.rating ? "currentColor" : "none"}
                    />
                  ))}
                </div>
                <div className="text-surface-500 dark:text-surface-400 text-sm flex items-center">
                  <CalendarIcon className="w-3 h-3 mr-1" />
                  {format(new Date(review.date), 'MMM d, yyyy')}
                </div>
              </div>
              
              <h4 className="font-semibold mb-2">{review.title}</h4>
              <p className="text-surface-600 dark:text-surface-300 mb-4">{review.comment}</p>
              
              <div className="flex items-center text-surface-500 dark:text-surface-400 text-sm">
                <UserIcon className="w-3 h-3 mr-1" />
                <span>{review.userName}</span>
                {review.verifiedPurchase && (
                  <span className="ml-2 text-green-600 dark:text-green-400 text-xs font-medium">
                    Verified Purchase
                  </span>
                )}
              </div>
              
              {/* Review images if any */}
              {review.images && review.images.length > 0 && (
                <div className="flex gap-2 mt-3">
                  {review.images.map((image, idx) => (
                    <img 
                      key={idx}
                      src={image} 
                      alt={`Review ${idx + 1}`}
                      className="w-16 h-16 object-cover rounded-md"
                    />
                  ))}
                </div>
              )}
            </motion.div>
          ))}
        </div>
      ) : (
        <div className="text-center py-10">
          <p className="text-surface-500 dark:text-surface-400">
            No reviews found. Be the first to review this product!
          </p>
        </div>
      )}
    </div>
  );
};

export default ReviewList;