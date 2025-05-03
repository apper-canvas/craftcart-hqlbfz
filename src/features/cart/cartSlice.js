import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  items: [],
  subtotal: 0,
  shipping: 0,
  tax: 0,
  total: 0,
};

export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addItem: (state, action) => {
      const { id } = action.payload;
      const existingItem = state.items.find(item => item.id === id);
      
      if (existingItem) {
        existingItem.quantity += 1;
      } else {
        state.items.push({ ...action.payload, quantity: 1 });
      }
      
      // Recalculate totals
      calculateTotals(state);
    },
    removeItem: (state, action) => {
      state.items = state.items.filter(item => item.id !== action.payload);
      
      // Recalculate totals
      calculateTotals(state);
    },
    updateQuantity: (state, action) => {
      const { id, quantity } = action.payload;
      const item = state.items.find(item => item.id === id);
      
      if (item) {
        item.quantity = Math.max(1, quantity);
      }
      
      // Recalculate totals
      calculateTotals(state);
    },
    clearCart: (state) => {
      state.items = [];
      calculateTotals(state);
    },
  },
});

// Helper function to calculate cart totals
const calculateTotals = (state) => {
  // Calculate subtotal
  state.subtotal = state.items.reduce(
    (total, item) => total + (item.price * item.quantity),
    0
  );
  
  // Calculate shipping (free over $50, otherwise $5.99)
  state.shipping = state.subtotal > 50 ? 0 : 5.99;
  
  // Calculate tax (8% of subtotal)
  state.tax = state.subtotal * 0.08;
  
  // Calculate total
  state.total = state.subtotal + state.shipping + state.tax;
};

export const { addItem, removeItem, updateQuantity, clearCart } = cartSlice.actions;

// Selectors
export const selectCartItems = (state) => state.cart.items;
export const selectCartItemCount = (state) => 
  state.cart.items.reduce((count, item) => count + item.quantity, 0);
export const selectCartSubtotal = (state) => state.cart.subtotal;
export const selectCartShipping = (state) => state.cart.shipping;
export const selectCartTax = (state) => state.cart.tax;
export const selectCartTotal = (state) => state.cart.total;

export default cartSlice.reducer;