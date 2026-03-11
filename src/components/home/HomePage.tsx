import React from 'react';
import HeroSection from '../components/home/HeroSection';
import ServicesSection from '../components/home/ServicesSection';
import GallerySection from '../components/home/GallerySection';
import PortfolioPreview from '../components/home/PortfolioPreview';
import FeaturesSection from '../components/home/FeaturesSection';
import { TestimonialsSection } from '../components/ui/testimonials-section';
import CtaSection from '../components/home/CtaSection';
import { motion } from 'framer-motion';

const testimonials = [
  {
    author: {
      name: "Sarah & Michael Davis",
      handle: "@davisfamily",
      avatar: "https://images.pexels.com/photos/1066952/pexels-photo-1066952.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750"
    },
    text: "Epic Pools transformed our backyard into a paradise. Their attention to detail and craftsmanship exceeded all expectations."
  },
  {
    author: {
      name: "James Wilson",
      handle: "@jwilson",
      avatar: "https://images.pexels.com/photos/6580541/pexels-photo-6580541.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750"
    },
    text: "The design team created the perfect infinity pool for our oceanfront property. The result is absolutely stunning."
  },
  {
    author: {
      name: "Emily & Robert Chen",
      handle: "@chenlife",
      avatar: "https://images.pexels.com/photos/696218/pexels-photo-696218.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750"
    },
    text: "From concept to completion, working with Epic Pools was a pleasure. They brought our vision to life beautifully."
  }
];

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
        testimonials={testimonials}
      />
      <CtaSection />
    </motion.div>
  );
};

export default HomePage;