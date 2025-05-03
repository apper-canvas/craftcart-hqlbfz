import { useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { selectCartItems } from '../features/cart/cartSlice';
import CartItem from './cart/CartItem';
import CartSummary from './cart/CartSummary';
import getIcon from '../utils/iconUtils';

const Cart = ({ isOpen, onClose }) => {
  const cartItems = useSelector(selectCartItems);
  const cartRef = useRef(null);
  
  // Get icons
  const XIcon = getIcon('X');
  const ShoppingBagIcon = getIcon('ShoppingBag');
  
  // Close cart when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (cartRef.current && !cartRef.current.contains(event.target) && isOpen) {
        onClose();
      }
    };
    
    document.addEventListener('mousedown', handleClickOutside);
    
    // Lock body scroll when cart is open
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.body.style.overflow = '';
    };
  }, [isOpen, onClose]);
  
  return (
    <>
      {/* Overlay */}
      {isOpen && (
        <div className="fixed inset-0 bg-surface-900/50 dark:bg-surface-900/80 z-40" />
      )}
      
      {/* Cart sidebar */}
      <motion.div
        ref={cartRef}
        initial={{ x: '100%' }}
        animate={{ x: isOpen ? 0 : '100%' }}
        exit={{ x: '100%' }}
        transition={{ type: 'spring', damping: 25, stiffness: 200 }}
        className="fixed inset-y-0 right-0 w-full sm:w-96 bg-white dark:bg-surface-800 shadow-lg z-50 overflow-auto"
      >
        <div className="p-4 h-full flex flex-col">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold">Your Cart</h2>
            <button 
              onClick={onClose}
              className="p-2 rounded-full hover:bg-surface-100 dark:hover:bg-surface-700"
              aria-label="Close cart"
            >
              <XIcon className="w-5 h-5" />
            </button>
          </div>
          
          {/* Cart content */}
          {cartItems.length > 0 ? (
            <div className="flex-1 flex flex-col overflow-hidden">
              {/* Cart items */}
              <div className="flex-1 overflow-auto pr-2 -mr-2">
                {cartItems.map(item => (
                  <CartItem key={item.id} item={item} />
                ))}
              </div>
              
              {/* Cart summary */}
              <div className="mt-6 pt-6 border-t border-surface-200 dark:border-surface-700">
                <CartSummary />
              </div>
            </div>
          ) : (
            <div className="flex-1 flex items-center justify-center">
              <div className="text-center">
                <ShoppingBagIcon className="w-16 h-16 mx-auto mb-4 text-surface-300" />
                <p className="text-surface-600 dark:text-surface-400 mb-4">Your cart is empty</p>
                <button 
                  onClick={onClose}
                  className="px-4 py-2 bg-primary hover:bg-primary-dark text-white rounded-lg transition-colors"
                >
                  Continue Shopping
                </button>
              </div>
            </div>
          )}
        </div>
      </motion.div>
    </>
  );
};

export default Cart;