import React from 'react';
import HeroSection from './HeroSection';
import ServicesSection from './ServicesSection';
import GallerySection from './GallerySection';
import PortfolioPreview from './PortfolioPreview';
import FeaturesSection from './FeaturesSection';
import { TestimonialsSection } from '../ui/testimonials-section';
import CtaSection from './CtaSection';
import { motion } from 'framer-motion';

const HomePage: React.FC = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      <HeroSection />
      <ServicesSection />
      <GallerySection />
      <FeaturesSection />
      <PortfolioPreview />
      <TestimonialsSection
        title="What Our Clients Say"
        description="Hear from homeowners who have experienced the Epic Pools & Spas difference"
      />
      <CtaSection />
    </motion.div>
  );
};

export default HomePage;