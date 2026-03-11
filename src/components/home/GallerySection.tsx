import React from 'react';
import { BentoCell, BentoGrid, ContainerScale, ContainerScroll } from '../ui/hero-gallery-scroll-animation';
import { Button } from '../ui/button';
import { useInView } from 'react-intersection-observer';

const IMAGES = [
  "https://images.pexels.com/photos/261327/pexels-photo-261327.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750",
  "https://images.pexels.com/photos/261041/pexels-photo-261041.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750",
  "https://images.pexels.com/photos/261422/pexels-photo-261422.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750",
  "https://images.pexels.com/photos/261411/pexels-photo-261411.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750",
  "https://images.pexels.com/photos/261283/pexels-photo-261283.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750",
];

const GallerySection: React.FC = () => {
  const { ref, inView } = useInView({
    threshold: 0.1,
    triggerOnce: true // Change to true to maintain visibility once triggered
  });

  return (
    <div ref={ref} className="relative">
      <ContainerScroll className="h-[350vh]">
        <BentoGrid className={`sticky left-0 top-0 z-0 h-screen w-full p-4 transition-opacity duration-500 ${inView ? 'opacity-100' : 'opacity-0'}`}>
          {IMAGES.map((imageUrl, index) => (
            <BentoCell
              key={index}
              className="overflow-hidden rounded-xl shadow-xl"
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: inView ? 1 : 0, scale: inView ? 1 : 0.5 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <img
                className="size-full object-cover object-center"
                src={imageUrl}
                alt="Luxury pool design"
              />
            </BentoCell>
          ))}
        </BentoGrid>

        <ContainerScale 
          className="relative z-10 text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: inView ? 1 : 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
        >
          <h2 className="max-w-xl text-5xl font-bold tracking-tighter text-slate-800">
            Transforming Dreams Into Reality
          </h2>
          <p className="my-6 max-w-xl text-sm text-slate-700 md:text-base">
            Experience the epitome of luxury pool design. Our portfolio showcases the perfect blend of innovation, craftsmanship, and timeless elegance.
          </p>
          <div className="flex items-center justify-center gap-4">
            <Button className="bg-primary-600 px-6 py-3 font-medium hover:bg-primary-700">
              View Our Portfolio
            </Button>
            <Button
              variant="link"
              className="bg-transparent px-6 py-3 font-medium text-primary-600"
            >
              Learn More
            </Button>
          </div>
        </ContainerScale>
      </ContainerScroll>
    </div>
  );
};

export default GallerySection;