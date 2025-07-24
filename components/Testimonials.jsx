"use client";
import { useState } from 'react';
import { FaQuoteLeft, FaStar } from 'react-icons/fa';

export default function Testimonials() {
  const testimonials = [
    {
      name: "John Smith",
      position: "CEO, Tech Innovations",
      content: "Working with this consultancy has been transformative for our business. Their strategic insights helped us increase revenue by 40% in just one year.",
      rating: 5
    },
    {
      name: "Sarah Johnson",
      position: "Marketing Director, Global Retail",
      content: "The team's expertise in marketing strategy completely revitalized our brand presence. We've seen incredible growth in customer engagement and sales.",
      rating: 5
    },
    {
      name: "Michael Brown",
      position: "CFO, Finance Solutions",
      content: "Their financial consulting services provided us with clear direction and actionable steps. We've optimized our operations and increased profitability.",
      rating: 4
    },
    {
      name: "Emily Davis",
      position: "HR Manager, Healthcare Inc.",
      content: "The HR consulting we received helped us build a stronger team culture and improve retention rates significantly. Highly recommended!",
      rating: 5
    }
  ];

  const [activeIndex, setActiveIndex] = useState(0);

  const nextTestimonial = () => {
    setActiveIndex((prevIndex) => (prevIndex + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setActiveIndex((prevIndex) => (prevIndex - 1 + testimonials.length) % testimonials.length);
  };

  return (
    <section id="testimonials" className="section bg-secondary">
      <div className="container-custom">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">What Our Clients Say</h2>
          <div className="w-20 h-1 bg-primary mx-auto mb-6"></div>
        </div>
        
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-lg shadow-lg p-8 relative">
            <FaQuoteLeft className="text-4xl text-primary opacity-20 absolute top-8 left-8" />
            
            <div className="text-center">
              <p className="text-lg mb-6 text-gray-700 relative z-10">"{testimonials[activeIndex].content}"</p>
              
              <div className="flex justify-center mb-4">
                {[...Array(testimonials[activeIndex].rating)].map((_, i) => (
                  <FaStar key={i} className="text-yellow-500" />
                ))}
              </div>
              
              <h4 className="font-bold text-lg">{testimonials[activeIndex].name}</h4>
              <p className="text-gray-600">{testimonials[activeIndex].position}</p>
            </div>
          </div>
          
          <div className="flex justify-center mt-8 gap-4">
            <button 
              onClick={prevTestimonial}
              className="bg-primary text-white w-10 h-10 rounded-full flex items-center justify-center hover:bg-blue-700 transition-colors"
            >
              &larr;
            </button>
            <div className="flex gap-2">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setActiveIndex(index)}
                  className={`w-3 h-3 rounded-full ${
                    activeIndex === index ? 'bg-primary' : 'bg-gray-300'
                  }`}
                />
              ))}
            </div>
            <button 
              onClick={nextTestimonial}
              className="bg-primary text-white w-10 h-10 rounded-full flex items-center justify-center hover:bg-blue-700 transition-colors"
            >
              &rarr;
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}