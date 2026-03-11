import React from "react";
import { Link } from "react-router-dom";
import {
  Droplet,
  MapPin,
  Phone,
  Mail,
  Instagram,
  Facebook,
  Twitter,
  Linkedin,
} from "lucide-react";

const Footer: React.FC = () => {
  return (
    <footer className="bg-secondary-900 text-white pt-16 pb-8">
      <div className="container-custom">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 pb-8">
          {/* Company Info */}
          <div>
            <Link to="/" className="hidden md:flex items-center space-x-2">
              <img
                src="https://s3.us-west-1.wasabisys.com/epicpoolsimages/wepiclogo_updated.png"
                alt="Epic Pools & Spas"
                className="h-15 opacity-100"
              />
            </Link>
            <Link
              to="/"
              className="md:hidden flex justify-center w-full space-x-2"
            >
              <img
                src="https://s3.us-west-1.wasabisys.com/epicpoolsimages/wepiclogo_updated.png"
                alt="Epic Pools & Spas"
                className="h-10 opacity-100"
                style={{ marginBottom: "20px" }}
              />
            </Link>
            <p className="text-secondary-300 mb-6">
              Creating breathtaking luxury pool and spa experiences that
              transform your property into a paradise.
            </p>
            <div className="flex space-x-4">
              <a
                href="http://instagram.com/EpicPoolsOC"
                className="text-white hover:text-primary-400 transition-colors"
                aria-label="Instagram"
              >
                <Instagram size={20} />
              </a>
              <a
                href="https://www.facebook.com/profile.php?id=61572526181720"
                className="text-white hover:text-primary-400 transition-colors"
                aria-label="Facebook"
              >
                <Facebook size={20} />
              </a>
              {/*<a
                href="#"
                className="text-white hover:text-primary-400 transition-colors"
                aria-label="Twitter"
              >
                <Twitter size={20} />
              </a>
              <a
                href="#"
                className="text-white hover:text-primary-400 transition-colors"
                aria-label="LinkedIn"
              >
                <Linkedin size={20} />
              </a>*/}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-1xl uppercase font-semibold mb-4 font-montserrat">
              Quick Links
            </h3>
            <ul className="space-y-2">
              <li>
                <Link
                  to="/"
                  className="text-secondary-300 hover:text-primary-400 transition-colors"
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  to="/portfolio"
                  className="text-secondary-300 hover:text-primary-400 transition-colors"
                >
                  Portfolio
                </Link>
              </li>
              <li>
                <Link
                  to="/about"
                  className="text-secondary-300 hover:text-primary-400 transition-colors"
                >
                  About Us
                </Link>
              </li>
              <li>
                <Link
                  to="/contact"
                  className="text-secondary-300 hover:text-primary-400 transition-colors"
                >
                  Contact
                </Link>
              </li>
              <li>
                <Link
                  to="/get-quote"
                  className="text-secondary-300 hover:text-primary-400 transition-colors"
                >
                  Get a Quote
                </Link>
              </li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-1xl uppercase font-semibold mb-4 font-montserrat">
              Services
            </h3>
            <ul className="space-y-2">
              <li>
                <a
                  href="#"
                  className="text-secondary-300 hover:text-primary-400 transition-colors"
                >
                  Custom Pool Design
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-secondary-300 hover:text-primary-400 transition-colors"
                >
                  Luxury Spa Installation
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-secondary-300 hover:text-primary-400 transition-colors"
                >
                  Pool Renovation
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-secondary-300 hover:text-primary-400 transition-colors"
                >
                  Water Features
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-secondary-300 hover:text-primary-400 transition-colors"
                >
                  Maintenance Services
                </a>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-1xl uppercase font-semibold mb-4 font-montserrat">
              Contact Us
            </h3>
            <ul className="space-y-4">
              <li className="flex items-start">
                <MapPin className="mr-3 h-5 w-5 text-primary-400 flex-shrink-0 mt-0.5" />
                <span className="text-secondary-300">
                  4749 E Wesley Avenue Anaheim, CA 92807
                </span>
              </li>
              <li className="flex items-center">
                <Phone className="mr-3 h-5 w-5 text-primary-400" />
                <span className="text-secondary-300">(949) 381-1827</span>
              </li>
              <li className="flex items-center">
                <Mail className="mr-3 h-5 w-5 text-primary-400" />
                <span className="text-secondary-300">
                  Epicpoolsusa@gmail.com
                </span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="pt-8 border-t border-secondary-700 text-center sm:text-left">
          <p className="text-secondary-400 text-sm">
            &copy; {new Date().getFullYear()} Epic Pools & Spas. All rights
            reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;