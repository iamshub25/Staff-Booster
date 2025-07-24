"use client";
import { FaChartLine, FaUsers, FaLaptopCode, FaBullhorn, FaFileAlt, FaHandshake } from 'react-icons/fa';

export default function Services() {
  const services = [
    {
      icon: <FaChartLine className="text-4xl text-primary mb-4" />,
      title: "Business Strategy",
      description: "Develop effective business strategies to achieve your goals and stay ahead of the competition."
    },
    {
      icon: <FaUsers className="text-4xl text-primary mb-4" />,
      title: "HR Consulting",
      description: "Optimize your human resources practices to attract and retain top talent for your organization."
    },
    {
      icon: <FaLaptopCode className="text-4xl text-primary mb-4" />,
      title: "IT Solutions",
      description: "Implement cutting-edge technology solutions to streamline operations and enhance productivity."
    },
    {
      icon: <FaBullhorn className="text-4xl text-primary mb-4" />,
      title: "Marketing Strategy",
      description: "Create impactful marketing strategies to boost your brand visibility and customer engagement."
    },
    {
      icon: <FaFileAlt className="text-4xl text-primary mb-4" />,
      title: "Financial Planning",
      description: "Develop comprehensive financial plans to ensure long-term stability and growth for your business."
    },
    {
      icon: <FaHandshake className="text-4xl text-primary mb-4" />,
      title: "Partnership Development",
      description: "Build strategic partnerships to expand your market reach and create new business opportunities."
    }
  ];

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
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <div key={index} className="bg-white p-6 rounded-lg shadow-md hover:shadow-xl transition-shadow">
              <div className="text-center">
                {service.icon}
                <h3 className="text-xl font-bold mb-3">{service.title}</h3>
                <p className="text-gray-700">{service.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}