import { useState, useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { Search as SearchIcon, SlidersHorizontal, Tag, Loader, Star, SearchX } from 'lucide-react';
import { searchProducts, getCategories } from '../data/productData';

const Search = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const query = searchParams.get('q') || '';
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(true);
  const [categories, setCategories] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [priceRange, setPriceRange] = useState([0, 1000]);
  const [showNoResults, setShowNoResults] = useState(false);
  
  // Load categories
  useEffect(() => {
    setCategories(getCategories());
  }, []);
  
  // Handle search based on query and filters
  useEffect(() => {
    setLoading(true);
    setShowNoResults(false);
    
    // Simulate API delay
    const searchTimeout = setTimeout(() => {
      // Create filters object
      const filters = {
        categories: selectedCategories.length > 0 ? selectedCategories : [],
        priceRange: priceRange.length === 2 ? priceRange : [0, 0]
      };
      
      // Perform search
      const searchResults = searchProducts(query, filters);
      setResults(searchResults);
      setLoading(false);
      setShowNoResults(searchResults.length === 0);
    }, 800);
    
    return () => clearTimeout(searchTimeout);
  }, [query, selectedCategories, priceRange]);
  
  // Handle category filter changes
  const handleCategoryChange = (category) => {
    setSelectedCategories(prev => {
      if (prev.includes(category)) {
        return prev.filter(c => c !== category);
      } else {
        return [...prev, category];
      }
    });
  };
  
  // Handle price range changes
  const handlePriceRangeChange = (range) => {
    setPriceRange(range);
  };
  
  // Clear all filters
  const clearFilters = () => {
    setSelectedCategories([]);
    setPriceRange([0, 1000]);
    toast.info("All filters have been cleared", {
      position: "bottom-right",
      autoClose: 2000
    });
  };
  
  // Apply filters
  const applyFilters = () => {
    // Filters are already applied via useEffect
    toast.success("Filters applied successfully", {
      position: "bottom-right",
      autoClose: 2000
    });
  };
  
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-2xl md:text-3xl font-bold text-surface-800 dark:text-white mb-2">
          Search Results
        </h1>
        <div className="flex items-center text-surface-500 dark:text-surface-400">
          <SearchIcon className="w-4 h-4 mr-2" />
          <span>
            {loading ? "Searching..." : (
              <>
                {results.length} results for "<span className="font-semibold">{query}</span>"
              </>
            )}
          </span>
        </div>
      </div>
      
      <div className="flex flex-col md:flex-row gap-6">
        {/* Filters */}
        <div className="w-full md:w-64 bg-white dark:bg-surface-800 p-4 rounded-lg shadow border border-surface-200 dark:border-surface-700 h-fit">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-semibold text-surface-800 dark:text-white">Filters</h2>
            <SlidersHorizontal className="w-4 h-4 text-surface-500 dark:text-surface-400" />
          </div>
          
          {/* Categories filter */}
          <div className="mb-4">
            <h3 className="text-sm font-medium text-surface-800 dark:text-white mb-2">Categories</h3>
            <div className="space-y-2 max-h-48 overflow-y-auto">
              {categories.map(category => (
                <div key={category} className="flex items-center">
                  <input 
                    type="checkbox" 
                    id={`category-${category.toLowerCase().replace(/\s+/g, '-')}`}
                    checked={selectedCategories.includes(category)}
                    onChange={() => handleCategoryChange(category)}
                    className="h-4 w-4 rounded border-surface-300 text-primary focus:ring-primary"
                  />
                  <label 
                    htmlFor={`category-${category.toLowerCase().replace(/\s+/g, '-')}`} 
                    className="ml-2 text-sm text-surface-700 dark:text-surface-300"
                  >
                    {category}
                  </label>
                </div>
              ))}
            </div>
          </div>
          
          {/* Price range filter */}
          <div className="mb-4">
            <h3 className="text-sm font-medium text-surface-800 dark:text-white mb-2">Price Range</h3>
            <div className="space-y-2">
              <div className="flex items-center">
                <input 
                  type="radio" 
                  id="price-all" 
                  name="price" 
                  checked={priceRange[0] === 0 && priceRange[1] === 1000}
                  onChange={() => handlePriceRangeChange([0, 1000])}
                  className="h-4 w-4 border-surface-300 text-primary focus:ring-primary"
                />
                <label htmlFor="price-all" className="ml-2 text-sm text-surface-700 dark:text-surface-300">
                  All Prices
                </label>
              </div>
              <div className="flex items-center">
                <input 
                  type="radio" 
                  id="price-under-50" 
                  name="price" 
                  checked={priceRange[0] === 0 && priceRange[1] === 50}
                  onChange={() => handlePriceRangeChange([0, 50])}
                  className="h-4 w-4 border-surface-300 text-primary focus:ring-primary"
                />
                <label htmlFor="price-under-50" className="ml-2 text-sm text-surface-700 dark:text-surface-300">
                  Under $50
                </label>
              </div>
              <div className="flex items-center">
                <input 
                  type="radio" 
                  id="price-50-100" 
                  name="price" 
                  checked={priceRange[0] === 50 && priceRange[1] === 100}
                  onChange={() => handlePriceRangeChange([50, 100])}
                  className="h-4 w-4 border-surface-300 text-primary focus:ring-primary"
                />
                <label htmlFor="price-50-100" className="ml-2 text-sm text-surface-700 dark:text-surface-300">
                  $50 - $100
                </label>
              </div>
              <div className="flex items-center">
                <input 
                  type="radio" 
                  id="price-over-100" 
                  name="price" 
                  checked={priceRange[0] === 100 && priceRange[1] === 1000}
                  onChange={() => handlePriceRangeChange([100, 1000])}
                  className="h-4 w-4 border-surface-300 text-primary focus:ring-primary"
                />
                <label htmlFor="price-over-100" className="ml-2 text-sm text-surface-700 dark:text-surface-300">
                  Over $100
                </label>
              </div>
            </div>
          </div>
          
          {/* Filter action buttons */}
          <div className="space-y-2">
            <button 
              className="w-full btn btn-primary"
              onClick={applyFilters}
            >
              Apply Filters
            </button>
            <button 
              className="w-full btn btn-outline"
              onClick={clearFilters}
            >
              Clear Filters
            </button>
          </div>
        </div>
        
        {/* Results */}
        <div className="flex-1">
          {loading ? (
            <div className="flex flex-col items-center justify-center h-64">
              <div className="animate-spin text-primary mb-4">
                <Loader className="w-8 h-8" />
              </div>
              <p className="text-surface-600 dark:text-surface-400">
                Searching for "{query}"...
              </p>
            </div>
          ) : results.length > 0 ? (
            <div className="space-y-6">
              {/* Search info */}
              {query && (
                <div className="bg-white dark:bg-surface-800 rounded-lg p-4 border border-surface-200 dark:border-surface-700">
                  <p className="text-surface-600 dark:text-surface-400 text-sm">
                    Showing <span className="font-semibold">{results.length}</span> results for 
                    <span className="font-semibold"> "{query}"</span>
                    {selectedCategories.length > 0 && (
                      <> in categories: <span className="font-semibold">{selectedCategories.join(', ')}</span></>
                    )}
                    {(priceRange[0] > 0 || priceRange[1] < 1000) && (
                      <> with price range: <span className="font-semibold">${priceRange[0]} - ${priceRange[1] === 1000 ? '1000+' : priceRange[1]}</span></>
                    )}
                  </p>
                </div>
              )}
              
              {/* Product grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {results.map((product) => (
                  <Link 
                    key={product.id}
                    to={`/product/${product.id}`}
                    className="bg-white dark:bg-surface-800 rounded-lg overflow-hidden border border-surface-200 dark:border-surface-700 shadow-sm hover:shadow-md transition-shadow duration-200 group"
                  >
                    <div className="aspect-square overflow-hidden">
                      <img 
                        src={product.image} 
                        alt={product.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                    <div className="p-4">
                      <div className="flex items-center gap-1 text-xs text-primary dark:text-primary-light mb-1">
                        <Tag className="w-3 h-3" />
                        {product.category}
                      </div>
                      <h3 className="font-medium text-surface-800 dark:text-white group-hover:text-primary transition-colors duration-200">
                        {product.name}
                      </h3>
                      <p className="mt-1 text-sm line-clamp-2 text-surface-600 dark:text-surface-400">
                        {product.description}
                      </p>
                      <div className="flex justify-between items-center mt-2">
                        <p className="font-semibold text-surface-900 dark:text-white">
                          ${product.price.toFixed(2)}
                        </p>
                        <div className="flex items-center">
                          <Star className="w-4 h-4 text-yellow-400 fill-current" />
                          <span className="text-sm ml-1">{product.rating}</span>
                        </div>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          ) : showNoResults && (
            <div className="bg-white dark:bg-surface-800 rounded-lg p-8 text-center border border-surface-200 dark:border-surface-700">
              <div className="flex justify-center mb-4 text-surface-400">
                <SearchX className="w-12 h-12" />
              </div>
              <h2 className="text-xl font-semibold text-surface-800 dark:text-white mb-2">
                No results found
              </h2>
              <p className="text-surface-600 dark:text-surface-400 mb-6">
                We couldn't find any products matching "{query}".
                {selectedCategories.length > 0 || (priceRange[0] > 0 || priceRange[1] < 1000) ? (
                  " Try adjusting your filters or using different keywords."
                ) : (
                  " Try using different keywords or browse our categories."
                )}
              </p>
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <Link to="/categories" className="btn btn-primary">
                  Browse Categories
                </Link>
                <button onClick={clearFilters} className="btn btn-outline">
                  Clear Filters
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Search;