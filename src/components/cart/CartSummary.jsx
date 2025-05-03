import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { 
  selectCartSubtotal, 
  selectCartShipping, 
  selectCartTax, 
  selectCartTotal 
} from '../../features/cart/cartSlice';

const CartSummary = ({ isCheckout = false }) => {
  // Get cart summary data from Redux store
  const subtotal = useSelector(selectCartSubtotal);
  const shipping = useSelector(selectCartShipping);
  const tax = useSelector(selectCartTax);
  const total = useSelector(selectCartTotal);
  const navigate = useNavigate();
  
  // Function to handle checkout navigation
  const handleCheckout = () => {
    navigate('/checkout');
  };

  return (
    <div className={`rounded-xl ${isCheckout ? 'bg-white dark:bg-surface-800 shadow-sm border border-surface-200 dark:border-surface-700' : ''} p-5`}>
      <h3 className="font-semibold text-lg mb-4">Order Summary</h3>
      
      <div className="space-y-3 mb-6">
        <div className="flex justify-between text-surface-600 dark:text-surface-400">
          <span>Subtotal</span>
          <span>${subtotal.toFixed(2)}</span>
        </div>
        
        <div className="flex justify-between text-surface-600 dark:text-surface-400">
          <span>Shipping</span>
          <span>
            {shipping === 0 ? (
              <span className="text-green-600 dark:text-green-400">Free</span>
            ) : (
              `$${shipping.toFixed(2)}`
            )}
          </span>
        </div>
        
        <div className="flex justify-between text-surface-600 dark:text-surface-400">
          <span>Estimated Tax</span>
          <span>${tax.toFixed(2)}</span>
        </div>
        
        <div className="pt-3 border-t border-surface-200 dark:border-surface-700 flex justify-between font-semibold text-lg">
          <span>Total</span>
          <span>${total.toFixed(2)}</span>
        </div>
      </div>
      
      {!isCheckout && (
        <div className="flex flex-col space-y-3">
          <button 
            onClick={handleCheckout}
            className="btn btn-primary w-full flex justify-center items-center"
          >
            Proceed to Checkout
          </button>
          <a 
            href="#products" 
            className="btn btn-outline w-full flex justify-center items-center"
          >
            Continue Shopping
          </a>
        </div>
      )}
      
      {isCheckout && (
        <div className="p-3 bg-primary-light/10 dark:bg-primary-light/5 rounded-lg text-sm text-surface-600 dark:text-surface-400 mt-4">
          <p className="text-surface-700 dark:text-surface-300 font-medium mb-1">Free shipping on orders over $50!</p>
          <p>All orders are processed and shipped within 1-2 business days.</p>
        </div>
      )}
    </div>
  );
};

export default CartSummary;