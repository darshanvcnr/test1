import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Menu, X, Cross } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();
  const scrollToSection = sectionId => {
    if (window.location.pathname !== '/') {
      navigate('/');
      setTimeout(() => {
        const element = document.getElementById(sectionId);
        if (element) {
          element.scrollIntoView({
            behavior: 'smooth'
          });
        }
      }, 100);
    } else {
      const element = document.getElementById(sectionId);
      if (element) {
        element.scrollIntoView({
          behavior: 'smooth'
        });
      }
    }
    setIsMenuOpen(false);
  };
  const handleGiveClick = () => {
    navigate('/donations');
    setIsMenuOpen(false);
  };
  return <header className="fixed top-0 w-full z-50 bg-white/95 backdrop-blur-md border-b border-gray-200">
      <div className="container-max">
        <div className="flex items-center justify-between py-4">
          <motion.div initial={{
          opacity: 0,
          x: -20
        }} animate={{
          opacity: 1,
          x: 0
        }} className="flex items-center space-x-3 cursor-pointer" onClick={() => navigate('/')}>
            <div className="w-10 h-10 bg-gradient-to-r from-purple-600 to-blue-600 rounded-full flex items-center justify-center">
              <Cross className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-gray-900">Revival Tabernacle Ministries</h1>
              <p className="text-sm text-gray-600">Church</p>
            </div>
          </motion.div>

          <nav className="hidden md:flex items-center space-x-6">
            <button onClick={() => scrollToSection('home')} className="text-gray-700 hover:text-purple-600 transition-colors">
              Home
            </button>
            <button onClick={() => scrollToSection('activities')} className="text-gray-700 hover:text-purple-600 transition-colors">
              Activities
            </button>
            <button onClick={() => scrollToSection('programs')} className="text-gray-700 hover:text-purple-600 transition-colors">
              Programs
            </button>
            <button onClick={() => scrollToSection('gallery')} className="text-gray-700 hover:text-purple-600 transition-colors">
              Gallery
            </button>
            <button onClick={() => scrollToSection('contact')} className="text-gray-700 hover:text-purple-600 transition-colors">
              Contact
            </button>
            <Button onClick={handleGiveClick} className="btn-secondary">
              Give
            </Button>
          </nav>

          <Button variant="ghost" size="icon" className="md:hidden" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </Button>
        </div>

        {isMenuOpen && <motion.nav initial={{
        opacity: 0,
        y: -20
      }} animate={{
        opacity: 1,
        y: 0
      }} className="md:hidden py-4 border-t border-gray-200">
            <div className="flex flex-col space-y-4 px-4">
              <button onClick={() => scrollToSection('home')} className="text-left text-gray-700 hover:text-purple-600 transition-colors">
                Home
              </button>
              <button onClick={() => scrollToSection('activities')} className="text-left text-gray-700 hover:text-purple-600 transition-colors">
                Activities
              </button>
              <button onClick={() => scrollToSection('programs')} className="text-left text-gray-700 hover:text-purple-600 transition-colors">
                Programs
              </button>
              <button onClick={() => scrollToSection('gallery')} className="text-left text-gray-700 hover:text-purple-600 transition-colors">
                Gallery
              </button>
              <button onClick={() => scrollToSection('contact')} className="text-left text-gray-700 hover:text-purple-600 transition-colors">
                Contact
              </button>
              <Button onClick={handleGiveClick} className="w-full btn-secondary mt-4">
                Give
              </Button>
            </div>
          </motion.nav>}
      </div>
    </header>;
}
export default Header;