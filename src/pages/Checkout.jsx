import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { selectCartItems } from '../features/cart/cartSlice';
import CartSummary from '../components/cart/CartSummary';
import CheckoutForm from '../components/cart/CheckoutForm';
import getIcon from '../utils/iconUtils';

const Checkout = () => {
  const cartItems = useSelector(selectCartItems);
  const LockIcon = getIcon('Lock');
  
  // Redirect if cart is empty
  if (cartItems.length === 0) {
    return <Navigate to="/" />;
  }
  
  return (
    <div className="container mx-auto px-4 py-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-3xl font-bold mb-8 text-center md:text-left">Checkout</h1>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main checkout form */}
          <div className="lg:col-span-2 bg-white dark:bg-surface-800 p-6 rounded-xl shadow-sm border border-surface-200 dark:border-surface-700">
            <CheckoutForm />
          </div>
          
          {/* Order summary sidebar */}
          <div className="space-y-6">
            <CartSummary isCheckout={true} />
            
            <div className="bg-white dark:bg-surface-800 rounded-xl p-5 border border-surface-200 dark:border-surface-700">
              <div className="flex items-center gap-2 mb-4">
                <LockIcon className="w-5 h-5 text-green-600 dark:text-green-400" />
                <h3 className="font-semibold">Secure Checkout</h3>
              </div>
              <p className="text-sm text-surface-600 dark:text-surface-400">
                All transactions are secure and encrypted. Your personal information is never shared with third parties.
              </p>
            </div>
            
            <div className="bg-white dark:bg-surface-800 rounded-xl p-5 border border-surface-200 dark:border-surface-700">
              <h3 className="font-semibold mb-4">We Accept</h3>
              <div className="flex flex-wrap gap-3">
                <div className="w-12 h-8 bg-surface-200 dark:bg-surface-700 rounded flex items-center justify-center text-xs">Visa</div>
                <div className="w-12 h-8 bg-surface-200 dark:bg-surface-700 rounded flex items-center justify-center text-xs">MC</div>
                <div className="w-12 h-8 bg-surface-200 dark:bg-surface-700 rounded flex items-center justify-center text-xs">Amex</div>
                <div className="w-12 h-8 bg-surface-200 dark:bg-surface-700 rounded flex items-center justify-center text-xs">PayPal</div>
                <div className="w-12 h-8 bg-surface-200 dark:bg-surface-700 rounded flex items-center justify-center text-xs">Apple</div>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default Checkout;