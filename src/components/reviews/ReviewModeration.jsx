import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import { approveReview, rejectReview } from '../../features/reviews/reviewsSlice';
import { format } from 'date-fns';
import getIcon from '../../utils/iconUtils';

const ReviewModeration = () => {
  const dispatch = useDispatch();
  const [filterStatus, setFilterStatus] = useState('pending');
  
  // Get all reviews from the Redux store
  const allReviews = useSelector(state => state.reviews.items);
  
  // Filter reviews based on status
  const filteredReviews = allReviews.filter(review => {
    if (filterStatus === 'all') return true;
    return review.status === filterStatus;
  });
  
  const handleApprove = (reviewId) => {
    dispatch(approveReview({ id: reviewId }));
    toast.success('Review approved successfully', {
      position: "bottom-right",
      autoClose: 2000
    });
  };
  
  const handleReject = (reviewId) => {
    dispatch(rejectReview({ id: reviewId }));
    toast.success('Review rejected', {
      position: "bottom-right",
      autoClose: 2000
    });
  };
  
  const CheckIcon = getIcon('Check');
  const XIcon = getIcon('X');
  const StarIcon = getIcon('Star');
  const EyeIcon = getIcon('Eye');
  const AlertTriangleIcon = getIcon('AlertTriangle');
  
  // Status badge component
  const StatusBadge = ({ status }) => {
    const getBadgeClasses = () => {
      switch (status) {
        case 'approved':
          return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300';
        case 'rejected':
          return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300';
        case 'pending':
        default:
          return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300';
      }
    };
    
    const getStatusIcon = () => {
      switch (status) {
        case 'approved':
          return <CheckIcon className="w-3 h-3" />;
        case 'rejected':
          return <XIcon className="w-3 h-3" />;
        case 'pending':
        default:
          return <AlertTriangleIcon className="w-3 h-3" />;
      }
    };
    
    return (
      <span className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-medium ${getBadgeClasses()}`}>
        {getStatusIcon()}
        <span className="capitalize">{status}</span>
      </span>
    );
  };
  
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="bg-white dark:bg-surface-800 rounded-xl p-6 border border-surface-200 dark:border-surface-700">
        <h2 className="text-2xl font-bold mb-6">Review Moderation</h2>
        
        {/* Filter controls */}
        <div className="flex mb-6">
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="input"
          >
            <option value="all">All Reviews</option>
            <option value="pending">Pending Reviews</option>
            <option value="approved">Approved Reviews</option>
            <option value="rejected">Rejected Reviews</option>
          </select>
          
          <div className="ml-4 bg-surface-100 dark:bg-surface-700 rounded-lg p-2 flex">
            <div className="flex items-center justify-between space-x-3">
              <div className="flex items-center">
                <div className="h-3 w-3 rounded-full bg-yellow-400 mr-1"></div>
                <span className="text-sm">Pending: {allReviews.filter(r => r.status === 'pending').length}</span>
              </div>
              <div className="flex items-center">
                <div className="h-3 w-3 rounded-full bg-green-400 mr-1"></div>
                <span className="text-sm">Approved: {allReviews.filter(r => r.status === 'approved').length}</span>
              </div>
              <div className="flex items-center">
                <div className="h-3 w-3 rounded-full bg-red-400 mr-1"></div>
                <span className="text-sm">Rejected: {allReviews.filter(r => r.status === 'rejected').length}</span>
              </div>
            </div>
          </div>
        </div>
        
        {/* Reviews table */}
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-surface-200 dark:divide-surface-700">
            <thead className="bg-surface-50 dark:bg-surface-800">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-surface-500 uppercase tracking-wider">
                  Product
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-surface-500 uppercase tracking-wider">
                  Rating
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-surface-500 uppercase tracking-wider">
                  Review
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-surface-500 uppercase tracking-wider">
                  User
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-surface-500 uppercase tracking-wider">
                  Date
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-surface-500 uppercase tracking-wider">
                  Status
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-surface-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white dark:bg-surface-800 divide-y divide-surface-200 dark:divide-surface-700">
              {filteredReviews.length > 0 ? (
                filteredReviews.map((review) => (
                  <tr key={review.id} className="hover:bg-surface-50 dark:hover:bg-surface-700">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="truncate max-w-[140px]">{review.productName}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex text-yellow-400">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <StarIcon 
                            key={star} 
                            className="w-4 h-4" 
                            fill={star <= review.rating ? "currentColor" : "none"} 
                          />
                        ))}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="max-w-[200px]">
                        <div className="font-medium truncate">{review.title}</div>
                        <div className="text-surface-500 text-sm truncate">{review.comment}</div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div>{review.userName}</div>
                      <div className="text-surface-500 text-sm truncate">{review.email}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-surface-500">
                      {format(new Date(review.date), 'MMM d, yyyy')}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <StatusBadge status={review.status} />
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <div className="flex space-x-2">
                        {review.status === 'pending' && (
                          <>
                            <button
                              onClick={() => handleApprove(review.id)}
                              className="text-green-600 hover:text-green-900 dark:text-green-400 dark:hover:text-green-300"
                            >
                              <CheckIcon className="w-5 h-5" />
                            </button>
                            <button
                              onClick={() => handleReject(review.id)}
                              className="text-red-600 hover:text-red-900 dark:text-red-400 dark:hover:text-red-300"
                            >
                              <XIcon className="w-5 h-5" />
                            </button>
                          </>
                        )}
                        <button className="text-primary hover:text-primary-dark dark:text-primary-light">
                          <EyeIcon className="w-5 h-5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="7" className="px-6 py-10 text-center text-surface-500">
                    No reviews found matching the current filter.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ReviewModeration;