import React from 'react';
import AnimatedSection from '../ui/AnimatedSection';
import { Award, ThumbsUp, Calendar, HeartHandshake } from 'lucide-react';

interface FeatureProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  delay: number;
}

const Feature: React.FC<FeatureProps> = ({ icon, title, description, delay }) => {
  return (
    <AnimatedSection delay={delay} className="flex items-start">
      <div className="bg-primary-50 p-3 rounded-lg text-primary-600 mr-4">
        {icon}
      </div>
      <div>
        <h3 className="text-xl font-semibold mb-2 font-montserrat">{title}</h3>
        <p className="text-secondary-600">{description}</p>
      </div>
    </AnimatedSection>
  );
};

const FeaturesSection: React.FC = () => {
  const features = [
    {
      icon: <Award size={24} />,
      title: "Premium Quality",
      description: "We use only the highest quality materials and equipment for your pool and spa installations."
    },
    {
      icon: <ThumbsUp size={24} />,
      title: "Expert Craftsmanship",
      description: "Our team of skilled professionals brings years of experience to every project we undertake."
    },
    {
      icon: <Calendar size={24} />,
      title: "Timely Delivery",
      description: "We pride ourselves on completing projects within the agreed timeframe."
    },
    {
      icon: <HeartHandshake size={24} />,
      title: "Dedicated Support",
      description: "From concept to completion and beyond, we provide ongoing support and maintenance."
    }
  ];
  
  return (
    <section className="py-20 bg-white">
      <div className="container-custom">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <AnimatedSection>
              <h2 className="section-title">Why Choose Epic Pools & Spas</h2>
              <p className="text-lg text-secondary-600 mb-8">
                We combine innovative design with superior craftsmanship to create extraordinary pool and spa experiences.
              </p>
            </AnimatedSection>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {features.map((feature, index) => (
                <Feature
                  key={index}
                  icon={feature.icon}
                  title={feature.title}
                  description={feature.description}
                  delay={0.1 + (index * 0.1)}
                />
              ))}
            </div>
          </div>
          
          <AnimatedSection delay={0.3} className="lg:pl-12 mt-8 lg:mt-0">
            <div className="relative">
              <img 
                src="https://images.pexels.com/photos/8087050/pexels-photo-8087050.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750" 
                alt="Luxury pool with water features" 
                className="rounded-lg shadow-xl w-full"
              />
              <div className="absolute -bottom-6 -left-6 md:-left-10 bg-white rounded-lg shadow-lg p-6 max-w-xs">
                <p className="text-2xl font-bold text-primary-600 mb-2 font-montserrat">15+</p>
                <p className="text-secondary-800">Years of excellence in creating luxury pool experiences</p>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;