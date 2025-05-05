import { useState } from 'react';
import getIcon from '../utils/iconUtils';
import { toast } from 'react-toastify';

const Profile = () => {
  const [activeTab, setActiveTab] = useState('profile');
  const [editMode, setEditMode] = useState(false);
  
  // Icons
  const UserIcon = getIcon('User');
  const ShoppingBagIcon = getIcon('ShoppingBag');
  const HeartIcon = getIcon('Heart');
  const CreditCardIcon = getIcon('CreditCard');
  const HomeIcon = getIcon('Home');
  const BellIcon = getIcon('Bell');
  const EditIcon = getIcon('Edit');
  const SaveIcon = getIcon('Save');
  
  // Mock user data
  const [user, setUser] = useState({
    name: 'John Doe',
    email: 'john.doe@example.com',
    phone: '+1 (555) 123-4567',
    avatar: null
  });
  
  const handleSaveProfile = (e) => {
    e.preventDefault();
    setEditMode(false);
    toast.success('Profile updated successfully');
  };
  
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-2xl md:text-3xl font-bold text-surface-800 dark:text-white mb-8">
          My Account
        </h1>
        
        <div className="flex flex-col md:flex-row gap-6">
          {/* Sidebar */}
          <div className="w-full md:w-64">
            <div className="bg-white dark:bg-surface-800 rounded-lg shadow border border-surface-200 dark:border-surface-700 overflow-hidden sticky top-24">
              {/* User Info */}
              <div className="p-6 border-b border-surface-200 dark:border-surface-700">
                <div className="flex flex-col items-center">
                  <div className="w-20 h-20 rounded-full bg-primary flex items-center justify-center text-white mb-3">
                    {user.avatar ? (
                      <img 
                        src={user.avatar} 
                        alt={user.name} 
                        className="w-full h-full rounded-full object-cover"
                      />
                    ) : (
                      <UserIcon className="w-8 h-8" />
                    )}
                  </div>
                  <h2 className="text-lg font-semibold text-surface-800 dark:text-white">
                    {user.name}
                  </h2>
                  <p className="text-sm text-surface-500 dark:text-surface-400">
                    {user.email}
                  </p>
                </div>
              </div>
              
              {/* Navigation */}
              <nav className="p-2">
                <button
                  onClick={() => setActiveTab('profile')}
                  className={`flex items-center w-full px-4 py-2 rounded-lg text-sm mb-1 ${
                    activeTab === 'profile'
                      ? 'bg-primary text-white'
                      : 'text-surface-700 dark:text-surface-300 hover:bg-surface-100 dark:hover:bg-surface-700'
                  }`}
                >
                  <UserIcon className={`w-4 h-4 mr-3 ${
                    activeTab === 'profile' ? 'text-white' : 'text-surface-500 dark:text-surface-400'
                  }`} />
                  Profile
                </button>
                
                <button
                  onClick={() => {
                    setActiveTab('orders');
                    toast.info('Orders functionality will be implemented soon');
                  }}
                  className={`flex items-center w-full px-4 py-2 rounded-lg text-sm mb-1 ${
                    activeTab === 'orders'
                      ? 'bg-primary text-white'
                      : 'text-surface-700 dark:text-surface-300 hover:bg-surface-100 dark:hover:bg-surface-700'
                  }`}
                >
                  <ShoppingBagIcon className={`w-4 h-4 mr-3 ${
                    activeTab === 'orders' ? 'text-white' : 'text-surface-500 dark:text-surface-400'
                  }`} />
                  Orders
                </button>
                
                <button
                  onClick={() => {
                    setActiveTab('wishlist');
                    toast.info('Wishlist functionality will be implemented soon');
                  }}
                  className={`flex items-center w-full px-4 py-2 rounded-lg text-sm mb-1 ${
                    activeTab === 'wishlist'
                      ? 'bg-primary text-white'
                      : 'text-surface-700 dark:text-surface-300 hover:bg-surface-100 dark:hover:bg-surface-700'
                  }`}
                >
                  <HeartIcon className={`w-4 h-4 mr-3 ${
                    activeTab === 'wishlist' ? 'text-white' : 'text-surface-500 dark:text-surface-400'
                  }`} />
                  Wishlist
                </button>
                
                <button
                  onClick={() => {
                    setActiveTab('payment');
                    toast.info('Payment methods functionality will be implemented soon');
                  }}
                  className={`flex items-center w-full px-4 py-2 rounded-lg text-sm mb-1 ${
                    activeTab === 'payment'
                      ? 'bg-primary text-white'
                      : 'text-surface-700 dark:text-surface-300 hover:bg-surface-100 dark:hover:bg-surface-700'
                  }`}
                >
                  <CreditCardIcon className={`w-4 h-4 mr-3 ${
                    activeTab === 'payment' ? 'text-white' : 'text-surface-500 dark:text-surface-400'
                  }`} />
                  Payment Methods
                </button>
                
                <button
                  onClick={() => {
                    setActiveTab('addresses');
                    toast.info('Addresses functionality will be implemented soon');
                  }}
                  className={`flex items-center w-full px-4 py-2 rounded-lg text-sm mb-1 ${
                    activeTab === 'addresses'
                      ? 'bg-primary text-white'
                      : 'text-surface-700 dark:text-surface-300 hover:bg-surface-100 dark:hover:bg-surface-700'
                  }`}
                >
                  <HomeIcon className={`w-4 h-4 mr-3 ${
                    activeTab === 'addresses' ? 'text-white' : 'text-surface-500 dark:text-surface-400'
                  }`} />
                  Addresses
                </button>
                
                <button
                  onClick={() => {
                    setActiveTab('notifications');
                    toast.info('Notifications functionality will be implemented soon');
                  }}
                  className={`flex items-center w-full px-4 py-2 rounded-lg text-sm mb-1 ${
                    activeTab === 'notifications'
                      ? 'bg-primary text-white'
                      : 'text-surface-700 dark:text-surface-300 hover:bg-surface-100 dark:hover:bg-surface-700'
                  }`}
                >
                  <BellIcon className={`w-4 h-4 mr-3 ${
                    activeTab === 'notifications' ? 'text-white' : 'text-surface-500 dark:text-surface-400'
                  }`} />
                  Notifications
                </button>
              </nav>
            </div>
          </div>
          
          {/* Main Content */}
          <div className="flex-1">
            <div className="bg-white dark:bg-surface-800 rounded-lg shadow border border-surface-200 dark:border-surface-700 p-6">
              {activeTab === 'profile' && (
                <>
                  <div className="flex justify-between items-center mb-6">
                    <h2 className="text-xl font-semibold text-surface-800 dark:text-white">
                      Profile Information
                    </h2>
                    <button
                      onClick={() => setEditMode(!editMode)}
                      className="flex items-center text-sm text-primary hover:text-primary-dark dark:hover:text-primary-light"
                    >
                      {editMode ? (
                        <>
                          <SaveIcon className="w-4 h-4 mr-1" />
                          Save
                        </>
                      ) : (
                        <>
                          <EditIcon className="w-4 h-4 mr-1" />
                          Edit
                        </>
                      )}
                    </button>
                  </div>
                  
                  {editMode ? (
                    <form onSubmit={handleSaveProfile}>
                      <div className="space-y-4">
                        <div>
                          <label htmlFor="name" className="block text-sm font-medium text-surface-700 dark:text-surface-300 mb-1">
                            Full Name
                          </label>
                          <input
                            type="text"
                            id="name"
                            value={user.name}
                            onChange={(e) => setUser({...user, name: e.target.value})}
                            className="input w-full"
                          />
                        </div>
                        
                        <div>
                          <label htmlFor="email" className="block text-sm font-medium text-surface-700 dark:text-surface-300 mb-1">
                            Email Address
                          </label>
                          <input
                            type="email"
                            id="email"
                            value={user.email}
                            onChange={(e) => setUser({...user, email: e.target.value})}
                            className="input w-full"
                          />
                        </div>
                        
                        <div>
                          <label htmlFor="phone" className="block text-sm font-medium text-surface-700 dark:text-surface-300 mb-1">
                            Phone Number
                          </label>
                          <input
                            type="tel"
                            id="phone"
                            value={user.phone}
                            onChange={(e) => setUser({...user, phone: e.target.value})}
                            className="input w-full"
                          />
                        </div>
                        
                        <div className="mt-6 flex justify-end">
                          <button
                            type="button"
                            onClick={() => setEditMode(false)}
                            className="btn btn-outline mr-3"
                          >
                            Cancel
                          </button>
                          <button
                            type="submit"
                            className="btn btn-primary"
                          >
                            Save Changes
                          </button>
                        </div>
                      </div>
                    </form>
                  ) : (
                    <div className="space-y-4">
                      <div className="border-b border-surface-200 dark:border-surface-700 pb-3">
                        <h3 className="text-sm text-surface-500 dark:text-surface-400 mb-1">
                          Full Name
                        </h3>
                        <p className="text-surface-800 dark:text-white">
                          {user.name}
                        </p>
                      </div>
                      
                      <div className="border-b border-surface-200 dark:border-surface-700 pb-3">
                        <h3 className="text-sm text-surface-500 dark:text-surface-400 mb-1">
                          Email Address
                        </h3>
                        <p className="text-surface-800 dark:text-white">
                          {user.email}
                        </p>
                      </div>
                      
                      <div className="border-b border-surface-200 dark:border-surface-700 pb-3">
                        <h3 className="text-sm text-surface-500 dark:text-surface-400 mb-1">
                          Phone Number
                        </h3>
                        <p className="text-surface-800 dark:text-white">
                          {user.phone}
                        </p>
                      </div>
                      
                      <div className="pt-2">
                        <button
                          onClick={() => {
                            toast.info('Password change functionality will be implemented soon');
                          }}
                          className="text-primary hover:text-primary-dark dark:hover:text-primary-light text-sm font-medium"
                        >
                          Change Password
                        </button>
                      </div>
                    </div>
                  )}
                </>
              )}
              
              {activeTab !== 'profile' && (
                <div className="flex flex-col items-center justify-center py-8">
                  <div className="text-surface-400 dark:text-surface-500 mb-4">
                    {getIcon(
                      activeTab === 'orders' ? 'PackageOpen' :
                      activeTab === 'wishlist' ? 'Heart' :
                      activeTab === 'payment' ? 'CreditCard' :
                      activeTab === 'addresses' ? 'Home' : 'Bell'
                    )({ className: "w-16 h-16" })}
                  </div>
                  <h3 className="text-lg font-medium text-surface-800 dark:text-white mb-2">
                    {activeTab === 'orders' ? 'Your Orders' :
                     activeTab === 'wishlist' ? 'Your Wishlist' :
                     activeTab === 'payment' ? 'Payment Methods' :
                     activeTab === 'addresses' ? 'Your Addresses' : 'Notifications'}
                  </h3>
                  <p className="text-surface-500 dark:text-surface-400 text-center max-w-md mb-6">
                    This feature is coming soon. Check back later for updates.
                  </p>
                  <button
                    onClick={() => setActiveTab('profile')}
                    className="btn btn-primary"
                  >
                    Back to Profile
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;