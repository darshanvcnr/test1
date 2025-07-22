import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Calendar, Clock, MapPin, Users } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';

function Programs() {
  const [programs, setPrograms] = useState([]);
  const { toast } = useToast();

  useEffect(() => {
    // Load programs from localStorage
    const savedPrograms = localStorage.getItem('churchPrograms');
    if (savedPrograms) {
      setPrograms(JSON.parse(savedPrograms));
    } else {
      // Default programs
      const defaultPrograms = [
        {
          id: 1,
          title: "Youth Meeting",
          date: "2024-01-15",
          time: "6:00 PM",
          location: "Youth Hall",
          description: "Dynamic gathering for young people with worship, games, and inspiring messages.",
          type: "youth"
        },
        {
          id: 2,
          title: "Ladies Meeting",
          date: "2024-01-20",
          time: "10:00 AM",
          location: "Fellowship Hall",
          description: "Empowering women through prayer, fellowship, and biblical teaching.",
          type: "ladies"
        },
        {
          id: 3,
          title: "Men's Conference",
          date: "2024-01-25",
          time: "7:00 PM",
          location: "Main Sanctuary",
          description: "Strengthening men in faith, leadership, and family responsibilities.",
          type: "men"
        }
      ];
      setPrograms(defaultPrograms);
      localStorage.setItem('churchPrograms', JSON.stringify(defaultPrograms));
    }
  }, []);

  const handleRegister = (programTitle) => {
    toast({
      title: "🚧 Registration Feature Coming Soon!",
      description: "This feature isn't implemented yet—but don't worry! You can request it in your next prompt! 🚀",
    });
  };

  return (
    <section id="programs" className="section-padding bg-white">
      <div className="container-max">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-display font-bold text-gray-900 mb-6">
            Upcoming <span className="gradient-text">Programs</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Don't miss these special events designed to strengthen your faith and build lasting relationships 
            within our church family.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {programs.map((program, index) => (
            <motion.div
              key={program.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="bg-gradient-to-br from-purple-50 to-blue-50 rounded-xl shadow-lg card-hover p-8 border border-purple-100"
            >
              <div className="flex items-center justify-between mb-6">
                <div className="w-12 h-12 bg-gradient-to-r from-purple-600 to-blue-600 rounded-full flex items-center justify-center">
                  <Calendar className="w-6 h-6 text-white" />
                </div>
                <span className="text-sm font-semibold text-purple-600 bg-purple-100 px-3 py-1 rounded-full">
                  {program.type}
                </span>
              </div>
              
              <h3 className="text-2xl font-bold text-gray-900 mb-4">{program.title}</h3>
              
              <div className="space-y-3 mb-6">
                <div className="flex items-center text-gray-600">
                  <Calendar className="w-5 h-5 mr-3 text-purple-500" />
                  <span>{new Date(program.date).toLocaleDateString('en-US', { 
                    weekday: 'long', 
                    year: 'numeric', 
                    month: 'long', 
                    day: 'numeric' 
                  })}</span>
                </div>
                
                <div className="flex items-center text-gray-600">
                  <Clock className="w-5 h-5 mr-3 text-purple-500" />
                  <span>{program.time}</span>
                </div>
                
                <div className="flex items-center text-gray-600">
                  <MapPin className="w-5 h-5 mr-3 text-purple-500" />
                  <span>{program.location}</span>
                </div>
              </div>
              
              <p className="text-gray-600 mb-6 leading-relaxed">{program.description}</p>
              
              <Button
                onClick={() => handleRegister(program.title)}
                className="w-full btn-primary"
              >
                <Users className="w-4 h-4 mr-2" />
                Register Now
              </Button>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Programs;