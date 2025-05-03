import { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import getIcon from '../utils/iconUtils';

const NotFound = () => {
  const navigate = useNavigate();
  const HomeIcon = getIcon('Home');
  const ArrowLeftIcon = getIcon('ArrowLeft');
  
  // Auto-redirect after 10 seconds
  useEffect(() => {
    const redirectTimer = setTimeout(() => {
      navigate('/');
    }, 10000);
    
    return () => clearTimeout(redirectTimer);
  }, [navigate]);
  
  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center px-4 py-16">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center max-w-lg"
      >
        <div className="mb-8">
          <motion.div
            animate={{ 
              scale: [1, 1.1, 1],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              repeatType: "reverse"
            }}
            className="mx-auto w-32 h-32 bg-surface-100 dark:bg-surface-800 rounded-full flex items-center justify-center"
          >
            <span className="text-6xl">🧶</span>
          </motion.div>
        </div>
        
        <h1 className="text-4xl md:text-5xl font-bold mb-4">Page Not Found</h1>
        
        <p className="text-surface-600 dark:text-surface-400 text-lg mb-8">
          Sorry, we couldn't find the page you were looking for. The item might have been sold or moved to a different section.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            to="/"
            className="btn btn-primary flex items-center justify-center gap-2"
          >
            <HomeIcon className="w-5 h-5" />
            <span>Go Home</span>
          </Link>
          
          <button
            onClick={() => navigate(-1)}
            className="btn btn-outline flex items-center justify-center gap-2"
          >
            <ArrowLeftIcon className="w-5 h-5" />
            <span>Go Back</span>
          </button>
        </div>
        
        <p className="mt-8 text-surface-500 dark:text-surface-500 text-sm">
          You'll be automatically redirected to the homepage in a few seconds...
        </p>
      </motion.div>
    </div>
  );
};

export default NotFound;