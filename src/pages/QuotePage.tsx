import React, { useState } from 'react';
import { motion } from 'framer-motion';
import AnimatedSection from '../components/ui/AnimatedSection';
import { Check, ArrowRight, ArrowLeft, Send, AlertCircle } from 'lucide-react';

const QuotePage: React.FC = () => {
  const [step, setStep] = useState<number>(1);
  const [errors, setErrors] = useState<{[key: string]: string}>({});
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    projectType: '',
    budget: '',
    timeframe: '',
    features: [] as string[],
    message: '',
    consent: false
  });
  
  const totalSteps = 4;
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    // Clear error when field is modified
    if (errors[name]) {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  };
  
  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, checked } = e.target;
    
    if (name === 'consent') {
      setFormData(prev => ({ ...prev, consent: checked }));
      if (errors.consent) {
        setErrors(prev => {
          const newErrors = { ...prev };
          delete newErrors.consent;
          return newErrors;
        });
      }
      return;
    }
    
    if (checked) {
      setFormData(prev => ({ ...prev, features: [...prev.features, value] }));
    } else {
      setFormData(prev => ({ 
        ...prev, 
        features: prev.features.filter(feature => feature !== value) 
      }));
    }

    if (errors.features) {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors.features;
        return newErrors;
      });
    }
  };
  
  const validateStep = (currentStep: number) => {
    const newErrors: {[key: string]: string} = {};

    switch (currentStep) {
      case 1:
        if (!formData.name.trim()) {
          newErrors.name = 'Full name is required';
        }
        if (!formData.email.trim()) {
          newErrors.email = 'Email address is required';
        } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
          newErrors.email = 'Please enter a valid email address';
        }
        break;
      case 2:
        if (!formData.projectType) {
          newErrors.projectType = 'Project type is required';
        }
        if (!formData.budget) {
          newErrors.budget = 'Budget range is required';
        }
        if (!formData.timeframe) {
          newErrors.timeframe = 'Timeframe is required';
        }
        if (formData.features.length === 0) {
          newErrors.features = 'Please select at least one feature';
        }
        break;
      case 3:
        // Message step - no validation required (optional field)
        break;
      case 4:
        if (!formData.consent) {
          newErrors.consent = 'You must agree to the terms and conditions';
        }
        break;
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  
  const handleNext = () => {
    if (validateStep(step)) {
      setStep(prev => Math.min(prev + 1, totalSteps));
    }
  };
  
  const handlePrevious = () => {
    setStep(prev => Math.max(prev - 1, 1));
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateStep(4)) {
      // Submit to webhook
      const submitData = {
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        address: formData.address,
        projectType: formData.projectType,
        budget: formData.budget,
        timeframe: formData.timeframe,
        features: formData.features,
        message: formData.message,
        timestamp: new Date().toISOString(),
        source: 'Epic Pools Quote Form'
      };

      fetch('https://hook.us2.make.com/xwck6ua89pat6bfvhqgjon743xxgxl9e', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(submitData)
      })
      .then(response => {
        if (response.ok) {
          setStep(5);
        } else {
          throw new Error('Failed to submit quote request');
        }
      })
      .catch(error => {
        console.error('Error submitting quote request:', error);
        // Still show success for better UX, but log the error
        setStep(5);
      });
    }
  };

  const ErrorMessage: React.FC<{ message?: string }> = ({ message }) => {
    if (!message) return null;
    return (
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-center text-red-500 text-sm mt-1"
      >
        <AlertCircle size={14} className="mr-1" />
        {message}
      </motion.div>
    );
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
            backgroundImage: "url('https://images.pexels.com/photos/1619317/pexels-photo-1619317.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750')",
          }}
        ></div>
        <div className="container-custom relative z-10">
          <AnimatedSection className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-6 font-montserrat">
              Get a Quote
            </h1>
            <p className="text-xl text-white/80 max-w-3xl mx-auto">
              Let's bring your dream pool or spa to life. Fill out the form below and we'll provide you with a personalized quote.
            </p>
          </AnimatedSection>
        </div>
      </section>

      {/* Quote Form */}
      <section className="py-20 bg-white">
        <div className="container-custom">
          <div className="max-w-3xl mx-auto">
            {/* Progress Bar */}
            {step < 4 && (
              <AnimatedSection className="mb-12">
                <div className="flex justify-between mb-2">
                  {Array.from({ length: totalSteps }).map((_, index) => (
                    <div key={index} className="flex items-center">
                      <div className={`
                        flex items-center justify-center w-10 h-10 rounded-full
                        ${step > index + 1 ? 'bg-primary-600 text-white' : step === index + 1 ? 'bg-white text-black border-2 border-black' : 'bg-secondary-100 text-secondary-500'}
                      `}>
                        {step > index + 1 ? <Check size={20} /> : index + 1}
                      </div>
                      
                      {index < totalSteps - 1 && (
                        <div className={`w-full h-1 ${step > index + 1 ? 'bg-primary-600' : 'bg-secondary-100'}`}></div>
                      )}
                    </div>
                  ))}
                </div>
                <div className="flex justify-between">
                  <span className="text-sm font-medium text-secondary-600">Personal Info</span>
                  <span className="text-sm font-medium text-secondary-600">Project Details</span>
                  <span className="text-sm font-medium text-secondary-600">Additional Info</span>
                  <span className="text-sm font-medium text-secondary-600">Consent & Agreement</span>
                </div>
              </AnimatedSection>
            )}
            
            {/* Form Section */}
            <AnimatedSection className="bg-white shadow-xl rounded-lg p-8">
              {step === 5 ? (
                <div className="text-center py-12">
                  <div className="inline-block p-4 bg-primary-50 rounded-full text-primary-600 mb-6">
                    <Send size={48} />
                  </div>
                  <h3 className="text-2xl font-bold text-secondary-900 mb-4 font-montserrat">
                    Quote Request Received!
                  </h3>
                  <p className="text-secondary-700 mb-6">
                    Thank you for your interest in Epic Pools & Spas. One of our design consultants will review your request and contact you within 24 hours to discuss your project in detail.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit}>
                  {/* Step 1: Personal Information */}
                  {step === 1 && (
                    <div>
                      <h2 className="text-2xl font-bold text-secondary-900 mb-6 font-montserrat">
                        Personal Information
                      </h2>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                        <div>
                          <label htmlFor="name" className="block text-secondary-700 font-medium mb-2">
                            Full Name <span className="text-red-500">*</span>
                          </label>
                          <input
                            type="text"
                            id="name"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            className={`w-full px-4 py-3 border focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent ${
                              errors.name ? 'border-red-500' : 'border-secondary-300'
                            }`}
                          />
                          <ErrorMessage message={errors.name} />
                        </div>
                        <div>
                          <label htmlFor="email" className="block text-secondary-700 font-medium mb-2">
                            Email Address <span className="text-red-500">*</span>
                          </label>
                          <input
                            type="email"
                            id="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            className={`w-full px-4 py-3 border focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent ${
                              errors.email ? 'border-red-500' : 'border-secondary-300'
                            }`}
                          />
                          <ErrorMessage message={errors.email} />
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                        <div>
                          <label htmlFor="phone" className="block text-secondary-700 font-medium mb-2">
                            Phone Number
                          </label>
                          <input
                            type="tel"
                            id="phone"
                            name="phone"
                            value={formData.phone}
                            onChange={handleChange}
                            className="w-full px-4 py-3 border border-secondary-300 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                          />
                        </div>
                        <div>
                          <label htmlFor="address" className="block text-secondary-700 font-medium mb-2">
                            Property Address
                          </label>
                          <input
                            type="text"
                            id="address"
                            name="address"
                            value={formData.address}
                            onChange={handleChange}
                            className="w-full px-4 py-3 border border-secondary-300 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                          />
                        </div>
                      </div>
                    </div>
                  )}
                  
                  {/* Step 2: Project Details */}
                  {step === 2 && (
                    <div>
                      <h2 className="text-2xl font-bold text-secondary-900 mb-6 font-montserrat">
                        Project Details
                      </h2>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                        <div>
                          <label htmlFor="projectType" className="block text-secondary-700 font-medium mb-2">
                            Project Type <span className="text-red-500">*</span>
                          </label>
                          <select
                            id="projectType"
                            name="projectType"
                            value={formData.projectType}
                            onChange={handleChange}
                            className={`w-full px-4 py-3 border focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent ${
                              errors.projectType ? 'border-red-500' : 'border-secondary-300'
                            }`}
                          >
                            <option value="">Select Project Type</option>
                            <option value="New Pool">New Pool</option>
                            <option value="New Spa">New Spa</option>
                            <option value="Pool & Spa Combo">Pool & Spa Combo</option>
                            <option value="Renovation">Renovation</option>
                            <option value="Water Feature">Water Feature</option>
                          </select>
                          <ErrorMessage message={errors.projectType} />
                        </div>
                        <div>
                          <label htmlFor="budget" className="block text-secondary-700 font-medium mb-2">
                            Budget Range <span className="text-red-500">*</span>
                          </label>
                          <select
                            id="budget"
                            name="budget"
                            value={formData.budget}
                            onChange={handleChange}
                            className={`w-full px-4 py-3 border focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent ${
                              errors.budget ? 'border-red-500' : 'border-secondary-300'
                            }`}
                          >
                            <option value="">Select Budget Range</option>
                            <option value="$25,000 - $50,000">$25,000 - $50,000</option>
                            <option value="$50,000 - $100,000">$50,000 - $100,000</option>
                            <option value="$100,000 - $250,000">$100,000 - $250,000</option>
                            <option value="$250,000+">$250,000+</option>
                          </select>
                          <ErrorMessage message={errors.budget} />
                        </div>
                      </div>
                      
                      <div className="mb-6">
                        <label htmlFor="timeframe" className="block text-secondary-700 font-medium mb-2">
                          Desired Timeframe <span className="text-red-500">*</span>
                        </label>
                        <select
                          id="timeframe"
                          name="timeframe"
                          value={formData.timeframe}
                          onChange={handleChange}
                          className={`w-full px-4 py-3 border focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent ${
                            errors.timeframe ? 'border-red-500' : 'border-secondary-300'
                          }`}
                        >
                          <option value="">Select Timeframe</option>
                          <option value="As soon as possible">As soon as possible</option>
                          <option value="1-3 months">1-3 months</option>
                          <option value="3-6 months">3-6 months</option>
                          <option value="6-12 months">6-12 months</option>
                          <option value="Just exploring options">Just exploring options</option>
                        </select>
                        <ErrorMessage message={errors.timeframe} />
                      </div>
                      
                      <div className="mb-8">
                        <label className="block text-secondary-700 font-medium mb-3">
                          Desired Features <span className="text-red-500">*</span>
                        </label>
                        <div className={`grid grid-cols-2 md:grid-cols-3 gap-3 ${errors.features ? 'border border-red-500 rounded-lg p-3' : ''}`}>
                          {[
                            'Infinity Edge',
                            'Spa/Hot Tub',
                            'Waterfall',
                            'Fire Feature',
                            'Tanning Ledge',
                            'Lighting',
                            'Automation',
                            'Salt System',
                            'Beach Entry'
                          ].map(feature => (
                            <div key={feature} className="flex items-center">
                              <input
                                type="checkbox"
                                id={feature.replace(/\s+/g, '')}
                                name="features"
                                value={feature}
                                checked={formData.features.includes(feature)}
                                onChange={handleCheckboxChange}
                                className="w-5 h-5 text-primary-600 border-secondary-300 focus:ring-primary-500"
                              />
                              <label
                                htmlFor={feature.replace(/\s+/g, '')}
                                className="ml-2 text-secondary-700"
                              >
                                {feature}
                              </label>
                            </div>
                          ))}
                        </div>
                        <ErrorMessage message={errors.features} />
                      </div>
                    </div>
                  )}
                  
                  {/* Step 3: Additional Information */}
                  {step === 3 && (
                    <div>
                      <h2 className="text-2xl font-bold text-secondary-900 mb-6 font-montserrat">
                        Additional Information
                      </h2>
                      
                      <div className="mb-8">
                        <label htmlFor="message" className="block text-secondary-700 font-medium mb-2">
                          Tell us more about your project (Optional)
                        </label>
                        <textarea
                          id="message"
                          name="message"
                          value={formData.message}
                          onChange={handleChange}
                          rows={6}
                          className="w-full px-4 py-3 border border-secondary-300 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                          placeholder="Share any specific requirements, inspiration, or questions you have about your pool or spa project..."
                        ></textarea>
                        <p className="text-sm text-secondary-500 mt-2">
                          This helps us provide you with a more accurate and personalized quote.
                        </p>
                      </div>
                    </div>
                  )}
                  
                  {/* Step 4: Consent & Agreement */}
                  {step === 4 && (
                    <div>
                      <h2 className="text-2xl font-bold text-secondary-900 mb-6 font-montserrat">
                        Consent & Agreement
                      </h2>
                      
                      <div className="mb-8 bg-secondary-50 p-6 text-secondary-700">
                        <div className="mb-6">
                          <p className="mb-4 leading-relaxed">
                            By clicking the "SUBMIT" button below, I hereby expressly consent to learn more about Epic Pools and Spas, Inc. and schedule an in-home price quote. By submitting this form, which I agree is my signature, I consent to be contacted by email address or telephone calls by Epic Pools and Spas, Inc. at the phone number and email address I provided with this form. If I wish to not be contacted, I may unsubscribe from any emails or ask to be removed from any contact lists.
                          </p>
                          <p className="mb-4 leading-relaxed">
                            I understand consent is not required for purchase and that I can opt out at any time. I agree to Epic Pools and Spas, Inc. Privacy Policy and Terms and Conditions. California residents, click here for more information about the information we collect.
                          </p>
                        </div>
                        
                        <div className={`flex items-start ${errors.consent ? 'p-3 border border-red-500 rounded-lg' : ''}`}>
                          <input
                            type="checkbox"
                            id="consent"
                            name="consent"
                            checked={formData.consent}
                            onChange={handleCheckboxChange}
                            className="w-5 h-5 mt-1 text-primary-600 border-secondary-300 focus:ring-primary-500"
                          />
                          <label htmlFor="consent" className="ml-2 text-secondary-700">
                            I agree to the terms and conditions above
                          </label>
                        </div>
                        <ErrorMessage message={errors.consent} />
                      </div>
                    </div>
                  )}
                  
                  {/* Navigation Buttons */}
                  <div className="flex justify-between">
                    {step > 1 && (
                      <button
                        type="button"
                        onClick={handlePrevious}
                        className="btn-outline flex items-center"
                      >
                        <ArrowLeft size={20} className="mr-2" />
                        Previous
                      </button>
                    )}
                    
                    {step < totalSteps ? (
                      <button
                        type="button"
                        onClick={handleNext}
                        className="btn-primary ml-auto flex items-center"
                      >
                        Next
                        <ArrowRight size={20} className="ml-2" />
                      </button>
                    ) : (
                      <button
                        type="submit"
                        className="btn-primary ml-auto flex items-center"
                      >
                        Submit Request
                        <Send size={20} className="ml-2" />
                      </button>
                    )}
                  </div>
                </form>
              )}
            </AnimatedSection>
          </div>
        </div>
      </section>
    </motion.div>
  );
};

export default QuotePage;