import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu } from "lucide-react";
import MobileMenu from "./MobileMenu";

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const isActivePath = (path: string) => location.pathname === path;

  return (
    <>
      <nav
        className={`fixed w-full z-50 transition-all duration-300 ${
          isScrolled ? "bg-white/60 backdrop-blur-sm shadow-md py-2 scrolled" : "bg-transparent py-4"
        }`}
      >
        <div className="container-custom flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="hidden md:flex items-center space-x-2">
            <img
              src={isScrolled ? "https://s3.us-west-1.wasabisys.com/epicpoolsimages/bepiclogo_updated.png" : "https://s3.us-west-1.wasabisys.com/epicpoolsimages/bepiclogo_updated.png"}
              alt="Epic Pools & Spas"
              className={`transition-all duration-300 ${
                isScrolled ? "h-12 opacity-100" : "h-12 brightness-0 invert"
              }`}
            />
          </Link>
          <Link to="/" className="md:hidden items-center space-x-2">
            <img
              src={isScrolled ? "https://s3.us-west-1.wasabisys.com/epicpoolsimages/bepiclogo_updated.png" : "https://s3.us-west-1.wasabisys.com/epicpoolsimages/wepiclogo_updated.png"}
              alt="Epic Pools & Spas"
              className={`transition-all duration-300 ${
                isScrolled ? "h-12 opacity-100" : "h-12 brightness-0 invert"
              }`}
            />
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-8">
            <Link
              to="/"
              className={`navbar-link uppercase tracking-widest text-sm ${
                isActivePath("/") ? (isScrolled ? "text-primary-600 after:bg-primary-600" : "text-white after:bg-white") + " active" : ""
              } ${isScrolled ? "after:bg-primary-600" : "text-white font-bold after:bg-white"}`}
            >
              Home
            </Link>
            <Link
              to="/portfolio"
              className={`navbar-link uppercase tracking-widest text-sm ${
                isActivePath("/portfolio") ? (isScrolled ? "text-primary-600 after:bg-primary-600" : "text-white after:bg-white") + " active" : ""
              } ${isScrolled ? "after:bg-primary-600" : "text-white font-bold after:bg-white"}`}
            >
              Portfolio
            </Link>
            <Link
              to="/about"
              className={`navbar-link uppercase tracking-widest text-sm ${
                isActivePath("/about") ? (isScrolled ? "text-primary-600 after:bg-primary-600" : "text-white after:bg-white") + " active" : ""
              } ${isScrolled ? "after:bg-primary-600" : "text-white font-bold after:bg-white"}`}
            >
              About
            </Link>
            <Link
              to="/contact"
              className={`navbar-link uppercase tracking-widest text-sm ${
                isActivePath("/contact") ? (isScrolled ? "text-primary-600 after:bg-primary-600" : "text-white after:bg-white") + " active" : ""
              } ${isScrolled ? "after:bg-primary-600" : "text-white font-bold after:bg-white"}`}
            >
              Contact
            </Link>
            <Link to="/get-quote" className="btn-primary uppercase tracking-widest text-sm">
              Get a Quote
            </Link>
          </div>

          {/* Mobile menu button */}
          <button
            className={`md:hidden ${
              isScrolled ? "text-secondary-900" : "text-white"
            }`}
            onClick={() => setIsOpen(true)}
            aria-label="Toggle menu"
          >
            <Menu size={24} />
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      <MobileMenu 
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        activePath={location.pathname}
      />
    </>
  );
};

export default Navbar;