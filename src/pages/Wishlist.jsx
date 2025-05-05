import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import getIcon from '../utils/iconUtils';
import { toast } from 'react-toastify';

const Wishlist = () => {
  const [wishlistItems, setWishlistItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  // Icons
  const HeartIcon = getIcon('Heart');
  const HeartOffIcon = getIcon('HeartOff');
  const ShoppingCartIcon = getIcon('ShoppingCart');
  const TrashIcon = getIcon('Trash');
  const EyeIcon = getIcon('Eye');

  useEffect(() => {
    // Simulate fetching wishlist data from an API
    const fetchWishlist = async () => {
      try {
        // Simulate API delay
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        // Mock wishlist data
        const mockWishlist = [
          {
            id: 1,
            name: 'Premium Leather Wallet',
            price: 49.99,
            image: 'https://images.unsplash.com/photo-1627123424574-724758594e93?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8bGVhdGhlciUyMHdhbGxldHxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=500&q=60',
            category: 'Accessories',
            inStock: true
          },
          {
            id: 2,
            name: 'Handmade Ceramic Mug',
            price: 24.50,
            image: 'https://images.unsplash.com/photo-1514228742587-6b1558fcca3d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8Y2VyYW1pYyUyMG11Z3xlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=500&q=60',
            category: 'Kitchen',
            inStock: true
          },
          {
            id: 3,
            name: 'Organic Cotton T-Shirt',
            price: 29.99,
            image: 'https://images.unsplash.com/photo-1581655353564-df123a1eb820?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8dCUyMHNoaXJ0fGVufDB8fDB8fHww&auto=format&fit=crop&w=500&q=60',
            category: 'Clothing',
            inStock: false
          }
        ];
        
        setWishlistItems(mockWishlist);
        setIsLoading(false);
      } catch (error) {
        console.error('Error fetching wishlist:', error);
        toast.error('Failed to load your wishlist. Please try again later.');
        setIsLoading(false);
      }
    };

    fetchWishlist();
  }, []);

  const handleRemoveFromWishlist = (id) => {
    setWishlistItems(wishlistItems.filter(item => item.id !== id));
    toast.success('Item removed from wishlist');
  };

  const handleAddToCart = (item) => {
    if (!item.inStock) {
      toast.error(`${item.name} is currently out of stock`);
      return;
    }
    toast.success(`${item.name} added to cart`);
  };

  const handleViewProduct = (id) => {
    toast.info(`Viewing product details will be implemented soon.`);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-surface-900 dark:text-white mb-2">My Wishlist</h1>
        <p className="text-surface-600 dark:text-surface-400">
          Items you've saved for later
        </p>
      </div>

      {isLoading ? (
        <div className="flex justify-center items-center py-12">
          <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-primary"></div>
        </div>
      ) : wishlistItems.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {wishlistItems.map((item) => (
            <div 
              key={item.id} 
              className="bg-white dark:bg-surface-800 rounded-lg shadow-sm border border-surface-200 dark:border-surface-700 overflow-hidden"
            >
              <div className="relative h-48 md:h-64 overflow-hidden">
                <img 
                  src={item.image} 
                  alt={item.name}
                  className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                />
                <div className="absolute top-2 right-2">
                  <button
                    onClick={() => handleRemoveFromWishlist(item.id)}
                    className="p-2 bg-white dark:bg-surface-800 rounded-full shadow-sm text-red-500 hover:bg-red-50 dark:hover:bg-surface-700 transition-colors"
                    aria-label="Remove from wishlist"
                  >
                    <HeartIcon className="w-5 h-5 fill-current" />
                  </button>
                </div>
                {!item.inStock && (
                  <div className="absolute top-2 left-2 bg-red-500 text-white text-xs px-2 py-1 rounded">
                    Out of Stock
                  </div>
                )}
              </div>
              
              <div className="p-4">
                <div className="mb-2">
                  <span className="text-xs font-medium text-surface-500 dark:text-surface-400">
                    {item.category}
                  </span>
                </div>
                <h3 className="text-lg font-semibold text-surface-900 dark:text-white mb-2 truncate">
                  {item.name}
                </h3>
                <p className="text-primary text-lg font-bold mb-4">
                  ${item.price.toFixed(2)}
                </p>
                
                <div className="flex gap-2">
                  <button
                    onClick={() => handleAddToCart(item)}
                    disabled={!item.inStock}
                    className={`flex-1 inline-flex justify-center items-center px-4 py-2 text-sm font-medium rounded-md transition-colors ${
                      item.inStock 
                        ? 'text-white bg-primary hover:bg-primary-dark' 
                        : 'text-surface-400 bg-surface-200 dark:bg-surface-700 cursor-not-allowed'
                    }`}
                  >
                    <ShoppingCartIcon className="w-4 h-4 mr-2" />
                    Add to Cart
                  </button>
                  <button
                    onClick={() => handleViewProduct(item.id)}
                    className="inline-flex justify-center items-center px-3 py-2 text-sm font-medium rounded-md text-surface-700 dark:text-surface-300 border border-surface-300 dark:border-surface-600 hover:bg-surface-100 dark:hover:bg-surface-700 transition-colors"
                  >
                    <EyeIcon className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="bg-white dark:bg-surface-800 rounded-lg shadow-sm border border-surface-200 dark:border-surface-700 p-12 text-center">
          <HeartOffIcon className="w-16 h-16 mx-auto text-surface-400 dark:text-surface-600" />
          <h3 className="mt-4 text-lg font-medium text-surface-900 dark:text-white">Your wishlist is empty</h3>
          <p className="mt-2 text-surface-600 dark:text-surface-400">
            Save items you love to your wishlist and find them all in one place.
          </p>
          <div className="mt-6">
            <Link
              to="/categories"
              className="inline-flex items-center px-4 py-2 text-sm font-medium rounded-md text-white bg-primary hover:bg-primary-dark transition-colors"
            >
              Continue Shopping
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};

export default Wishlist;