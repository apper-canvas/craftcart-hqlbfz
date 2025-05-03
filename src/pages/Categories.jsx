import { useState } from 'react';
import { motion } from 'framer-motion';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import getIcon from '../utils/iconUtils';

const CategoryCard = ({ title, imageUrl, count }) => {
  const navigate = useNavigate();
  
  const handleClick = () => {
    toast.success(`Browsing ${title} category`, {
      position: "bottom-right",
      autoClose: 2000
    });
    
    // Navigate to home page with category filter
    // In a real app, this could link to a category-specific page
    navigate(`/?category=${title.toLowerCase()}`);
  };
  
  return (
    <motion.div 
      whileHover={{ y: -8 }}
      className="card card-hover relative group cursor-pointer overflow-hidden rounded-xl shadow-md border border-surface-200 dark:border-surface-700"
      onClick={handleClick}
    >
      <div className="aspect-square overflow-hidden">
        <img 
          src={imageUrl} 
          alt={title} 
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
      </div>
      <div className="p-6 bg-white dark:bg-surface-800">
        <h3 className="font-semibold text-xl mb-2">{title}</h3>
        <p className="text-surface-500 dark:text-surface-400 mb-3">{count} items</p>
        <div className="flex items-center justify-between">
          <span className="text-primary dark:text-primary-light font-medium">Browse Collection</span>
          <div className="w-8 h-8 rounded-full bg-primary-light/10 dark:bg-primary-light/20 flex items-center justify-center group-hover:bg-primary group-hover:text-white transition-all">
            {(() => {
              const ChevronRightIcon = getIcon('ChevronRight');
              return <ChevronRightIcon className="w-4 h-4" />;
            })()}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

const Categories = () => {
  // Extended categories list with more options
  const categories = [
    { id: 1, title: "Ceramics", count: 24, imageUrl: "https://images.unsplash.com/photo-1610701596061-2ecf227e85b2?auto=format&q=80&w=400&h=400&fit=crop" },
    { id: 2, title: "Jewelry", count: 38, imageUrl: "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?auto=format&q=80&w=400&h=400&fit=crop" },
    { id: 3, title: "Textiles", count: 15, imageUrl: "https://images.unsplash.com/photo-1606722590853-cc71a9b52885?auto=format&q=80&w=400&h=400&fit=crop" },
    { id: 4, title: "Woodwork", count: 21, imageUrl: "https://images.unsplash.com/photo-1667827228289-64642d8394b4?auto=format&q=80&w=400&h=400&fit=crop" },
    { id: 5, title: "Paper Crafts", count: 17, imageUrl: "https://images.unsplash.com/photo-1597484662317-9bd7bdda2907?auto=format&q=80&w=400&h=400&fit=crop" },
    { id: 6, title: "Candles", count: 12, imageUrl: "https://images.unsplash.com/photo-1603006905768-23af66cb8890?auto=format&q=80&w=400&h=400&fit=crop" },
    { id: 7, title: "Home Decor", count: 29, imageUrl: "https://images.unsplash.com/photo-1583847268964-b28dc8f51f92?auto=format&q=80&w=400&h=400&fit=crop" },
    { id: 8, title: "Glass Art", count: 9, imageUrl: "https://images.unsplash.com/photo-1576550013559-96dde7fce633?auto=format&q=80&w=400&h=400&fit=crop" }
  ];
  
  return (
    <div className="py-12 px-4">
      <div className="container mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <motion.h1 
            className="text-4xl font-bold mb-4"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            Browse Categories
          </motion.h1>
          <motion.p 
            className="text-lg text-surface-600 dark:text-surface-400 max-w-2xl mx-auto"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            Explore our handcrafted collections made by talented artisans from around the world.
          </motion.p>
        </div>
        
        {/* Categories Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {categories.map((category, index) => (
            <motion.div
              key={category.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <CategoryCard 
                title={category.title}
                count={category.count}
                imageUrl={category.imageUrl}
              />
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Categories;