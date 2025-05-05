import { useState, useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import getIcon from '../utils/iconUtils';

const Search = () => {
  const [searchParams] = useSearchParams();
  const query = searchParams.get('q') || '';
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(true);
  
  // Icons
  const SearchIcon = getIcon('Search');
  const FilterIcon = getIcon('SlidersHorizontal');
  
  // Mock search results
  useEffect(() => {
    setLoading(true);
    
    // Simulate API call for search results
    const mockSearch = setTimeout(() => {
      const mockResults = [
        {
          id: 1,
          name: `Handcrafted ${query} Pottery`,
          price: 59.99,
          image: 'https://images.unsplash.com/photo-1605883705077-8d3d3cebe78c',
          category: 'Home Decor'
        },
        {
          id: 2,
          name: `Artisan ${query} Necklace`,
          price: 89.99,
          image: 'https://images.unsplash.com/photo-1535632787350-4e68ef0ac584',
          category: 'Jewelry'
        },
        {
          id: 3,
          name: `Vintage ${query} Set`,
          price: 129.99,
          image: 'https://images.unsplash.com/photo-1618220252344-8ec99ec624b0',
          category: 'Kitchen'
        },
        {
          id: 4,
          name: `Luxury ${query} Collection`,
          price: 149.99,
          image: 'https://images.unsplash.com/photo-1614632537203-14237de491b6',
          category: 'Home Decor'
        }
      ];
      
      setResults(mockResults);
      setLoading(false);
    }, 1000);
    
    return () => clearTimeout(mockSearch);
  }, [query]);
  
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-2xl md:text-3xl font-bold text-surface-800 dark:text-white mb-2">
          Search Results
        </h1>
        <div className="flex items-center text-surface-500 dark:text-surface-400">
          <SearchIcon className="w-4 h-4 mr-2" />
          <span>
            {results.length} results for "<span className="font-semibold">{query}</span>"
          </span>
        </div>
      </div>
      
      <div className="flex flex-col md:flex-row gap-6">
        {/* Filters */}
        <div className="w-full md:w-64 bg-white dark:bg-surface-800 p-4 rounded-lg shadow border border-surface-200 dark:border-surface-700 h-fit">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-semibold text-surface-800 dark:text-white">Filters</h2>
            <FilterIcon className="w-4 h-4 text-surface-500 dark:text-surface-400" />
          </div>
          
          <div className="mb-4">
            <h3 className="text-sm font-medium text-surface-800 dark:text-white mb-2">Categories</h3>
            <div className="space-y-2">
              <div className="flex items-center">
                <input 
                  type="checkbox" 
                  id="category-home" 
                  className="h-4 w-4 rounded border-surface-300 text-primary focus:ring-primary"
                />
                <label htmlFor="category-home" className="ml-2 text-sm text-surface-700 dark:text-surface-300">
                  Home Decor
                </label>
              </div>
              <div className="flex items-center">
                <input 
                  type="checkbox" 
                  id="category-jewelry" 
                  className="h-4 w-4 rounded border-surface-300 text-primary focus:ring-primary"
                />
                <label htmlFor="category-jewelry" className="ml-2 text-sm text-surface-700 dark:text-surface-300">
                  Jewelry
                </label>
              </div>
              <div className="flex items-center">
                <input 
                  type="checkbox" 
                  id="category-kitchen" 
                  className="h-4 w-4 rounded border-surface-300 text-primary focus:ring-primary"
                />
                <label htmlFor="category-kitchen" className="ml-2 text-sm text-surface-700 dark:text-surface-300">
                  Kitchen
                </label>
              </div>
            </div>
          </div>
          
          <div className="mb-4">
            <h3 className="text-sm font-medium text-surface-800 dark:text-white mb-2">Price Range</h3>
            <div className="space-y-2">
              <div className="flex items-center">
                <input 
                  type="radio" 
                  id="price-all" 
                  name="price" 
                  className="h-4 w-4 border-surface-300 text-primary focus:ring-primary"
                  defaultChecked
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
                  className="h-4 w-4 border-surface-300 text-primary focus:ring-primary"
                />
                <label htmlFor="price-over-100" className="ml-2 text-sm text-surface-700 dark:text-surface-300">
                  Over $100
                </label>
              </div>
            </div>
          </div>
          
          <button className="w-full btn btn-primary">
            Apply Filters
          </button>
        </div>
        
        {/* Results */}
        <div className="flex-1">
          {loading ? (
            <div className="flex flex-col items-center justify-center h-64">
              <div className="animate-spin text-primary mb-4">
                {getIcon('Loader')({ className: "w-8 h-8" })}
              </div>
              <p className="text-surface-600 dark:text-surface-400">
                Searching for "{query}"...
              </p>
            </div>
          ) : results.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {results.map((product) => (
                <Link 
                  key={product.id}
                  to={`/product/${product.id}`}
                  className="card card-hover group transition-all"
                >
                  <div className="aspect-square overflow-hidden">
                    <img 
                      src={`${product.image}?w=500&q=80`} 
                      alt={product.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <div className="p-4">
                    <div className="text-xs text-primary dark:text-primary-light mb-1">
                      {product.category}
                    </div>
                    <h3 className="font-medium text-surface-800 dark:text-white">
                      {product.name}
                    </h3>
                    <p className="mt-1 font-semibold text-surface-900 dark:text-white">
                      ${product.price.toFixed(2)}
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          ) : (
            <div className="bg-white dark:bg-surface-800 rounded-lg p-8 text-center border border-surface-200 dark:border-surface-700">
              <div className="flex justify-center mb-4 text-surface-400">
                {getIcon('SearchX')({ className: "w-12 h-12" })}
              </div>
              <h2 className="text-xl font-semibold text-surface-800 dark:text-white mb-2">
                No results found
              </h2>
              <p className="text-surface-600 dark:text-surface-400 mb-6">
                We couldn't find any products matching "{query}". Try using different keywords or browse our categories.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <Link to="/categories" className="btn btn-primary">
                  Browse Categories
                </Link>
                <Link to="/" className="btn btn-outline">
                  Return Home
                </Link>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Search;