import React, { useState } from 'react';
import { motion } from 'framer-motion';
import AnimatedSection from '../components/ui/AnimatedSection';
import { Phone, Mail, MapPin, Send } from 'lucide-react';

const ContactPage: React.FC = () => {
  const [formState, setFormState] = useState({
    name: '',
    city: '',
    state: '',
    phone: '',
    email: '',
    message: '',
    submitted: false,
    submitting: false,
    error: false
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormState(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormState(prev => ({ ...prev, submitting: true }));
    
    // Submit to webhook
    const submitData = {
      name: formState.name,
      email: formState.email,
      phone: formState.phone,
      city: formState.city,
      state: formState.state,
      message: formState.message,
      timestamp: new Date().toISOString(),
      source: 'Epic Pools Contact Form'
    };

    fetch('https://hook.us2.make.com/gvy5neynw376ealhtg2onoop24luriu8', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(submitData)
    })
    .then(response => {
      if (response.ok) {
        setFormState(prev => ({ 
          ...prev, 
          submitted: true, 
          submitting: false,
          error: false
        }));
      } else {
        throw new Error('Failed to submit form');
      }
    })
    .catch(error => {
      console.error('Error submitting form:', error);
      setFormState(prev => ({ 
        ...prev, 
        submitting: false,
        error: true
      }));
    });
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      {/* Hero Section */}
      <section className="relative py-32 bg-secondary-900">
        <div 
          className="absolute inset-0 bg-cover bg-center opacity-30"
          style={{ 
            backgroundImage: "url('https://images.pexels.com/photos/7936139/pexels-photo-7936139.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750')",
          }}
        ></div>
        <div className="container-custom relative z-10">
          <AnimatedSection className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-6 font-montserrat">
              Contact Us
            </h1>
            <p className="text-xl text-white/80 max-w-3xl mx-auto">
              Have questions or ready to start your project? Get in touch with our team of pool and spa experts.
            </p>
          </AnimatedSection>
        </div>
      </section>

      {/* Contact Info & Form */}
      <section className="py-20 bg-white">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Information */}
            <AnimatedSection>
              <h2 className="text-3xl font-bold text-secondary-900 mb-8 font-montserrat">Get in Touch</h2>
              
              <div className="space-y-6 mb-10">
                <div className="flex items-start">
                  <div className="bg-primary-50 p-3 text-primary-600 mr-4">
                    <MapPin size={24} />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold mb-1 font-montserrat">Our Location</h3>
                    <p className="text-secondary-600">4749 E Wesley Avenue Anaheim, CA 92807</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="bg-primary-50 p-3 text-primary-600 mr-4">
                    <Phone size={24} />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold mb-1 font-montserrat">Phone</h3>
                    <p className="text-secondary-600">(949) 381-1827</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="bg-primary-50 p-3 text-primary-600 mr-4">
                    <Mail size={24} />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold mb-1 font-montserrat">Email</h3>
                    <p className="text-secondary-600">Epicpoolsusa@gmail.com</p>
                  </div>
                </div>
              </div>
              
              <div>
                <h3 className="text-xl font-semibold mb-4 font-montserrat">Operating Hours</h3>
                <div className="space-y-2 text-secondary-700">
                  <div className="flex justify-between">
                    <span>Monday - Friday:</span>
                    <span>9:00 AM - 6:00 PM</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Saturday:</span>
                    <span>10:00 AM - 4:00 PM</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Sunday:</span>
                    <span>Closed</span>
                  </div>
                </div>
              </div>
            </AnimatedSection>
            
            {/* Contact Form */}
            <AnimatedSection delay={0.2} className="bg-white shadow-xl p-8">
              {formState.submitted ? (
                <div className="text-center py-12">
                  <div className="inline-block p-4 bg-primary-50 text-primary-600 mb-6">
                    <Send size={48} />
                  </div>
                  <h3 className="text-2xl font-bold text-secondary-900 mb-4 font-montserrat">
                    Thanks for reaching out!
                  </h3>
                  <p className="text-secondary-700 mb-6">
                    We've received your message and will get back to you shortly.
                  </p>
                  <button
                    onClick={() => setFormState(prev => ({ ...prev, submitted: false }))}
                    className="btn-primary"
                  >
                    Send Another Message
                  </button>
                </div>
              ) : formState.error ? (
                <div className="text-center py-12">
                  <div className="inline-block p-4 bg-red-50 text-red-600 mb-6">
                    <Send size={48} />
                  </div>
                  <h3 className="text-2xl font-bold text-secondary-900 mb-4 font-montserrat">
                    Something went wrong
                  </h3>
                  <p className="text-secondary-700 mb-6">
                    There was an error submitting your message. Please try again or contact us directly.
                  </p>
                  <button
                    onClick={() => setFormState(prev => ({ ...prev, error: false }))}
                    className="btn-primary"
                  >
                    Try Again
                  </button>
                </div>
              ) : (
                <>
                  <h2 className="text-2xl font-bold text-secondary-900 mb-6 font-montserrat">
                    Send a Message
                  </h2>
                  <form onSubmit={handleSubmit}>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                      <div>
                        <label htmlFor="name" className="block text-secondary-700 font-medium mb-2">
                          Full Name*
                        </label>
                        <input
                          type="text"
                          id="name"
                          name="name"
                          value={formState.name}
                          onChange={handleChange}
                          className="w-full px-4 py-3 border border-secondary-300 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                          required
                        />
                      </div>
                      <div>
                        <label htmlFor="email" className="block text-secondary-700 font-medium mb-2">
                          Email Address*
                        </label>
                        <input
                          type="email"
                          id="email"
                          name="email"
                          value={formState.email}
                          onChange={handleChange}
                          className="w-full px-4 py-3 border border-secondary-300 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                          required
                        />
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                      <div>
                        <label htmlFor="city" className="block text-secondary-700 font-medium mb-2">
                          City*
                        </label>
                        <input
                          type="text"
                          id="city"
                          name="city"
                          value={formState.city}
                          onChange={handleChange}
                          className="w-full px-4 py-3 border border-secondary-300 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                          required
                        />
                      </div>
                      <div>
                        <label htmlFor="state" className="block text-secondary-700 font-medium mb-2">
                          State*
                        </label>
                        <input
                          type="text"
                          id="state"
                          name="state"
                          value={formState.state}
                          onChange={handleChange}
                          className="w-full px-4 py-3 border border-secondary-300 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                          required
                        />
                      </div>
                    </div>

                    <div className="mb-6">
                      <label htmlFor="phone" className="block text-secondary-700 font-medium mb-2">
                        Phone Number*
                      </label>
                      <input
                        type="tel"
                        id="phone"
                        name="phone"
                        value={formState.phone}
                        onChange={handleChange}
                        className="w-full px-4 py-3 border border-secondary-300 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                        required
                      />
                    </div>
                    
                    <div className="mb-8">
                      <label htmlFor="message" className="block text-secondary-700 font-medium mb-2">
                        Your Message*
                      </label>
                      <textarea
                        id="message"
                        name="message"
                        value={formState.message}
                        onChange={handleChange}
                        rows={5}
                        className="w-full px-4 py-3 border border-secondary-300 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                        required
                      ></textarea>
                    </div>
                    
                    <button
                      type="submit"
                      className="btn-primary w-full flex justify-center items-center"
                      disabled={formState.submitting}
                    >
                      {formState.submitting ? (
                        <>
                          <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                          </svg>
                          Sending...
                        </>
                      ) : (
                        'Send Message'
                      )}
                    </button>
                  </form>
                </>
              )}
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* Map Section */}
      <section className="py-20 bg-secondary-50">
        <div className="container-custom">
          <AnimatedSection className="text-center mb-12">
            <h2 className="section-title">Visit Our Showroom</h2>
            <p className="section-subtitle mx-auto">
              Experience our premium designs firsthand at our Anaheim showroom.
            </p>
          </AnimatedSection>
          
          <AnimatedSection delay={0.2} className="overflow-hidden shadow-xl border border-black">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3314.7376583367287!2d-117.83893492392092!3d33.82736087326787!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x80dcd5c8b7192b05%3A0x12c1d19394eaf7e4!2s4749%20E%20Wesley%20Ave%2C%20Anaheim%2C%20CA%2092807!5e0!3m2!1sen!2sus!4v1709246549099!5m2!1sen!2sus"
              width="100%"
              height="450"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Epic Pools and Spas Location"
              className="w-full"
            ></iframe>
          </AnimatedSection>
        </div>
      </section>
    </motion.div>
  );
};

export default ContactPage;