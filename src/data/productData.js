// This file serves as a central repository for product data
// In a real application, this would be fetched from an API

const productData = [
  {
    id: 1,
    name: "Handcrafted Ceramic Mug",
    description: "A beautiful hand-thrown ceramic mug with a unique glaze finish.",
    price: 28.99,
    category: "Ceramics",
    image: "https://images.unsplash.com/photo-1574928329270-747efdd40959?auto=format&q=80&w=600&h=600&fit=crop",
    inStock: true,
    featured: true,
    rating: 4.8,
    reviewCount: 24,
    tags: ["mug", "cup", "drink", "coffee", "tea", "handmade", "kitchen"]
  },
  {
    id: 2,
    name: "Woven Cotton Throw Blanket",
    description: "Handwoven cotton throw blanket with a beautiful geometric pattern.",
    price: 79.99,
    category: "Textiles",
    image: "https://images.unsplash.com/photo-1616486788371-62d930495c44?auto=format&q=80&w=600&h=600&fit=crop",
    inStock: true,
    featured: true,
    rating: 4.7,
    reviewCount: 18,
    tags: ["blanket", "throw", "bedding", "cotton", "handwoven", "home"]
  },
  {
    id: 3,
    name: "Hand-Carved Wooden Bowl",
    description: "Expertly carved wooden bowl made from sustainable maple.",
    price: 45.00,
    category: "Woodwork",
    image: "https://images.unsplash.com/photo-1635983238126-f5475d9b5d4e?auto=format&q=80&w=600&h=600&fit=crop",
    inStock: true,
    featured: false,
    rating: 4.9,
    reviewCount: 32,
    tags: ["bowl", "wood", "maple", "kitchen", "serving", "handcarved"]
  },
  {
    id: 4,
    name: "Sterling Silver Leaf Earrings",
    description: "Delicate sterling silver earrings inspired by natural leaf shapes.",
    price: 38.50,
    category: "Jewelry",
    image: "https://images.unsplash.com/photo-1575863438850-fb1c06a38885?auto=format&q=80&w=600&h=600&fit=crop",
    inStock: false,
    featured: false,
    rating: 4.6,
    reviewCount: 15,
    tags: ["earrings", "silver", "sterling", "leaf", "nature", "accessory"]
  },
  {
    id: 5,
    name: "Hand-Painted Silk Scarf",
    description: "Vibrant hand-painted silk scarf with abstract design.",
    price: 110.00,
    category: "Textiles",
    image: "https://images.unsplash.com/photo-1550639525-c97d455acf70?auto=format&q=80&w=600&h=600&fit=crop",
    inStock: true,
    featured: true,
    rating: 5.0,
    reviewCount: 11,
    tags: ["scarf", "silk", "painted", "abstract", "accessory", "wearable art"]
  },
  {
    id: 6,
    name: "Stoneware Plant Pot",
    description: "Handcrafted stoneware plant pot with a textured finish.",
    price: 42.00,
    category: "Ceramics",
    image: "https://images.unsplash.com/photo-1622398925373-3f91b1e275f5?auto=format&q=80&w=600&h=600&fit=crop",
    inStock: true,
    featured: false,
    rating: 4.5,
    reviewCount: 29,
    tags: ["pot", "planter", "plant", "garden", "stoneware", "ceramic"]
  },
  {
    id: 7,
    name: "Macrame Wall Hanging",
    description: "Intricate macrame wall hanging with natural cotton rope.",
    price: 65.00,
    category: "Home Decor",
    image: "https://images.unsplash.com/photo-1596207498818-c84d54bf9b91?auto=format&q=80&w=600&h=600&fit=crop",
    inStock: true,
    featured: false,
    rating: 4.7,
    reviewCount: 22,
    tags: ["macrame", "wall hanging", "decor", "boho", "handmade", "cotton"]
  },
  {
    id: 8,
    name: "Handmade Leather Journal",
    description: "Rustic leather-bound journal with handmade paper pages.",
    price: 34.99,
    category: "Stationery",
    image: "https://images.unsplash.com/photo-1518555492-a9a2bc482deb?auto=format&q=80&w=600&h=600&fit=crop",
    inStock: true,
    featured: true,
    rating: 4.8,
    reviewCount: 36,
    tags: ["journal", "notebook", "leather", "writing", "stationery", "handmade"]
  },
  {
    id: 9,
    name: "Artisanal Soap Set",
    description: "Set of 3 handcrafted soaps made with natural ingredients and essential oils.",
    price: 22.50,
    category: "Bath & Body",
    image: "https://images.unsplash.com/photo-1600857544200-b2f468e39ed6?auto=format&q=80&w=600&h=600&fit=crop",
    inStock: true,
    featured: false,
    rating: 4.9,
    reviewCount: 41,
    tags: ["soap", "natural", "handmade", "essential oils", "bath", "self-care"]
  },
  {
    id: 10,
    name: "Ceramic Berry Bowl",
    description: "Perforated ceramic bowl perfect for washing and serving berries.",
    price: 36.00,
    category: "Ceramics",
    image: "https://images.unsplash.com/photo-1578873375969-d60aad647bb9?auto=format&q=80&w=600&h=600&fit=crop",
    inStock: true,
    featured: false,
    rating: 4.6,
    reviewCount: 19,
    tags: ["bowl", "berry", "colander", "ceramic", "kitchen", "fruit"]
  },
  {
    id: 11,
    name: "Hand-Knit Wool Beanie",
    description: "Cozy hand-knit beanie made from 100% merino wool.",
    price: 29.99,
    category: "Apparel",
    image: "https://images.unsplash.com/photo-1576871337622-98d48d1cf531?auto=format&q=80&w=600&h=600&fit=crop",
    inStock: true,
    featured: false,
    rating: 4.7,
    reviewCount: 27,
    tags: ["beanie", "hat", "wool", "winter", "knit", "handmade", "apparel"]
  },
  {
    id: 12,
    name: "Wooden Cutting Board",
    description: "Handcrafted maple cutting board with walnut inlay.",
    price: 59.00,
    category: "Woodwork",
    image: "https://images.unsplash.com/photo-1606906946562-3eb9b474125a?auto=format&q=80&w=600&h=600&fit=crop",
    inStock: true,
    featured: true,
    rating: 4.9,
    reviewCount: 33,
    tags: ["cutting board", "wood", "kitchen", "handmade", "maple", "walnut"]
  }
];

