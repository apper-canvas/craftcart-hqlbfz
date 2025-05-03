import { Link } from 'react-router-dom';
import getIcon from '../../utils/iconUtils';

const Footer = () => {
  // Icons
  const FacebookIcon = getIcon('Facebook');
  const InstagramIcon = getIcon('Instagram');
  const TwitterIcon = getIcon('Twitter');
  const PinterestIcon = getIcon('Pin');
  const SendIcon = getIcon('Send');
  
  return (
    <footer className="bg-surface-100 dark:bg-surface-800 pt-12 pb-6">
      <div className="container mx-auto px-4">
        {/* Main footer content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {/* Company Info */}
          <div>
            <Link to="/" className="flex items-center font-bold text-xl mb-4">
              <span className="text-primary">Craft</span>
              <span className="dark:text-white">Cart</span>
            </Link>
            <p className="text-surface-600 dark:text-surface-400 mb-4">
              Discover unique handcrafted items made with love by skilled artisans around the world.
            </p>
            <div className="flex space-x-4">
              <a href="https://facebook.com" className="text-surface-600 dark:text-surface-400 hover:text-primary dark:hover:text-primary-light" aria-label="Facebook">
                <FacebookIcon className="w-5 h-5" />
              </a>
              <a href="https://instagram.com" className="text-surface-600 dark:text-surface-400 hover:text-primary dark:hover:text-primary-light" aria-label="Instagram">
                <InstagramIcon className="w-5 h-5" />
              </a>
              <a href="https://twitter.com" className="text-surface-600 dark:text-surface-400 hover:text-primary dark:hover:text-primary-light" aria-label="Twitter">
                <TwitterIcon className="w-5 h-5" />
              </a>
              <a href="https://pinterest.com" className="text-surface-600 dark:text-surface-400 hover:text-primary dark:hover:text-primary-light" aria-label="Pinterest">
                <PinterestIcon className="w-5 h-5" />
              </a>
            </div>
          </div>
          
          {/* Shop Links */}
          <div>
            <h3 className="font-bold text-lg mb-4 dark:text-white">Shop</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/category/ceramics" className="text-surface-600 dark:text-surface-400 hover:text-primary dark:hover:text-primary-light">
                  Ceramics
                </Link>
              </li>
              <li>
                <Link to="/category/textiles" className="text-surface-600 dark:text-surface-400 hover:text-primary dark:hover:text-primary-light">
                  Textiles
                </Link>
              </li>
              <li>
                <Link to="/category/woodwork" className="text-surface-600 dark:text-surface-400 hover:text-primary dark:hover:text-primary-light">
                  Woodwork
                </Link>
              </li>
              <li>
                <Link to="/category/jewelry" className="text-surface-600 dark:text-surface-400 hover:text-primary dark:hover:text-primary-light">
                  Jewelry
                </Link>
              </li>
              <li>
                <Link to="/new-arrivals" className="text-surface-600 dark:text-surface-400 hover:text-primary dark:hover:text-primary-light">
                  New Arrivals
                </Link>
              </li>
            </ul>
          </div>
          
          {/* Company Links */}
          <div>
            <h3 className="font-bold text-lg mb-4 dark:text-white">Company</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/about" className="text-surface-600 dark:text-surface-400 hover:text-primary dark:hover:text-primary-light">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/artisans" className="text-surface-600 dark:text-surface-400 hover:text-primary dark:hover:text-primary-light">
                  Our Artisans
                </Link>
              </li>
              <li>
                <Link to="/sustainability" className="text-surface-600 dark:text-surface-400 hover:text-primary dark:hover:text-primary-light">
                  Sustainability
                </Link>
              </li>
              <li>
                <Link to="/blog" className="text-surface-600 dark:text-surface-400 hover:text-primary dark:hover:text-primary-light">
                  Blog
                </Link>
              </li>
              <li>
                <Link to="/careers" className="text-surface-600 dark:text-surface-400 hover:text-primary dark:hover:text-primary-light">
                  Careers
                </Link>
              </li>
            </ul>
          </div>
          
          {/* Newsletter */}
          <div>
            <h3 className="font-bold text-lg mb-4 dark:text-white">Stay Updated</h3>
            <p className="text-surface-600 dark:text-surface-400 mb-4">
              Subscribe to our newsletter for the latest product updates, promotions, and artisan stories.
            </p>
            <form className="flex">
              <input 
                type="email" 
                placeholder="Your email" 
                className="input flex-1 rounded-r-none"
                aria-label="Email address"
              />
              <button 
                type="submit" 
                className="btn btn-primary rounded-l-none"
                aria-label="Subscribe"
              >
                <SendIcon className="w-5 h-5" />
              </button>
            </form>
          </div>
        </div>
        
        {/* Bottom footer */}
        <div className="pt-6 border-t border-surface-200 dark:border-surface-700 flex flex-col md:flex-row justify-between items-center">
          <p className="text-surface-600 dark:text-surface-400 text-sm">
            &copy; {new Date().getFullYear()} CraftCart. All rights reserved.
          </p>
          <div className="flex space-x-4 mt-4 md:mt-0">
            <Link to="/terms" className="text-surface-600 dark:text-surface-400 hover:text-primary dark:hover:text-primary-light text-sm">
              Terms of Service
            </Link>
            <Link to="/privacy" className="text-surface-600 dark:text-surface-400 hover:text-primary dark:hover:text-primary-light text-sm">
              Privacy Policy
            </Link>
            <Link to="/shipping" className="text-surface-600 dark:text-surface-400 hover:text-primary dark:hover:text-primary-light text-sm">
              Shipping Policy
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;