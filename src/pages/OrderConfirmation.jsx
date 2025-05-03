import { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { format } from 'date-fns';
import getIcon from '../utils/iconUtils';

const OrderConfirmation = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const order = location.state?.order;
  
  // Icons
  const CheckCircleIcon = getIcon('CheckCircle');
  const TruckIcon = getIcon('Truck');
  const CalendarIcon = getIcon('Calendar');
  const MapPinIcon = getIcon('MapPin');
  
  // If no order data is found, redirect to home
  useEffect(() => {
    if (!order) {
      navigate('/');
    }
  }, [order, navigate]);
  
  if (!order) {
    return null;
  }
  
  // Format date
  const formattedDate = format(new Date(order.orderDate), 'MMMM d, yyyy');
  
  // Calculate estimated delivery date (7 days from order)
  const deliveryDate = format(new Date(new Date(order.orderDate).getTime() + 7 * 24 * 60 * 60 * 1000), 'MMMM d, yyyy');
  
  return (
    <div className="container mx-auto px-4 py-16">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-3xl mx-auto bg-white dark:bg-surface-800 rounded-xl shadow-sm border border-surface-200 dark:border-surface-700 p-8"
      >
        <div className="text-center mb-10">
          <div className="w-16 h-16 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mx-auto mb-4">
            <CheckCircleIcon className="w-10 h-10 text-green-600 dark:text-green-400" />
          </div>
          <h1 className="text-3xl font-bold mb-2">Order Confirmed!</h1>
          <p className="text-surface-600 dark:text-surface-400">
            Thank you for your purchase. We've sent a confirmation email to {order.customer.email}.
          </p>
        </div>
        
        <div className="border-b border-surface-200 dark:border-surface-700 pb-6 mb-6">
          <div className="flex justify-between mb-2">
            <span className="font-medium">Order Number:</span>
            <span className="font-semibold">{order.orderNumber}</span>
          </div>
          <div className="flex justify-between">
            <span className="font-medium">Order Date:</span>
            <span>{formattedDate}</span>
          </div>
        </div>
        
        <div className="mb-8">
          <h2 className="text-xl font-semibold mb-4">Order Summary</h2>
          
          <div className="space-y-4">
            {order.items.map(item => (
              <div key={item.id} className="flex gap-4 py-2">
                <div className="w-16 h-16 rounded-md overflow-hidden">
                  <img 
                    src={item.image} 
                    alt={item.name} 
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="flex-1">
                  <h3 className="font-medium">{item.name}</h3>
                  <p className="text-sm text-surface-500 dark:text-surface-400">
                    Quantity: {item.quantity}
                  </p>
                </div>
                <div className="text-right">
                  <p className="font-semibold">${(item.price * item.quantity).toFixed(2)}</p>
                </div>
              </div>
            ))}
          </div>
          
          <div className="border-t border-surface-200 dark:border-surface-700 mt-6 pt-4">
            <div className="flex justify-between font-semibold text-lg">
              <span>Total:</span>
              <span>${order.total.toFixed(2)}</span>
            </div>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <div className="bg-surface-50 dark:bg-surface-700/50 p-4 rounded-lg">
            <div className="flex items-center gap-2 mb-3">
              <MapPinIcon className="w-5 h-5 text-primary" />
              <h3 className="font-medium">Shipping Address</h3>
            </div>
            <div className="text-surface-600 dark:text-surface-400">
              <p>{order.customer.firstName} {order.customer.lastName}</p>
              <p>{order.customer.address}</p>
              <p>{order.customer.city}, {order.customer.state} {order.customer.zipCode}</p>
              <p>{order.customer.country}</p>
            </div>
          </div>
          
          <div className="bg-surface-50 dark:bg-surface-700/50 p-4 rounded-lg">
            <div className="flex items-center gap-2 mb-3">
              <TruckIcon className="w-5 h-5 text-primary" />
              <h3 className="font-medium">Delivery Information</h3>
            </div>
            <div className="text-surface-600 dark:text-surface-400">
              <div className="flex items-start gap-2 mb-2">
                <CalendarIcon className="w-4 h-4 mt-0.5 text-surface-500" />
                <div>
                  <p className="font-medium">Estimated Delivery</p>
                  <p>{deliveryDate}</p>
                </div>
              </div>
              <p className="text-sm mt-2">
                You will receive shipping updates via email.
              </p>
            </div>
          </div>
        </div>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <a href="/" className="btn btn-primary px-6 py-2">
            Continue Shopping
          </a>
          <button 
            onClick={() => window.print()} 
            className="btn btn-outline px-6 py-2"
          >
            Print Receipt
          </button>
        </div>
        
      </motion.div>
    </div>
  );
};

export default OrderConfirmation;