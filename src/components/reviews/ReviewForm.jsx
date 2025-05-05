import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import { addReview } from '../../features/reviews/reviewsSlice';
import getIcon from '../../utils/iconUtils';

const ReviewForm = ({ productId, productName }) => {
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    rating: 0,
    title: '',
    comment: '',
    userName: '',
    email: '',
    images: []
  });
  const [hoveredRating, setHoveredRating] = useState(0);
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const StarIcon = getIcon('Star');
  const ImageIcon = getIcon('Image');
  const LoaderIcon = getIcon('Loader');
  const XIcon = getIcon('X'); // Add X icon for image removal
  
  const handleRatingClick = (rating) => {
    setFormData({ ...formData, rating });
  };
  
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors({ ...errors, [name]: '' });
    }
  };
  
  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files);
    
    if (files.length + formData.images.length > 3) {
      toast.error('You can only upload up to 3 images');
      return;
    }
    
    // Convert files to data URLs for preview
    Promise.all(
      files.map((file) => {
        return new Promise((resolve) => {
          const reader = new FileReader();
          reader.onload = (e) => resolve(e.target.result);
          reader.readAsDataURL(file);
        });
      })
    ).then((images) => {
      setFormData({ ...formData, images: [...formData.images, ...images] });
    });
  };
  
  const removeImage = (index) => {
    const updatedImages = [...formData.images];
    updatedImages.splice(index, 1);
    setFormData({ ...formData, images: updatedImages });
  };
  
  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.rating) newErrors.rating = 'Please select a rating';
    if (!formData.title.trim()) newErrors.title = 'Please enter a review title';
    if (!formData.comment.trim()) newErrors.comment = 'Please enter your review';
    if (!formData.userName.trim()) newErrors.userName = 'Please enter your name';
    if (!formData.email.trim()) {
      newErrors.email = 'Please enter your email';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }
    
    setIsSubmitting(true);
    
    // Create a new review with pending status for moderation
    const newReview = {
      id: Date.now().toString(),
      productId,
      productName,
      rating: formData.rating,
      title: formData.title,
      comment: formData.comment,
      userName: formData.userName,
      email: formData.email,
      date: new Date().toISOString(),
      status: 'pending',
      verifiedPurchase: Math.random() > 0.5, // Random for demo, would be based on actual purchase history
      images: formData.images
    };
    
    // Dispatch the action to add the review
    dispatch(addReview(newReview));
    
    // Show success message
    toast.success('Your review has been submitted for moderation', {
      position: "bottom-right",
      autoClose: 3000
    });
    
    // Reset form
    setFormData({
      rating: 0,
      title: '',
      comment: '',
      userName: '',
      email: '',
      images: []
    });
    
    setIsSubmitting(false);
  };
  
  return (
    <div className="bg-white dark:bg-surface-800 rounded-xl p-6 border border-surface-200 dark:border-surface-700">
      <h3 className="text-xl font-bold mb-6">Write a Review</h3>
      
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Rating */}
        <div>
          <label className="block mb-2 font-medium">
            Rating <span className="text-red-500">*</span>
          </label>
          <div className="flex gap-1">
            {[1, 2, 3, 4, 5].map((star) => (
              <button
                key={star}
                type="button"
                className="text-yellow-400 focus:outline-none"
                onMouseEnter={() => setHoveredRating(star)}
                onMouseLeave={() => setHoveredRating(0)}
                onClick={() => handleRatingClick(star)}
              >
                <StarIcon 
                  className="w-8 h-8" 
                  fill={(hoveredRating || formData.rating) >= star ? "currentColor" : "none"}
                />
              </button>
            ))}
          </div>
          {errors.rating && (
            <p className="text-red-500 text-sm mt-1">{errors.rating}</p>
          )}
        </div>
        
        {/* Review Title */}
        <div>
          <label htmlFor="title" className="block mb-2 font-medium">
            Review Title <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            id="title"
            name="title"
            value={formData.title}
            onChange={handleInputChange}
            placeholder="Summarize your experience"
            className="input"
          />
          {errors.title && (
            <p className="text-red-500 text-sm mt-1">{errors.title}</p>
          )}
        </div>
        
        {/* Review Content */}
        <div>
          <label htmlFor="comment" className="block mb-2 font-medium">
            Review <span className="text-red-500">*</span>
          </label>
          <textarea
            id="comment"
            name="comment"
            value={formData.comment}
            onChange={handleInputChange}
            rows="4"
            placeholder="What did you like or dislike about this product?"
            className="input"
          ></textarea>
          {errors.comment && (
            <p className="text-red-500 text-sm mt-1">{errors.comment}</p>
          )}
        </div>
        
        {/* Images (optional) */}
        <div>
          <label className="block mb-2 font-medium">Images (optional)</label>
          <div className="mb-2">
            <label htmlFor="images" className="btn btn-outline flex items-center gap-2 cursor-pointer">
              <ImageIcon className="w-4 h-4" />
              <span>Upload Images</span>
              <input
                type="file"
                id="images"
                accept="image/*"
                multiple
                onChange={handleImageUpload}
                className="hidden"
              />
            </label>
            <p className="text-surface-500 dark:text-surface-400 text-sm mt-1">
              You can upload up to 3 images (max 5MB each)
            </p>
          </div>
          
          {/* Image previews */}
          {formData.images.length > 0 && (
            <div className="flex flex-wrap gap-2 mt-2">
              {formData.images.map((image, index) => (
                <div key={index} className="relative">
                  <img
                    src={image}
                    alt={`Preview ${index + 1}`}
                    className="w-20 h-20 object-cover rounded-md"
                  />
                  <button
                    type="button"
                    onClick={() => removeImage(index)}
                    className="absolute -top-2 -right-2 bg-surface-700 text-white rounded-full p-1"
                  >
                    <XIcon className="w-3 h-3" />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
        
        {/* User Info */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label htmlFor="userName" className="block mb-2 font-medium">
              Your Name <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              id="userName"
              name="userName"
              value={formData.userName}
              onChange={handleInputChange}
              placeholder="Your display name"
              className="input"
            />
            {errors.userName && (
              <p className="text-red-500 text-sm mt-1">{errors.userName}</p>
            )}
          </div>
          
          <div>
            <label htmlFor="email" className="block mb-2 font-medium">
              Email <span className="text-red-500">*</span>
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              placeholder="Your email (not displayed publicly)"
              className="input"
            />
            {errors.email && (
              <p className="text-red-500 text-sm mt-1">{errors.email}</p>
            )}
          </div>
        </div>
        
        {/* Submit button */}
        <div>
          <button
            type="submit"
            disabled={isSubmitting}
            className="btn btn-primary w-full md:w-auto flex items-center justify-center gap-2"
          >
            {isSubmitting ? (
              <>
                <LoaderIcon className="w-4 h-4 animate-spin" />
                <span>Submitting...</span>
              </>
            ) : (
              <span>Submit Review</span>
            )}
          </button>
          <p className="text-surface-500 dark:text-surface-400 text-sm mt-2">
            Your review will be visible after moderation. Thank you for your feedback!
          </p>
        </div>
      </form>
    </div>
  );
};

export default ReviewForm;