// Get all available product categories
export const getCategories = () => {
  return [...new Set(productData.map(product => product.category))];
};

// Get all products
export const getAllProducts = () => {
  return productData;
};

// Get a single product by ID
export const getProductById = (id) => {
  return productData.find(product => product.id === parseInt(id));
};

// Search function - returns products that match the query with relevance score
export const searchProducts = (query, filters = {}) => {
  if (!query && Object.keys(filters).length === 0) {
    return productData;
  }
  
  const normalizedQuery = query.toLowerCase().trim();
  
  return productData
    .filter(product => {
      // Apply category filters if specified
      if (filters.categories && filters.categories.length > 0) {
        if (!filters.categories.includes(product.category)) {
          return false;
        }
      }
      
      // Apply price filters if specified
      if (filters.priceRange) {
        const [min, max] = filters.priceRange;
        if (product.price < min || (max > 0 && product.price > max)) {
          return false;
        }
      }
      
      // If no query, return all products that match the filters
      if (!normalizedQuery) {
        return true;
      }
      
      // Check if product matches search query
      const nameMatch = product.name.toLowerCase().includes(normalizedQuery);
      const descMatch = product.description.toLowerCase().includes(normalizedQuery);
      const categoryMatch = product.category.toLowerCase().includes(normalizedQuery);
      const tagMatch = product.tags && product.tags.some(tag => 
        tag.toLowerCase().includes(normalizedQuery)
      );
      
      return nameMatch || descMatch || categoryMatch || tagMatch;
    })
    .map(product => {
      // Calculate relevance score for sorting
      let relevanceScore = 0;
      
      if (!normalizedQuery) {
        relevanceScore = 1; // Default score when no query
      } else {
        // Give higher weight to name matches
        if (product.name.toLowerCase().includes(normalizedQuery)) {
          relevanceScore += 5;
          
          // Exact matches get even higher score
          if (product.name.toLowerCase() === normalizedQuery) {
            relevanceScore += 5;
          }
        }
        
        // Description matches
        if (product.description.toLowerCase().includes(normalizedQuery)) {
          relevanceScore += 3;
        }
        
        // Category matches
        if (product.category.toLowerCase().includes(normalizedQuery)) {
          relevanceScore += 2;
        }
        
        // Tag matches
        if (product.tags) {
          product.tags.forEach(tag => {
            if (tag.toLowerCase().includes(normalizedQuery)) {
              relevanceScore += 1;
            }
            // Exact tag match
            if (tag.toLowerCase() === normalizedQuery) {
              relevanceScore += 2;
            }
          });
        }
      }
      
      return {
        ...product,
        relevanceScore
      };
    })
    .sort((a, b) => {
      // Sort by relevance score (descending)
      return b.relevanceScore - a.relevanceScore;
    });
};

export default productData;