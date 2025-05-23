import { useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import getIcon from '../../utils/iconUtils';
import { useAuth } from '../../context/AuthContext';

const UserDropdown = ({ onClose }) => {
  const dropdownRef = useRef(null);
  const navigate = useNavigate();
  const { user, isAuthenticated, logout } = useAuth();
  
  // Icons
  const UserIcon = getIcon('User');
  const ShoppingBagIcon = getIcon('ShoppingBag');
  const HeartIcon = getIcon('Heart');
  const SettingsIcon = getIcon('Settings');
  const LogOutIcon = getIcon('LogOut');
  const LogInIcon = getIcon('LogIn');
  const UserPlusIcon = getIcon('UserPlus');
  
  // Handle outside clicks
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        onClose();
      }
    };
    
    document.addEventListener('mousedown', handleClickOutside);
    
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [onClose]);
  
  // Handle navigation and close dropdown
  const handleNavigation = (path) => {
    navigate(path);
    onClose();
  };
  
  // Handle logout
  const handleLogout = () => {
    logout();
    onClose();
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
            {isAuthenticated ? (
              <>
                <p className="text-sm font-medium text-surface-900 dark:text-white">
                  {user.name}
                </p>
                <p className="text-xs text-surface-500 dark:text-surface-400">{user.email}</p>
              </>
            ) : (
              <>
                <p className="text-sm font-medium text-surface-900 dark:text-white">Guest User</p>
                <div className="flex space-x-2">
                  <button
                    onClick={() => handleNavigation('/signin')}
                    className="text-xs text-primary hover:text-primary-dark dark:hover:text-primary-light"
                  >
                    Sign in
                  </button>
                  <span className="text-xs text-surface-400">/</span>
                  <button
                    onClick={() => handleNavigation('/register')}
                    className="text-xs text-primary hover:text-primary-dark dark:hover:text-primary-light"
                  >
                    Register
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
      
      {isAuthenticated ? (
        // Authenticated user menu
        <>
          <div className="py-2">
            <Link 
              to="/profile" 
              className="flex items-center px-4 py-2 text-sm text-surface-700 dark:text-surface-300 hover:bg-surface-100 dark:hover:bg-surface-700"
              onClick={onClose}
            >
              <UserIcon className="w-4 h-4 mr-3 text-surface-500 dark:text-surface-400" />
              My Profile
            </Link>
            
            <Link 
              to="/orders" 
              className="flex items-center px-4 py-2 text-sm text-surface-700 dark:text-surface-300 hover:bg-surface-100 dark:hover:bg-surface-700"
              onClick={onClose}
            >
              <ShoppingBagIcon className="w-4 h-4 mr-3 text-surface-500 dark:text-surface-400" />
              My Orders
            </Link>
            
            <Link 
              to="/wishlist" 
              className="flex items-center px-4 py-2 text-sm text-surface-700 dark:text-surface-300 hover:bg-surface-100 dark:hover:bg-surface-700"
              onClick={onClose}
            >
              <HeartIcon className="w-4 h-4 mr-3 text-surface-500 dark:text-surface-400" />
              Wishlist
            </Link>
            
            <Link 
              to="/settings" 
              className="flex items-center px-4 py-2 text-sm text-surface-700 dark:text-surface-300 hover:bg-surface-100 dark:hover:bg-surface-700"
              onClick={onClose}
            >
              <SettingsIcon className="w-4 h-4 mr-3 text-surface-500 dark:text-surface-400" />
              Settings
            </Link>
          </div>
          
          <div className="border-t border-surface-200 dark:border-surface-700 py-2">
            <button 
              onClick={handleLogout}
              className="flex w-full items-center px-4 py-2 text-sm text-surface-700 dark:text-surface-300 hover:bg-surface-100 dark:hover:bg-surface-700"
            >
              <LogOutIcon className="w-4 h-4 mr-3 text-surface-500 dark:text-surface-400" />
              Logout
            </button>
          </div>
        </>
      ) : (
        // Guest user menu
        <div className="py-2">
          <button
            onClick={() => handleNavigation('/signin')}
            className="flex w-full items-center px-4 py-2 text-sm text-surface-700 dark:text-surface-300 hover:bg-surface-100 dark:hover:bg-surface-700"
          >
            <LogInIcon className="w-4 h-4 mr-3 text-surface-500 dark:text-surface-400" />
            Sign In
          </button>
          
          <button
            onClick={() => handleNavigation('/register')}
            className="flex w-full items-center px-4 py-2 text-sm text-surface-700 dark:text-surface-300 hover:bg-surface-100 dark:hover:bg-surface-700"
          >
            <UserPlusIcon className="w-4 h-4 mr-3 text-surface-500 dark:text-surface-400" />
            Register
          </button>
          
          <Link 
            to="/orders" 
            className="flex items-center px-4 py-2 text-sm text-surface-700 dark:text-surface-300 hover:bg-surface-100 dark:hover:bg-surface-700"
            onClick={onClose}
          >
            <ShoppingBagIcon className="w-4 h-4 mr-3 text-surface-500 dark:text-surface-400" />
            Track Order
          </Link>
        </div>
      )}
    </div>
  );
};

export default UserDropdown;