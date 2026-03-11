import React from 'react';
import { motion } from 'framer-motion';
import AnimatedSection from '../components/ui/AnimatedSection';
import { Award, Users, Gem, Heart, Hammer } from 'lucide-react';
import { FeatureSteps } from '../components/ui/feature-steps';

const features = [
  {
    step: 'Step 1',
    title: 'Concept',
    content: 'Share your vision, and we\'ll guide you through sketches, mood boards, and material previews to bring it to life. We use visuals, 3D renderings, and past work to ensure your design goals are clearly captured and aligned.',
    image: 'https://images.pexels.com/photos/7319307/pexels-photo-7319307.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750'
  },
  {
    step: 'Step 2',
    title: 'Development',
    content: 'We refine the concept into a finalized design with detailed plans, specifications, and schedules. This process ensures every element is aligned, and Epic Pools and Spas delivers with precision to meet your goals on time.',
    image: 'https://images.pexels.com/photos/8486972/pexels-photo-8486972.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750'
  },
  {
    step: 'Step 3',
    title: 'Delivery',
    content: 'Our team and trusted partners bring the approved design to life, closely following every detail through to completion. With daily quality checks and dedicated oversight, Epic Pools and Spas ensures flawless execution and strict adherence to the plan.',
    image: 'https://images.pexels.com/photos/8293778/pexels-photo-8293778.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750'
  },
  {
    step: 'Step 4',
    title: 'Completion',
    content: 'Epic Pools and Spas\' design team expertly manages the transformation, coordinating all trades and ensuring every detail meets the highest standards. From start to final presentation, we deliver a polished, move-in-ready home.',
    image: 'https://s3.us-west-1.wasabisys.com/epicpoolsimages/15SkyRanch/15skyranch_0048.jpg'
  },
];

const AboutPage: React.FC = () => {
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
            backgroundImage: "url('https://images.pexels.com/photos/6186523/pexels-photo-6186523.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750')",
          }}
        ></div>
        <div className="container-custom relative z-10">
          <AnimatedSection className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-6 font-montserrat">
              About Epic Pools & Spas
            </h1>
            <p className="text-xl text-white/80 max-w-3xl mx-auto">
              We\'re passionate about creating extraordinary aquatic experiences that transform properties and enrich lives.
            </p>
          </AnimatedSection>
        </div>
      </section>

      {/* Our Story */}
      <section className="py-20 bg-white">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
            <AnimatedSection>
              <img 
                src="https://images.pexels.com/photos/261330/pexels-photo-261330.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750" 
                alt="Epic Pools & Spas Team" 
                className="lg shadow-xl"
              />
            </AnimatedSection>
            
            <AnimatedSection delay={0.2}>
              <h2 className="section-title">Our Story</h2>
              <p className="text-lg text-secondary-700 mb-6">
                Since 2018, our journey as a swimming pool contractor has been rooted in a passion for craftsmanship, design, and creating backyard spaces that bring families together. What began as a small, hands-on operation has grown into a full-service company driven by dedication, transparency, and a strong work ethic. We started with one mission in mind—deliver high-quality pools and outdoor spaces that enhance lifestyles and add lasting value to our clients’ homes.
              </p>
              <p className="text-lg text-secondary-700 mb-6">
                Over the years, we’ve expanded our capabilities to include not only new pool construction but also remodeling, custom outdoor living designs, and ongoing maintenance services. We bring together skilled tradespeople, innovative technology, and personalized design to ensure each project reflects the client’s vision. Our process is streamlined yet flexible, with clear communication and attention to detail at every phase—from design and permitting to excavation, plumbing, and finishing touches.
              </p>
              <p className="text-lg text-secondary-700 mb-6">
                Choosing us means partnering with a team that values integrity and stands behind its work. We treat every backyard as if it were our own, never cutting corners and always focusing on safety, aesthetics, and functionality. Whether you're building a brand-new pool or transforming an existing space, our experience, commitment to quality, and customer-first mindset make us the best option to bring your outdoor dreams to life.
              </p>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* Our Design Process */}
      <FeatureSteps
        features={features}
        title="Our Design Process"
        autoPlayInterval={4000}
        className="bg-white"
      />
      
      {/* Our Values */}
      <section className="py-20 bg-secondary-50">
        <div className="container-custom">
          <AnimatedSection className="text-center mb-16">
            <h2 className="section-title">Our Core Values</h2>
            <p className="section-subtitle mx-auto">
              These principles guide everything we do and define who we are as a company.
            </p>
          </AnimatedSection>
          
          <div className="grid grid-cols-1 gap-8 max-w-2xl mx-auto">
            {[
              {
                icon: <Award className="h-12 w-12 mb-6 text-primary-600" />,
                title: "Integrity",
                description: "100% honest, 100% of the time"
              },
              {
                icon: <Gem className="h-12 w-12 mb-6 text-primary-600" />,
                title: "Work Ethic",
                description: "Give customers, Epic Pools and Spas, and your co-workers maximum effort everyday."
              },
              {
                icon: <Users className="h-12 w-12 mb-6 text-primary-600" />,
                title: "Team Work",
                description: "Support and work together with everyone within the organization"
              },
              {
                icon: <Heart className="h-12 w-12 mb-6 text-primary-600" />,
                title: "Accountability",
                description: "Acknowledge & learn from your mistakes, and commit the same mistakes do not reoccur"
              },
              {
                icon: <Hammer className="h-12 w-12 mb-6 text-primary-600" />,
                title: "Quality of Work",
                description: "Ensure that your work is completed promptly and void of error"
              }
            ].map((value, index) => (
              <AnimatedSection 
                key={index} 
                delay={0.1 * index} 
                className="bg-white p-8 lg shadow-md text-center"
              >
                <div className="flex justify-center">{value.icon}</div>
                <h3 className="text-xl font-bold mb-3 font-montserrat">{value.title}</h3>
                <p className="text-secondary-600">{value.description}</p>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>
    </motion.div>
  );
};

export default AboutPage;