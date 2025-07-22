import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Play, Youtube, Tv } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';

function VideoSection() {
  const [activeVideo, setActiveVideo] = useState('live');
  const { toast } = useToast();

  const handleVideoClick = (type) => {
    toast({
      title: "🚧 Video Feature Coming Soon!",
      description: "This feature isn't implemented yet—but don't worry! You can request it in your next prompt! 🚀",
    });
  };

  return (
    <section className="section-padding bg-gray-900 text-white">
      <div className="container-max">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-display font-bold mb-6">
            Watch <span className="gradient-text">Live & Past Services</span>
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Can't make it to church? Join us online for live worship services or catch up 
            on previous messages that will inspire and encourage your faith.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Video Player Area */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="relative"
          >
            <div className="aspect-video bg-gradient-to-br from-purple-600 to-blue-600 rounded-xl overflow-hidden shadow-2xl">
              <div className="w-full h-full flex items-center justify-center">
                <div className="text-center">
                  <div className="w-20 h-20 bg-white/20 rounded-full flex items-center justify-center mb-4 mx-auto">
                    <Play className="w-10 h-10 text-white ml-1" />
                  </div>
                  <h3 className="text-2xl font-bold mb-2">Live Stream</h3>
                  <p className="text-white/80">Sunday Service - 12:30 PM</p>
                </div>
              </div>
            </div>
            
            {/* Live Indicator */}
            <div className="absolute top-4 left-4 bg-red-500 text-white px-3 py-1 rounded-full text-sm font-semibold flex items-center">
              <div className="w-2 h-2 bg-white rounded-full mr-2 animate-pulse"></div>
              LIVE
            </div>
          </motion.div>

          {/* Video Options */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            <div className="space-y-4">
              <Button
                onClick={() => handleVideoClick('live')}
                className="w-full justify-start p-6 h-auto bg-white/10 hover:bg-white/20 border border-white/20"
                variant="outline"
              >
                <div className="flex items-center">
                  <Tv className="w-8 h-8 mr-4 text-red-500" />
                  <div className="text-left">
                    <h3 className="text-lg font-semibold text-white">Watch Live Stream</h3>
                    <p className="text-gray-300 text-sm">Join our live Sunday service</p>
                  </div>
                </div>
              </Button>

              <Button
                onClick={() => handleVideoClick('youtube')}
                className="w-full justify-start p-6 h-auto bg-white/10 hover:bg-white/20 border border-white/20"
                variant="outline"
              >
                <div className="flex items-center">
                  <Youtube className="w-8 h-8 mr-4 text-red-500" />
                  <div className="text-left">
                    <h3 className="text-lg font-semibold text-white">YouTube Channel</h3>
                    <p className="text-gray-300 text-sm">Browse past sermons and events</p>
                  </div>
                </div>
              </Button>
            </div>

            {/* Recent Videos */}
            <div className="space-y-4">
              <h3 className="text-xl font-bold text-white">Recent Messages</h3>
              
              {['The Power of Faith', 'Walking in Love', 'God\'s Grace Abounds'].map((title, index) => (
                <div
                  key={title}
                  onClick={() => handleVideoClick('recent')}
                  className="flex items-center p-4 bg-white/5 rounded-lg hover:bg-white/10 transition-colors cursor-pointer"
                >
                  <div className="w-16 h-12 bg-gradient-to-r from-purple-600 to-blue-600 rounded flex items-center justify-center mr-4">
                    <Play className="w-4 h-4 text-white" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-white">{title}</h4>
                    <p className="text-sm text-gray-400">Pastor John Smith</p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

export default VideoSection;