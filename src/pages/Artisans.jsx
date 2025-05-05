import { useState, useEffect } from 'react';
import { MapPin, Link as LinkIcon } from 'lucide-react';
import { toast } from 'react-toastify';

const Artisans = () => {
  const [artisans, setArtisans] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState('All');

  useEffect(() => {
    // Simulate fetching artisans data
    const fetchArtisans = async () => {
      setLoading(true);
      
      try {
        // In a real app, you would fetch from an API
        setTimeout(() => {
          const mockArtisans = [
            {
              id: 1,
              name: "Elena Rodriguez",
              specialty: "Ceramics",
              location: "Barcelona, Spain",
              bio: "Elena creates handcrafted ceramics inspired by Mediterranean traditions and modern minimalism. Each piece tells a story of cultural heritage and craftsmanship.",
              image: "https://source.unsplash.com/random/300x300/?potter",
              portfolio: "#",
              featured: true
            },
            {
              id: 2,
              name: "Akio Tanaka",
              specialty: "Woodwork",
              location: "Kyoto, Japan",
              bio: "Akio specializes in traditional Japanese woodworking techniques passed down through generations. His pieces honor the natural beauty of wood with minimal intervention.",
              image: "https://source.unsplash.com/random/300x300/?woodworker",
              portfolio: "#",
              featured: true
            },
            {
              id: 3,
              name: "Maya Johnson",
              specialty: "Textiles",
              location: "Portland, USA",
              bio: "Maya's handwoven textiles incorporate sustainable materials and natural dyes. Her work celebrates slow craft and ethical production methods.",
              image: "https://source.unsplash.com/random/300x300/?weaver",
              portfolio: "#",
              featured: false
            },
            {
              id: 4,
              name: "Priya Sharma",
              specialty: "Jewelry",
              location: "Jaipur, India",
              bio: "Priya combines traditional Indian metalwork techniques with contemporary designs. Her jewelry celebrates cultural heritage through modern expression.",
              image: "https://source.unsplash.com/random/300x300/?jeweler",
              portfolio: "#",
              featured: true
            },
            {
              id: 5,
              name: "Omar Hassan",
              specialty: "Ceramics",
              location: "Marrakech, Morocco",
              bio: "Omar creates ceramic pieces inspired by Moroccan geometric patterns and Islamic art. His work bridges traditional craftsmanship with modern functionality.",
              image: "https://source.unsplash.com/random/300x300/?craftsman",
              portfolio: "#",
              featured: false
            },
            {
              id: 6,
              name: "Luisa Fernandez",
              specialty: "Textiles",
              location: "Mexico City, Mexico",
              bio: "Luisa's textile work is rooted in Mexican indigenous weaving traditions. She collaborates with local communities to preserve cultural techniques.",
              image: "https://source.unsplash.com/random/300x300/?textile+artist",
              portfolio: "#",
              featured: false
            },
            {
              id: 7,
              name: "Thomas Berg",
              specialty: "Woodwork",
              location: "Copenhagen, Denmark",
              bio: "Thomas creates functional wooden objects that embody Scandinavian design principles. His work prioritizes simplicity, functionality, and sustainable materials.",
              image: "https://source.unsplash.com/random/300x300/?carpenter",
              portfolio: "#",
              featured: false
            },
            {
              id: 8,
              name: "Amara Okafor",
              specialty: "Jewelry",
              location: "Lagos, Nigeria",
              bio: "Amara's jewelry designs blend traditional West African symbols with contemporary aesthetics. Her pieces tell stories of heritage and identity.",
              image: "https://source.unsplash.com/random/300x300/?jewelry+maker",
              portfolio: "#",
              featured: false
            }
          ];
          
          setArtisans(mockArtisans);
          setLoading(false);
        }, 800);
      } catch (error) {
        console.error('Error fetching artisans:', error);
        setLoading(false);
        toast.error('Failed to load artisans. Please try again.');
      }
    };

    fetchArtisans();
  }, []);

  const filteredArtisans = selectedCategory === 'All' 
    ? artisans 
    : selectedCategory === 'Featured'
      ? artisans.filter(artisan => artisan.featured)
      : artisans.filter(artisan => artisan.specialty === selectedCategory);

  const categories = ['All', 'Featured', 'Ceramics', 'Woodwork', 'Textiles', 'Jewelry'];

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-12 text-center">
        <h1 className="text-3xl md:text-4xl font-bold mb-4 dark:text-white">Our Artisans</h1>
        <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
          Meet the talented creators behind our products. Each artisan brings unique skills, cultural heritage, 
          and passion to their craft, creating pieces that tell stories and preserve traditions.
        </p>
      </div>

      {/* Category filter */}
      <div className="flex flex-wrap justify-center gap-2 mb-8">
        {categories.map(category => (
          <button
            key={category}
            onClick={() => setSelectedCategory(category)}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
              selectedCategory === category 
                ? 'bg-primary text-white' 
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200 dark:bg-surface-700 dark:text-gray-300 dark:hover:bg-surface-600'
            }`}
          >
            {category}
          </button>
        ))}
      </div>

      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[1, 2, 3, 4].map((item) => (
            <div key={item} className="animate-pulse">
              <div className="bg-gray-200 dark:bg-gray-700 h-64 rounded-lg mb-2"></div>
              <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded mb-2"></div>
              <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-1/2"></div>
            </div>
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredArtisans.map((artisan) => (
            <div 
              key={artisan.id} 
              className="bg-white dark:bg-surface-800 rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow"
            >
              <div className="relative">
                <img 
                  src={artisan.image} 
                  alt={artisan.name} 
                  className="w-full h-64 object-cover"
                />
                {artisan.featured && (
                  <span className="absolute top-2 left-2 bg-primary text-white text-xs font-semibold px-2.5 py-0.5 rounded">
                    Featured
                  </span>
                )}
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black to-transparent py-3 px-4">
                  <h3 className="font-bold text-white text-lg">{artisan.name}</h3>
                  <div className="flex items-center text-white text-sm">
                    <span className="bg-primary/80 rounded px-2 py-0.5">{artisan.specialty}</span>
                  </div>
                </div>
              </div>
              
              <div className="p-4">
                <div className="flex items-center text-gray-500 dark:text-gray-400 mb-3 text-sm">
                  <MapPin size={16} className="mr-1" />
                  {artisan.location}
                </div>
                
                <p className="text-gray-600 dark:text-gray-300 mb-4 text-sm">
                  {artisan.bio}
                </p>
                
                <a 
                  href={artisan.portfolio}
                  className="flex items-center gap-1 text-primary hover:text-primary-dark transition-colors text-sm font-medium"
                  onClick={(e) => {
                    e.preventDefault();
                    toast.info("Portfolio links will be available soon!");
                  }}
                >
                  <LinkIcon size={16} />
                  View Portfolio
                </a>
              </div>
            </div>
          ))}
        </div>
      )}
      
      {!loading && filteredArtisans.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-600 dark:text-gray-400">No artisans found in this category.</p>
        </div>
      )}
      
      <div className="mt-16 bg-surface-50 dark:bg-surface-800 rounded-lg p-6 lg:p-8 text-center">
        <h2 className="text-2xl font-bold mb-4 dark:text-white">Become a CraftCart Artisan</h2>
        <p className="text-gray-600 dark:text-gray-400 mb-6 max-w-2xl mx-auto">
          Are you a skilled craftsperson? Join our community of artisans and share your creations with our global audience.
          We value fair trade practices and sustainable craftsmanship.
        </p>
        <button 
          className="bg-primary text-white px-6 py-3 rounded-lg font-medium hover:bg-primary-dark transition-colors"
          onClick={() => toast.info("Artisan applications will open soon!")}
        >
          Apply to Join
        </button>
      </div>
    </div>
  );
};

export default Artisans;