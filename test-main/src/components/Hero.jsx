import React from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { MapPin, Clock, Phone } from 'lucide-react';

function Hero() {
  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0 hero-gradient"></div>
      
      {/* Hero Image */}
      <div className="absolute inset-0 z-0">
        <img  
          alt="Beautiful church sanctuary with stained glass windows and warm lighting"
          className="w-full h-full object-cover opacity-30"
         src="https://images.unsplash.com/photo-1464373849006-1c4fcb1e0d72" />
      </div>

      <div className="relative z-10 container-max text-center text-white">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="space-y-6"
        >
          <h1 className="text-5xl md:text-7xl font-display font-bold leading-tight">
            Welcome to
            <span className="block gradient-text">Revival Tabernacle Ministries</span>
            <span className="block">Church</span>
          </h1>
          
          <p className="text-xl md:text-2xl max-w-3xl mx-auto leading-relaxed">
            Experience the transforming power of God in a community where faith comes alive, 
            hearts are healed, and lives are changed forever.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mt-8">
            <Button
              onClick={() => scrollToSection('contact')}
              className="btn-primary text-lg px-8 py-4"
            >
              Join Us This Sunday
            </Button>
            <Button
              onClick={() => scrollToSection('activities')}
              variant="outline"
              className="text-lg px-8 py-4 border-white text-white hover:bg-white hover:text-gray-900"
            >
              Learn More
            </Button>
          </div>
        </motion.div>

        {/* Church Info Cards */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="grid md:grid-cols-3 gap-6 mt-16"
        >
          <div className="glass-effect rounded-lg p-6 text-center">
            <MapPin className="w-8 h-8 mx-auto mb-3 text-yellow-400" />
            <h3 className="font-semibold mb-2">Location</h3>
            <p className="text-sm">1st Floor, MG Rd, Jyothi Nagar,<br />Nelamangala, Bangalore, Karnataka - 562123</p>
          </div>
          
          <div className="glass-effect rounded-lg p-6 text-center">
            <Clock className="w-8 h-8 mx-auto mb-3 text-yellow-400" />
            <h3 className="font-semibold mb-2">Service Times</h3>
            <p className="text-sm">Sunday: 10:00 AM & 12:30 PM<br />Wednesday: 7:00 PM</p>
          </div>
          
          <div className="glass-effect rounded-lg p-6 text-center">
            <Phone className="w-8 h-8 mx-auto mb-3 text-yellow-400" />
            <h3 className="font-semibold mb-2">Contact</h3>
            <p className="text-sm">+91 9036153751<br />info@gracepentecostal.org</p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

export default Hero;