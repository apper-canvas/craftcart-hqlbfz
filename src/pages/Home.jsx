import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { toast } from 'react-toastify';
import getIcon from '../utils/iconUtils';
import MainFeature from '../components/MainFeature';

// Hero banner component
const Hero = () => {
  return (
    <section className="relative overflow-hidden bg-surface-100 dark:bg-surface-800 mb-20">
      <div className="absolute inset-0 bg-gradient-to-br from-primary-light/10 to-transparent dark:from-primary-light/5 z-0"></div>
      
      <div className="container mx-auto px-4 py-16 md:py-24 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">
              Discover <span className="text-primary dark:text-primary-light">Unique</span> Handcrafted Treasures
            </h1>
            <p className="text-lg md:text-xl text-surface-700 dark:text-surface-300 mb-8 max-w-lg">
              Supporting local artisans and bringing their beautiful creations directly to your doorstep.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <a href="#products" className="btn btn-primary px-8 py-3 text-center sm:text-left">
                Shop Now
              </a>
              <a href="#about" className="btn btn-outline px-8 py-3 text-center sm:text-left">
                Learn More
              </a>
            </div>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="hidden lg:block"
          >
            <img 
              src="https://images.unsplash.com/photo-1591375425618-1ea38fc0d8c7?auto=format&q=80&w=800&h=600&fit=crop" 
              alt="Handcrafted pottery" 
              className="rounded-2xl shadow-lg object-cover w-full h-[500px] transform -rotate-3"
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
};

// Category card component
const CategoryCard = ({ title, imageUrl, count }) => {
  const handleClick = () => {
    toast.info(`Viewing ${title} category`, {
      position: "bottom-right",
      autoClose: 2000
    });
  };
  
  return (
    <motion.div 
      whileHover={{ y: -8 }}
      className="card card-hover relative group cursor-pointer"
      onClick={handleClick}
    >
      <div className="aspect-square overflow-hidden rounded-t-xl">
        <img 
          src={imageUrl} 
          alt={title} 
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
      </div>
      <div className="p-4 flex justify-between items-center">
        <div>
          <h3 className="font-medium text-lg">{title}</h3>
          <p className="text-surface-500 dark:text-surface-400 text-sm">{count} items</p>
        </div>
        <div className="w-8 h-8 rounded-full bg-primary-light/10 dark:bg-primary-light/20 flex items-center justify-center group-hover:bg-primary group-hover:text-white transition-all">
          {(() => {
            const ChevronRightIcon = getIcon('ChevronRight');
            return <ChevronRightIcon className="w-4 h-4" />;
          })()}
        </div>
      </div>
    </motion.div>
  );
};

// Categories section
const Categories = () => {
  const categories = [
    { id: 1, title: "Ceramics", count: 24, imageUrl: "https://images.unsplash.com/photo-1610701596061-2ecf227e85b2?auto=format&q=80&w=400&h=400&fit=crop" },
    { id: 2, title: "Jewelry", count: 38, imageUrl: "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?auto=format&q=80&w=400&h=400&fit=crop" },
    { id: 3, title: "Textiles", count: 15, imageUrl: "https://images.unsplash.com/photo-1606722590853-cc71a9b52885?auto=format&q=80&w=400&h=400&fit=crop" },
    { id: 4, title: "Woodwork", count: 21, imageUrl: "https://images.unsplash.com/photo-1667827228289-64642d8394b4?auto=format&q=80&w=400&h=400&fit=crop" }
  ];
  
  return (
    <section className="container mx-auto px-4 py-16" id="categories">
      <h2 className="text-3xl font-bold mb-12 text-center">Shop by Categories</h2>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {categories.map(category => (
          <CategoryCard 
            key={category.id}
            title={category.title}
            count={category.count}
            imageUrl={category.imageUrl}
          />
        ))}
      </div>
    </section>
  );
};

// Feature card component
const FeatureCard = ({ icon, title, description }) => {
  const IconComponent = getIcon(icon);
  
  return (
    <div className="p-6 bg-white dark:bg-surface-800 rounded-2xl border border-surface-200 dark:border-surface-700 shadow-sm">
      <div className="w-14 h-14 rounded-xl bg-primary-light/10 dark:bg-primary-light/20 flex items-center justify-center mb-5">
        <IconComponent className="w-7 h-7 text-primary dark:text-primary-light" />
      </div>
      <h3 className="text-xl font-semibold mb-3">{title}</h3>
      <p className="text-surface-600 dark:text-surface-400">{description}</p>
    </div>
  );
};

// Features section
const Features = () => {
  const features = [
    {
      icon: "Package",
      title: "Carefully Packaged",
      description: "Each item is thoughtfully wrapped to ensure it arrives safely at your doorstep."
    },
    {
      icon: "Globe",
      title: "Ethically Sourced",
      description: "We work directly with artisans to ensure fair compensation for their craft."
    },
    {
      icon: "Truck",
      title: "Fast Shipping",
      description: "Free shipping on orders over $50 with delivery within 3-5 business days."
    }
  ];
  
  return (
    <section className="container mx-auto px-4 py-16" id="features">
      <h2 className="text-3xl font-bold mb-12 text-center">Why Shop With Us</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {features.map((feature, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            viewport={{ once: true }}
          >
            <FeatureCard {...feature} />
          </motion.div>
        ))}
      </div>
    </section>
  );
};

// About section
const About = () => {
  return (
    <section className="bg-surface-100 dark:bg-surface-800 py-20" id="about">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="order-2 lg:order-1">
            <motion.img
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              src="https://images.unsplash.com/photo-1556740758-90de374c12ad?auto=format&q=80&w=600&h=500&fit=crop"
              alt="Artisan crafting"
              className="rounded-2xl shadow-lg w-full h-auto"
            />
          </div>
          
          <div className="order-1 lg:order-2">
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl font-bold mb-6">Our Story</h2>
              <p className="text-surface-700 dark:text-surface-300 mb-6">
                CraftCart was born from a passion for handmade crafts and a desire to support local artisans. We believe in the beauty of items made with care and attention to detail.
              </p>
              <p className="text-surface-700 dark:text-surface-300 mb-6">
                Our mission is to connect talented craftspeople with those who appreciate their work, creating a marketplace that values quality, creativity, and sustainability.
              </p>
              <p className="text-surface-700 dark:text-surface-300">
                Every purchase supports an independent artisan and helps preserve traditional crafting techniques while embracing innovation.
              </p>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

// Home page component
const Home = () => {
  return (
    <div>
      <Hero />
      <Categories />
      <MainFeature />
      <Features />
      <About />
    </div>
  );
};

export default Home;