import { Leaf, Recycle, Droplet, Wind } from 'lucide-react';

const Sustainability = () => {
  const initiatives = [
    {
      title: "Sustainable Materials",
      description: "We prioritize materials that are renewable, recyclable, or biodegradable. Our artisans work with organic cotton, responsibly harvested wood, recycled metals, and natural dyes.",
      icon: <Leaf className="w-8 h-8 text-green-500" />,
    },
    {
      title: "Waste Reduction",
      description: "We're committed to minimizing waste throughout our supply chain. Many of our artisans practice upcycling, transforming discarded materials into beautiful new products.",
      icon: <Recycle className="w-8 h-8 text-green-500" />,
    },
    {
      title: "Water Conservation",
      description: "Water is precious. Our textile producers use water-efficient processes and natural dyeing methods that require less water and create less pollution than conventional techniques.",
      icon: <Droplet className="w-8 h-8 text-green-500" />,
    },
    {
      title: "Carbon Footprint",
      description: "We're working to reduce our carbon footprint by partnering with local artisans, using climate-friendly shipping options, and offsetting emissions through reforestation projects.",
      icon: <Wind className="w-8 h-8 text-green-500" />,
    },
  ];

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Hero section */}
      <div className="relative rounded-xl overflow-hidden mb-16">
        <img 
          src="https://source.unsplash.com/random/1200x400/?sustainability" 
          alt="Sustainability" 
          className="w-full h-64 md:h-80 object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-primary/80 to-transparent flex items-center">
          <div className="ml-6 md:ml-12 max-w-md">
            <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">Our Commitment to Sustainability</h1>
            <p className="text-white/90">
              Crafting a better future through ethical practices and environmental stewardship.
            </p>
          </div>
        </div>
      </div>

      {/* Mission statement */}
      <div className="text-center max-w-3xl mx-auto mb-16">
        <h2 className="text-2xl font-bold mb-4 dark:text-white">Our Mission</h2>
        <p className="text-gray-700 dark:text-gray-300 text-lg mb-6">
          At CraftCart, sustainability isn't just a buzzword—it's at the core of everything we do. 
          We believe that beautiful craftsmanship and environmental responsibility go hand in hand.
        </p>
        <p className="text-gray-600 dark:text-gray-400">
          We partner with artisans who share our values, promoting traditional techniques that have 
          minimal environmental impact while preserving cultural heritage and supporting local economies.
        </p>
      </div>

      {/* Key initiatives */}
      <div className="mb-16">
        <h2 className="text-2xl font-bold mb-8 text-center dark:text-white">Our Sustainability Initiatives</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {initiatives.map((initiative, index) => (
            <div key={index} className="bg-white dark:bg-surface-800 p-6 rounded-lg shadow-md flex gap-4">
              <div className="mt-1">
                {initiative.icon}
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-2 dark:text-white">{initiative.title}</h3>
                <p className="text-gray-600 dark:text-gray-400">{initiative.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Certifications */}
      <div className="bg-surface-50 dark:bg-surface-800 rounded-lg p-8 mb-16">
        <h2 className="text-2xl font-bold mb-6 text-center dark:text-white">Our Certifications</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 justify-items-center">
          <div className="text-center">
            <div className="w-20 h-20 mx-auto bg-white dark:bg-surface-700 rounded-full flex items-center justify-center mb-3">
              <img 
                src="https://source.unsplash.com/random/100x100/?organic" 
                alt="Organic Certified" 
                className="w-12 h-12 object-contain"
              />
            </div>
            <p className="font-medium dark:text-white">Organic Certified</p>
          </div>
          <div className="text-center">
            <div className="w-20 h-20 mx-auto bg-white dark:bg-surface-700 rounded-full flex items-center justify-center mb-3">
              <img 
                src="https://source.unsplash.com/random/100x100/?fairtrade" 
                alt="Fair Trade" 
                className="w-12 h-12 object-contain"
              />
            </div>
            <p className="font-medium dark:text-white">Fair Trade</p>
          </div>
          <div className="text-center">
            <div className="w-20 h-20 mx-auto bg-white dark:bg-surface-700 rounded-full flex items-center justify-center mb-3">
              <img 
                src="https://source.unsplash.com/random/100x100/?carbon" 
                alt="Carbon Neutral" 
                className="w-12 h-12 object-contain"
              />
            </div>
            <p className="font-medium dark:text-white">Carbon Neutral</p>
          </div>
          <div className="text-center">
            <div className="w-20 h-20 mx-auto bg-white dark:bg-surface-700 rounded-full flex items-center justify-center mb-3">
              <img 
                src="https://source.unsplash.com/random/100x100/?plastic" 
                alt="Plastic-Free Packaging" 
                className="w-12 h-12 object-contain"
              />
            </div>
            <p className="font-medium dark:text-white">Plastic-Free Packaging</p>
          </div>
        </div>
      </div>

      {/* Impact statistics */}
      <div className="mb-16">
        <h2 className="text-2xl font-bold mb-8 text-center dark:text-white">Our Impact</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
          <div className="bg-white dark:bg-surface-800 p-6 rounded-lg shadow-md text-center">
            <div className="text-4xl font-bold text-primary mb-2">85%</div>
            <p className="text-gray-600 dark:text-gray-400">Products made from sustainable materials</p>
          </div>
          <div className="bg-white dark:bg-surface-800 p-6 rounded-lg shadow-md text-center">
            <div className="text-4xl font-bold text-primary mb-2">10k+</div>
            <p className="text-gray-600 dark:text-gray-400">Trees planted through reforestation efforts</p>
          </div>
          <div className="bg-white dark:bg-surface-800 p-6 rounded-lg shadow-md text-center">
            <div className="text-4xl font-bold text-primary mb-2">50%</div>
            <p className="text-gray-600 dark:text-gray-400">Reduction in packaging waste since 2020</p>
          </div>
          <div className="bg-white dark:bg-surface-800 p-6 rounded-lg shadow-md text-center">
            <div className="text-4xl font-bold text-primary mb-2">100%</div>
            <p className="text-gray-600 dark:text-gray-400">Carbon offset for shipping emissions</p>
          </div>
        </div>
      </div>

      {/* Call to action */}
      <div className="bg-primary rounded-lg p-8 text-center text-white">
        <h2 className="text-2xl font-bold mb-4">Join Our Sustainability Journey</h2>
        <p className="max-w-2xl mx-auto mb-6">
          When you choose CraftCart products, you're supporting sustainable practices, traditional craftsmanship, 
          and the livelihoods of artisans worldwide. Together, we can make a difference.
        </p>
        <button className="bg-white text-primary px-6 py-3 rounded-lg font-medium hover:bg-gray-100 transition-colors">
          Shop Sustainable Products
        </button>
      </div>
    </div>
  );
};

export default Sustainability;