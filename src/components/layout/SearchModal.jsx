import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import getIcon from '../../utils/iconUtils';
import { toast } from 'react-toastify';

const SearchModal = ({ onClose }) => {
  const [query, setQuery] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const inputRef = useRef(null);
  const modalRef = useRef(null);
  const navigate = useNavigate();
  
  const SearchIcon = getIcon('Search');
  const XIcon = getIcon('X');
  
  // Focus the search input when the modal opens
  useEffect(() => {
    inputRef.current?.focus();
    
    // Add event listener for escape key
    const handleEscape = (e) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    
    window.addEventListener('keydown', handleEscape);
    
    return () => {
      window.removeEventListener('keydown', handleEscape);
    };
  }, [onClose]);
  
  // Handle outside clicks
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        onClose();
      }
    };
    
    document.addEventListener('mousedown', handleClickOutside);
    
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [onClose]);
  
  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!query.trim()) {
      toast.warning("Please enter a search term");
      return;
    }
    
    setIsLoading(true);
    
    // Simulate search request
    setTimeout(() => {
      setIsLoading(false);
      onClose();
      navigate(`/search?q=${encodeURIComponent(query)}`);
      toast.success(`Searching for "${query}"`);
    }, 500);
  };
  
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-start justify-center pt-16">
      <div 
        ref={modalRef}
        className="bg-white dark:bg-surface-800 rounded-lg shadow-lg w-full max-w-2xl mx-4 overflow-hidden transition-all transform"
      >
        <form onSubmit={handleSubmit} className="relative">
          <div className="flex items-center border-b border-surface-200 dark:border-surface-700">
            <span className="pl-4 text-surface-400">
              <SearchIcon className="w-5 h-5" />
            </span>
            <input
              ref={inputRef}
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search for products, categories, and more..."
              className="w-full p-4 pl-2 focus:outline-none dark:bg-surface-800 dark:text-white"
              disabled={isLoading}
            />
            <button
              type="button"
              onClick={onClose}
              className="pr-4 text-surface-400 hover:text-surface-600 dark:hover:text-surface-200"
              aria-label="Close search"
            >
              <XIcon className="w-5 h-5" />
            </button>
          </div>
          
          <div className="p-4 flex justify-between">
            <button
              type="button"
              onClick={onClose}
              className="btn btn-outline"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="btn btn-primary flex items-center"
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <span className="animate-spin mr-2">
                    {getIcon('Loader')({ className: "w-4 h-4" })}
                  </span>
                  Searching...
                </>
              ) : (
                <>
                  <SearchIcon className="w-4 h-4 mr-2" />
                  Search
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SearchModal;