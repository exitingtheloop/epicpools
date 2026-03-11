import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import AnimatedSection from "../ui/AnimatedSection";
import { Star, ChevronLeft, ChevronRight } from "lucide-react";

interface Testimonial {
  id: number;
  name: string;
  location: string;
  rating: number;
  text: string;
  image: string;
}

const testimonials: Testimonial[] = [
  {
    id: 1,
    name: "Emily & John Peterson",
    location: "Beverly Hills, CA",
    rating: 5,
    text: "Epic Pools & Spas transformed our backyard into a luxury resort. Their attention to detail and commitment to excellence exceeded our expectations.",
    image:
      "https://images.pexels.com/photos/5409506/pexels-photo-5409506.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750",
  },
  {
    id: 2,
    name: "Michael Thompson",
    location: "Malibu, CA",
    rating: 5,
    text: "The design team at Epic Pools & Spas created the perfect infinity pool for our oceanfront property. The craftsmanship is impeccable.",
    image:
      "https://images.pexels.com/photos/6580541/pexels-photo-6580541.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750",
  },
  {
    id: 3,
    name: "Sophia & Robert Wilson",
    location: "Laguna Beach, CA",
    rating: 5,
    text: "From concept to completion, working with Epic Pools & Spas was a pleasure. They listened to our ideas and brought them to life beautifully.",
    image:
      "https://images.pexels.com/photos/696218/pexels-photo-696218.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750",
  },
  {
    id: 4,
    name: "Emily & John Peterson",
    location: "Beverly Hills, CA",
    rating: 5,
    text: "Epic Pools & Spas transformed our backyard into a luxury resort. Their attention to detail and commitment to excellence exceeded our expectations.",
    image:
      "https://images.pexels.com/photos/5409506/pexels-photo-5409506.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750",
  },
  {
    id: 5,
    name: "Michael Thompson",
    location: "Malibu, CA",
    rating: 5,
    text: "The design team at Epic Pools & Spas created the perfect infinity pool for our oceanfront property. The craftsmanship is impeccable.",
    image:
      "https://images.pexels.com/photos/6580541/pexels-photo-6580541.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750",
  },
  {
    id: 6,
    name: "Sophia & Robert Wilson",
    location: "Laguna Beach, CA",
    rating: 5,
    text: "From concept to completion, working with Epic Pools & Spas was a pleasure. They listened to our ideas and brought them to life beautifully.",
    image:
      "https://images.pexels.com/photos/696218/pexels-photo-696218.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750",
  },
];

const TestimonialSection: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [autoplay, setAutoplay] = useState(true);

  const nextTestimonial = () => {
    setActiveIndex((current) => (current + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setActiveIndex(
      (current) => (current - 1 + testimonials.length) % testimonials.length
    );
  };

  useEffect(() => {
    if (!autoplay) return;

    const interval = setInterval(nextTestimonial, 1000);
    return () => clearInterval(interval);
  }, [autoplay]);

  return (
    <section className="py-20 bg-white">
      <div className="container-custom">
        <AnimatedSection className="text-center mb-16">
          <h2 className="section-title">What Our Clients Say</h2>
          <p className="section-subtitle mx-auto">
            Hear from homeowners who have experienced the Epic Pools & Spas
            difference.
          </p>
        </AnimatedSection>

        <div
          className="relative max-w-4xl mx-auto"
          onMouseEnter={() => setAutoplay(false)}
          onMouseLeave={() => setAutoplay(true)}
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={activeIndex}
              initial={{ opacity: 0, x: 100 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -100 }}
              transition={{
                type: "tween",
                ease: "easeInOut",
                duration: 0.5,
              }}
              className="bg-white rounded-xl shadow-xl overflow-hidden"
            >
              <div className="grid md:grid-cols-2">
                <div className="h-64 md:h-auto">
                  <img
                    src={testimonials[activeIndex].image}
                    alt={testimonials[activeIndex].name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-8 md:p-10 flex flex-col justify-center">
                  <div className="flex mb-4">
                    {[...Array(testimonials[activeIndex].rating)].map(
                      (_, i) => (
                        <Star
                          key={i}
                          className="text-yellow-400 fill-yellow-400"
                          size={20}
                        />
                      )
                    )}
                  </div>
                  <blockquote className="text-lg text-secondary-800 italic mb-6">
                    "{testimonials[activeIndex].text}"
                  </blockquote>
                  <div>
                    <p className="font-bold text-secondary-900 font-montserrat">
                      {testimonials[activeIndex].name}
                    </p>
                    <p className="text-secondary-600 text-sm">
                      {testimonials[activeIndex].location}
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Navigation */}
          <div className="flex justify-between absolute top-1/2 -translate-y-1/2 left-4 right-4">
            <button
              onClick={prevTestimonial}
              className="bg-white/80 hover:bg-white text-secondary-800 rounded-full p-2 shadow-md transition-all"
              aria-label="Previous testimonial"
            >
              <ChevronLeft size={24} />
            </button>
            <button
              onClick={nextTestimonial}
              className="bg-white/80 hover:bg-white text-secondary-800 rounded-full p-2 shadow-md transition-all"
              aria-label="Next testimonial"
            >
              <ChevronRight size={24} />
            </button>
          </div>
        </div>

        {/* Dots */}
        <div className="flex justify-center mt-8">
          {testimonials.map((_, index) => (
            <button
              key={index}
              className={`dot ${
                index === activeIndex ? "active" : "bg-secondary-300"
              }`}
              onClick={() => setActiveIndex(index)}
              aria-label={`Go to testimonial ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialSection;
