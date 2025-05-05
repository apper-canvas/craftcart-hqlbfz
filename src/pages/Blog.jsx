import { useState, useEffect } from 'react';
import { Clock, User, ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react';
import { format, parseISO } from 'date-fns';
import { toast } from 'react-toastify';

const Blog = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const postsPerPage = 6;

  useEffect(() => {
    // Simulate fetching blog posts
    const fetchPosts = async () => {
      setLoading(true);
      
      try {
        // In a real app, you would fetch from an API
        setTimeout(() => {
          const mockPosts = [
            {
              id: 1,
              title: "The Art of Ceramic Glazing: Traditional Techniques in a Modern World",
              excerpt: "Explore how artisans are preserving ancient glazing techniques while adapting to contemporary design aesthetics and sustainable practices.",
              content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus lacinia odio vitae vestibulum vestibulum...",
              image: "https://source.unsplash.com/random/800x600/?ceramics",
              date: "2023-05-12T09:00:00Z",
              author: "Elena Rodriguez",
              category: "Ceramics"
            },
            {
              id: 2,
              title: "Sustainable Sourcing: The Journey of Ethically Harvested Wood",
              excerpt: "Follow the journey of responsibly harvested wood from forest to finished product, and learn how sustainable forestry is changing the craft industry.",
              content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus lacinia odio vitae vestibulum vestibulum...",
              image: "https://source.unsplash.com/random/800x600/?woodwork",
              date: "2023-06-03T12:30:00Z",
              author: "Thomas Berg",
              category: "Sustainability"
            },
            {
              id: 3,
              title: "The Revival of Natural Dyes in Modern Textile Art",
              excerpt: "How artisans around the world are rediscovering traditional plant-based dyes and applying them to contemporary textile designs.",
              content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus lacinia odio vitae vestibulum vestibulum...",
              image: "https://source.unsplash.com/random/800x600/?textile+dye",
              date: "2023-04-28T15:15:00Z",
              author: "Maya Johnson",
              category: "Textiles"
            },
            {
              id: 4,
              title: "Artisan Spotlight: The Metal Sculptors of West Africa",
              excerpt: "Meet the talented metalworkers preserving centuries-old traditions while creating innovative contemporary pieces that captivate global markets.",
              content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus lacinia odio vitae vestibulum vestibulum...",
              image: "https://source.unsplash.com/random/800x600/?metal+sculpture",
              date: "2023-05-22T14:00:00Z",
              author: "Amara Okafor",
              category: "Artisan Stories"
            },
            {
              id: 5,
              title: "From Studio to Market: Navigating the Business Side of Craft",
              excerpt: "Practical advice for artisans looking to turn their passion into a sustainable business without compromising on quality or values.",
              content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus lacinia odio vitae vestibulum vestibulum...",
              image: "https://source.unsplash.com/random/800x600/?craft+market",
              date: "2023-06-14T10:45:00Z",
              author: "Sarah Martinez",
              category: "Business"
            },
            {
              id: 6,
              title: "The Psychology of Handmade: Why We Value Artisanal Products",
              excerpt: "Exploring the emotional and psychological connections we form with handcrafted items in an increasingly mass-produced world.",
              content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus lacinia odio vitae vestibulum vestibulum...",
              image: "https://source.unsplash.com/random/800x600/?handmade",
              date: "2023-04-16T08:30:00Z",
              author: "Dr. James Wilson",
              category: "Culture"
            },
            {
              id: 7,
              title: "Traditional Craft in the Digital Age: How Technology is Changing Artisanship",
              excerpt: "From 3D printing to online marketplaces, discover how craftspeople are embracing technology while honoring traditional methods.",
              content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus lacinia odio vitae vestibulum vestibulum...",
              image: "https://source.unsplash.com/random/800x600/?digital+craft",
              date: "2023-06-10T11:20:00Z",
              author: "Raj Patel",
              category: "Technology"
            },
            {
              id: 8,
              title: "The Global Language of Pattern: Textile Motifs Across Cultures",
              excerpt: "How similar patterns and symbols appear in textiles from different cultures, telling a story of human connection across geography and time.",
              content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus lacinia odio vitae vestibulum vestibulum...",
              image: "https://source.unsplash.com/random/800x600/?textile+pattern",
              date: "2023-05-05T09:15:00Z",
              author: "Luisa Fernandez",
              category: "Design"
            },
            {
              id: 9,
              title: "Preserving Indigenous Craft Traditions in the Modern Marketplace",
              excerpt: "How indigenous communities are protecting their cultural heritage while adapting traditional crafts for contemporary consumers.",
              content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus lacinia odio vitae vestibulum vestibulum...",
              image: "https://source.unsplash.com/random/800x600/?indigenous+craft",
              date: "2023-04-22T13:40:00Z",
              author: "Nina Blackwolf",
              category: "Cultural Heritage"
            },
            {
              id: 10,
              title: "The Slow Craft Movement: Finding Joy in Process Over Product",
              excerpt: "Exploring how the slowness and mindfulness of traditional craft practices offer an antidote to modern life's pace and pressures.",
              content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus lacinia odio vitae vestibulum vestibulum...",
              image: "https://source.unsplash.com/random/800x600/?slow+craft",
              date: "2023-06-18T16:00:00Z",
              author: "Olivia Chen",
              category: "Mindfulness"
            }
          ];
          
          setPosts(mockPosts);
          setLoading(false);
        }, 800);
      } catch (error) {
        console.error('Error fetching blog posts:', error);
        setLoading(false);
        toast.error('Failed to load blog posts. Please try again.');
      }
    };

    fetchPosts();
  }, []);

  // Get current posts
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = posts.slice(indexOfFirstPost, indexOfLastPost);

  // Calculate total pages
  const totalPages = Math.ceil(posts.length / postsPerPage);

  // Change page
  const goToPage = (pageNumber) => {
    if (pageNumber > 0 && pageNumber <= totalPages) {
      setCurrentPage(pageNumber);
      window.scrollTo(0, 0);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-12 text-center">
        <h1 className="text-3xl md:text-4xl font-bold mb-4 dark:text-white">CraftCart Blog</h1>
        <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
          Explore stories about artisanal crafts, sustainable practices, and the talented creators behind our products.
        </p>
      </div>

      {/* Featured post */}
      {!loading && posts.length > 0 && (
        <div className="mb-12">
          <div className="bg-white dark:bg-surface-800 rounded-lg overflow-hidden shadow-lg">
            <div className="md:flex">
              <div className="md:w-1/2">
                <img 
                  src={posts[0].image} 
                  alt={posts[0].title} 
                  className="w-full h-64 md:h-full object-cover"
                />
              </div>
              <div className="md:w-1/2 p-6 md:p-8 flex flex-col justify-center">
                <div className="flex items-center mb-3 text-sm">
                  <span className="bg-primary/10 text-primary px-2 py-1 rounded">
                    {posts[0].category}
                  </span>
                  <span className="mx-2 text-gray-400">•</span>
                  <span className="text-gray-500 dark:text-gray-400 flex items-center">
                    <Clock size={14} className="mr-1" />
                    {format(parseISO(posts[0].date), 'MMM d, yyyy')}
                  </span>
                </div>
                <h2 className="text-2xl md:text-3xl font-bold mb-3 dark:text-white">
                  {posts[0].title}
                </h2>
                <p className="text-gray-600 dark:text-gray-300 mb-4">
                  {posts[0].excerpt}
                </p>
                <div className="flex items-center justify-between">
                  <div className="flex items-center text-gray-600 dark:text-gray-400 text-sm">
                    <User size={14} className="mr-1" />
                    {posts[0].author}
                  </div>
                  <button 
                    className="flex items-center text-primary font-medium hover:text-primary-dark transition-colors"
                    onClick={() => toast.info("Full blog post functionality coming soon!")}
                  >
                    Read More
                    <ArrowRight size={16} className="ml-1" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Blog posts grid */}
      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1, 2, 3, 4, 5, 6].map((item) => (
            <div key={item} className="animate-pulse">
              <div className="bg-gray-200 dark:bg-gray-700 h-48 rounded-t-lg"></div>
              <div className="bg-white dark:bg-surface-800 p-4 rounded-b-lg">
                <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded mb-2"></div>
                <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded mb-2"></div>
                <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded mb-2"></div>
                <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-1/2"></div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {currentPosts.slice(currentPage === 1 ? 1 : 0).map((post) => (
              <div 
                key={post.id} 
                className="bg-white dark:bg-surface-800 rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow"
              >
                <img 
                  src={post.image} 
                  alt={post.title} 
                  className="w-full h-48 object-cover"
                />
                <div className="p-5">
                  <div className="flex items-center mb-2 text-xs">
                    <span className="bg-primary/10 text-primary px-2 py-0.5 rounded">
                      {post.category}
                    </span>
                    <span className="mx-2 text-gray-400">•</span>
                    <span className="text-gray-500 dark:text-gray-400 flex items-center">
                      <Clock size={12} className="mr-1" />
                      {format(parseISO(post.date), 'MMM d, yyyy')}
                    </span>
                  </div>
                  <h3 className="font-bold text-lg mb-2 dark:text-white line-clamp-2">
                    {post.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300 mb-4 text-sm line-clamp-3">
                    {post.excerpt}
                  </p>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center text-gray-600 dark:text-gray-400 text-xs">
                      <User size={12} className="mr-1" />
                      {post.author}
                    </div>
                    <button 
                      className="flex items-center text-primary text-sm font-medium hover:text-primary-dark transition-colors"
                      onClick={() => toast.info("Full blog post functionality coming soon!")}
                    >
                      Read More
                      <ArrowRight size={14} className="ml-1" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex justify-center mt-12">
              <div className="flex items-center space-x-1">
                <button
                  onClick={() => goToPage(currentPage - 1)}
                  disabled={currentPage === 1}
                  className={`px-3 py-2 rounded-md ${
                    currentPage === 1 
                      ? 'text-gray-400 cursor-not-allowed' 
                      : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-surface-700'
                  }`}
                  aria-label="Previous page"
                >
                  <ChevronLeft size={20} />
                </button>
                
                {[...Array(totalPages)].map((_, i) => (
                  <button
                    key={i}
                    onClick={() => goToPage(i + 1)}
                    className={`px-3 py-1 rounded-md ${
                      currentPage === i + 1
                        ? 'bg-primary text-white'
                        : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-surface-700'
                    }`}
                  >
                    {i + 1}
                  </button>
                ))}
                
                <button
                  onClick={() => goToPage(currentPage + 1)}
                  disabled={currentPage === totalPages}
                  className={`px-3 py-2 rounded-md ${
                    currentPage === totalPages 
                      ? 'text-gray-400 cursor-not-allowed' 
                      : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-surface-700'
                  }`}
                  aria-label="Next page"
                >
                  <ChevronRight size={20} />
                </button>
              </div>
            </div>
          )}
        </>
      )}

      {/* Newsletter signup */}
      <div className="mt-16 bg-primary/10 dark:bg-surface-800 rounded-lg p-8 text-center">
        <h2 className="text-2xl font-bold mb-4 dark:text-white">Subscribe to Our Newsletter</h2>
        <p className="text-gray-600 dark:text-gray-400 mb-6 max-w-2xl mx-auto">
          Stay updated with the latest artisan stories, craft techniques, and product releases.
          We send thoughtful content, never spam.
        </p>
        <div className="flex max-w-md mx-auto">
          <input 
            type="email" 
            placeholder="Your email address" 
            className="flex-1 px-4 py-2 rounded-l-lg border border-gray-300 dark:border-gray-600 dark:bg-surface-700 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary"
          />
          <button 
            className="bg-primary text-white px-4 py-2 rounded-r-lg hover:bg-primary-dark transition-colors"
            onClick={() => toast.success("Thank you for subscribing to our newsletter!")}
          >
            Subscribe
          </button>
        </div>
      </div>
    </div>
  );
};

export default Blog;