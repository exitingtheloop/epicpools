import React, { useState } from 'react';
import AnimatedSection from '../ui/AnimatedSection';
import { Compare } from '../ui/compare';
import ServiceModal from '../ui/ServiceModal';

interface Service {
  title: string;
  description: string;
  image: string;
  features: string[];
  benefits: string[];
}

const ServicesSection: React.FC = () => {
  const [selectedService, setSelectedService] = useState<Service | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const services: Service[] = [
    {
      title: "CUSTOM POOLS",
      description: "Bespoke pool designs tailored to your property and lifestyle. From infinity edges to natural lagoons, we create stunning aquatic masterpieces that transform your outdoor space.",
      image: "https://s3.us-west-1.wasabisys.com/epicpoolsimages/15SkyRanch/15skyranch_0016.jpg",
      features: [
        "Custom design and engineering",
        "Infinity edge options",
        "Natural lagoon designs",
        "Premium materials and finishes",
        "Smart pool technology integration",
        "Energy-efficient systems"
      ],
      benefits: [
        "Increased property value",
        "Personalized outdoor living space",
        "Year-round entertainment",
        "Enhanced lifestyle and wellness",
        "Reduced maintenance costs",
        "Extended swimming season"
      ]
    },
    {
      title: "LUXURY SPAS",
      description: "Premium spa installations featuring the latest in hydrotherapy and comfort technology. Experience the perfect blend of relaxation and sophistication.",
      image: "https://s3.us-west-1.wasabisys.com/epicpoolsimages/PortSeabourne/portseabourne_0010.jpg",
      features: [
        "Advanced hydrotherapy systems",
        "Custom jet configurations",
        "LED chromatherapy lighting",
        "Temperature control systems",
        "Ergonomic seating designs",
        "Premium filtration systems"
      ],
      benefits: [
        "Stress relief and relaxation",
        "Improved circulation",
        "Muscle pain relief",
        "Better sleep quality",
        "Year-round enjoyment",
        "Therapeutic benefits"
      ]
    },
    {
      title: "WATER FEATURES",
      description: "Enhance your pool with elegant fountains, waterfalls, and custom water features. Create a mesmerizing atmosphere that delights the senses.",
      image: "https://s3.us-west-1.wasabisys.com/epicpoolsimages/marywood/marywood_0025.jpg",
      features: [
        "Custom waterfalls",
        "Fountain designs",
        "LED lighting integration",
        "Rain curtains",
        "Deck jets",
        "Scuppers and spillways"
      ],
      benefits: [
        "Enhanced aesthetics",
        "Soothing ambiance",
        "Natural sound barriers",
        "Increased property value",
        "Unique focal points",
        "Customizable atmosphere"
      ]
    },
    {
      title: "RENOVATION",
      description: "Transform your existing pool and spa into a modern masterpiece. Our renovation services breathe new life into your aquatic space with contemporary features and designs.",
      image: "https://s3.us-west-1.wasabisys.com/epicpoolsimages/RidgePark/ridgepark_0001.jpg",
      features: [
        "Surface refinishing",
        "Equipment upgrades",
        "Feature additions",
        "Energy efficiency improvements",
        "Safety updates",
        "Modern technology integration"
      ],
      benefits: [
        "Improved functionality",
        "Enhanced safety",
        "Lower operating costs",
        "Modern aesthetics",
        "Increased property value",
        "Extended pool life"
      ]
    },
    {
      title: "MAINTENANCE",
      description: "Keep your investment pristine with our comprehensive maintenance and servicing packages. Our expert team ensures your pool remains in perfect condition year-round.",
      image: "https://s3.us-west-1.wasabisys.com/epicpoolsimages/MiraMonte/miramonte_0004.jpg",
      features: [
        "Regular cleaning services",
        "Water chemistry management",
        "Equipment inspections",
        "Filter maintenance",
        "Seasonal services",
        "Emergency repairs"
      ],
      benefits: [
        "Consistent water quality",
        "Extended equipment life",
        "Reduced repair costs",
        "Peace of mind",
        "Professional expertise",
        "Preventive maintenance"
      ]
    }
  ];
  
  return (
    <section>
      <div className="py-20 bg-white">
        <div className="container-custom text-center">
          <AnimatedSection>
            <h2 className="section-title">Our Services</h2>
            <p className="section-subtitle mx-auto">
              Transform your outdoor space into a luxurious retreat with custom-designed features that blend comfort and elegance.
            </p>
          </AnimatedSection>

          <AnimatedSection delay={0.2} className="mt-12">
            <Compare
              firstImage="https://s3.us-west-1.wasabisys.com/epicpoolsimages/epicpools/before_epic.jpg"
              secondImage="https://s3.us-west-1.wasabisys.com/epicpoolsimages/epicpools/after_epic.jpg"
              firstImageClassName="object-cover object-center"
              secondImageClassname="object-cover object-center"
              className="h-[300px] w-full max-w-3xl mx-auto border border-black rounded-none shadow-2xl"
              slideMode="drag"
              autoplay={false}
            />
          </AnimatedSection>
        </div>
      </div>

      {services.map((service, index) => (
        <React.Fragment key={index}>
          <div 
            className={`relative min-h-[600px] flex items-center ${
              index % 2 === 0 ? 'bg-white' : 'bg-secondary-50'
            }`}
          >
            {/* Parallax Background */}
            <div 
              className="absolute inset-0 bg-fixed bg-cover bg-center"
              style={{ 
                backgroundImage: `url(${service.image})`,
                backgroundAttachment: 'fixed'
              }}
            >
              <div className={`absolute inset-0 bg-white/70`}></div>
            </div>

            {/* Content */}
            <div className="container-custom relative z-10">
              <div className={`grid grid-cols-1 lg:grid-cols-2 gap-12 items-center ${
                index % 2 === 0 ? '' : 'lg:grid-flow-dense'
              }`}>
                <AnimatedSection className={index % 2 === 0 ? '' : 'lg:col-start-2'}>
                  <h3 className="text-lg tracking-[0.25em] mb-4 text-secondary-900 font-light">
                    {service.title}
                  </h3>
                  <p className="text-lg text-secondary-700 leading-relaxed">
                    {service.description}
                  </p>
                  <button 
                    className="px-8 py-2 mt-8 border border-black bg-white/80 text-black relative group transition duration-200"
                    onClick={() => {
                      setSelectedService(service);
                      setIsModalOpen(true);
                    }}
                  >
                    <div className="absolute -bottom-2 -right-2 bg-primary-600 h-full w-full -z-10 group-hover:bottom-0 group-hover:right-0 transition-all duration-200" />
                    <span className="relative">Learn More</span>
                  </button>
                </AnimatedSection>

                <AnimatedSection 
                  delay={0.2}
                  className={`hidden lg:block ${index % 2 === 0 ? 'lg:col-start-2' : ''}`}
                >
                  <div className="w-64 h-64 mx-auto overflow-hidden shadow-2xl transform hover:scale-105 transition-transform duration-500 serviceImgWrapper">
                    <img 
                      src={service.image} 
                      alt={service.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                </AnimatedSection>
              </div>
            </div>
          </div>
          {index < services.length - 1 && (
            <div className="border-b border-black"></div>
          )}
        </React.Fragment>
      ))}

      <ServiceModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        service={selectedService}
      />
    </section>
  );
};

export default ServicesSection;