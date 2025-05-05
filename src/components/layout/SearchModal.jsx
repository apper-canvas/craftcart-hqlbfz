import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import getIcon from '../../utils/iconUtils';
import { searchProducts } from '../../data/productData';

const SearchModal = ({ isOpen, onClose }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [quickResults, setQuickResults] = useState([]);
  const navigate = useNavigate();
  const inputRef = useRef(null);
  
  // Icons
  const SearchIcon = getIcon('Search');
  const XIcon = getIcon('X');
  const ArrowRightIcon = getIcon('ArrowRight');
  
  // Focus the input when modal opens
  useEffect(() => {
    if (isOpen && inputRef.current) {
      setTimeout(() => {
        inputRef.current.focus();
      }, 100);
    }
  }, [isOpen]);
  
  // Handle search query changes
  useEffect(() => {
    if (searchQuery.trim().length > 1) {
      // Get quick results limited to 4 items
      const results = searchProducts(searchQuery).slice(0, 4);
      setQuickResults(results);
    } else {
      setQuickResults([]);
    }
  }, [searchQuery]);
  
  // Handle search submission
  const handleSubmit = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
      onClose();
      setSearchQuery('');
    }
  };
  
  // Handle clicking a quick result
  const handleQuickResultClick = (productId) => {
    navigate(`/product/${productId}`);
    onClose();
    setSearchQuery('');
  };
  
  // Handle view all results
  const handleViewAllResults = () => {
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
      onClose();
      setSearchQuery('');
    }
  };
  
  // Close on escape key
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    
    window.addEventListener('keydown', handleEscape);
    return () => window.removeEventListener('keydown', handleEscape);
  }, [onClose]);
  
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40"
            onClick={onClose}
          />
          
          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
            className="fixed top-4 inset-x-0 mx-auto w-full max-w-2xl z-50 px-4"
          >
            <div className="bg-white dark:bg-surface-800 rounded-lg shadow-xl border border-surface-200 dark:border-surface-700 overflow-hidden">
              {/* Search form */}
              <form onSubmit={handleSubmit} className="relative">
                <div className="flex items-center px-4 py-3 border-b border-surface-200 dark:border-surface-700">
                  <SearchIcon className="w-5 h-5 text-surface-400" />
                  <input
                    ref={inputRef}
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search for handcrafted products..."
                    className="flex-1 border-none focus:ring-0 py-2 px-3 text-surface-800 dark:text-white bg-transparent"
                  />
                  <button
                    type="button"
                    onClick={onClose}
                    className="p-1 rounded-full hover:bg-surface-100 dark:hover:bg-surface-700"
                  >
                    <XIcon className="w-5 h-5 text-surface-500 dark:text-surface-400" />
                  </button>
                </div>
              </form>
              
              {/* Quick results */}
              {searchQuery.trim() && (
                <div className="max-h-[60vh] overflow-y-auto">
                  {quickResults.length > 0 ? (
                    <>
                      <div className="p-2 text-xs text-surface-500 dark:text-surface-400 uppercase font-medium px-4">
                        Quick Results
                      </div>
                      
                      <div className="space-y-1 px-2 pb-2">
                        {quickResults.map(product => (
                          <div
                            key={product.id}
                            onClick={() => handleQuickResultClick(product.id)}
                            className="flex items-center gap-3 p-2 rounded-md hover:bg-surface-100 dark:hover:bg-surface-700 cursor-pointer"
                          >
                            <div className="w-12 h-12 rounded overflow-hidden flex-shrink-0">
                              <img
                                src={product.image}
                                alt={product.name}
                                className="w-full h-full object-cover"
                              />
                            </div>
                            <div className="flex-1 min-w-0">
                              <h4 className="font-medium text-surface-800 dark:text-white truncate">
                                {product.name}
                              </h4>
                              <p className="text-sm text-surface-500 dark:text-surface-400">
                                ${product.price.toFixed(2)} • {product.category}
                              </p>
                            </div>
                          </div>
                        ))}
                      </div>
                      
                      <div 
                        className="p-3 border-t border-surface-200 dark:border-surface-700 flex justify-center"
                      >
                        <button
                          onClick={handleViewAllResults}
                          className="flex items-center text-primary dark:text-primary-light text-sm font-medium gap-1"
                        >
                          View all results <ArrowRightIcon className="w-4 h-4" />
                        </button>
                      </div>
                    </>
                  ) : (
                    <div className="p-6 text-center">
                      <p className="text-surface-600 dark:text-surface-400">
                        No results found for "{searchQuery}"
                      </p>
                      <button
                        onClick={handleSubmit}
                        className="mt-2 btn btn-sm btn-primary"
                      >
                        Search for "{searchQuery}"
                      </button>
                    </div>
                  )}
                </div>
              )}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default SearchModal;