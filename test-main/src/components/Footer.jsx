import React from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';
import { Cross, Youtube, Facebook, Instagram, Mail, Phone, MapPin } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
function Footer() {
  const {
    toast
  } = useToast();
  const navigate = useNavigate();
  const handleSocialClick = platform => {
    toast({
      title: "🚧 Social Media Links Coming Soon!",
      description: "This feature isn't implemented yet—but don't worry! You can request it in your next prompt! 🚀"
    });
  };
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
  };
  return <footer className="bg-gray-900 text-white">
      <div className="container-max section-padding">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          <motion.div initial={{
          opacity: 0,
          y: 20
        }} whileInView={{
          opacity: 1,
          y: 0
        }} transition={{
          duration: 0.6
        }} viewport={{
          once: true
        }} className="space-y-4">
            <div className="flex items-center space-x-3 cursor-pointer" onClick={() => navigate('/')}>
              <div className="w-10 h-10 bg-gradient-to-r from-purple-600 to-blue-600 rounded-full flex items-center justify-center">
                <Cross className="w-6 h-6 text-white" />
              </div>
              <div>
                <span className="text-xl font-bold">Revival Tabernacle Ministries</span>
                <p className="text-sm text-gray-400">Church</p>
              </div>
            </div>
            <p className="text-gray-300 leading-relaxed">
              A vibrant community where faith comes alive, hearts are healed, 
              and lives are transformed by God's love.
            </p>
          </motion.div>

          <motion.div initial={{
          opacity: 0,
          y: 20
        }} whileInView={{
          opacity: 1,
          y: 0
        }} transition={{
          duration: 0.6,
          delay: 0.1
        }} viewport={{
          once: true
        }} className="space-y-4">
            <span className="text-lg font-semibold">Quick Links</span>
            <div className="space-y-2 flex flex-col items-start">
              <button onClick={() => scrollToSection('activities')} className="text-gray-300 hover:text-white transition-colors">Activities</button>
              <button onClick={() => scrollToSection('programs')} className="text-gray-300 hover:text-white transition-colors">Programs</button>
              <button onClick={() => scrollToSection('gallery')} className="text-gray-300 hover:text-white transition-colors">Gallery</button>
              <button onClick={() => scrollToSection('contact')} className="text-gray-300 hover:text-white transition-colors">Contact</button>
              <button onClick={() => navigate('/donations')} className="text-gray-300 hover:text-white transition-colors">Give</button>
              <button
                onClick={() => window.open('/songs', '_blank')}
                className="text-gray-300 hover:text-white transition-colors"
              >
                Song Book
              </button>
            </div>
          </motion.div>

          <motion.div initial={{
          opacity: 0,
          y: 20
        }} whileInView={{
          opacity: 1,
          y: 0
        }} transition={{
          duration: 0.6,
          delay: 0.2
        }} viewport={{
          once: true
        }} className="space-y-4">
            <span className="text-lg font-semibold">Contact</span>
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <MapPin className="w-5 h-5 text-purple-400" />
                <span className="text-gray-300 text-sm">1st Floor, MG Rd, Jyothi Nagar, Nelamangala, Bangalore, Karnataka - 562123</span>
              </div>
              <div className="flex items-center space-x-3">
                <Phone className="w-5 h-5 text-purple-400" />
                <span className="text-gray-300 text-sm">+91 9036153751</span>
              </div>
              <div className="flex items-center space-x-3">
                <Mail className="w-5 h-5 text-purple-400" />
                <span className="text-gray-300 text-sm">rtm.church@revivaltabernacleministries.in</span>
              </div>
            </div>
          </motion.div>

          <motion.div initial={{
          opacity: 0,
          y: 20
        }} whileInView={{
          opacity: 1,
          y: 0
        }} transition={{
          duration: 0.6,
          delay: 0.3
        }} viewport={{
          once: true
        }} className="space-y-4">
            <span className="text-lg font-semibold">Follow Us</span>
            <div className="flex space-x-4">
              <Button variant="ghost" size="icon" onClick={() => handleSocialClick('youtube')} className="w-10 h-10 bg-red-600 hover:bg-red-700 text-white">
                <Youtube className="w-5 h-5" />
              </Button>
              <Button variant="ghost" size="icon" onClick={() => handleSocialClick('facebook')} className="w-10 h-10 bg-blue-600 hover:bg-blue-700 text-white">
                <Facebook className="w-5 h-5" />
              </Button>
              <Button variant="ghost" size="icon" onClick={() => handleSocialClick('instagram')} className="w-10 h-10 bg-pink-600 hover:bg-pink-700 text-white">
                <Instagram className="w-5 h-5" />
              </Button>
            </div>
            <p className="text-gray-300 text-sm">
              Stay connected with our church family and never miss an update!
            </p>
          </motion.div>
        </div>

        <motion.div initial={{
        opacity: 0
      }} whileInView={{
        opacity: 1
      }} transition={{
        duration: 0.6,
        delay: 0.4
      }} viewport={{
        once: true
      }} className="border-t border-gray-800 mt-12 pt-8 text-center">
          <p className="text-gray-400 text-sm">
            © 2024 Revival Tabernacle Ministries Church. All rights reserved. Built with love and faith.
          </p>
        </motion.div>
      </div>
    </footer>;
}
export default Footer;