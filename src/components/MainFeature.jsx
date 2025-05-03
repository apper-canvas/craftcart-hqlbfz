import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { toast } from 'react-toastify';
import getIcon from '../utils/iconUtils';

// Sample product data
const initialProducts = [
  {
    id: 1,
    name: "Handcrafted Ceramic Mug",
    description: "A beautiful hand-thrown ceramic mug with a unique glaze finish. Perfect for your morning coffee or tea.",
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
    description: "Handwoven cotton throw blanket with a beautiful geometric pattern. Adds warmth and style to any space.",
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
    description: "Expertly carved wooden bowl made from sustainable maple. Each piece is unique with natural wood grain patterns.",
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
    description: "Delicate sterling silver earrings inspired by natural leaf shapes. Lightweight and perfect for everyday wear.",
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
    description: "Vibrant hand-painted silk scarf with abstract design. Each piece is one-of-a-kind and signed by the artist.",
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
    description: "Handcrafted stoneware plant pot with a textured finish. Includes drainage hole and matching saucer.",
    price: 42.00,
    category: "Ceramics",
    image: "https://images.unsplash.com/photo-1485955900006-10f4d324d411?auto=format&q=80&w=600&h=600&fit=crop",
    inStock: true,
    featured: false,
    rating: 4.5,
    reviewCount: 29
  }
];

// Product card component
const ProductCard = ({ product, onAddToCart }) => {
  const StarIcon = getIcon('Star');
  const ShoppingCartIcon = getIcon('ShoppingCart');
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="card card-hover"
    >
      <div className="relative">
        {!product.inStock && (
          <div className="absolute top-2 right-2 bg-surface-700 text-white text-xs px-2 py-1 rounded-full">
            Out of Stock
          </div>
        )}
        
        {product.featured && (
          <div className="absolute top-2 left-2 bg-accent text-white text-xs px-2 py-1 rounded-full">
            Featured
          </div>
        )}
        
        <img 
          src={product.image} 
          alt={product.name} 
          className="w-full aspect-square object-cover rounded-t-xl"
        />
      </div>
      
      <div className="p-4">
        <div className="flex justify-between items-start">
          <h3 className="font-semibold text-lg mb-1">{product.name}</h3>
          <span className="text-lg font-bold text-primary dark:text-primary-light">
            ${product.price.toFixed(2)}
          </span>
        </div>
        
        <p className="text-surface-500 dark:text-surface-400 text-sm mb-2">{product.category}</p>
        
        <div className="flex items-center mb-4">
          <div className="flex text-yellow-400 mr-1">
            <StarIcon className="w-4 h-4" />
          </div>
          <span className="text-sm font-medium">{product.rating}</span>
          <span className="text-surface-500 dark:text-surface-400 text-sm ml-1">
            ({product.reviewCount} reviews)
          </span>
        </div>
        
        <button
          onClick={() => onAddToCart(product)}
          disabled={!product.inStock}
          className={`w-full btn ${product.inStock ? 'btn-primary' : 'bg-surface-300 cursor-not-allowed'} flex items-center justify-center gap-2`}
        >
          <ShoppingCartIcon className="w-4 h-4" />
          <span>{product.inStock ? 'Add to Cart' : 'Sold Out'}</span>
        </button>
      </div>
    </motion.div>
  );
};

