import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { motion } from 'framer-motion';
import { toast } from 'react-toastify';
import { addItem } from '../features/cart/cartSlice';
import getIcon from '../utils/iconUtils';

const MainFeature = ({ selectedCategory }) => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedFilter, setSelectedFilter] = useState('all');
  const [priceRange, setPriceRange] = useState([0, 200]);
  const [loading, setLoading] = useState(true);
  
  const navigate = useNavigate();
  const dispatch = useDispatch();
  
  // Get icons
  const ShoppingCartIcon = getIcon('ShoppingCart');
  const StarIcon = getIcon('Star');
  const FilterIcon = getIcon('SlidersHorizontal');

  // Product data (normally this would come from an API)
  const productData = [
    {
      id: 1,
      name: "Handcrafted Ceramic Mug",
      description: "A beautiful hand-thrown ceramic mug with a unique glaze finish.",
      price: 28.99,
      category: "Ceramics",
      image: "https://images.unsplash.com/photo-1514228742587-6b1558fcca3d?auto=format&q=80&w=600&h=600&fit=crop",
      inStock: true,
      featured: true,
      rating: 4.8,
      reviewCount: 24
    },
    {
      id: 2,
      name: "Woven Cotton Throw Blanket",
      description: "Handwoven cotton throw blanket with a beautiful geometric pattern.",
      price: 79.99,
      category: "Textiles",
      image: "https://images.unsplash.com/photo-1580376259349-5f4b7db4c39f?auto=format&q=80&w=600&h=600&fit=crop",
      inStock: true,
      featured: true,
      rating: 4.7,
      reviewCount: 18
    },
    {
      id: 3,
      name: "Hand-Carved Wooden Bowl",
      description: "Expertly carved wooden bowl made from sustainable maple.",
      price: 45.00,
      category: "Woodwork",
      image: "https://images.unsplash.com/photo-1578903360376-88f9ab8c21c3?auto=format&q=80&w=600&h=600&fit=crop",
      inStock: true,
      featured: false,
      rating: 4.9,
      reviewCount: 32
    },
    {
      id: 4,
      name: "Sterling Silver Leaf Earrings",
      description: "Delicate sterling silver earrings inspired by natural leaf shapes.",
      price: 38.50,
      category: "Jewelry",
      image: "https://images.unsplash.com/photo-1630019852942-7a3592373495?auto=format&q=80&w=600&h=600&fit=crop",
      inStock: false,
      featured: false,
      rating: 4.6,
      reviewCount: 15
    },
    {
      id: 5,
      name: "Hand-Painted Silk Scarf",
      description: "Vibrant hand-painted silk scarf with abstract design.",
      price: 110.00,
      category: "Textiles",
      image: "https://images.unsplash.com/photo-1561062262-5fecf17a3d5a?auto=format&q=80&w=600&h=600&fit=crop",
      inStock: true,
      featured: true,
      rating: 5.0,
      reviewCount: 11
    },
    {
      id: 6,
      name: "Stoneware Plant Pot",
      description: "Handcrafted stoneware plant pot with a textured finish.",
      price: 42.00,
      category: "Ceramics",
      image: "https://images.unsplash.com/photo-1485955900006-10f4d324d411?auto=format&q=80&w=600&h=600&fit=crop",
      inStock: true,
      featured: false,
      rating: 4.5,
      reviewCount: 29
    }
  ];

  // Initialize products and categories on mount
  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      setProducts(productData);
      
      // Extract unique categories
      const uniqueCategories = [...new Set(productData.map(product => product.category))];
      setCategories(uniqueCategories);
      
      setLoading(false);
    }, 600);
  }, []);

  // Apply filters whenever they change
  useEffect(() => {
    let result = [...products];
    
    // Filter by selected category (if applicable)
    if (selectedCategory) {
      result = result.filter(product => product.category === selectedCategory);
      setSelectedFilter('all'); // Reset other filters when category is selected
    } 
    // Otherwise apply normal filters
    else if (selectedFilter !== 'all') {
      if (selectedFilter === 'featured') {
        result = result.filter(product => product.featured);
      } else if (selectedFilter === 'inStock') {
        result = result.filter(product => product.inStock);
      }
    }
    
    // Apply price range filter
    result = result.filter(product => 
      product.price >= priceRange[0] && product.price <= priceRange[1]
    );
    
    setFilteredProducts(result);
  }, [selectedFilter, priceRange, products, selectedCategory]);

  // Handle adding product to cart
  const handleAddToCart = (e, product) => {
    e.stopPropagation(); // Prevent card click when clicking Add to Cart
    
    dispatch(addItem(product));
    
    toast.success(`${product.name} added to cart!`, {
      position: "bottom-right",
      autoClose: 2000,
    });
  };
  
  // Navigate to product detail page
  const handleProductClick = (productId) => {
    navigate(`/product/${productId}`);
  };

  // Loading state
  if (loading) {
    return (
      <section id="products" className="py-12 bg-white dark:bg-surface-900">
        <div className="container mx-auto px-4">
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="products" className="py-12 bg-white dark:bg-surface-900">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-start mb-8">
          <div>
            <h2 className="text-2xl md:text-3xl font-bold mb-2">
              {selectedCategory ? `${selectedCategory} Collection` : 'Our Handcrafted Products'}
            </h2>
            <p className="text-surface-600 dark:text-surface-400 mb-4 md:mb-0">
              {selectedCategory 
                ? `Browse our handpicked selection of ${selectedCategory.toLowerCase()}`
                : 'Each piece is uniquely crafted with care and attention to detail'}
            </p>
          </div>
          
          {/* Filter UI */}
          <div className="w-full md:w-auto">
            <div className="flex items-center gap-2 mb-2">
              <FilterIcon className="w-5 h-5 text-primary" />
              <span className="font-medium">Filters</span>
            </div>
            <div className="flex flex-wrap gap-2">
              <button 
                onClick={() => setSelectedFilter('all')}
                className={`px-3 py-1 rounded-full text-sm ${
                  selectedFilter === 'all' 
                    ? 'bg-primary text-white' 
                    : 'bg-surface-100 dark:bg-surface-800 text-surface-700 dark:text-surface-300'
                }`}
              >
                All
              </button>
              <button 
                onClick={() => setSelectedFilter('featured')}
                className={`px-3 py-1 rounded-full text-sm ${
                  selectedFilter === 'featured' 
                    ? 'bg-primary text-white' 
                    : 'bg-surface-100 dark:bg-surface-800 text-surface-700 dark:text-surface-300'
                }`}
              >
                Featured
              </button>
              <button 
                onClick={() => setSelectedFilter('inStock')}
                className={`px-3 py-1 rounded-full text-sm ${
                  selectedFilter === 'inStock' 
                    ? 'bg-primary text-white' 
                    : 'bg-surface-100 dark:bg-surface-800 text-surface-700 dark:text-surface-300'
                }`}
              >
                In Stock
              </button>
            </div>
          </div>
        </div>
        
        {/* Product grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProducts.length > 0 ? (
            filteredProducts.map(product => (
              <motion.div 
                key={product.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                className="card card-hover cursor-pointer group"
                onClick={() => handleProductClick(product.id)}
              >
                <div className="relative overflow-hidden">
                  <img 
                    src={product.image} 
                    alt={product.name} 
                    className="w-full h-64 object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                  {!product.inStock && (
                    <div className="absolute top-2 right-2 bg-surface-800/75 text-white text-xs font-medium px-2 py-1 rounded">
                      Sold Out
                    </div>
                  )}
                  {product.featured && (
                    <div className="absolute top-2 left-2 bg-accent/90 text-white text-xs font-medium px-2 py-1 rounded">
                      Featured
                    </div>
                  )}
                </div>
                
                <div className="p-4">
                  <div className="flex justify-between items-start mb-1">
                    <h3 className="font-medium text-lg group-hover:text-primary transition-colors duration-200">
                      {product.name}
                    </h3>
                    <span className="font-semibold text-primary dark:text-primary-light">
                      ${product.price.toFixed(2)}
                    </span>
                  </div>
                  
                  <p className="text-surface-600 dark:text-surface-400 text-sm mb-3">
                    {product.category}
                  </p>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <StarIcon className="w-4 h-4 text-yellow-400" fill="currentColor" />
                      <span className="text-sm ml-1">{product.rating}</span>
                      <span className="text-surface-500 dark:text-surface-400 text-xs ml-1">
                        ({product.reviewCount})
                      </span>
                    </div>
                    
                    <button
                      onClick={(e) => handleAddToCart(e, product)}
                      disabled={!product.inStock}
                      className={`flex items-center p-2 rounded ${
                        product.inStock 
                          ? 'text-primary hover:bg-primary hover:text-white dark:hover:bg-primary dark:hover:text-white' 
                          : 'text-surface-400 cursor-not-allowed'
                      } border border-current transition-colors duration-200`}
                      aria-label={product.inStock ? `Add ${product.name} to cart` : `${product.name} is out of stock`}
                    >
                      <ShoppingCartIcon className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              </motion.div>
            ))
          ) : (
            <div className="col-span-full text-center py-12">
              <h3 className="text-xl font-medium mb-2">No products found</h3>
              <p className="text-surface-600 dark:text-surface-400">
                Try adjusting your filters to find what you're looking for.
              </p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default MainFeature;