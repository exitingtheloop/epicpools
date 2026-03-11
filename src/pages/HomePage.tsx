import React, { useState, useEffect } from 'react';
import { supabase } from '../lib/db';
import HeroSection from '../components/home/HeroSection';
import ServicesSection from '../components/home/ServicesSection';
import FinancingSection from '../components/home/FinancingSection';
import PortfolioPreview from '../components/home/PortfolioPreview';
import { AnimatedTestimonials } from '../components/ui/animated-testimonials';
import CtaSection from '../components/home/CtaSection';
import { motion } from 'framer-motion';

const HomePage: React.FC = () => {
  const [testimonials, setTestimonials] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTestimonials = async () => {
      try {
        const { data } = await supabase
          .from('testimonials')
          .select('*')
          .eq('is_featured', true)
          .order('created_at', { ascending: false });

        if (data) {
          const formattedTestimonials = data.map(testimonial => ({
            quote: testimonial.text,
            name: testimonial.name,
            designation: testimonial.location,
            src: testimonial.avatar_url
          }));
          setTestimonials(formattedTestimonials);
        }
      } catch (err) {
        console.error('Error fetching testimonials:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchTestimonials();
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      <HeroSection />
      <ServicesSection />
      <FinancingSection />
      <PortfolioPreview />
      {!loading && testimonials.length > 0 && (
        <AnimatedTestimonials testimonials={testimonials} autoplay={true} />
      )}
      <CtaSection />
    </motion.div>
  );
};

export default HomePage