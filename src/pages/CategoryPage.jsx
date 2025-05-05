import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { ShoppingBag, Filter } from 'lucide-react';
import { toast } from 'react-toastify';

const CategoryPage = () => {
  const { categoryName } = useParams();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  // Format category name for display
  const formatCategoryName = (name) => {
    return name.charAt(0).toUpperCase() + name.slice(1);
  };

  useEffect(() => {
    // Simulate fetching products for this category
    const fetchProducts = async () => {
      setLoading(true);
      
      try {
        // In a real app, you would fetch from an API
        // For now, we'll create mock data based on the category
        setTimeout(() => {
          const mockProducts = [
            { 
              id: 1, 
              name: `${formatCategoryName(categoryName)} Item 1`, 
              price: 49.99, 
              image: `https://source.unsplash.com/random/300x300/?${categoryName}&v=1`,
              rating: 4.5
            },
            { 
              id: 2, 
              name: `${formatCategoryName(categoryName)} Item 2`, 
              price: 39.99, 
              image: `https://source.unsplash.com/random/300x300/?${categoryName}&v=2`,
              rating: 4.2
            },
            { 
              id: 3, 
              name: `${formatCategoryName(categoryName)} Item 3`, 
              price: 59.99, 
              image: `https://source.unsplash.com/random/300x300/?${categoryName}&v=3`,
              rating: 4.8
            },
            { 
              id: 4, 
              name: `${formatCategoryName(categoryName)} Item 4`, 
              price: 44.99, 
              image: `https://source.unsplash.com/random/300x300/?${categoryName}&v=4`,
              rating: 4.1
            },
            { 
              id: 5, 
              name: `${formatCategoryName(categoryName)} Item 5`, 
              price: 69.99, 
              image: `https://source.unsplash.com/random/300x300/?${categoryName}&v=5`,
              rating: 4.9
            },
            { 
              id: 6, 
              name: `${formatCategoryName(categoryName)} Item 6`, 
              price: 34.99, 
              image: `https://source.unsplash.com/random/300x300/?${categoryName}&v=6`,
              rating: 4.3
            },
          ];
          
          setProducts(mockProducts);
          setLoading(false);
        }, 800);
      } catch (error) {
        console.error('Error fetching products:', error);
        setLoading(false);
        toast.error('Failed to load products. Please try again.');
      }
    };

    fetchProducts();
  }, [categoryName]);

  const addToCart = (product) => {
    toast.success(`${product.name} added to cart!`);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6 dark:text-white">{formatCategoryName(categoryName)}</h1>
      
      <div className="flex flex-col md:flex-row gap-6 mb-8">
        {/* Filter sidebar */}
        <div className="w-full md:w-64 bg-surface-50 dark:bg-surface-800 p-4 rounded-lg h-fit">
          <div className="flex items-center gap-2 mb-4">
            <Filter size={20} className="text-primary" />
            <h2 className="font-semibold text-lg dark:text-white">Filters</h2>
          </div>
          
          {/* Price Range */}
          <div className="mb-6">
            <h3 className="font-medium mb-2 text-gray-700 dark:text-gray-300">Price Range</h3>
            <div className="space-y-2">
              <label className="flex items-center">
                <input type="checkbox" className="form-checkbox text-primary h-4 w-4" />
                <span className="ml-2 text-gray-600 dark:text-gray-400">Under $50</span>
              </label>
              <label className="flex items-center">
                <input type="checkbox" className="form-checkbox text-primary h-4 w-4" />
                <span className="ml-2 text-gray-600 dark:text-gray-400">$50 - $100</span>
              </label>
              <label className="flex items-center">
                <input type="checkbox" className="form-checkbox text-primary h-4 w-4" />
                <span className="ml-2 text-gray-600 dark:text-gray-400">$100 - $200</span>
              </label>
              <label className="flex items-center">
                <input type="checkbox" className="form-checkbox text-primary h-4 w-4" />
                <span className="ml-2 text-gray-600 dark:text-gray-400">Over $200</span>
              </label>
            </div>
          </div>
          
          {/* Rating */}
          <div className="mb-6">
            <h3 className="font-medium mb-2 text-gray-700 dark:text-gray-300">Rating</h3>
            <div className="space-y-2">
              <label className="flex items-center">
                <input type="checkbox" className="form-checkbox text-primary h-4 w-4" />
                <span className="ml-2 text-gray-600 dark:text-gray-400">4★ & Above</span>
              </label>
              <label className="flex items-center">
                <input type="checkbox" className="form-checkbox text-primary h-4 w-4" />
                <span className="ml-2 text-gray-600 dark:text-gray-400">3★ & Above</span>
              </label>
              <label className="flex items-center">
                <input type="checkbox" className="form-checkbox text-primary h-4 w-4" />
                <span className="ml-2 text-gray-600 dark:text-gray-400">2★ & Above</span>
              </label>
            </div>
          </div>
          
          <button className="w-full bg-primary text-white py-2 rounded hover:bg-primary-dark transition-colors">
            Apply Filters
          </button>
        </div>
        
        {/* Product grid */}
        <div className="flex-1">
          {loading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {[1, 2, 3, 4, 5, 6].map((item) => (
                <div key={item} className="animate-pulse">
                  <div className="bg-gray-200 dark:bg-gray-700 h-48 rounded-lg mb-2"></div>
                  <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded mb-2"></div>
                  <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-1/2"></div>
                </div>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {products.map((product) => (
                <div 
                  key={product.id} 
                  className="bg-white dark:bg-surface-800 rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow"
                >
                  <img 
                    src={product.image} 
                    alt={product.name} 
                    className="w-full h-48 object-cover"
                  />
                  <div className="p-4">
                    <h3 className="font-medium text-lg mb-1 dark:text-white">{product.name}</h3>
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-primary font-bold">${product.price}</span>
                      <div className="flex items-center">
                        <span className="text-yellow-500">★</span>
                        <span className="text-gray-600 dark:text-gray-400 ml-1">{product.rating}</span>
                      </div>
                    </div>
                    <button 
                      onClick={() => addToCart(product)}
                      className="w-full bg-primary text-white py-2 rounded flex items-center justify-center gap-2 hover:bg-primary-dark transition-colors"
                    >
                      <ShoppingBag size={18} />
                      Add to Cart
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CategoryPage;