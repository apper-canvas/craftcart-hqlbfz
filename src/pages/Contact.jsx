import { useState } from 'react';
import { motion } from 'framer-motion';
import { toast } from 'react-toastify';
import { Mail, Phone, MapPin, Clock } from 'lucide-react';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: value
    }));
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    setTimeout(() => {
      toast.success('Message sent successfully! We will get back to you soon.');
      setFormData({
        name: '',
        email: '',
        subject: '',
        message: ''
      });
      setIsSubmitting(false);
    }, 1500);
  };
  
  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="container mx-auto px-4 py-8"
    >
      <h1 className="text-3xl font-bold text-center mb-8">Contact Us</h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-12">
        <div>
          <h2 className="text-2xl font-semibold mb-6">Get In Touch</h2>
          <p className="text-gray-700 mb-8">
            Have questions about our products, shipping, or want to collaborate? We'd love to hear from you! Fill out the form and our team will get back to you within 24 hours.
          </p>
          
          <div className="space-y-6">
            <div className="flex items-start">
              <div className="mr-4 mt-1">
                <MapPin className="w-5 h-5 text-indigo-600" />
              </div>
              <div>
                <h3 className="font-semibold">Our Location</h3>
                <p className="text-gray-600">123 Craft Avenue, Artisan District</p>
                <p className="text-gray-600">Handmade City, HC 10001</p>
              </div>
            </div>
            
            <div className="flex items-start">
              <div className="mr-4 mt-1">
                <Phone className="w-5 h-5 text-indigo-600" />
              </div>
              <div>
                <h3 className="font-semibold">Phone</h3>
                <p className="text-gray-600">+1 (555) 123-4567</p>
                <p className="text-gray-600">Mon-Fri, 9am-6pm EST</p>
              </div>
            </div>
            
            <div className="flex items-start">
              <div className="mr-4 mt-1">
                <Mail className="w-5 h-5 text-indigo-600" />
              </div>
              <div>
                <h3 className="font-semibold">Email</h3>
                <p className="text-gray-600">info@craftcart.com</p>
                <p className="text-gray-600">support@craftcart.com</p>
              </div>
            </div>
            
            <div className="flex items-start">
              <div className="mr-4 mt-1">
                <Clock className="w-5 h-5 text-indigo-600" />
              </div>
              <div>
                <h3 className="font-semibold">Business Hours</h3>
                <p className="text-gray-600">Monday - Friday: 9am - 6pm</p>
                <p className="text-gray-600">Saturday: 10am - 4pm</p>
                <p className="text-gray-600">Sunday: Closed</p>
              </div>
            </div>
          </div>
        </div>
        
        <div>
          <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md">
            <div className="mb-4">
              <label htmlFor="name" className="block text-gray-700 font-medium mb-2">
                Your Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                placeholder="John Doe"
              />
            </div>
            
            <div className="mb-4">
              <label htmlFor="email" className="block text-gray-700 font-medium mb-2">
                Email Address
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                placeholder="john@example.com"
              />
            </div>
            
            <div className="mb-4">
              <label htmlFor="subject" className="block text-gray-700 font-medium mb-2">
                Subject
              </label>
              <input
                type="text"
                id="subject"
                name="subject"
                value={formData.subject}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                placeholder="Order Inquiry"
              />
            </div>
            
            <div className="mb-6">
              <label htmlFor="message" className="block text-gray-700 font-medium mb-2">
                Your Message
              </label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                required
                rows="5"
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                placeholder="How can we help you?"
              ></textarea>
            </div>
            
            <button
              type="submit"
              disabled={isSubmitting}
              className={`w-full py-2 px-4 rounded-md font-medium text-white bg-primary hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 transition-colors ${isSubmitting ? 'opacity-70 cursor-not-allowed' : ''}`}
            >
              {isSubmitting ? 'Sending...' : 'Send Message'}
            </button>
          </form>
        </div>
      </div>
      
      <div className="bg-gray-50 p-8 rounded-lg shadow-md">
        <h2 className="text-2xl font-semibold mb-6 text-center">Frequently Asked Questions</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h3 className="font-semibold mb-2">What are your shipping policies?</h3>
            <p className="text-gray-700">
              We offer free shipping on orders over $50. Standard shipping typically takes 3-5 business days, while express shipping options are available at checkout.
            </p>
          </div>
          
          <div>
            <h3 className="font-semibold mb-2">Can I return or exchange items?</h3>
            <p className="text-gray-700">
              Yes, we accept returns within 30 days of delivery. Items must be unused and in original packaging. Custom orders are non-returnable.
            </p>
          </div>
          
          <div>
            <h3 className="font-semibold mb-2">Do you ship internationally?</h3>
            <p className="text-gray-700">
              Yes, we ship to most countries worldwide. International shipping rates and delivery times vary by location.
            </p>
          </div>
          
          <div>
            <h3 className="font-semibold mb-2">How can I track my order?</h3>
            <p className="text-gray-700">
              Once your order ships, you'll receive a confirmation email with tracking information. You can also track your order in your account dashboard.
            </p>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default Contact;