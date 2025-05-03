import { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { motion } from 'framer-motion';
import { addItem } from '../features/cart/cartSlice';
import ReviewList from '../components/reviews/ReviewList';
import ReviewForm from '../components/reviews/ReviewForm';
import getIcon from '../utils/iconUtils';

// Sample products from MainFeature component (normally would be fetched from API or Redux)
const products = [
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
    reviewCount: 24,
    details: {
      dimensions: "3.5\" x 3\" x 4\"",
      capacity: "12 oz",
      materials: "Stoneware clay, food-safe glaze",
      careInstructions: "Dishwasher and microwave safe",
      origin: "Handmade in Portland, Oregon",
      artist: "Emma Wilson"
    },
    images: [
      "https://images.unsplash.com/photo-1514228742587-6b1558fcca3d?auto=format&q=80&w=600&h=600&fit=crop",
      "https://images.unsplash.com/photo-1577937927133-66ef06acdf18?auto=format&q=80&w=600&h=600&fit=crop",
      "https://images.unsplash.com/photo-1578083881344-16ad70d47720?auto=format&q=80&w=600&h=600&fit=crop"
    ]
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
    reviewCount: 18,
    details: {
      dimensions: "50\" x 60\"",
      materials: "100% organic cotton",
      careInstructions: "Machine wash cold, tumble dry low",
      origin: "Handwoven in Mexico",
      artist: "Rosa Mendez"
    },
    images: [
      "https://images.unsplash.com/photo-1580376259349-5f4b7db4c39f?auto=format&q=80&w=600&h=600&fit=crop",
      "https://images.unsplash.com/photo-1581539250439-c96689b516dd?auto=format&q=80&w=600&h=600&fit=crop",
      "https://images.unsplash.com/photo-1583847268964-b28dc8f51f92?auto=format&q=80&w=600&h=600&fit=crop"
    ]
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
    reviewCount: 32,
    details: {
      dimensions: "8\" diameter x 3\" height",
      materials: "Sustainable maple wood",
      careInstructions: "Hand wash only, oil occasionally with food-safe mineral oil",
      origin: "Handcrafted in Vermont",
      artist: "James Thomas"
    },
    images: [
      "https://images.unsplash.com/photo-1578903360376-88f9ab8c21c3?auto=format&q=80&w=600&h=600&fit=crop",
      "https://images.unsplash.com/photo-1635483644420-e3a0a8a51bd7?auto=format&q=80&w=600&h=600&fit=crop",
      "https://images.unsplash.com/photo-1633614907351-81e1c1ae7b74?auto=format&q=80&w=600&h=600&fit=crop"
    ]
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
    reviewCount: 15,
    details: {
      dimensions: "1.2\" length",
      materials: "Sterling silver",
      careInstructions: "Store in jewelry box, clean with silver polish as needed",
      origin: "Handcrafted in Bali",
      artist: "Nyoman Sukarta"
    },
    images: [
      "https://images.unsplash.com/photo-1630019852942-7a3592373495?auto=format&q=80&w=600&h=600&fit=crop",
      "https://images.unsplash.com/photo-1641676003885-4ecde8dbac61?auto=format&q=80&w=600&h=600&fit=crop",
      "https://images.unsplash.com/photo-1608042314453-ae338d80c427?auto=format&q=80&w=600&h=600&fit=crop"
    ]
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
    reviewCount: 11,
    details: {
      dimensions: "36\" x 36\"",
      materials: "100% mulberry silk",
      careInstructions: "Dry clean only",
      origin: "Hand-painted in France",
      artist: "Claire Dubois"
    },
    images: [
      "https://images.unsplash.com/photo-1561062262-5fecf17a3d5a?auto=format&q=80&w=600&h=600&fit=crop",
      "https://images.unsplash.com/photo-1543163906-2cbd7a77d3a4?auto=format&q=80&w=600&h=600&fit=crop",
      "https://images.unsplash.com/photo-1543076499-a6133cb932fd?auto=format&q=80&w=600&h=600&fit=crop"
    ]
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
    reviewCount: 29,
    details: {
      dimensions: "6\" diameter x 5\" height",
      materials: "Stoneware clay, matte glaze",
      careInstructions: "Wipe clean with damp cloth",
      origin: "Handmade in California",
      artist: "Daniel Kim"
    },
    images: [
      "https://images.unsplash.com/photo-1485955900006-10f4d324d411?auto=format&q=80&w=600&h=600&fit=crop",
      "https://images.unsplash.com/photo-1512428813834-c702c7702b78?auto=format&q=80&w=600&h=600&fit=crop",
      "https://images.unsplash.com/photo-1531896642854-7788fa48d986?auto=format&q=80&w=600&h=600&fit=crop"
    ]
  }
];

