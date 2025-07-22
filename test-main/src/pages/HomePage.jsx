import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import Header from '@/components/Header';
import Hero from '@/components/Hero';
import Activities from '@/components/Activities';
import Programs from '@/components/Programs';
import VideoSection from '@/components/VideoSection';
import Gallery from '@/components/Gallery';
import Contact from '@/components/Contact';
import Footer from '@/components/Footer';
import LiveChat from '@/components/LiveChat';

function HomePage() {
  return (
    <>
      <Helmet>
        <title>Revival Tabernacle Ministries Church - Welcome Home</title>
        <meta name="description" content="Join us at Revival Tabernacle Ministries Church for worship, fellowship, and spiritual growth. Experience the power of God in our vibrant community." />
      </Helmet>
      
      <div className="min-h-screen">
        <Header />
        <Hero />
        <Activities />
        <Programs />
        <VideoSection />
        <Gallery />
        <Contact />
        <Footer />
        <LiveChat />
      </div>
    </>
  );
}

export default HomePage;