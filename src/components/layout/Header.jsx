import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectCartItemCount } from '../../features/cart/cartSlice';
import getIcon from '../../utils/iconUtils';
import SearchModal from './SearchModal';
import UserDropdown from './UserDropdown';

const Header = () => {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isUserDropdownOpen, setIsUserDropdownOpen] = useState(false);
  const cartItemCount = useSelector(selectCartItemCount);
  
  // Get icons
  const SearchIcon = getIcon('Search');
  const UserIcon = getIcon('User');
  const ShoppingCartIcon = getIcon('ShoppingCart');
  
  // Toggle search modal
  const toggleSearch = () => {
    setIsSearchOpen(prev => !prev);
  };
  
  // Toggle user dropdown
  const toggleUserDropdown = () => {
    setIsUserDropdownOpen(prev => !prev);
  };
  
  return (
    <header className="bg-white dark:bg-surface-900 border-b border-surface-200 dark:border-surface-800 sticky top-0 z-30">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center">
            <span className="text-xl font-bold text-primary dark:text-primary-light">CraftCart</span>
          </Link>
          
          {/* Navigation */}
          <nav className="hidden md:flex space-x-4">
            <Link to="/" className="px-3 py-2 text-surface-600 hover:text-primary dark:text-surface-300 dark:hover:text-primary-light transition duration-150">
              Home
            </Link>
            <Link to="/categories" className="px-3 py-2 text-surface-600 hover:text-primary dark:text-surface-300 dark:hover:text-primary-light transition duration-150">
              Shop
            </Link>
            <Link to="/about" className="px-3 py-2 text-surface-600 hover:text-primary dark:text-surface-300 dark:hover:text-primary-light transition duration-150">
              About
            </Link>
            <Link to="/contact" className="px-3 py-2 text-surface-600 hover:text-primary dark:text-surface-300 dark:hover:text-primary-light transition duration-150">
              Contact
            </Link>
          </nav>
          
          {/* Action buttons */}
          <div className="flex items-center space-x-2">
            <button
              className="p-2 rounded-full text-surface-500 hover:text-primary hover:bg-surface-100 dark:text-surface-400 dark:hover:text-primary-light dark:hover:bg-surface-800 transition duration-150"
              onClick={toggleSearch}
              aria-label="Search"
            >
              <SearchIcon className="w-5 h-5" />
            </button>
            
            <div className="relative">
              <button
                className="p-2 rounded-full text-surface-500 hover:text-primary hover:bg-surface-100 dark:text-surface-400 dark:hover:text-primary-light dark:hover:bg-surface-800 transition duration-150"
                onClick={toggleUserDropdown}
                aria-label="User menu"
              >
                <UserIcon className="w-5 h-5" />
              </button>
              
              {/* User dropdown menu - only show when isUserDropdownOpen is true */}
              {isUserDropdownOpen && (
                <UserDropdown onClose={() => setIsUserDropdownOpen(false)} />
              )}
            </div>
            
            <Link 
              to="/cart" 
              className="p-2 rounded-full text-surface-500 hover:text-primary hover:bg-surface-100 dark:text-surface-400 dark:hover:text-primary-light dark:hover:bg-surface-800 relative transition duration-150"
              aria-label="Shopping cart"
            >
              <ShoppingCartIcon className="w-5 h-5" />
              {cartItemCount > 0 && (
                <span className="absolute top-0 right-0 bg-red-500 text-white text-xs rounded-full h-4 w-4 flex items-center justify-center">
                  {cartItemCount > 99 ? '99+' : cartItemCount}
                </span>
              )}
            </Link>
          </div>
        </div>
      </div>
      
      {/* Search Modal */}
      <SearchModal isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />
    </header>
  );
};

export default Header;