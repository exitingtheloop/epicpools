import React from 'react';
import AnimatedSection from '../ui/AnimatedSection';
import { DollarSign, Clock, ThumbsUp, CheckCircle } from 'lucide-react';

const FinancingSection: React.FC = () => {
  const features = [
    {
      icon: <CheckCircle className="w-6 h-6" />,
      title: "Simple Process",
      description: "Easy online application process"
    },
    {
      icon: <Clock className="w-6 h-6" />,
      title: "Same-Day Qualifications",
      description: "Same-day answers through a consultant"
    },
    {
      icon: <DollarSign className="w-6 h-6" />,
      title: "Low-Fixed Rates",
      description: "Budget-friendly rates that never fluctuate"
    },
    {
      icon: <ThumbsUp className="w-6 h-6" />,
      title: "Flexible Terms",
      description: "Choose terms that fit your budget"
    }
  ];

  return (
    <section className="py-20 bg-gradient-to-b from-white to-primary-50">
      <div className="container-custom">
        <div className="border-2 border-black p-8 md:p-12">
          <AnimatedSection className="text-center mb-16">
            <h2 className="section-title">Financing Available</h2>
            <p className="section-subtitle mx-auto">
              Take action on your dream oasis now, pay over time with flexible financing options
            </p>
          </AnimatedSection>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <AnimatedSection className="order-2 lg:order-1">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                {features.map((feature, index) => (
                  <div 
                    key={index}
                    className="bg-white p-6 shadow-lg transform hover:-translate-y-1 transition-transform duration-300"
                  >
                    <div className="text-primary-600 mb-4">
                      {feature.icon}
                    </div>
                    <h3 className="text-lg font-semibold mb-2">
                      {feature.title}
                    </h3>
                    <p className="text-secondary-600 font-light">
                      {feature.description}
                    </p>
                  </div>
                ))}
              </div>
            </AnimatedSection>

            <AnimatedSection delay={0.2} className="order-1 lg:order-2 text-center lg:text-left border border-primary-600">
              <div className="relative overflow-hidden">
                <div 
                  className="absolute inset-0 bg-cover bg-center"
                  style={{ 
                    backgroundImage: "url('https://s3.us-west-1.wasabisys.com/epicpoolsimages/LaHermosa/LaHermosa_0018.jpg')"
                  }}
                />
                <div className="absolute inset-0 bg-white/80" />
                <div className="relative z-10 p-8">
                  <h3 className="text-2xl font-normal uppercase mb-4 text-secondary-900">
                    Ready to Start?
                  </h3>
                  <p className="text-secondary-700 mb-8 text-lg font-light">
                    Get pre-qualified in seconds with no impact to your credit score.
                  </p>
                  <a 
                    href="https://www.hfsfinancial.net/promo/67ca98435de97c1feaee688d/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center px-8 py-4 text-lg font-semibold text-white bg-primary-600 hover:bg-white hover:text-black transition-colors duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
                  >
                    Get Funded
                  </a>
                </div>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FinancingSection;