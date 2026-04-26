import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'About', path: '/about' },
    { name: 'Services', path: '/services' },
    { name: 'Contact', path: '/contact' },
  ];

  const isActive = (path) => location.pathname === path;

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-white/95 backdrop-blur-md shadow-lg py-3'
          : 'bg-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-green-500 rounded-full flex items-center justify-center">
              <span className="text-white text-xl font-bold">+</span>
            </div>
            <span className={`font-bold text-xl transition-colors duration-300 ${
              isScrolled ? 'text-gray-800' : 'text-gray-800'
            }`}>
              HealthCare<span className="text-blue-600">Support</span>
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-1">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                className={`px-4 py-2 rounded-lg font-medium transition-all duration-300 ${
                  isActive(link.path)
                    ? 'bg-blue-600 text-white'
                    : isScrolled
                    ? 'text-gray-700 hover:bg-blue-50 hover:text-blue-600'
                    : 'text-gray-700 hover:bg-white/50 hover:text-blue-600'
                }`}
              >
                {link.name}
              </Link>
            ))}
          </div>

          {/* CTA Buttons */}
          <div className="hidden md:flex items-center space-x-3">
            <Link
              to="/patient"
              className="px-5 py-2.5 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/30"
            >
              Get Help
            </Link>
            <Link
              to="/volunteer"
              className="px-5 py-2.5 bg-green-500 text-white rounded-lg font-medium hover:bg-green-600 transition-all duration-300 hover:shadow-lg hover:shadow-green-500/30"
            >
              Volunteer
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              {isOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="md:hidden mt-4 pb-4">
            <div className="flex flex-col space-y-2">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  to={link.path}
                  onClick={() => setIsOpen(false)}
                  className={`px-4 py-3 rounded-lg font-medium transition-all ${
                    isActive(link.path)
                      ? 'bg-blue-600 text-white'
                      : 'text-gray-700 hover:bg-blue-50'
                  }`}
                >
                  {link.name}
                </Link>
              ))}
              <div className="pt-2 flex flex-col space-y-2">
                <Link
                  to="/patient"
                  onClick={() => setIsOpen(false)}
                  className="px-4 py-3 bg-blue-600 text-white rounded-lg font-medium text-center"
                >
                  Get Help
                </Link>
                <Link
                  to="/volunteer"
                  onClick={() => setIsOpen(false)}
                  className="px-4 py-3 bg-green-500 text-white rounded-lg font-medium text-center"
                >
                  Volunteer
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;