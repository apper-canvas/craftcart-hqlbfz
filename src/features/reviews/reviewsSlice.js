import { createSlice } from '@reduxjs/toolkit';

// Sample initial reviews data
const initialReviews = [
  {
    id: '1',
    productId: 1,
    productName: 'Handcrafted Ceramic Mug',
    rating: 5,
    title: 'Beautiful craftsmanship!',
    comment: 'This mug is absolutely stunning. The glaze finish is even more beautiful in person, and it feels so nice to hold. My morning coffee has never been better!',
    userName: 'Sarah Johnson',
    email: 'sarah.j@example.com',
    date: '2023-05-15T09:23:45.678Z',
    status: 'approved',
    verifiedPurchase: true,
    images: []
  },
  {
    id: '2',
    productId: 1,
    productName: 'Handcrafted Ceramic Mug',
    rating: 4,
    title: 'Great quality but smaller than expected',
    comment: 'The mug is beautiful and well-made, but it\'s a bit smaller than I expected. Still, I love the design and the quality is excellent.',
    userName: 'Michael Torres',
    email: 'mike.t@example.com',
    date: '2023-06-22T14:18:32.456Z',
    status: 'approved',
    verifiedPurchase: true,
    images: []
  },
  {
    id: '3',
    productId: 2,
    productName: 'Woven Cotton Throw Blanket',
    rating: 5,
    title: 'Perfect addition to our living room',
    comment: 'This throw blanket is exactly what we needed for our couch. The pattern is beautiful and the cotton feels high quality. It\'s also the perfect weight - not too heavy but still cozy.',
    userName: 'Emma Wilson',
    email: 'emma.w@example.com',
    date: '2023-04-30T16:45:12.345Z',
    status: 'approved',
    verifiedPurchase: true,
    images: []
  },
  {
    id: '4',
    productId: 3,
    productName: 'Hand-Carved Wooden Bowl',
    rating: 2,
    title: 'Disappointed with quality',
    comment: 'The bowl arrived with a crack on one side. It doesn\'t look like the photos at all and the finish is quite rough.',
    userName: 'Robert Chen',
    email: 'robert.c@example.com',
    date: '2023-07-05T11:33:27.890Z',
    status: 'pending',
    verifiedPurchase: false,
    images: []
  },
  {
    id: '5',
    productId: 5,
    productName: 'Hand-Painted Silk Scarf',
    rating: 5,
    title: 'Absolutely exquisite!',
    comment: 'I purchased this as a gift for my mother and she was thrilled. The colors are vibrant and the silk is incredibly soft. The artist\'s signature is a lovely touch that makes it feel special.',
    userName: 'Jessica Brown',
    email: 'jess.b@example.com',
    date: '2023-03-18T10:12:36.789Z',
    status: 'approved',
    verifiedPurchase: true,
    images: []
  },
  {
    id: '6',
    productId: 4,
    productName: 'Sterling Silver Leaf Earrings',
    rating: 3,
    title: 'Nice but tarnished quickly',
    comment: 'The earrings are beautiful and lightweight as described, but they tarnished after only a few wears. I expected better for sterling silver.',
    userName: 'Olivia Martin',
    email: 'olivia.m@example.com',
    date: '2023-06-10T15:27:41.234Z',
    status: 'rejected',
    verifiedPurchase: true,
    images: []
  }
];

const initialState = {
  items: initialReviews,
  status: 'idle',
  error: null
};

export const reviewsSlice = createSlice({
  name: 'reviews',
  initialState,
  reducers: {
    // Add a new review (with pending status for moderation)
    addReview: (state, action) => {
      state.items.push(action.payload);
    },
    
    // Approve a review
    approveReview: (state, action) => {
      const { id } = action.payload;
      const review = state.items.find(review => review.id === id);
      if (review) {
        review.status = 'approved';
      }
    },
    
    // Reject a review
    rejectReview: (state, action) => {
      const { id } = action.payload;
      const review = state.items.find(review => review.id === id);
      if (review) {
        review.status = 'rejected';
      }
    },
    
    // Edit a review (admin function)
    editReview: (state, action) => {
      const { id, changes } = action.payload;
      const index = state.items.findIndex(review => review.id === id);
      if (index !== -1) {
        state.items[index] = { ...state.items[index], ...changes };
      }
    },
    
    // Delete a review (admin function)
    deleteReview: (state, action) => {
      const { id } = action.payload;
      state.items = state.items.filter(review => review.id !== id);
    }
  }
});

// Export actions
export const {
  addReview,
  approveReview,
  rejectReview,
  editReview,
  deleteReview
} = reviewsSlice.actions;

// Export selectors
export const selectAllReviews = (state) => state.reviews.items;
export const selectReviewsByProductId = (state, productId) => 
  state.reviews.items.filter(review => 
    review.productId === productId && review.status === 'approved'
  );
export const selectReviewsByStatus = (state, status) => 
  state.reviews.items.filter(review => review.status === status);

export default reviewsSlice.reducer;