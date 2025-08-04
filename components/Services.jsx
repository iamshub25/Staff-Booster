"use client";
import { useState, useEffect } from 'react';
import { 
  FaChartLine, FaUsers, FaLaptopCode, FaBullhorn, FaFileAlt, FaHandshake, FaCog,
  FaRocket, FaShieldAlt, FaGlobe, FaDatabase, FaMobile, FaCloud, FaSearch,
  FaHeart, FaStar, FaThumbsUp, FaLightbulb
} from 'react-icons/fa';

export default function Services() {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchServices();
  }, []);

  const fetchServices = async () => {
    try {
      const res = await fetch('/api/admin/services');
      const data = await res.json();
      // Combine static services with dynamic ones
      const allServices = [...defaultServices, ...data];
      setServices(allServices);
    } catch (error) {
      console.error('Error fetching services:', error);
      setServices(defaultServices);
    } finally {
      setLoading(false);
    }
  };

  const defaultServices = [
    {
      icon: "FaChartLine",
      title: " Personalized Job Matching",
      description: "Get job recommendations tailored to your skills, preferences, and career goals."
    },
    {
      icon: "FaUsers",
      title: "HRResume & Portfolio Review",
      description: "Receive expert feedback to optimize your resume and portfolio for better visibility and results."
    },
    {
      icon: "FaLaptopCode",
      title: "Skill-Based Roadmaps",
      description: "Follow curated learning paths for roles like Web Developer, Data Analyst, Digital Marketer, and more."
    },
    {
      icon: "FaDatabase",
      title: "Internship & Job Listings",
      description: "Explore verified openings from startups, MNCs, and everything in between — all in one place."
    }
  ];

  const getIcon = (iconName) => {
    const icons = {
      FaChartLine: <FaChartLine className="text-4xl text-primary mb-4" />,
      FaUsers: <FaUsers className="text-4xl text-primary mb-4" />,
      FaLaptopCode: <FaLaptopCode className="text-4xl text-primary mb-4" />,
      FaBullhorn: <FaBullhorn className="text-4xl text-primary mb-4" />,
      FaFileAlt: <FaFileAlt className="text-4xl text-primary mb-4" />,
      FaHandshake: <FaHandshake className="text-4xl text-primary mb-4" />,
      FaCog: <FaCog className="text-4xl text-primary mb-4" />,
      FaRocket: <FaRocket className="text-4xl text-primary mb-4" />,
      FaShieldAlt: <FaShieldAlt className="text-4xl text-primary mb-4" />,
      FaGlobe: <FaGlobe className="text-4xl text-primary mb-4" />,
      FaDatabase: <FaDatabase className="text-4xl text-primary mb-4" />,
      FaMobile: <FaMobile className="text-4xl text-primary mb-4" />,
      FaCloud: <FaCloud className="text-4xl text-primary mb-4" />,
      FaSearch: <FaSearch className="text-4xl text-primary mb-4" />,
      FaHeart: <FaHeart className="text-4xl text-primary mb-4" />,
      FaStar: <FaStar className="text-4xl text-primary mb-4" />,
      FaThumbsUp: <FaThumbsUp className="text-4xl text-primary mb-4" />,
      FaLightbulb: <FaLightbulb className="text-4xl text-primary mb-4" />
    };
    return icons[iconName] || <FaCog className="text-4xl text-primary mb-4" />;
  };

  return (
    <section id="services" className="section">
      <div className="container-custom">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Our Services</h2>
          <div className="w-20 h-1 bg-primary mx-auto mb-6"></div>
          <p className="max-w-2xl mx-auto text-gray-700">
            We offer a wide range of consulting services to help businesses grow, optimize operations, and achieve sustainable success.
          </p>
        </div>
        
        {loading ? (
          <div className="text-center">Loading services...</div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <div key={service.id || index} className="bg-white p-6 rounded-lg shadow-md hover:shadow-xl transition-shadow">
                <div className="text-center">
                  {getIcon(service.icon)}
                  <h3 className="text-xl font-bold mb-3">{service.title}</h3>
                  <p className="text-gray-700">{service.description}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}