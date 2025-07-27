"use client";
import { useState, useRef } from 'react';
import { FaPhone, FaEnvelope, FaMapMarkerAlt } from 'react-icons/fa';
import ReCAPTCHA from 'react-google-recaptcha';

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [recaptchaToken, setRecaptchaToken] = useState(null);
  const recaptchaRef = useRef(null);

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value
    });
  };

  const handleRecaptchaChange = (token) => {
    setRecaptchaToken(token);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!recaptchaToken) {
      alert('Please complete the reCAPTCHA verification.');
      return;
    }

    // Your form submission logic here
    console.log('Form data:', formData);
    console.log('reCAPTCHA token:', recaptchaToken);
    
    // Reset form and reCAPTCHA after submission
    setFormData({ name: '', email: '', subject: '', message: '' });
    setRecaptchaToken(null);
    recaptchaRef.current?.reset();
  };
  return (
    <section id="contact" className="section">
      <div className="container-custom">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Get In Touch</h2>
          <div className="w-20 h-1 bg-primary mx-auto mb-6"></div>
          <p className="max-w-2xl mx-auto text-gray-700">
            Have questions or ready to start a project? Contact us today for a free consultation.
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 gap-12">
          <div>
            <h3 className="text-2xl font-bold mb-6">Contact Information</h3>
            
            <div className="space-y-6">
              <div className="flex items-start">
                <div className="bg-primary rounded-full p-3 mr-4">
                  <FaPhone className="text-white" />
                </div>
                <div>
                  <h4 className="font-bold text-lg">Phone</h4>
                  <p className="text-gray-700">+91 7709874425</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="bg-primary rounded-full p-3 mr-4">
                  <FaEnvelope className="text-white" />
                </div>
                <div>
                  <h4 className="font-bold text-lg">Email</h4>
                  <p className="text-gray-700">shubhampra25@gmail.com</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="bg-primary rounded-full p-3 mr-4">
                  <FaMapMarkerAlt className="text-white" />
                </div>
                <div>
                  <h4 className="font-bold text-lg">Address</h4>
                  <p className="text-gray-700">Omakara Apt 102<br />401404 Palghar</p>
                </div>
              </div>
            </div>
          </div>
          
          <div>
            <h3 className="text-2xl font-bold mb-6">Send Us a Message</h3>
            
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="name" className="block mb-1 font-medium">Name</label>
                  <input
                    type="text"
                    id="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                    placeholder="Your Name"
                    required
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block mb-1 font-medium">Email</label>
                  <input
                    type="email"
                    id="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                    placeholder="Your Email"
                    required
                  />
                </div>
              </div>
              
              <div>
                <label htmlFor="subject" className="block mb-1 font-medium">Subject</label>
                <input
                  type="text"
                  id="subject"
                  value={formData.subject}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                  placeholder="Subject"
                  required
                />
              </div>
              
              <div>
                <label htmlFor="message" className="block mb-1 font-medium">Message</label>
                <textarea
                  id="message"
                  rows="5"
                  value={formData.message}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                  placeholder="Your Message"
                  required
                ></textarea>
              </div>
              
              <div className="flex justify-center">
                <ReCAPTCHA
                  ref={recaptchaRef}
                  sitekey="6LdmX5ArAAAAALFKI50DmzQsUZ4GT_1rThWdg_Zq"
                  onChange={handleRecaptchaChange}
                />
              </div>
              
              <button
                type="submit"
                className="btn btn-primary"
                disabled={!recaptchaToken}
              >
                Send Message
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}