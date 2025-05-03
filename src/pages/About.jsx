import { motion } from 'framer-motion';

const About = () => {
  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="container mx-auto px-4 py-8"
    >
      <h1 className="text-3xl font-bold text-center mb-8">About CraftCart</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
        <div>
          <img 
            src="https://images.unsplash.com/photo-1521493959102-bdd6677fdd81?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1500&q=80" 
            alt="Artisan crafting handmade products" 
            className="rounded-lg shadow-lg w-full h-auto object-cover"
          />
        </div>
        
        <div className="flex flex-col justify-center">
          <h2 className="text-2xl font-semibold mb-4">Our Story</h2>
          <p className="text-gray-700 mb-4">
            CraftCart was founded in 2018 with a simple mission: to connect skilled artisans with people who appreciate high-quality handmade goods. What started as a small passion project has grown into a thriving marketplace for unique crafts and artisanal products.
          </p>
          <p className="text-gray-700">
            We believe in the beauty of handcrafted items, the stories they tell, and the connection they create between makers and buyers. Every item in our collection is thoughtfully made with attention to detail and quality.
          </p>
        </div>
      </div>
      
      <div className="bg-gray-50 p-8 rounded-lg shadow mb-12">
        <h2 className="text-2xl font-semibold mb-6 text-center">Our Mission</h2>
        <p className="text-gray-700 text-center max-w-3xl mx-auto">
          To provide a platform where artisans can showcase their craft and customers can discover unique, high-quality products while supporting independent creators and sustainable production practices.
        </p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-xl font-semibold mb-3">Handcrafted Quality</h3>
          <p className="text-gray-700">
            Every product in our marketplace is handcrafted with care and attention to detail, ensuring the highest quality for our customers.
          </p>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-xl font-semibold mb-3">Supporting Artisans</h3>
          <p className="text-gray-700">
            We're dedicated to providing fair compensation to our artisan partners and helping them reach a global audience with their unique creations.
          </p>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-xl font-semibold mb-3">Sustainable Practices</h3>
          <p className="text-gray-700">
            We prioritize environmentally friendly materials and production methods, minimizing our ecological footprint.
          </p>
        </div>
      </div>
      
      <div className="text-center">
        <h2 className="text-2xl font-semibold mb-6">Meet Our Team</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="mb-6">
            <img 
              src="https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80" 
              alt="Team Member - Sarah Johnson" 
              className="w-32 h-32 rounded-full mx-auto mb-4 object-cover"
            />
            <h3 className="font-semibold">Sarah Johnson</h3>
            <p className="text-gray-600">Founder & CEO</p>
          </div>
          
          <div className="mb-6">
            <img 
              src="https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80" 
              alt="Team Member - Michael Chen" 
              className="w-32 h-32 rounded-full mx-auto mb-4 object-cover"
            />
            <h3 className="font-semibold">Michael Chen</h3>
            <p className="text-gray-600">Creative Director</p>
          </div>
          
          <div className="mb-6">
            <img 
              src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80" 
              alt="Team Member - Elena Rodriguez" 
              className="w-32 h-32 rounded-full mx-auto mb-4 object-cover"
            />
            <h3 className="font-semibold">Elena Rodriguez</h3>
            <p className="text-gray-600">Artisan Relations</p>
          </div>
          
          <div className="mb-6">
            <img 
              src="https://images.unsplash.com/photo-1531384441138-2736e62e0919?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80" 
              alt="Team Member - David Kumar" 
              className="w-32 h-32 rounded-full mx-auto mb-4 object-cover"
            />
            <h3 className="font-semibold">David Kumar</h3>
            <p className="text-gray-600">Customer Experience</p>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default About;