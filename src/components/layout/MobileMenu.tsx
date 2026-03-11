import React from 'react';
import { Link } from 'react-router-dom';
import { X } from 'lucide-react';

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
  activePath: string;
}

const MobileMenu: React.FC<MobileMenuProps> = ({ isOpen, onClose, activePath }) => {
  const isActivePath = (path: string) => activePath === path;

  return (
    <div
      className={`fixed inset-0 bg-black bg-opacity-50 transition-opacity duration-300 z-[100] ${
        isOpen
          ? "opacity-100 pointer-events-auto"
          : "opacity-0 pointer-events-none"
      }`}
      onClick={onClose}
    >
      <div
        className={`fixed inset-y-0 right-0 w-full max-w-sm bg-white/60 backdrop-blur-2xl shadow-xl transform transition-transform duration-300 ease-in-out z-[101] ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="container-custom h-full flex flex-col">
          <div className="flex justify-end py-6">
            <button
              onClick={onClose}
              className="text-secondary-900"
              aria-label="Close menu"
            >
              <X size={24} />
            </button>
          </div>

          <div className="flex flex-col items-center justify-center flex-grow space-y-8 text-center">
            <Link
              to="/"
              className={`text-2xl font-medium uppercase tracking-widest ${
                isActivePath("/") ? "text-primary-600" : "text-secondary-900"
              }`}
              onClick={onClose}
            >
              Home
            </Link>
            <Link
              to="/portfolio"
              className={`text-2xl font-medium uppercase tracking-widest ${
                isActivePath("/portfolio") ? "text-primary-600" : "text-secondary-900"
              }`}
              onClick={onClose}
            >
              Portfolio
            </Link>
            <Link
              to="/about"
              className={`text-2xl font-medium uppercase tracking-widest ${
                isActivePath("/about") ? "text-primary-600" : "text-secondary-900"
              }`}
              onClick={onClose}
            >
              About
            </Link>
            <Link
              to="/contact"
              className={`text-2xl font-medium uppercase tracking-widest ${
                isActivePath("/contact") ? "text-primary-600" : "text-secondary-900"
              }`}
              onClick={onClose}
            >
              Contact
            </Link>
            <Link
              to="/get-quote"
              className="btn-primary text-xl px-8 py-4 uppercase tracking-widest"
              onClick={onClose}
            >
              Get a Quote
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MobileMenu;