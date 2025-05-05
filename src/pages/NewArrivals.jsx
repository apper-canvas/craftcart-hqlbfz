import { useState, useEffect } from 'react';
import { ShoppingBag, Clock, ArrowUp } from 'lucide-react';
import { toast } from 'react-toastify';

const NewArrivals = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate fetching new arrival products
    const fetchNewArrivals = async () => {
      setLoading(true);
      try {
        // In a real app, you would fetch from an API
        setTimeout(() => {
          const mockProducts = [
            { 
              id: 1, 
              name: "Handcrafted Ceramic Vase", 
              price: 59.99, 
              image: "https://source.unsplash.com/random/300x300/?ceramic+vase",
              category: "Ceramics",
              dateAdded: "2 days ago"
            },
            { 
              id: 2, 
              name: "Organic Cotton Throw Pillow", 
              price: 29.99, 
              image: "https://source.unsplash.com/random/300x300/?pillow",
              category: "Textiles",
              dateAdded: "3 days ago"
            },
            { 
              id: 3, 
              name: "Hand-carved Wooden Bowl", 
              price: 45.99, 
              image: "https://source.unsplash.com/random/300x300/?wooden+bowl",
              category: "Woodwork",
              dateAdded: "1 week ago"
            },
            { 
              id: 4, 
              name: "Silver Leaf Earrings", 
              price: 39.99, 
              image: "https://source.unsplash.com/random/300x300/?earrings",
              category: "Jewelry",
              dateAdded: "5 days ago"
            },
            { 
              id: 5, 
              name: "Artisan Coffee Mug", 
              price: 24.99, 
              image: "https://source.unsplash.com/random/300x300/?coffee+mug",
              category: "Ceramics",
              dateAdded: "3 days ago"
            },
            { 
              id: 6, 
              name: "Handwoven Wall Hanging", 
              price: 89.99, 
              image: "https://source.unsplash.com/random/300x300/?wall+hanging",
              category: "Textiles",
              dateAdded: "1 day ago"
            },
            { 
              id: 7, 
              name: "Brass Pendant Necklace", 
              price: 34.99, 
              image: "https://source.unsplash.com/random/300x300/?pendant",
              category: "Jewelry",
              dateAdded: "2 days ago"
            },
            { 
              id: 8, 
              name: "Reclaimed Wood Picture Frame", 
              price: 49.99, 
              image: "https://source.unsplash.com/random/300x300/?picture+frame",
              category: "Woodwork",
              dateAdded: "4 days ago"
            },
          ];
          
          setProducts(mockProducts);
          setLoading(false);
        }, 800);
      } catch (error) {
        console.error('Error fetching new arrivals:', error);
        setLoading(false);
        toast.error('Failed to load new arrivals. Please try again.');
      }
    };

    fetchNewArrivals();
  }, []);

  const addToCart = (product) => {
    toast.success(`${product.name} added to cart!`);
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex items-center gap-3 mb-2">
        <h1 className="text-3xl font-bold dark:text-white">New Arrivals</h1>
        <span className="bg-primary text-white text-xs font-semibold px-2.5 py-0.5 rounded">NEW</span>
      </div>
      <p className="text-gray-600 dark:text-gray-400 mb-8">
        Discover our latest artisanal products, fresh from the workshops of our talented creators.
      </p>
      
      {loading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {[1, 2, 3, 4, 5, 6, 7, 8].map((item) => (
            <div key={item} className="animate-pulse">
              <div className="bg-gray-200 dark:bg-gray-700 h-48 rounded-lg mb-2"></div>
              <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded mb-2"></div>
              <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-1/2"></div>
            </div>
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {products.map((product) => (
            <div 
              key={product.id} 
              className="bg-white dark:bg-surface-800 rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow"
            >
              <div className="relative">
                <img 
                  src={product.image} 
                  alt={product.name} 
                  className="w-full h-48 object-cover"
                />
                <span className="absolute top-2 left-2 bg-primary text-white text-xs font-semibold px-2.5 py-0.5 rounded">
                  NEW
                </span>
                <div className="absolute top-2 right-2 bg-black bg-opacity-60 text-white text-xs rounded-full px-2 py-1 flex items-center">
                  <Clock size={12} className="mr-1" />
                  {product.dateAdded}
                </div>
              </div>
              
              <div className="p-4">
                <div className="text-xs text-gray-500 dark:text-gray-400 mb-1">{product.category}</div>
                <h3 className="font-medium text-lg mb-1 dark:text-white">{product.name}</h3>
                <div className="flex items-center justify-between mb-3">
                  <span className="text-primary font-bold">${product.price}</span>
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
      
      <button 
        onClick={scrollToTop} 
        className="fixed bottom-6 right-6 bg-primary text-white p-3 rounded-full shadow-lg hover:bg-primary-dark transition-colors"
        aria-label="Scroll to top"
      >
        <ArrowUp size={20} />
      </button>
    </div>
  );
};

export default NewArrivals;