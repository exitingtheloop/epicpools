import React from 'react';
import { Link } from 'react-router-dom';
import AnimatedSection from '../ui/AnimatedSection';

const CtaSection: React.FC = () => {
  return (
    <section className="py-20 relative">
      {/* Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ 
          backgroundImage: "url('https://s3.us-west-1.wasabisys.com/epicpoolsimages/LaHermosa/LaHermosa_0018.jpg')",
        }}
      >
        {/* Overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-primary-900/70 to-secondary-900/90"></div>
      </div>
      
      <div className="container-custom relative z-10">
        <AnimatedSection className="text-center max-w-3xl mx-auto">
          <h2 className="text-1xl uppercase md:text-3xl font-semibold text-white mb-6 font-montserrat">
            Ready to Transform Your Space?
          </h2>
          <p className="text-xl text-white/90 mb-10">
            Lets create the pool or spa of your dreams. Get in touch today for a personalized consultation.
          </p>
          <Link 
            to="/get-quote" 
            className="btn-primary text-lg px-8 py-4 bg-white text-primary-600 hover:bg-white hover:text-black"
          >
            Request Your Free Quote
          </Link>
        </AnimatedSection>
      </div>
    </section>
  );
};

export default CtaSection;