// Filter sidebar component
const FilterSidebar = ({ categories, activeCategories, onCategoryChange, priceRange, onPriceRangeChange, onReset }) => {
  const FilterIcon = getIcon('Filter');
  const RefreshCwIcon = getIcon('RefreshCw');
  
  return (
    <div className="bg-white dark:bg-surface-800 rounded-xl p-5 border border-surface-200 dark:border-surface-700 h-fit">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2">
          <FilterIcon className="w-5 h-5 text-primary" />
          <h3 className="font-semibold text-lg">Filters</h3>
        </div>
        <button 
          onClick={onReset} 
          className="text-sm text-primary dark:text-primary-light flex items-center gap-1 hover:underline"
        >
          <RefreshCwIcon className="w-3 h-3" />
          <span>Reset</span>
        </button>
      </div>
      
      <div className="mb-6">
        <h4 className="font-medium mb-3">Categories</h4>
        <div className="space-y-2">
          {categories.map(category => (
            <label key={category} className="flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={activeCategories.includes(category)}
                onChange={() => onCategoryChange(category)}
                className="rounded border-surface-300 text-primary focus:ring-primary"
              />
              <span className="ml-2 text-surface-700 dark:text-surface-300">{category}</span>
            </label>
          ))}
        </div>
      </div>
      
      <div>
        <h4 className="font-medium mb-3">Price Range</h4>
        <div className="mb-2 flex justify-between text-sm text-surface-500">
          <span>${priceRange[0]}</span>
          <span>${priceRange[1]}</span>
        </div>
        <input
          type="range"
          min={0}
          max={200}
          value={priceRange[1]}
          onChange={(e) => onPriceRangeChange([priceRange[0], Number(e.target.value)])}
          className="w-full accent-primary"
        />
      </div>
    </div>
  );
};

// Search and sort controls
const ProductControls = ({ searchTerm, onSearchChange, sortOption, onSortChange }) => {
  const SearchIcon = getIcon('Search');
  
  return (
    <div className="flex flex-col sm:flex-row gap-4 mb-6">
      <div className="relative flex-1">
        <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-surface-400 w-5 h-5" />
        <input
          type="text"
          placeholder="Search products..."
          value={searchTerm}
          onChange={(e) => onSearchChange(e.target.value)}
          className="input pl-10 w-full"
        />
      </div>
      
      <div className="sm:w-48">
        <select
          value={sortOption}
          onChange={(e) => onSortChange(e.target.value)}
          className="input"
        >
          <option value="featured">Featured</option>
          <option value="priceAsc">Price: Low to High</option>
          <option value="priceDesc">Price: High to Low</option>
          <option value="rating">Top Rated</option>
        </select>
      </div>
    </div>
  );
};

// Empty state component
const EmptyState = () => {
  const InboxIcon = getIcon('Inbox');
  
  return (
    <div className="flex flex-col items-center justify-center py-12 text-center">
      <div className="w-16 h-16 rounded-full bg-surface-100 dark:bg-surface-800 flex items-center justify-center mb-4">
        <InboxIcon className="w-8 h-8 text-surface-400" />
      </div>
      <h3 className="text-xl font-medium mb-2">No products found</h3>
      <p className="text-surface-500 dark:text-surface-400 max-w-md">
        Try adjusting your search or filter criteria to find what you're looking for.
      </p>
    </div>
  );
};

