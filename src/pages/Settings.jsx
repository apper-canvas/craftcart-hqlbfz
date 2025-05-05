import { useState } from 'react';
import getIcon from '../utils/iconUtils';
import { toast } from 'react-toastify';

const Settings = () => {
  const [activeTab, setActiveTab] = useState('profile');
  
  // Form states
  const [profileData, setProfileData] = useState({
    firstName: 'John',
    lastName: 'Doe',
    email: 'johndoe@example.com',
    phone: '+1 (555) 123-4567',
    bio: ''
  });
  
  const [notifications, setNotifications] = useState({
    orderUpdates: true,
    promotions: false,
    newProducts: true,
    newsletter: false
  });
  
  const [security, setSecurity] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });
  
  // Icons
  const UserIcon = getIcon('User');
  const BellIcon = getIcon('Bell');
  const LockIcon = getIcon('Lock');
  const CreditCardIcon = getIcon('CreditCard');
  const SaveIcon = getIcon('Save');
  
  const handleProfileChange = (e) => {
    const { name, value } = e.target;
    setProfileData(prev => ({
      ...prev,
      [name]: value
    }));
  };
  
  const handleNotificationChange = (e) => {
    const { name, checked } = e.target;
    setNotifications(prev => ({
      ...prev,
      [name]: checked
    }));
  };
  
  const handleSecurityChange = (e) => {
    const { name, value } = e.target;
    setSecurity(prev => ({
      ...prev,
      [name]: value
    }));
  };
  
  const handleProfileSubmit = (e) => {
    e.preventDefault();
    toast.success('Profile settings updated successfully');
  };
  
  const handleNotificationSubmit = (e) => {
    e.preventDefault();
    toast.success('Notification preferences updated successfully');
  };
  
  const handleSecuritySubmit = (e) => {
    e.preventDefault();
    
    if (security.newPassword !== security.confirmPassword) {
      toast.error('New passwords do not match');
      return;
    }
    
    if (security.currentPassword === '') {
      toast.error('Current password is required');
      return;
    }
    
    if (security.newPassword.length < 8) {
      toast.error('New password must be at least 8 characters long');
      return;
    }
    
    toast.success('Password updated successfully');
    setSecurity({
      currentPassword: '',
      newPassword: '',
      confirmPassword: ''
    });
  };
  
  const renderTabContent = () => {
    switch (activeTab) {
      case 'profile':
        return (
          <form onSubmit={handleProfileSubmit}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div>
                <label className="block text-sm font-medium text-surface-700 dark:text-surface-300 mb-1">
                  First Name
                </label>
                <input 
                  type="text" 
                  name="firstName"
                  value={profileData.firstName}
                  onChange={handleProfileChange}
                  className="w-full p-2 border border-surface-300 dark:border-surface-700 rounded-md bg-white dark:bg-surface-800 text-surface-900 dark:text-white focus:ring-2 focus:ring-primary focus:border-transparent"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-surface-700 dark:text-surface-300 mb-1">
                  Last Name
                </label>
                <input 
                  type="text" 
                  name="lastName"
                  value={profileData.lastName}
                  onChange={handleProfileChange}
                  className="w-full p-2 border border-surface-300 dark:border-surface-700 rounded-md bg-white dark:bg-surface-800 text-surface-900 dark:text-white focus:ring-2 focus:ring-primary focus:border-transparent"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-surface-700 dark:text-surface-300 mb-1">
                  Email Address
                </label>
                <input 
                  type="email" 
                  name="email"
                  value={profileData.email}
                  onChange={handleProfileChange}
                  className="w-full p-2 border border-surface-300 dark:border-surface-700 rounded-md bg-white dark:bg-surface-800 text-surface-900 dark:text-white focus:ring-2 focus:ring-primary focus:border-transparent"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-surface-700 dark:text-surface-300 mb-1">
                  Phone Number
                </label>
                <input 
                  type="tel" 
                  name="phone"
                  value={profileData.phone}
                  onChange={handleProfileChange}
                  className="w-full p-2 border border-surface-300 dark:border-surface-700 rounded-md bg-white dark:bg-surface-800 text-surface-900 dark:text-white focus:ring-2 focus:ring-primary focus:border-transparent"
                />
              </div>
            </div>
            
            <div className="mb-6">
              <label className="block text-sm font-medium text-surface-700 dark:text-surface-300 mb-1">
                Bio
              </label>
              <textarea 
                name="bio"
                value={profileData.bio}
                onChange={handleProfileChange}
                rows="4"
                className="w-full p-2 border border-surface-300 dark:border-surface-700 rounded-md bg-white dark:bg-surface-800 text-surface-900 dark:text-white focus:ring-2 focus:ring-primary focus:border-transparent"
                placeholder="Tell us a bit about yourself"
              ></textarea>
            </div>
            
            <div className="flex justify-end">
              <button
                type="submit"
                className="inline-flex items-center px-4 py-2 text-sm font-medium rounded-md text-white bg-primary hover:bg-primary-dark transition-colors"
              >
                <SaveIcon className="w-4 h-4 mr-2" />
                Save Changes
              </button>
            </div>
          </form>
        );
        
      case 'notifications':
        return (
          <form onSubmit={handleNotificationSubmit}>
            <div className="space-y-4">
              <div className="flex items-center justify-between py-3 border-b border-surface-200 dark:border-surface-700">
                <div>
                  <h3 className="text-surface-900 dark:text-white font-medium">Order Updates</h3>
                  <p className="text-sm text-surface-600 dark:text-surface-400">
                    Receive notifications about your order status
                  </p>
                </div>
                <div className="relative inline-block w-12 align-middle select-none">
                  <input 
                    type="checkbox" 
                    name="orderUpdates" 
                    id="orderUpdates"
                    checked={notifications.orderUpdates}
                    onChange={handleNotificationChange}
                    className="sr-only"
                  />
                  <label 
                    htmlFor="orderUpdates"
                    className={`block h-6 rounded-full cursor-pointer transition-colors ${
                      notifications.orderUpdates ? 'bg-primary' : 'bg-surface-300 dark:bg-surface-600'
                    }`}
                  >
                    <span 
                      className={`block h-6 w-6 rounded-full bg-white shadow transform transition-transform ${
                        notifications.orderUpdates ? 'translate-x-6' : 'translate-x-0'
                      }`}
                    ></span>
                  </label>
                </div>
              </div>
              
              <div className="flex items-center justify-between py-3 border-b border-surface-200 dark:border-surface-700">
                <div>
                  <h3 className="text-surface-900 dark:text-white font-medium">Promotional Emails</h3>
                  <p className="text-sm text-surface-600 dark:text-surface-400">
                    Receive emails about promotions and discounts
                  </p>
                </div>
                <div className="relative inline-block w-12 align-middle select-none">
                  <input 
                    type="checkbox" 
                    name="promotions" 
                    id="promotions"
                    checked={notifications.promotions}
                    onChange={handleNotificationChange}
                    className="sr-only"
                  />
                  <label 
                    htmlFor="promotions"
                    className={`block h-6 rounded-full cursor-pointer transition-colors ${
                      notifications.promotions ? 'bg-primary' : 'bg-surface-300 dark:bg-surface-600'
                    }`}
                  >
                    <span 
                      className={`block h-6 w-6 rounded-full bg-white shadow transform transition-transform ${
                        notifications.promotions ? 'translate-x-6' : 'translate-x-0'
                      }`}
                    ></span>
                  </label>
                </div>
              </div>
              
              <div className="flex items-center justify-between py-3 border-b border-surface-200 dark:border-surface-700">
                <div>
                  <h3 className="text-surface-900 dark:text-white font-medium">New Product Arrivals</h3>
                  <p className="text-sm text-surface-600 dark:text-surface-400">
                    Get notified when new products are added
                  </p>
                </div>
                <div className="relative inline-block w-12 align-middle select-none">
                  <input 
                    type="checkbox" 
                    name="newProducts" 
                    id="newProducts"
                    checked={notifications.newProducts}
                    onChange={handleNotificationChange}
                    className="sr-only"
                  />
                  <label 
                    htmlFor="newProducts"
                    className={`block h-6 rounded-full cursor-pointer transition-colors ${
                      notifications.newProducts ? 'bg-primary' : 'bg-surface-300 dark:bg-surface-600'
                    }`}
                  >
                    <span 
                      className={`block h-6 w-6 rounded-full bg-white shadow transform transition-transform ${
                        notifications.newProducts ? 'translate-x-6' : 'translate-x-0'
                      }`}
                    ></span>
                  </label>
                </div>
              </div>
              
              <div className="flex items-center justify-between py-3">
                <div>
                  <h3 className="text-surface-900 dark:text-white font-medium">Newsletter</h3>
                  <p className="text-sm text-surface-600 dark:text-surface-400">
                    Receive our weekly newsletter with tips and news
                  </p>
                </div>
                <div className="relative inline-block w-12 align-middle select-none">
                  <input 
                    type="checkbox" 
                    name="newsletter" 
                    id="newsletter"
                    checked={notifications.newsletter}
                    onChange={handleNotificationChange}
                    className="sr-only"
                  />
                  <label 
                    htmlFor="newsletter"
                    className={`block h-6 rounded-full cursor-pointer transition-colors ${
                      notifications.newsletter ? 'bg-primary' : 'bg-surface-300 dark:bg-surface-600'
                    }`}
                  >
                    <span 
                      className={`block h-6 w-6 rounded-full bg-white shadow transform transition-transform ${
                        notifications.newsletter ? 'translate-x-6' : 'translate-x-0'
                      }`}
                    ></span>
                  </label>
                </div>
              </div>
            </div>
            
            <div className="mt-8 flex justify-end">
              <button
                type="submit"
                className="inline-flex items-center px-4 py-2 text-sm font-medium rounded-md text-white bg-primary hover:bg-primary-dark transition-colors"
              >
                <SaveIcon className="w-4 h-4 mr-2" />
                Save Preferences
              </button>
            </div>
          </form>
        );
        
      case 'security':
        return (
          <form onSubmit={handleSecuritySubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-surface-700 dark:text-surface-300 mb-1">
                Current Password
              </label>
              <input 
                type="password" 
                name="currentPassword"
                value={security.currentPassword}
                onChange={handleSecurityChange}
                className="w-full p-2 border border-surface-300 dark:border-surface-700 rounded-md bg-white dark:bg-surface-800 text-surface-900 dark:text-white focus:ring-2 focus:ring-primary focus:border-transparent"
                required
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-surface-700 dark:text-surface-300 mb-1">
                New Password
              </label>
              <input 
                type="password" 
                name="newPassword"
                value={security.newPassword}
                onChange={handleSecurityChange}
                className="w-full p-2 border border-surface-300 dark:border-surface-700 rounded-md bg-white dark:bg-surface-800 text-surface-900 dark:text-white focus:ring-2 focus:ring-primary focus:border-transparent"
                required
              />
              <p className="mt-1 text-xs text-surface-500 dark:text-surface-400">
                Password must be at least 8 characters long
              </p>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-surface-700 dark:text-surface-300 mb-1">
                Confirm New Password
              </label>
              <input 
                type="password" 
                name="confirmPassword"
                value={security.confirmPassword}
                onChange={handleSecurityChange}
                className="w-full p-2 border border-surface-300 dark:border-surface-700 rounded-md bg-white dark:bg-surface-800 text-surface-900 dark:text-white focus:ring-2 focus:ring-primary focus:border-transparent"
                required
              />
            </div>
            
            <div className="pt-4 flex justify-end">
              <button
                type="submit"
                className="inline-flex items-center px-4 py-2 text-sm font-medium rounded-md text-white bg-primary hover:bg-primary-dark transition-colors"
              >
                <SaveIcon className="w-4 h-4 mr-2" />
                Update Password
              </button>
            </div>
          </form>
        );
        
      case 'payment':
        return (
          <div className="py-4">
            <div className="bg-surface-50 dark:bg-surface-800 border border-surface-200 dark:border-surface-700 rounded-lg p-6 text-center">
              <CreditCardIcon className="w-12 h-12 mx-auto text-surface-400 dark:text-surface-500" />
              <h3 className="mt-4 text-lg font-medium text-surface-900 dark:text-white">Payment Methods</h3>
              <p className="mt-2 text-surface-600 dark:text-surface-400">
                Payment method management will be implemented soon
              </p>
              <button
                onClick={() => toast.info("Payment methods feature will be available soon")}
                className="mt-4 inline-flex items-center px-4 py-2 text-sm font-medium rounded-md text-white bg-primary hover:bg-primary-dark transition-colors"
              >
                Add Payment Method
              </button>
            </div>
          </div>
        );
        
      default:
        return null;
    }
  };
  
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-surface-900 dark:text-white mb-2">Account Settings</h1>
        <p className="text-surface-600 dark:text-surface-400">
          Manage your account preferences and settings
        </p>
      </div>
      
      <div className="bg-white dark:bg-surface-800 rounded-lg shadow-sm border border-surface-200 dark:border-surface-700 overflow-hidden">
        <div className="md:flex">
          {/* Sidebar Navigation */}
          <div className="md:w-64 border-r border-surface-200 dark:border-surface-700">
            <nav className="p-4 md:p-0">
              <ul className="flex md:flex-col overflow-x-auto md:overflow-visible">
                <li className="md:border-b border-surface-200 dark:border-surface-700">
                  <button
                    onClick={() => setActiveTab('profile')}
                    className={`flex items-center w-full px-6 py-3 text-sm font-medium ${
                      activeTab === 'profile' 
                        ? 'text-primary border-b-2 md:border-b-0 md:border-l-4 border-primary bg-surface-50 dark:bg-surface-700'
                        : 'text-surface-600 dark:text-surface-400 hover:text-primary hover:bg-surface-50 dark:hover:bg-surface-700'
                    }`}
                  >
                    <UserIcon className="w-5 h-5 mr-3" />
                    Profile Information
                  </button>
                </li>
                <li className="md:border-b border-surface-200 dark:border-surface-700">
                  <button
                    onClick={() => setActiveTab('notifications')}
                    className={`flex items-center w-full px-6 py-3 text-sm font-medium ${
                      activeTab === 'notifications' 
                        ? 'text-primary border-b-2 md:border-b-0 md:border-l-4 border-primary bg-surface-50 dark:bg-surface-700'
                        : 'text-surface-600 dark:text-surface-400 hover:text-primary hover:bg-surface-50 dark:hover:bg-surface-700'
                    }`}
                  >
                    <BellIcon className="w-5 h-5 mr-3" />
                    Notifications
                  </button>
                </li>
                <li className="md:border-b border-surface-200 dark:border-surface-700">
                  <button
                    onClick={() => setActiveTab('security')}
                    className={`flex items-center w-full px-6 py-3 text-sm font-medium ${
                      activeTab === 'security' 
                        ? 'text-primary border-b-2 md:border-b-0 md:border-l-4 border-primary bg-surface-50 dark:bg-surface-700'
                        : 'text-surface-600 dark:text-surface-400 hover:text-primary hover:bg-surface-50 dark:hover:bg-surface-700'
                    }`}
                  >
                    <LockIcon className="w-5 h-5 mr-3" />
                    Security
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => setActiveTab('payment')}
                    className={`flex items-center w-full px-6 py-3 text-sm font-medium ${
                      activeTab === 'payment' 
                        ? 'text-primary border-b-2 md:border-b-0 md:border-l-4 border-primary bg-surface-50 dark:bg-surface-700'
                        : 'text-surface-600 dark:text-surface-400 hover:text-primary hover:bg-surface-50 dark:hover:bg-surface-700'
                    }`}
                  >
                    <CreditCardIcon className="w-5 h-5 mr-3" />
                    Payment Methods
                  </button>
                </li>
              </ul>
            </nav>
          </div>
          
          {/* Tab Content */}
          <div className="flex-1 p-6">
            {renderTabContent()}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;