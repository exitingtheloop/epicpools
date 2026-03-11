import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const HeroSection: React.FC = () => {
  return (
    <section className="relative h-screen flex items-center overflow-hidden">
      {/* Video Background */}
      <div className="absolute inset-0">
        <video
          autoPlay
          muted
          loop
          playsInline
          className="absolute inset-0 w-full h-full object-cover"
        >
          <source src="https://s3.us-west-1.wasabisys.com/epicpoolsvideos/epichero.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
        {/* Overlay */}
        <div
          style={{
            position: "absolute",
            top: 0,
            right: 0,
            bottom: 0,
            left: 0,
            background:
              "linear-gradient(to right, rgba(167,247,255, 0.4), rgba(30, 30, 30, 0.3))",
          }}
        ></div>
      </div>

      <div className="container-custom relative z-10">
        <div className="max-w-3xl mx-auto text-center">
          <motion.img
            src="https://s3.us-west-1.wasabisys.com/epicpoolsimages/wlogo_updated.png"
            alt="Epic Pools & Spas"
            className="w-64 md:w-96 mb-12 mx-auto"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          />
          <motion.p
            className="text-xl text-white/80 mb-8"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            Build your dream oasis with Epic Pools & Spas — Orange County and LA's leading experts in custom luxury pool and spa design.
          </motion.p>

          <motion.div
            className="flex flex-wrap gap-4 justify-center w-full"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
          >
            <Link to="/get-quote" className="btn-primary uppercase tracking-widest text-sm">
              Contact Us
            </Link>
            <Link to="/portfolio" className="btn-secondary uppercase tracking-widest text-sm">
              Portfolio
            </Link>
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 0.6 }}
      >
        <div className="flex flex-col items-center">
          <span className="text-white/80 text-sm mb-2">Scroll Down</span>
          <div className="w-0.5 h-8 bg-white/30 animate-pulse"></div>
        </div>
      </motion.div>
    </section>
  );
};

export default HeroSection;