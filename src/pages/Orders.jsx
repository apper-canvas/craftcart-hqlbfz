import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import getIcon from '../utils/iconUtils';
import { toast } from 'react-toastify';

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  // Icons
  const PackageIcon = getIcon('Package');
  const TruckIcon = getIcon('Truck');
  const CheckCircleIcon = getIcon('CheckCircle');
  const ClockIcon = getIcon('Clock');
  const EyeIcon = getIcon('Eye');
  const FileTextIcon = getIcon('FileText');

  useEffect(() => {
    // Simulate fetching orders from an API
    const fetchOrders = async () => {
      try {
        // Simulate API delay
        await new Promise(resolve => setTimeout(resolve, 1200));
        
        // Mock order data
        const mockOrders = [
          {
            id: 'ORD-38294',
            date: '2023-11-15',
            status: 'Delivered',
            total: 129.99,
            items: 3,
            trackingNumber: 'TRK928374612'
          },
          {
            id: 'ORD-27184',
            date: '2023-10-28',
            status: 'Shipped',
            total: 86.50,
            items: 2,
            trackingNumber: 'TRK817263549'
          },
          {
            id: 'ORD-19375',
            date: '2023-10-02',
            status: 'Processing',
            total: 215.75,
            items: 5,
            trackingNumber: null
          }
        ];
        
        setOrders(mockOrders);
        setIsLoading(false);
      } catch (error) {
        console.error('Error fetching orders:', error);
        toast.error('Failed to load your orders. Please try again later.');
        setIsLoading(false);
      }
    };

    fetchOrders();
  }, []);

  const getStatusIcon = (status) => {
    switch (status) {
      case 'Delivered':
        return <CheckCircleIcon className="w-5 h-5 text-green-500" />;
      case 'Shipped':
        return <TruckIcon className="w-5 h-5 text-blue-500" />;
      case 'Processing':
        return <ClockIcon className="w-5 h-5 text-yellow-500" />;
      default:
        return <PackageIcon className="w-5 h-5 text-gray-500" />;
    }
  };

  const handleViewOrderDetails = (orderId) => {
    toast.info(`Order details for ${orderId} will be implemented soon.`);
  };

  const handleDownloadInvoice = (orderId) => {
    toast.info(`Invoice download for ${orderId} will be implemented soon.`);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-surface-900 dark:text-white mb-2">My Orders</h1>
        <p className="text-surface-600 dark:text-surface-400">
          View and track all your purchase history
        </p>
      </div>

      {isLoading ? (
        <div className="flex justify-center items-center py-12">
          <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-primary"></div>
        </div>
      ) : orders.length > 0 ? (
        <div className="space-y-6">
          {orders.map((order) => (
            <div 
              key={order.id} 
              className="bg-white dark:bg-surface-800 rounded-lg shadow-sm border border-surface-200 dark:border-surface-700 overflow-hidden"
            >
              <div className="p-6">
                <div className="flex flex-col sm:flex-row justify-between mb-6">
                  <div>
                    <h3 className="text-lg font-semibold text-surface-900 dark:text-white">{order.id}</h3>
                    <p className="text-sm text-surface-500 dark:text-surface-400">
                      Placed on {new Date(order.date).toLocaleDateString('en-US', { 
                        year: 'numeric', 
                        month: 'long', 
                        day: 'numeric' 
                      })}
                    </p>
                  </div>
                  <div className="mt-2 sm:mt-0 flex items-center">
                    {getStatusIcon(order.status)}
                    <span className="ml-2 text-sm font-medium">
                      {order.status}
                    </span>
                  </div>
                </div>
                
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center pb-4 border-b border-surface-200 dark:border-surface-700">
                  <div className="space-y-1 mb-3 sm:mb-0">
                    <p className="text-sm text-surface-700 dark:text-surface-300">
                      <span className="font-medium">Items:</span> {order.items}
                    </p>
                    {order.trackingNumber && (
                      <p className="text-sm text-surface-700 dark:text-surface-300">
                        <span className="font-medium">Tracking:</span> {order.trackingNumber}
                      </p>
                    )}
                  </div>
                  <div className="text-lg font-semibold text-surface-900 dark:text-white">
                    ${order.total.toFixed(2)}
                  </div>
                </div>
                
                <div className="pt-4 flex flex-wrap gap-3">
                  <button
                    onClick={() => handleViewOrderDetails(order.id)}
                    className="inline-flex items-center px-4 py-2 text-sm font-medium rounded-md text-primary border border-primary hover:bg-primary hover:text-white transition-colors"
                  >
                    <EyeIcon className="w-4 h-4 mr-2" />
                    View Details
                  </button>
                  <button
                    onClick={() => handleDownloadInvoice(order.id)}
                    className="inline-flex items-center px-4 py-2 text-sm font-medium rounded-md text-surface-700 dark:text-surface-300 border border-surface-300 dark:border-surface-600 hover:bg-surface-100 dark:hover:bg-surface-700 transition-colors"
                  >
                    <FileTextIcon className="w-4 h-4 mr-2" />
                    Download Invoice
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="bg-white dark:bg-surface-800 rounded-lg shadow-sm border border-surface-200 dark:border-surface-700 p-12 text-center">
          <PackageIcon className="w-16 h-16 mx-auto text-surface-400 dark:text-surface-600" />
          <h3 className="mt-4 text-lg font-medium text-surface-900 dark:text-white">No orders yet</h3>
          <p className="mt-2 text-surface-600 dark:text-surface-400">
            You haven't placed any orders yet. Start shopping to see your orders here.
          </p>
          <div className="mt-6">
            <Link
              to="/categories"
              className="inline-flex items-center px-4 py-2 text-sm font-medium rounded-md text-white bg-primary hover:bg-primary-dark transition-colors"
            >
              Browse Products
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};

export default Orders;