import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import getIcon from '../../utils/iconUtils';
import { toast } from 'react-toastify';

const UserDropdown = ({ onClickOutside }) => {
  const dropdownRef = useRef(null);
  
  // Icons
  const UserIcon = getIcon('User');
  const ShoppingBagIcon = getIcon('ShoppingBag');
  const HeartIcon = getIcon('Heart');
  const SettingsIcon = getIcon('Settings');
  const LogOutIcon = getIcon('LogOut');
  
  // Handle outside clicks
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        onClickOutside();
      }
    };
    
    document.addEventListener('mousedown', handleClickOutside);
    
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [onClickOutside]);
  
  const handleLogin = (e) => {
    e.preventDefault();
    toast.info("Login functionality will be implemented soon");
  };
  
  return (
    <div
      ref={dropdownRef}
      className="absolute right-0 top-full mt-2 w-64 bg-white dark:bg-surface-800 rounded-lg shadow-lg overflow-hidden z-50 border border-surface-200 dark:border-surface-700"
    >
      <div className="p-4 border-b border-surface-200 dark:border-surface-700">
        <div className="flex items-center">
          <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center text-white">
            <UserIcon className="w-5 h-5" />
          </div>
          <div className="ml-3">
            <p className="text-sm font-medium text-surface-900 dark:text-white">Guest User</p>
            <button
              onClick={handleLogin}
              className="text-xs text-primary hover:text-primary-dark dark:hover:text-primary-light"
            >
              Sign in / Register
            </button>
          </div>
        </div>
      </div>
      
      <div className="py-2">
        <Link 
          to="/profile" 
          className="flex items-center px-4 py-2 text-sm text-surface-700 dark:text-surface-300 hover:bg-surface-100 dark:hover:bg-surface-700"
          onClick={onClickOutside}
        >
          <UserIcon className="w-4 h-4 mr-3 text-surface-500 dark:text-surface-400" />
          My Profile
        </Link>
        
        <Link 
          to="/orders" 
          className="flex items-center px-4 py-2 text-sm text-surface-700 dark:text-surface-300 hover:bg-surface-100 dark:hover:bg-surface-700"
          onClick={onClickOutside}
        >
          <ShoppingBagIcon className="w-4 h-4 mr-3 text-surface-500 dark:text-surface-400" />
          My Orders
        </Link>
        
        <Link 
          to="/wishlist" 
          className="flex items-center px-4 py-2 text-sm text-surface-700 dark:text-surface-300 hover:bg-surface-100 dark:hover:bg-surface-700"
          onClick={onClickOutside}
        >
          <HeartIcon className="w-4 h-4 mr-3 text-surface-500 dark:text-surface-400" />
          Wishlist
        </Link>
        
        <Link 
          to="/settings" 
          className="flex items-center px-4 py-2 text-sm text-surface-700 dark:text-surface-300 hover:bg-surface-100 dark:hover:bg-surface-700"
          onClick={onClickOutside}
        >
          <SettingsIcon className="w-4 h-4 mr-3 text-surface-500 dark:text-surface-400" />
          Settings
        </Link>
      </div>
      
      <div className="border-t border-surface-200 dark:border-surface-700 py-2">
        <button 
          onClick={(e) => {
            e.preventDefault();
            onClickOutside();
            toast.info("Logout functionality will be implemented soon");
          }}
          className="flex w-full items-center px-4 py-2 text-sm text-surface-700 dark:text-surface-300 hover:bg-surface-100 dark:hover:bg-surface-700"
        >
          <LogOutIcon className="w-4 h-4 mr-3 text-surface-500 dark:text-surface-400" />
          Logout
        </button>
      </div>
    </div>
  );
};

export default UserDropdown;