import { configureStore } from '@reduxjs/toolkit';
import cartReducer from '../features/cart/cartSlice';
import reviewsReducer from '../features/reviews/reviewsSlice';

export const store = configureStore({
  reducer: {
    cart: cartReducer,
    reviews: reviewsReducer,
  },
});