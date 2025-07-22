import React, { useState, useEffect, useRef } from 'react';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useToast } from '@/components/ui/use-toast';
import { LogOut, Upload, Trash2, Plus, Calendar, Image, FileText } from 'lucide-react';
import GalleryManager from '@/components/admin/GalleryManager';
import ProgramsManager from '@/components/admin/ProgramsManager';
import FilesManager from '@/components/admin/FilesManager';
import SongBookAdminTab from '@/components/admin/SongBookAdminTab';

function AdminDashboard() {
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    const isAuthenticated = localStorage.getItem('adminAuth');
    if (!isAuthenticated) {
      navigate('/admin');
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('adminAuth');
    toast({
      title: "Logged Out",
      description: "You have been successfully logged out.",
    });
    navigate('/admin');
  };

  return (
    <>
      <Helmet>
        <title>Admin Dashboard - Revival Tabernacle Ministries Church</title>
        <meta name="description" content="Admin dashboard for managing Revival Tabernacle Ministries Church website content." />
      </Helmet>

      <div className="min-h-screen admin-gradient">
        <header className="bg-white/10 backdrop-blur-md border-b border-white/20">
          <div className="container-max">
            <div className="flex items-center justify-between py-4">
              <h1 className="text-2xl font-bold text-white">Admin Dashboard</h1>
              <div className="flex items-center space-x-4">
                <Button
                  variant="ghost"
                  onClick={() => navigate('/')}
                  className="text-gray-300 hover:text-white"
                >
                  View Website
                </Button>
                <Button
                  variant="ghost"
                  onClick={handleLogout}
                  className="text-gray-300 hover:text-white"
                >
                  <LogOut className="w-4 h-4 mr-2" />
                  Logout
                </Button>
              </div>
            </div>
          </div>
        </header>

        <main className="section-padding">
          <div className="container-max">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <Tabs defaultValue="gallery" className="space-y-6">
                <TabsList className="grid w-full grid-cols-4 bg-white/10 border-white/20">
                  <TabsTrigger value="gallery" className="text-white data-[state=active]:bg-white/20">
                    <Image className="w-4 h-4 mr-2" />
                    Gallery
                  </TabsTrigger>
                  <TabsTrigger value="programs" className="text-white data-[state=active]:bg-white/20">
                    <Calendar className="w-4 h-4 mr-2" />
                    Programs
                  </TabsTrigger>
                  <TabsTrigger value="files" className="text-white data-[state=active]:bg-white/20">
                    <FileText className="w-4 h-4 mr-2" />
                    Files
                  </TabsTrigger>
                  <TabsTrigger value="songs" className="text-white data-[state=active]:bg-white/20">
                    <FileText className="w-4 h-4 mr-2" />
                    Song Book
                  </TabsTrigger>
                </TabsList>

                <TabsContent value="gallery">
                  <GalleryManager />
                </TabsContent>

                <TabsContent value="programs">
                  <ProgramsManager />
                </TabsContent>

                <TabsContent value="files">
                  <FilesManager />
                </TabsContent>

                <TabsContent value="songs">
                  <SongBookAdminTab />
                </TabsContent>
              </Tabs>
            </motion.div>
          </div>
        </main>
      </div>
    </>
  );
}

export default AdminDashboard;