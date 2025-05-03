import { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import { useSelector } from 'react-redux';
import 'react-toastify/dist/ReactToastify.css';
import { motion, AnimatePresence } from 'framer-motion';
import getIcon from './utils/iconUtils';
import Home from './pages/Home';
import NotFound from './pages/NotFound';
import Checkout from './pages/Checkout';
import OrderConfirmation from './pages/OrderConfirmation';
import Cart from './components/Cart';
import { selectCartItemCount } from './features/cart/cartSlice';

// Header component with navigation and theme toggle
const Header = ({ toggleTheme, isDarkMode }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const cartCount = useSelector(selectCartItemCount);
  
  // Get icon components
  const SunIcon = getIcon('Sun');
  const MoonIcon = getIcon('Moon');
  const MenuIcon = getIcon('Menu');
  const XIcon = getIcon('X');
  const ShoppingBagIcon = getIcon('ShoppingBag');
  
  // Toggle mobile menu
  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  
  // Toggle cart sidebar
  const toggleCart = () => {
    setIsCartOpen(!isCartOpen);
  };
  
  return (
    <header className="bg-white dark:bg-surface-800 shadow-sm sticky top-0 z-40 transition-colors duration-300">
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        {/* Logo */}
        <a href="/" className="flex items-center">
          <span className="text-xl font-bold text-primary dark:text-primary-light">
            Craft<span className="text-accent">Cart</span>
          </span>
        </a>
        
        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-8">
          <a href="/" className="font-medium text-surface-700 hover:text-primary dark:text-surface-300 dark:hover:text-primary-light transition-colors">
            Home
          </a>
          <a href="#products" className="font-medium text-surface-700 hover:text-primary dark:text-surface-300 dark:hover:text-primary-light transition-colors">
            Shop
          </a>
          <a href="#about" className="font-medium text-surface-700 hover:text-primary dark:text-surface-300 dark:hover:text-primary-light transition-colors">
            About
          </a>
        </nav>
        
        {/* Action buttons */}
        <div className="flex items-center space-x-4">
          {/* Theme toggle */}
          <button 
            onClick={toggleTheme}
            className="p-2 rounded-full hover:bg-surface-100 dark:hover:bg-surface-700 transition-colors"
            aria-label="Toggle theme"
          >
            {isDarkMode ? 
              <SunIcon className="w-5 h-5 text-yellow-400" /> : 
              <MoonIcon className="w-5 h-5 text-surface-700" />
            }
          </button>
          
          {/* Cart button */}
          <button 
            onClick={toggleCart}
            className="p-2 rounded-full hover:bg-surface-100 dark:hover:bg-surface-700 transition-colors relative"
            aria-label="Shopping cart"
          >
            <ShoppingBagIcon className="w-5 h-5 text-surface-700 dark:text-surface-300" />
            {cartCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-accent text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                {cartCount}
              </span>
            )}
          </button>
          
          {/* Mobile menu button */}
          <button 
            className="p-2 md:hidden rounded-full hover:bg-surface-100 dark:hover:bg-surface-700 transition-colors"
            onClick={toggleMenu}
            aria-label="Menu"
          >
            {isMenuOpen ? 
              <XIcon className="w-5 h-5 text-surface-700 dark:text-surface-300" /> : 
              <MenuIcon className="w-5 h-5 text-surface-700 dark:text-surface-300" />
            }
          </button>
        </div>
      </div>
      
      {/* Mobile menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div 
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="md:hidden bg-white dark:bg-surface-800 overflow-hidden"
          >
            <div className="container mx-auto px-4 py-4 flex flex-col space-y-4">
              <a 
                href="/" 
                className="font-medium text-surface-800 dark:text-surface-200 px-4 py-2 rounded-lg hover:bg-surface-100 dark:hover:bg-surface-700"
                onClick={() => setIsMenuOpen(false)}
              >
                Home
              </a>
              <a 
                href="#products" 
                className="font-medium text-surface-800 dark:text-surface-200 px-4 py-2 rounded-lg hover:bg-surface-100 dark:hover:bg-surface-700"
                onClick={() => setIsMenuOpen(false)}
              >
                Shop
              </a>
              <a 
                href="#about" 
                className="font-medium text-surface-800 dark:text-surface-200 px-4 py-2 rounded-lg hover:bg-surface-100 dark:hover:bg-surface-700"
                onClick={() => setIsMenuOpen(false)}
              >
                About
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      
      {/* Cart sidebar */}
      <AnimatePresence>
        {isCartOpen && (
          <Cart isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
        )}
      </AnimatePresence>
    </header>
  );
};

// Footer component
const Footer = () => {
  return (
    <footer className="bg-surface-100 dark:bg-surface-800 py-12 mt-16">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="font-bold text-lg mb-4">CraftCart</h3>
            <p className="text-surface-600 dark:text-surface-400 mb-4">
              Supporting artisans and handmade crafts since 2024
            </p>
          </div>
          
          <div>
            <h3 className="font-bold text-lg mb-4">Quick Links</h3>
            <ul className="space-y-2 text-surface-600 dark:text-surface-400">
              <li><a href="/" className="hover:text-primary dark:hover:text-primary-light transition-colors">Home</a></li>
              <li><a href="#products" className="hover:text-primary dark:hover:text-primary-light transition-colors">Shop</a></li>
              <li><a href="#about" className="hover:text-primary dark:hover:text-primary-light transition-colors">About</a></li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-bold text-lg mb-4">Connect With Us</h3>
            <div className="flex space-x-4">
              <a href="#" className="w-10 h-10 rounded-full bg-primary flex items-center justify-center text-white hover:bg-primary-dark transition-colors">
                <span className="sr-only">Instagram</span>
                {(() => {
                  const InstagramIcon = getIcon('Instagram');
                  return <InstagramIcon className="w-5 h-5" />;
                })()}
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-primary flex items-center justify-center text-white hover:bg-primary-dark transition-colors">
                <span className="sr-only">Facebook</span>
                {(() => {
                  const FacebookIcon = getIcon('Facebook');
                  return <FacebookIcon className="w-5 h-5" />;
                })()}
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-primary flex items-center justify-center text-white hover:bg-primary-dark transition-colors">
                <span className="sr-only">Twitter</span>
                {(() => {
                  const TwitterIcon = getIcon('Twitter');
                  return <TwitterIcon className="w-5 h-5" />;
                })()}
              </a>
            </div>
          </div>
        </div>
        
        <div className="border-t border-surface-200 dark:border-surface-700 mt-8 pt-8 text-center text-surface-500">
          <p>&copy; {new Date().getFullYear()} CraftCart. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

function App() {
  const [isDarkMode, setIsDarkMode] = useState(false);
  
  // Initialize theme based on user preference
  useEffect(() => {
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    setIsDarkMode(prefersDark);
  }, []);
  
  // Toggle theme
  const toggleTheme = () => {
    setIsDarkMode((prev) => !prev);
  };
  
  // Apply theme class to document
  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkMode]);

  return (
    <div className="min-h-screen flex flex-col">
      <Header toggleTheme={toggleTheme} isDarkMode={isDarkMode} />
      <main className="flex-1">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/order-confirmation" element={<OrderConfirmation />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      <Footer />
      
      <ToastContainer
        position="bottom-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme={isDarkMode ? "dark" : "light"}
        toastStyle={{
          borderRadius: '0.5rem',
          boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -2px rgba(0, 0, 0, 0.1)'
        }}
      />
    </div>
  );
}

export default App;