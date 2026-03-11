import React from 'react';
import { motion } from 'framer-motion';
import AnimatedSection from '../components/ui/AnimatedSection';
import ProjectGrid from '../components/portfolio/ProjectGrid';

const PortfolioPage: React.FC = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      {/* Hero Banner */}
      <section className="relative py-32 bg-secondary-900">
        <div 
          className="absolute inset-0 bg-cover bg-center opacity-30"
          style={{ 
            backgroundImage: "url('https://s3.us-west-1.wasabisys.com/epicpoolsimages/LaHermosa/LaHermosa_0013.jpg')",
          }}
        ></div>
        <div className="container-custom relative z-10">
          <AnimatedSection className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-6 font-montserrat">
              Our Portfolio
            </h1>
            <p className="text-xl text-white/80 max-w-3xl mx-auto">
              Explore our collection of luxury pool and spa projects. Each design is crafted with passion and precision to create extraordinary outdoor experiences.
            </p>
          </AnimatedSection>
        </div>
      </section>

      {/* Projects */}
      <section className="py-20 bg-white">
        <div className="container-custom">
          <ProjectGrid />
        </div>
      </section>
    </motion.div>
  );
};

export default PortfolioPage;