import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card } from '@/components/ui/card';
import { useToast } from '@/components/ui/use-toast';
import { Upload, Trash2, Plus, Image } from 'lucide-react';

function GalleryManager() {
  const [images, setImages] = useState([]);
  const [newImage, setNewImage] = useState({ url: '', title: '', alt: '' });
  const [isAdding, setIsAdding] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    const savedImages = localStorage.getItem('churchGallery');
    if (savedImages) {
      setImages(JSON.parse(savedImages));
    }
  }, []);

  const saveImages = (updatedImages) => {
    localStorage.setItem('churchGallery', JSON.stringify(updatedImages));
    setImages(updatedImages);
  };

  const handleAddImage = (e) => {
    e.preventDefault();
    if (!newImage.url || !newImage.title) {
      toast({
        title: "Missing Information",
        description: "Please provide both URL and title for the image.",
        variant: "destructive",
      });
      return;
    }

    const imageToAdd = {
      id: Date.now(),
      url: newImage.url,
      title: newImage.title,
      alt: newImage.alt || newImage.title
    };

    const updatedImages = [...images, imageToAdd];
    saveImages(updatedImages);
    setNewImage({ url: '', title: '', alt: '' });
    setIsAdding(false);

    toast({
      title: "Image Added!",
      description: "The image has been successfully added to the gallery.",
    });
  };

  const handleDeleteImage = (imageId) => {
    const updatedImages = images.filter(img => img.id !== imageId);
    saveImages(updatedImages);

    toast({
      title: "Image Deleted",
      description: "The image has been removed from the gallery.",
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-white">Gallery Management</h2>
        <Button
          onClick={() => setIsAdding(!isAdding)}
          className="btn-primary"
        >
          <Plus className="w-4 h-4 mr-2" />
          Add Image
        </Button>
      </div>

      {/* Add Image Form */}
      {isAdding && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white/10 rounded-lg p-6 border border-white/20"
        >
          <h3 className="text-lg font-semibold text-white mb-4">Add New Image</h3>
          <form onSubmit={handleAddImage} className="space-y-4">
            <div className="grid md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="imageUrl" className="text-white">Image URL *</Label>
                <Input
                  id="imageUrl"
                  value={newImage.url}
                  onChange={(e) => setNewImage({ ...newImage, url: e.target.value })}
                  placeholder="https://example.com/image.jpg"
                  className="bg-white/10 border-white/20 text-white placeholder:text-gray-400"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="imageTitle" className="text-white">Title *</Label>
                <Input
                  id="imageTitle"
                  value={newImage.title}
                  onChange={(e) => setNewImage({ ...newImage, title: e.target.value })}
                  placeholder="Image title"
                  className="bg-white/10 border-white/20 text-white placeholder:text-gray-400"
                  required
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="imageAlt" className="text-white">Alt Text</Label>
              <Input
                id="imageAlt"
                value={newImage.alt}
                onChange={(e) => setNewImage({ ...newImage, alt: e.target.value })}
                placeholder="Descriptive text for accessibility"
                className="bg-white/10 border-white/20 text-white placeholder:text-gray-400"
              />
            </div>
            <div className="flex space-x-4">
              <Button type="submit" className="btn-primary">
                <Upload className="w-4 h-4 mr-2" />
                Add Image
              </Button>
              <Button
                type="button"
                variant="outline"
                onClick={() => setIsAdding(false)}
                className="border-white/20 text-white hover:bg-white/10"
              >
                Cancel
              </Button>
            </div>
          </form>
        </motion.div>
      )}

      {/* Images Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {images.map((image, index) => (
          <motion.div
            key={image.id}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: index * 0.1 }}
          >
            <Card className="bg-white/10 border-white/20 overflow-hidden">
              <div className="aspect-square overflow-hidden">
                <img
                  src={image.url}
                  alt={image.alt}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-4">
                <h3 className="font-semibold text-white mb-2">{image.title}</h3>
                <div className="flex justify-end">
                  <Button
                    variant="destructive"
                    size="sm"
                    onClick={() => handleDeleteImage(image.id)}
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </Card>
          </motion.div>
        ))}
      </div>

      {images.length === 0 && (
        <div className="text-center py-12">
          <Image className="w-16 h-16 mx-auto text-gray-400 mb-4" />
          <p className="text-gray-400 text-lg">No images in gallery yet</p>
          <p className="text-gray-500">Add your first image to get started</p>
        </div>
      )}
    </div>
  );
}

export default GalleryManager;