import { useState } from 'react';
import { Building, Users, MapPin, DollarSign, Briefcase, ArrowRight } from 'lucide-react';
import { toast } from 'react-toastify';

const Careers = () => {
  const [department, setDepartment] = useState('All');

  const jobs = [
    {
      id: 1,
      title: "Senior Product Designer",
      department: "Design",
      location: "Remote",
      type: "Full-time",
      salary: "$85,000 - $110,000",
      description: "We're looking for a Senior Product Designer to help shape the future of our digital marketplace and create exceptional user experiences for artisans and customers alike."
    },
    {
      id: 2,
      title: "Artisan Relations Manager",
      department: "Community",
      location: "New York, NY",
      type: "Full-time",
      salary: "$65,000 - $80,000",
      description: "Join our team as an Artisan Relations Manager to build and nurture relationships with our global network of artisans, ensuring they have the support and resources they need to succeed."
    },
    {
      id: 3,
      title: "Frontend Developer",
      department: "Engineering",
      location: "Remote",
      type: "Full-time",
      salary: "$90,000 - $120,000",
      description: "We're seeking a skilled Frontend Developer to help build and improve our e-commerce platform, focusing on creating intuitive and accessible user interfaces."
    },
    {
      id: 4,
      title: "Marketing Coordinator",
      department: "Marketing",
      location: "Portland, OR",
      type: "Full-time",
      salary: "$55,000 - $70,000",
      description: "Join our marketing team to help tell the stories of our artisans and products, creating compelling content and campaigns that connect with our audience."
    },
    {
      id: 5,
      title: "Supply Chain Specialist",
      department: "Operations",
      location: "Chicago, IL",
      type: "Full-time",
      salary: "$60,000 - $75,000",
      description: "Help us maintain and improve our sustainable supply chain, working directly with artisans and logistics partners to ensure efficient and ethical operations."
    },
    {
      id: 6,
      title: "Customer Experience Associate",
      department: "Customer Support",
      location: "Remote",
      type: "Part-time",
      salary: "$22 - $25/hour",
      description: "Provide exceptional support to our customers, helping them find the perfect artisanal products and resolving any issues they may encounter along the way."
    },
    {
      id: 7,
      title: "Product Photographer",
      department: "Design",
      location: "Los Angeles, CA",
      type: "Contract",
      salary: "$40 - $50/hour",
      description: "We're looking for a talented photographer to capture the beauty and craftsmanship of our artisanal products in a way that showcases their unique qualities."
    },
    {
      id: 8,
      title: "Sustainability Director",
      department: "Executive",
      location: "San Francisco, CA",
      type: "Full-time",
      salary: "$120,000 - $150,000",
      description: "Lead our sustainability initiatives, developing strategies to reduce our environmental impact and support ethical production practices across our global network."
    },
  ];

  const departments = ['All', 'Design', 'Engineering', 'Marketing', 'Operations', 'Community', 'Customer Support', 'Executive'];
  
  const filteredJobs = department === 'All' ? jobs : jobs.filter(job => job.department === department);
  
  const values = [
    {
      icon: <Users className="w-12 h-12 text-primary mb-4" />,
      title: "People First",
      description: "We prioritize the wellbeing of our team members, artisans, and customers in everything we do."
    },
    {
      icon: <Building className="w-12 h-12 text-primary mb-4" />,
      title: "Craft & Quality",
      description: "We value excellent craftsmanship in our products and in our work, paying attention to every detail."
    },
    {
      icon: <Briefcase className="w-12 h-12 text-primary mb-4" />,
      title: "Purpose-Driven",
      description: "We're committed to making a positive impact through ethical business practices and sustainable operations."
    }
  ];

  const handleApply = (jobTitle) => {
    toast.info(`Application functionality for "${jobTitle}" coming soon!`);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Hero section */}
      <div className="text-center mb-16">
        <h1 className="text-3xl md:text-4xl font-bold mb-4 dark:text-white">Join Our Team</h1>
        <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto mb-6">
          At CraftCart, we're building a platform that connects talented artisans with conscious consumers around the world.
          Join us in our mission to preserve traditional craftsmanship while creating sustainable livelihoods.
        </p>
        <a href="#open-positions" className="inline-block bg-primary text-white px-6 py-3 rounded-lg font-medium hover:bg-primary-dark transition-colors">
          View Open Positions
        </a>
      </div>

      {/* Our values */}
      <div className="mb-16">
        <h2 className="text-2xl font-bold mb-8 text-center dark:text-white">Our Values</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {values.map((value, index) => (
            <div key={index} className="bg-white dark:bg-surface-800 p-6 rounded-lg shadow-md text-center">
              {value.icon}
              <h3 className="text-xl font-semibold mb-2 dark:text-white">{value.title}</h3>
              <p className="text-gray-600 dark:text-gray-400">{value.description}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Benefits */}
      <div className="bg-surface-50 dark:bg-surface-800 rounded-lg p-8 mb-16">
        <h2 className="text-2xl font-bold mb-8 text-center dark:text-white">Why Work With Us</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="flex items-start">
            <div className="bg-primary/10 p-2 rounded-full mr-4">
              <DollarSign className="w-5 h-5 text-primary" />
            </div>
            <div>
              <h3 className="font-semibold mb-1 dark:text-white">Competitive Compensation</h3>
              <p className="text-gray-600 dark:text-gray-400 text-sm">
                Fair pay, equity options, and performance bonuses to recognize your contributions.
              </p>
            </div>
          </div>
          <div className="flex items-start">
            <div className="bg-primary/10 p-2 rounded-full mr-4">
              <Users className="w-5 h-5 text-primary" />
            </div>
            <div>
              <h3 className="font-semibold mb-1 dark:text-white">Flexible Work Environment</h3>
              <p className="text-gray-600 dark:text-gray-400 text-sm">
                Remote-friendly policies and flexible hours to support work-life balance.
              </p>
            </div>
          </div>
          <div className="flex items-start">
            <div className="bg-primary/10 p-2 rounded-full mr-4">
              <Briefcase className="w-5 h-5 text-primary" />
            </div>
            <div>
              <h3 className="font-semibold mb-1 dark:text-white">Professional Development</h3>
              <p className="text-gray-600 dark:text-gray-400 text-sm">
                Learning stipends, workshop opportunities, and career growth pathways.
              </p>
            </div>
          </div>
          <div className="flex items-start">
            <div className="bg-primary/10 p-2 rounded-full mr-4">
              <Building className="w-5 h-5 text-primary" />
            </div>
            <div>
              <h3 className="font-semibold mb-1 dark:text-white">Mission-Driven Work</h3>
              <p className="text-gray-600 dark:text-gray-400 text-sm">
                Make a tangible impact supporting artisans and sustainable practices worldwide.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Open positions */}
      <div id="open-positions" className="mb-16 scroll-mt-24">
        <h2 className="text-2xl font-bold mb-8 text-center dark:text-white">Open Positions</h2>
        
        {/* Department filter */}
        <div className="flex flex-wrap justify-center gap-2 mb-8">
          {departments.map(dept => (
            <button
              key={dept}
              onClick={() => setDepartment(dept)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                department === dept 
                  ? 'bg-primary text-white' 
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200 dark:bg-surface-700 dark:text-gray-300 dark:hover:bg-surface-600'
              }`}
            >
              {dept}
            </button>
          ))}
        </div>
        
        <div className="space-y-4">
          {filteredJobs.map((job) => (
            <div 
              key={job.id} 
              className="bg-white dark:bg-surface-800 p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow"
            >
              <div className="md:flex md:justify-between md:items-center">
                <div>
                  <h3 className="text-xl font-semibold mb-2 dark:text-white">{job.title}</h3>
                  <div className="flex flex-wrap gap-2 mb-3">
                    <span className="inline-flex items-center text-xs bg-primary/10 text-primary px-2 py-1 rounded">
                      <Briefcase size={12} className="mr-1" />
                      {job.department}
                    </span>
                    <span className="inline-flex items-center text-xs bg-gray-100 dark:bg-surface-700 text-gray-700 dark:text-gray-300 px-2 py-1 rounded">
                      <MapPin size={12} className="mr-1" />
                      {job.location}
                    </span>
                    <span className="inline-flex items-center text-xs bg-gray-100 dark:bg-surface-700 text-gray-700 dark:text-gray-300 px-2 py-1 rounded">
                      {job.type}
                    </span>
                    <span className="inline-flex items-center text-xs bg-gray-100 dark:bg-surface-700 text-gray-700 dark:text-gray-300 px-2 py-1 rounded">
                      <DollarSign size={12} className="mr-1" />
                      {job.salary}
                    </span>
                  </div>
                  <p className="text-gray-600 dark:text-gray-400 text-sm mb-4 md:mb-0">
                    {job.description}
                  </p>
                </div>
                <div className="md:ml-4">
                  <button 
                    onClick={() => handleApply(job.title)}
                    className="w-full md:w-auto bg-primary text-white px-4 py-2 rounded flex items-center justify-center gap-1 hover:bg-primary-dark transition-colors"
                  >
                    Apply Now
                    <ArrowRight size={16} />
                  </button>
                </div>
              </div>
            </div>
          ))}
          
          {filteredJobs.length === 0 && (
            <div className="text-center py-12 bg-white dark:bg-surface-800 rounded-lg">
              <p className="text-gray-600 dark:text-gray-400">No open positions in this department at the moment.</p>
              <p className="text-gray-600 dark:text-gray-400 mt-2">
                Please check back later or consider another department.
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Application process */}
      <div className="mb-16">
        <h2 className="text-2xl font-bold mb-8 text-center dark:text-white">Our Application Process</h2>
        <div className="max-w-3xl mx-auto">
          <div className="relative">
            {/* Timeline line */}
            <div className="absolute left-8 top-0 h-full w-0.5 bg-primary/20 dark:bg-primary/10"></div>
            
            {/* Steps */}
            <div className="space-y-8">
              <div className="relative flex items-start">
                <div className="absolute left-0 w-16 h-16 flex items-center justify-center">
                  <div className="w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center z-10">1</div>
                </div>
                <div className="ml-24">
                  <h3 className="text-lg font-semibold mb-2 dark:text-white">Application Review</h3>
                  <p className="text-gray-600 dark:text-gray-400">
                    Our team reviews your application and resume. We'll reach out to qualified candidates within 1-2 weeks.
                  </p>
                </div>
              </div>
              <div className="relative flex items-start">
                <div className="absolute left-0 w-16 h-16 flex items-center justify-center">
                  <div className="w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center z-10">2</div>
                </div>
                <div className="ml-24">
                  <h3 className="text-lg font-semibold mb-2 dark:text-white">Initial Conversation</h3>
                  <p className="text-gray-600 dark:text-gray-400">
                    A brief call with our recruitment team to discuss your experience and interest in the role.
                  </p>
                </div>
              </div>
              <div className="relative flex items-start">
                <div className="absolute left-0 w-16 h-16 flex items-center justify-center">
                  <div className="w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center z-10">3</div>
                </div>
                <div className="ml-24">
                  <h3 className="text-lg font-semibold mb-2 dark:text-white">Skills Assessment</h3>
                  <p className="text-gray-600 dark:text-gray-400">
                    Depending on the role, you may be asked to complete a brief assignment or technical challenge.
                  </p>
                </div>
              </div>
              <div className="relative flex items-start">
                <div className="absolute left-0 w-16 h-16 flex items-center justify-center">
                  <div className="w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center z-10">4</div>
                </div>
                <div className="ml-24">
                  <h3 className="text-lg font-semibold mb-2 dark:text-white">Team Interviews</h3>
                  <p className="text-gray-600 dark:text-gray-400">
                    Meet with your potential team members and leaders to discuss the role in more depth.
                  </p>
                </div>
              </div>
              <div className="relative flex items-start">
                <div className="absolute left-0 w-16 h-16 flex items-center justify-center">
                  <div className="w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center z-10">5</div>
                </div>
                <div className="ml-24">
                  <h3 className="text-lg font-semibold mb-2 dark:text-white">Offer & Onboarding</h3>
                  <p className="text-gray-600 dark:text-gray-400">
                    If selected, you'll receive an offer and begin our comprehensive onboarding process.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* No positions available? */}
      <div className="bg-primary text-white rounded-lg p-8 text-center">
        <h2 className="text-2xl font-bold mb-4">Don't See a Role That Fits?</h2>
        <p className="max-w-2xl mx-auto mb-6">
          We're always interested in connecting with talented individuals who are passionate about our mission.
          Send us your resume and let us know how you could contribute to our team.
        </p>
        <button 
          className="bg-white text-primary px-6 py-3 rounded-lg font-medium hover:bg-gray-100 transition-colors"
          onClick={() => toast.info("General application functionality coming soon!")}
        >
          Submit General Application
        </button>
      </div>
    </div>
  );
};

export default Careers;