// Main product feature component
const MainFeature = () => {
  const [products, setProducts] = useState(initialProducts);
  const [filteredProducts, setFilteredProducts] = useState(initialProducts);
  const [searchTerm, setSearchTerm] = useState('');
  const [activeCategories, setActiveCategories] = useState([]);
  const [priceRange, setPriceRange] = useState([0, 200]);
  const [sortOption, setSortOption] = useState('featured');
  const [cartItems, setCartItems] = useState([]);
  const [isFilterVisible, setIsFilterVisible] = useState(false);
  
  // Get unique categories from products
  const categories = [...new Set(products.map(product => product.category))];
  
  // Filter products based on search, categories, and price range
  useEffect(() => {
    let results = products;
    
    // Filter by search term
    if (searchTerm) {
      const lowerCaseSearch = searchTerm.toLowerCase();
      results = results.filter(product => 
        product.name.toLowerCase().includes(lowerCaseSearch) || 
        product.description.toLowerCase().includes(lowerCaseSearch) ||
        product.category.toLowerCase().includes(lowerCaseSearch)
      );
    }
    
    // Filter by category
    if (activeCategories.length > 0) {
      results = results.filter(product => activeCategories.includes(product.category));
    }
    
    // Filter by price range
    results = results.filter(product => 
      product.price >= priceRange[0] && product.price <= priceRange[1]
    );
    
    // Sort products
    switch (sortOption) {
      case 'priceAsc':
        results = [...results].sort((a, b) => a.price - b.price);
        break;
      case 'priceDesc':
        results = [...results].sort((a, b) => b.price - a.price);
        break;
      case 'rating':
        results = [...results].sort((a, b) => b.rating - a.rating);
        break;
      case 'featured':
      default:
        results = [...results].sort((a, b) => (b.featured ? 1 : 0) - (a.featured ? 1 : 0));
        break;
    }
    
    setFilteredProducts(results);
  }, [products, searchTerm, activeCategories, priceRange, sortOption]);
  
  // Handle category filter change
  const handleCategoryChange = (category) => {
    setActiveCategories(prev => {
      if (prev.includes(category)) {
        return prev.filter(c => c !== category);
      } else {
        return [...prev, category];
      }
    });
  };
  
  // Handle price range change
  const handlePriceRangeChange = (newRange) => {
    setPriceRange(newRange);
  };
  
  // Reset all filters
  const handleResetFilters = () => {
    setSearchTerm('');
    setActiveCategories([]);
    setPriceRange([0, 200]);
    setSortOption('featured');
  };
  
  // Add product to cart
  const handleAddToCart = (product) => {
    const existingItem = cartItems.find(item => item.id === product.id);
    
    if (existingItem) {
      setCartItems(prev => 
        prev.map(item => 
          item.id === product.id 
            ? { ...item, quantity: item.quantity + 1 } 
            : item
        )
      );
    } else {
      setCartItems(prev => [...prev, { ...product, quantity: 1 }]);
    }
    
    toast.success(`${product.name} added to cart!`, {
      position: "bottom-right",
      autoClose: 2000
    });
  };
  
  // Toggle filter visibility on mobile
  const toggleFilterVisibility = () => {
    setIsFilterVisible(!isFilterVisible);
  };
  
  // Filter toggle button for mobile
  const FilterButton = () => {
    const FilterIcon = getIcon('Filter');
    const XIcon = getIcon('X');
    
    return (
      <button
        onClick={toggleFilterVisibility}
        className="md:hidden fixed bottom-5 right-5 z-20 bg-primary text-white w-12 h-12 rounded-full shadow-lg flex items-center justify-center"
      >
        {isFilterVisible ? <XIcon className="w-5 h-5" /> : <FilterIcon className="w-5 h-5" />}
      </button>
    );
  };
  
  return (
    <section className="container mx-auto px-4 py-16" id="products">
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold mb-4">Featured Products</h2>
        <p className="text-surface-600 dark:text-surface-400 max-w-2xl mx-auto">
          Browse our collection of unique handmade products, crafted with care by talented artisans.
        </p>
      </div>
      
      {/* Product controls (search and sort) */}
      <ProductControls 
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
        sortOption={sortOption}
        onSortChange={setSortOption}
      />
      
      <div className="flex flex-col md:flex-row gap-6">
        {/* Filter sidebar - Hidden on mobile by default */}
        <div 
          className={`${
            isFilterVisible ? 'fixed inset-0 z-40 bg-white dark:bg-surface-900 p-4 overflow-auto' : 'hidden'
          } md:block md:sticky md:top-20 md:w-72 md:static md:z-auto`}
        >
          <FilterSidebar 
            categories={categories}
            activeCategories={activeCategories}
            onCategoryChange={handleCategoryChange}
            priceRange={priceRange}
            onPriceRangeChange={handlePriceRangeChange}
            onReset={handleResetFilters}
          />
        </div>
        
        {/* Product grid */}
        <div className="flex-1">
          {filteredProducts.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              <AnimatePresence>
                {filteredProducts.map(product => (
                  <ProductCard 
                    key={product.id} 
                    product={product}
                    onAddToCart={handleAddToCart}
                  />
                ))}
              </AnimatePresence>
            </div>
          ) : (
            <EmptyState />
          )}
        </div>
      </div>
      
      {/* Mobile filter toggle button */}
      <FilterButton />
    </section>
  );
};

export default MainFeature;