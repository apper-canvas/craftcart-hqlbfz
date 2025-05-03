import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectCartItemCount } from '../../features/cart/cartSlice';
import getIcon from '../../utils/iconUtils';

const Header = () => {
  const cartItemCount = useSelector(selectCartItemCount);
  
  // Icons
  const ShoppingCartIcon = getIcon('ShoppingCart');
  const UserIcon = getIcon('User');
  const SearchIcon = getIcon('Search');
  const MenuIcon = getIcon('Menu');
  const SunIcon = getIcon('Sun');
  
  return (
    <header className="bg-white dark:bg-surface-900 border-b border-surface-200 dark:border-surface-800 sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center font-bold text-xl">
            <span className="text-primary">Craft</span>
            <span>Cart</span>
          </Link>
          
          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-6">
            <Link to="/" className="text-surface-700 dark:text-surface-300 hover:text-primary dark:hover:text-primary-light transition">
              Home
            </Link>
            <Link to="/#products" className="text-surface-700 dark:text-surface-300 hover:text-primary dark:hover:text-primary-light transition">
              Products
            </Link>
            <Link to="/categories" className="text-surface-700 dark:text-surface-300 hover:text-primary dark:hover:text-primary-light transition">
              Categories
            </Link>
            <Link to="/about" className="text-surface-700 dark:text-surface-300 hover:text-primary dark:hover:text-primary-light transition">
              About
            </Link>
            <Link to="/contact" className="text-surface-700 dark:text-surface-300 hover:text-primary dark:hover:text-primary-light transition">
              Contact
            </Link>
          </nav>
          
          {/* Actions */}
          <div className="flex items-center space-x-4">
            {/* Search button */}
            <button className="p-2 text-surface-700 dark:text-surface-300 hover:text-primary dark:hover:text-primary-light rounded-full transition">
              <SearchIcon className="w-5 h-5" />
            </button>
            
            {/* Account button */}
            <button className="p-2 text-surface-700 dark:text-surface-300 hover:text-primary dark:hover:text-primary-light rounded-full transition">
              <UserIcon className="w-5 h-5" />
            </button>
            
            {/* Cart button */}
            <Link to="/checkout" className="p-2 text-surface-700 dark:text-surface-300 hover:text-primary dark:hover:text-primary-light rounded-full transition relative">
              <ShoppingCartIcon className="w-5 h-5" />
              {cartItemCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-primary text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  {cartItemCount > 9 ? '9+' : cartItemCount}
                </span>
              )}
            </Link>
            
            {/* Theme toggle */}
            <button className="p-2 text-surface-700 dark:text-surface-300 hover:text-primary dark:hover:text-primary-light rounded-full transition">
              <SunIcon className="w-5 h-5" />
            </button>
            
            {/* Mobile menu button */}
            <button className="p-2 md:hidden text-surface-700 dark:text-surface-300 hover:text-primary dark:hover:text-primary-light rounded-full transition">
              <MenuIcon className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;