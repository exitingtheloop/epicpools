import React from 'react';
import { Link } from 'react-router-dom';
import AnimatedSection from '../ui/AnimatedSection';
import { ArrowRight } from 'lucide-react';
import ProjectGrid from '../portfolio/ProjectGrid';

const PortfolioPreview: React.FC = () => {
  return (
    <section className="py-20">
      <div className="container-custom">
        <AnimatedSection className="text-center mb-16">
          <h2 className="section-title">Our Recent Projects</h2>
          <p className="section-subtitle mx-auto">
            Explore our portfolio of luxury swimming pools and spa designs that showcase our expertise and attention to detail.
          </p>
        </AnimatedSection>

        <ProjectGrid limit={3} showFilters={false} />
        
        <AnimatedSection className="text-center mt-12">
          <Link to="/portfolio" className="btn-outline inline-flex items-center">
            View All Projects
            <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </AnimatedSection>
      </div>
    </section>
  );
};

export default PortfolioPreview;