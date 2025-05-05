import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import getIcon from '../utils/iconUtils';
import { toast } from 'react-toastify';

const Profile = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [userData, setUserData] = useState(null);
  const [recentOrders, setRecentOrders] = useState([]);

  // Icons
  const UserIcon = getIcon('User');
  const ShoppingBagIcon = getIcon('ShoppingBag');
  const HeartIcon = getIcon('Heart');
  const SettingsIcon = getIcon('Settings');
  const MapPinIcon = getIcon('MapPin');
  const CreditCardIcon = getIcon('CreditCard');
  const EditIcon = getIcon('Edit');
  const ArrowRightIcon = getIcon('ArrowRight');
  const CalendarIcon = getIcon('Calendar');
  const MailIcon = getIcon('Mail');
  const PhoneIcon = getIcon('Phone');

  useEffect(() => {
    // Simulate API call to fetch user data
    const fetchUserData = async () => {
      try {
        // Simulate delay
        await new Promise(resolve => setTimeout(resolve, 1200));
        
        // Mock user data
        const mockUser = {
          id: 'usr_123456',
          firstName: 'John',
          lastName: 'Doe',
          email: 'johndoe@example.com',
          phone: '+1 (555) 123-4567',
          joined: '2023-05-15',
          address: {
            street: '123 Main Street',
            city: 'Anytown',
            state: 'CA',
            zip: '12345',
            country: 'United States'
          },
          profilePicture: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80'
        };
        
        // Mock recent orders
        const mockOrders = [
          {
            id: 'ORD-38294',
            date: '2023-11-15',
            status: 'Delivered',
            total: 129.99,
            items: 3
          },
          {
            id: 'ORD-27184',
            date: '2023-10-28',
            status: 'Shipped',
            total: 86.50,
            items: 2
          }
        ];
        
        setUserData(mockUser);
        setRecentOrders(mockOrders);
        setIsLoading(false);
      } catch (error) {
        console.error('Error fetching user data:', error);
        toast.error('Failed to load profile data. Please try again later.');
        setIsLoading(false);
      }
    };

    fetchUserData();
  }, []);

  const handleEditProfile = () => {
    toast.info('Edit profile functionality will be implemented soon');
  };

  return (
    <div className="container mx-auto px-4 py-8">
      {isLoading ? (
        <div className="flex justify-center items-center py-20">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
        </div>
      ) : (
        <>
          {/* Profile Header */}
          <div className="bg-white dark:bg-surface-800 rounded-lg shadow-sm border border-surface-200 dark:border-surface-700 overflow-hidden mb-8">
            <div className="md:flex">
              <div className="md:flex-shrink-0 p-6 flex justify-center md:justify-start">
                <div className="relative">
                  <img 
                    src={userData.profilePicture} 
                    alt={`${userData.firstName} ${userData.lastName}`} 
                    className="h-32 w-32 rounded-full object-cover border-4 border-white dark:border-surface-700"
                  />
                  <button 
                    onClick={handleEditProfile}
                    className="absolute bottom-0 right-0 bg-primary text-white p-2 rounded-full shadow"
                  >
                    <EditIcon className="w-4 h-4" />
                  </button>
                </div>
              </div>
              
              <div className="p-6 md:p-8 flex-1">
                <div className="flex flex-col md:flex-row md:items-center justify-between mb-4">
                  <div>
                    <h1 className="text-2xl font-bold text-surface-900 dark:text-white">
                      {userData.firstName} {userData.lastName}
                    </h1>
                    <p className="text-surface-500 dark:text-surface-400 flex items-center mt-1">
                      <CalendarIcon className="w-4 h-4 mr-1" />
                      Member since {new Date(userData.joined).toLocaleDateString('en-US', { 
                        year: 'numeric', 
                        month: 'long', 
                        day: 'numeric' 
                      })}
                    </p>
                  </div>
                  <div className="mt-4 md:mt-0">
                    <button
                      onClick={handleEditProfile}
                      className="inline-flex items-center px-4 py-2 text-sm font-medium rounded-md text-white bg-primary hover:bg-primary-dark transition-colors"
                    >
                      <EditIcon className="w-4 h-4 mr-2" />
                      Edit Profile
                    </button>
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="flex items-start">
                    <MailIcon className="w-5 h-5 text-surface-500 dark:text-surface-400 mt-0.5 mr-3" />
                    <div>
                      <p className="text-sm text-surface-500 dark:text-surface-400">Email</p>
                      <p className="text-surface-900 dark:text-white">{userData.email}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <PhoneIcon className="w-5 h-5 text-surface-500 dark:text-surface-400 mt-0.5 mr-3" />
                    <div>
                      <p className="text-sm text-surface-500 dark:text-surface-400">Phone</p>
                      <p className="text-surface-900 dark:text-white">{userData.phone}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start md:col-span-2">
                    <MapPinIcon className="w-5 h-5 text-surface-500 dark:text-surface-400 mt-0.5 mr-3" />
                    <div>
                      <p className="text-sm text-surface-500 dark:text-surface-400">Address</p>
                      <p className="text-surface-900 dark:text-white">
                        {userData.address.street}, {userData.address.city}, {userData.address.state} {userData.address.zip}, {userData.address.country}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Quick Links */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
            <Link 
              to="/orders" 
              className="flex items-center p-4 bg-white dark:bg-surface-800 rounded-lg shadow-sm border border-surface-200 dark:border-surface-700 hover:border-primary dark:hover:border-primary transition-colors"
            >
              <div className="p-3 bg-primary-50 dark:bg-surface-700 rounded-full mr-4">
                <ShoppingBagIcon className="w-6 h-6 text-primary" />
              </div>
              <div>
                <h3 className="font-medium text-surface-900 dark:text-white">My Orders</h3>
                <p className="text-sm text-surface-500 dark:text-surface-400">View order history</p>
              </div>
            </Link>
            
            <Link 
              to="/wishlist" 
              className="flex items-center p-4 bg-white dark:bg-surface-800 rounded-lg shadow-sm border border-surface-200 dark:border-surface-700 hover:border-primary dark:hover:border-primary transition-colors"
            >
              <div className="p-3 bg-primary-50 dark:bg-surface-700 rounded-full mr-4">
                <HeartIcon className="w-6 h-6 text-primary" />
              </div>
              <div>
                <h3 className="font-medium text-surface-900 dark:text-white">Wishlist</h3>
                <p className="text-sm text-surface-500 dark:text-surface-400">Saved items</p>
              </div>
            </Link>
            
            <Link 
              to="/settings" 
              className="flex items-center p-4 bg-white dark:bg-surface-800 rounded-lg shadow-sm border border-surface-200 dark:border-surface-700 hover:border-primary dark:hover:border-primary transition-colors"
            >
              <div className="p-3 bg-primary-50 dark:bg-surface-700 rounded-full mr-4">
                <SettingsIcon className="w-6 h-6 text-primary" />
              </div>
              <div>
                <h3 className="font-medium text-surface-900 dark:text-white">Settings</h3>
                <p className="text-sm text-surface-500 dark:text-surface-400">Manage account</p>
              </div>
            </Link>
            
            <Link 
              to="/settings?tab=payment" 
              className="flex items-center p-4 bg-white dark:bg-surface-800 rounded-lg shadow-sm border border-surface-200 dark:border-surface-700 hover:border-primary dark:hover:border-primary transition-colors"
            >
              <div className="p-3 bg-primary-50 dark:bg-surface-700 rounded-full mr-4">
                <CreditCardIcon className="w-6 h-6 text-primary" />
              </div>
              <div>
                <h3 className="font-medium text-surface-900 dark:text-white">Payment Methods</h3>
                <p className="text-sm text-surface-500 dark:text-surface-400">Manage payment options</p>
              </div>
            </Link>
          </div>
          
          {/* Recent Orders */}
          <div className="bg-white dark:bg-surface-800 rounded-lg shadow-sm border border-surface-200 dark:border-surface-700 overflow-hidden mb-8">
            <div className="p-6 border-b border-surface-200 dark:border-surface-700 flex justify-between items-center">
              <h2 className="text-lg font-medium text-surface-900 dark:text-white">Recent Orders</h2>
              <Link 
                to="/orders"
                className="text-primary hover:text-primary-dark dark:hover:text-primary-light text-sm font-medium flex items-center"
              >
                View all
                <ArrowRightIcon className="w-4 h-4 ml-1" />
              </Link>
            </div>
            
            {recentOrders.length > 0 ? (
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-surface-200 dark:divide-surface-700">
                  <thead className="bg-surface-50 dark:bg-surface-700">
                    <tr>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-surface-500 dark:text-surface-400 uppercase tracking-wider">
                        Order ID
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-surface-500 dark:text-surface-400 uppercase tracking-wider">
                        Date
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-surface-500 dark:text-surface-400 uppercase tracking-wider">
                        Status
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-surface-500 dark:text-surface-400 uppercase tracking-wider">
                        Items
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-surface-500 dark:text-surface-400 uppercase tracking-wider">
                        Total
                      </th>
                      <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-surface-500 dark:text-surface-400 uppercase tracking-wider">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white dark:bg-surface-800 divide-y divide-surface-200 dark:divide-surface-700">
                    {recentOrders.map((order) => (
                      <tr key={order.id}>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-surface-900 dark:text-white">
                          {order.id}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-surface-700 dark:text-surface-300">
                          {new Date(order.date).toLocaleDateString()}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm">
                          <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                            order.status === 'Delivered' 
                              ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200' 
                              : order.status === 'Shipped' 
                                ? 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200'
                                : 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200'
                          }`}>
                            {order.status}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-surface-700 dark:text-surface-300">
                          {order.items}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-surface-900 dark:text-white">
                          ${order.total.toFixed(2)}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm">
                          <button
                            onClick={() => toast.info(`Order details for ${order.id} will be implemented soon.`)}
                            className="text-primary hover:text-primary-dark dark:hover:text-primary-light font-medium"
                          >
                            View
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <div className="p-8 text-center">
                <ShoppingBagIcon className="w-12 h-12 mx-auto text-surface-400 dark:text-surface-500 mb-4" />
                <p className="text-surface-700 dark:text-surface-300">You haven't placed any orders yet.</p>
                <Link
                  to="/categories"
                  className="mt-4 inline-flex items-center px-4 py-2 text-sm font-medium rounded-md text-white bg-primary hover:bg-primary-dark transition-colors"
                >
                  Start Shopping
                </Link>
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default Profile;