import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Dialog, DialogContent } from '@/components/ui/dialog';

function Gallery() {
  const [images, setImages] = useState([]);
  const [selectedImage, setSelectedImage] = useState(null);

  useEffect(() => {
    // Load images from localStorage
    const savedImages = localStorage.getItem('churchGallery');
    if (savedImages) {
      setImages(JSON.parse(savedImages));
    } else {
      // Default gallery images
      const defaultImages = [
        {
          id: 1,
          url: 'https://images.unsplash.com/photo-1507692049790-de58290a4334?w=500',
          alt: 'Sunday worship service with congregation singing',
          title: 'Sunday Worship'
        },
        {
          id: 2,
          url: 'https://images.unsplash.com/photo-1438032005730-c779502df39b?w=500',
          alt: 'Youth group fellowship and activities',
          title: 'Youth Fellowship'
        },
        {
          id: 3,
          url: 'https://images.unsplash.com/photo-1511632765486-a01980e01a18?w=500',
          alt: 'Baptism ceremony at the church',
          title: 'Baptism Service'
        },
        {
          id: 4,
          url: 'https://images.unsplash.com/photo-1544531586-fde5298cdd40?w=500',
          alt: 'Community outreach and charity work',
          title: 'Community Outreach'
        },
        {
          id: 5,
          url: 'https://images.unsplash.com/photo-1517486808906-6ca8b3f04846?w=500',
          alt: 'Christmas celebration at church',
          title: 'Christmas Celebration'
        },
        {
          id: 6,
          url: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=500',
          alt: 'Prayer meeting in the sanctuary',
          title: 'Prayer Meeting'
        }
      ];
      setImages(defaultImages);
      localStorage.setItem('churchGallery', JSON.stringify(defaultImages));
    }
  }, []);

  return (
    <section id="gallery" className="section-padding bg-gray-50">
      <div className="container-max">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-display font-bold text-gray-900 mb-6">
            Photo <span className="gradient-text">Gallery</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Witness the joy, fellowship, and spiritual moments that make our church family special. 
            These memories capture God's work in our community.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {images.map((image, index) => (
            <motion.div
              key={image.id}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="group relative overflow-hidden rounded-xl shadow-lg cursor-pointer"
              onClick={() => setSelectedImage(image)}
            >
              <div className="aspect-square overflow-hidden">
                <img
                  src={image.url}
                  alt={image.alt}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
              </div>
              
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div className="absolute bottom-4 left-4 right-4">
                  <h3 className="text-white font-semibold text-lg">{image.title}</h3>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Image Modal */}
        <Dialog open={!!selectedImage} onOpenChange={() => setSelectedImage(null)}>
          <DialogContent className="max-w-4xl p-0 bg-transparent border-none">
            {selectedImage && (
              <div className="relative">
                <img
                  src={selectedImage.url}
                  alt={selectedImage.alt}
                  className="w-full h-auto rounded-lg"
                />
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-6 rounded-b-lg">
                  <h3 className="text-white text-2xl font-bold">{selectedImage.title}</h3>
                </div>
              </div>
            )}
          </DialogContent>
        </Dialog>
      </div>
    </section>
  );
}

export default Gallery;