const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState(0);
  const [activeTab, setActiveTab] = useState('description');
  
  // Icons
  const StarIcon = getIcon('Star');
  const ShoppingCartIcon = getIcon('ShoppingCart');
  const ArrowLeftIcon = getIcon('ArrowLeft');
  const TruckIcon = getIcon('Truck');
  const PackageIcon = getIcon('Package');
  const InfoIcon = getIcon('Info');
  const ChatIcon = getIcon('MessageCircle');
  const HeartIcon = getIcon('Heart');
  const ShareIcon = getIcon('Share2');
  const PlusIcon = getIcon('Plus');
  const MinusIcon = getIcon('Minus');
  
  // Fetch product data
  useEffect(() => {
    setLoading(true);
    
    // In a real app, you would fetch from API
    // For demo, we're using the sample data
    const productId = parseInt(id);
    const foundProduct = products.find(p => p.id === productId);
    
    if (foundProduct) {
      setProduct(foundProduct);
      setLoading(false);
    } else {
      toast.error('Product not found');
      navigate('/');
    }
  }, [id, navigate]);
  
  // Handle quantity change
  const handleQuantityChange = (action) => {
    if (action === 'increase') {
      setQuantity(prev => prev + 1);
    } else if (action === 'decrease' && quantity > 1) {
      setQuantity(prev => prev - 1);
    }
  };
  
  // Add to cart handler
  const handleAddToCart = () => {
    if (product && product.inStock) {
      // Create cart item with quantity
      const cartItem = {
        ...product,
        quantity
      };
      
      dispatch(addItem(cartItem));
      
      toast.success(`${product.name} added to cart!`, {
        position: "bottom-right",
        autoClose: 2000
      });
    }
  };
  
  if (loading) {
    return (
      <div className="container mx-auto px-4 py-16 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }
  
  if (!product) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <h2 className="text-2xl font-bold mb-4">Product Not Found</h2>
        <p className="mb-6">The product you're looking for doesn't exist or has been removed.</p>
        <Link to="/" className="btn btn-primary">
          Return to Home
        </Link>
      </div>
    );
  }
  
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="container mx-auto px-4 py-8"
    >
      {/* Breadcrumb */}
      <nav className="flex mb-8 text-sm">
        <Link to="/" className="text-surface-500 hover:text-primary">Home</Link>
        <span className="mx-2 text-surface-400">/</span>
        <Link to="/#products" className="text-surface-500 hover:text-primary">{product.category}</Link>
        <span className="mx-2 text-surface-400">/</span>
        <span className="text-surface-800 dark:text-surface-200">{product.name}</span>
      </nav>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-16">
        {/* Product Images */}
        <div>
          <div className="mb-4 rounded-xl overflow-hidden border border-surface-200 dark:border-surface-700">
            <img 
              src={product.images[selectedImage]} 
              alt={product.name} 
              className="w-full h-auto aspect-square object-cover"
            />
          </div>
          
          <div className="flex gap-2 overflow-x-auto pb-2">
            {product.images.map((image, index) => (
              <button
                key={index}
                onClick={() => setSelectedImage(index)}
                className={`flex-shrink-0 w-20 h-20 rounded-md overflow-hidden border-2 ${
                  selectedImage === index 
                    ? 'border-primary' 
                    : 'border-surface-200 dark:border-surface-700'
                }`}
              >
                <img 
                  src={image} 
                  alt={`${product.name} ${index + 1}`} 
                  className="w-full h-full object-cover"
                />
              </button>
            ))}
          </div>
        </div>
        
        {/* Product Info */}
        <div>
          {/* Product tags */}
          <div className="flex gap-2 mb-4">
            {product.featured && (
              <span className="bg-accent text-white text-xs px-2 py-1 rounded-full">
                Featured
              </span>
            )}
            {!product.inStock && (
              <span className="bg-surface-700 text-white text-xs px-2 py-1 rounded-full">
                Out of Stock
              </span>
            )}
            <span className="bg-surface-200 dark:bg-surface-700 text-surface-700 dark:text-surface-300 text-xs px-2 py-1 rounded-full">
              {product.category}
            </span>
          </div>
          
          {/* Product name and price */}
          <h1 className="text-3xl font-bold mb-2">{product.name}</h1>
          
          {/* Rating */}
          <div className="flex items-center mb-4">
            <div className="flex text-yellow-400 mr-2">
              {[1, 2, 3, 4, 5].map((star) => (
                <StarIcon 
                  key={star} 
                  className="w-5 h-5" 
                  fill={star <= Math.round(product.rating) ? "currentColor" : "none"} 
                />
              ))}
            </div>
            <span className="text-sm font-medium">{product.rating}</span>
            <span className="text-surface-500 dark:text-surface-400 text-sm mx-1">
              ({product.reviewCount} reviews)
            </span>
            <a href="#reviews" className="text-sm text-primary hover:underline">
              See all reviews
            </a>
          </div>
          
          {/* Price */}
          <div className="mb-6">
            <span className="text-3xl font-bold text-primary dark:text-primary-light">
              ${product.price.toFixed(2)}
            </span>
            {product.price > 50 && (
              <span className="ml-2 text-sm text-green-600 dark:text-green-400">
                Free shipping
              </span>
            )}
          </div>
          
          {/* Short description */}
          <p className="text-surface-600 dark:text-surface-300 mb-8">
            {product.description}
          </p>
          
          {/* Add to cart */}
          <div className="mb-8">
            <div className="flex items-center gap-4 mb-4">
              {/* Quantity selector */}
              <div className="flex items-center border border-surface-300 dark:border-surface-600 rounded-lg">
                <button 
                  onClick={() => handleQuantityChange('decrease')}
                  disabled={quantity <= 1}
                  className={`p-2 ${
                    quantity <= 1 
                      ? 'text-surface-400 cursor-not-allowed' 
                      : 'text-surface-700 dark:text-surface-300'
                  }`}
                >
                  <MinusIcon className="w-5 h-5" />
                </button>
                <span className="px-4 py-2 text-center min-w-[40px]">{quantity}</span>
                <button 
                  onClick={() => handleQuantityChange('increase')}
                  className="p-2 text-surface-700 dark:text-surface-300"
                >
                  <PlusIcon className="w-5 h-5" />
                </button>
              </div>
              
              {/* Only show stock status for in-stock items */}
              {product.inStock && (
                <span className="text-green-600 dark:text-green-400 text-sm">
                  In Stock
                </span>
              )}
            </div>
            
            <div className="flex gap-3">
              <button
                onClick={handleAddToCart}
                disabled={!product.inStock}
                className={`btn ${
                  product.inStock ? 'btn-primary' : 'bg-surface-300 cursor-not-allowed'
                } flex-1 py-3 flex items-center justify-center gap-2`}
              >
                <ShoppingCartIcon className="w-5 h-5" />
                <span>{product.inStock ? 'Add to Cart' : 'Sold Out'}</span>
              </button>
              
              <button className="btn btn-outline p-3">
                <HeartIcon className="w-5 h-5" />
              </button>
              
              <button className="btn btn-outline p-3">
                <ShareIcon className="w-5 h-5" />
              </button>
            </div>
          </div>
          
          {/* Shipping info */}
          <div className="p-4 bg-surface-50 dark:bg-surface-800 rounded-lg mb-6">
            <div className="flex items-start gap-3 mb-3">
              <TruckIcon className="w-5 h-5 text-primary mt-0.5" />
              <div>
                <h4 className="font-medium">Shipping</h4>
                <p className="text-sm text-surface-600 dark:text-surface-400">
                  {product.price > 50 
                    ? 'Free shipping on orders over $50' 
                    : 'Standard shipping: $5.99'}
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <PackageIcon className="w-5 h-5 text-primary mt-0.5" />
              <div>
                <h4 className="font-medium">Returns</h4>
                <p className="text-sm text-surface-600 dark:text-surface-400">
                  Easy 30-day returns
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Product tabs */}
      <div className="mb-16">
        <div className="border-b border-surface-200 dark:border-surface-700 mb-6">
          <div className="flex overflow-x-auto">
            <button
              onClick={() => setActiveTab('description')}
              className={`px-6 py-3 font-medium text-sm whitespace-nowrap ${
                activeTab === 'description'
                  ? 'border-b-2 border-primary text-primary dark:text-primary-light'
                  : 'text-surface-600 dark:text-surface-400'
              }`}
            >
              <InfoIcon className="w-4 h-4 inline mr-2" />
              Details
            </button>
            <button
              onClick={() => setActiveTab('reviews')}
              className={`px-6 py-3 font-medium text-sm whitespace-nowrap ${
                activeTab === 'reviews'
                  ? 'border-b-2 border-primary text-primary dark:text-primary-light'
                  : 'text-surface-600 dark:text-surface-400'
              }`}
            >
              <ChatIcon className="w-4 h-4 inline mr-2" />
              Reviews ({product.reviewCount})
            </button>
          </div>
        </div>
        
        {/* Tab content */}
        <div>
          {activeTab === 'description' && (
            <div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <h3 className="text-xl font-bold mb-4">Product Details</h3>
                  <div className="space-y-4">
                    <p className="text-surface-700 dark:text-surface-300">
                      {product.description}
                    </p>
                    
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <h4 className="font-medium text-surface-900 dark:text-white">Dimensions</h4>
                        <p className="text-surface-600 dark:text-surface-400">
                          {product.details.dimensions}
                        </p>
                      </div>
                      
                      {product.details.capacity && (
                        <div>
                          <h4 className="font-medium text-surface-900 dark:text-white">Capacity</h4>
                          <p className="text-surface-600 dark:text-surface-400">
                            {product.details.capacity}
                          </p>
                        </div>
                      )}
                      
                      <div>
                        <h4 className="font-medium text-surface-900 dark:text-white">Materials</h4>
                        <p className="text-surface-600 dark:text-surface-400">
                          {product.details.materials}
                        </p>
                      </div>
                      
                      <div>
                        <h4 className="font-medium text-surface-900 dark:text-white">Care Instructions</h4>
                        <p className="text-surface-600 dark:text-surface-400">
                          {product.details.careInstructions}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div>
                  <h3 className="text-xl font-bold mb-4">Artisan Story</h3>
                  <div className="bg-surface-50 dark:bg-surface-800 rounded-lg p-6">
                    <div className="flex items-center mb-4">
                      <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary mr-3">
                        <span className="text-lg font-bold">{product.details.artist.charAt(0)}</span>
                      </div>
                      <div>
                        <h4 className="font-medium">{product.details.artist}</h4>
                        <p className="text-sm text-surface-600 dark:text-surface-400">
                          Artisan from {product.details.origin.split("in ")[1]}
                        </p>
                      </div>
                    </div>
                    <p className="text-surface-700 dark:text-surface-300 mb-4">
                      Each {product.name.toLowerCase()} is carefully handcrafted in small batches to 
                      ensure the highest quality. The artisan brings years of expertise and
                      tradition to create unique pieces that showcase authentic craftsmanship.
                    </p>
                    <p className="text-surface-600 dark:text-surface-400 text-sm">
                      Made in {product.details.origin.split("in ")[1]}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}
          
          {activeTab === 'reviews' && (
            <div id="reviews" className="space-y-8">
              <ReviewList productId={product.id} />
              <ReviewForm productId={product.id} productName={product.name} />
            </div>
          )}
        </div>
      </div>
      
      {/* Back button */}
      <div className="mb-16">
        <Link to="/#products" className="inline-flex items-center text-primary hover:underline">
          <ArrowLeftIcon className="w-4 h-4 mr-2" />
          <span>Back to Products</span>
        </Link>
      </div>
    </motion.div>
  );
};

export default ProductDetail;