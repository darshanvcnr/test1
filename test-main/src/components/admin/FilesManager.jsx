import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card } from '@/components/ui/card';
import { useToast } from '@/components/ui/use-toast';
import { Plus, Trash2, Download, FileText, Upload } from 'lucide-react';

function FilesManager() {
  const [files, setFiles] = useState([]);
  const [newFile, setNewFile] = useState({ name: '', url: '', description: '', type: 'pdf' });
  const [isAdding, setIsAdding] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    const savedFiles = localStorage.getItem('churchFiles');
    if (savedFiles) {
      setFiles(JSON.parse(savedFiles));
    } else {
      // Default files
      const defaultFiles = [
        {
          id: 1,
          name: 'Church Registration Form',
          url: '#',
          description: 'Form for new member registration',
          type: 'pdf',
          uploadDate: new Date().toISOString()
        },
        {
          id: 2,
          name: 'Event Guidelines',
          url: '#',
          description: 'Guidelines for church events and activities',
          type: 'pdf',
          uploadDate: new Date().toISOString()
        }
      ];
      setFiles(defaultFiles);
      localStorage.setItem('churchFiles', JSON.stringify(defaultFiles));
    }
  }, []);

  const saveFiles = (updatedFiles) => {
    localStorage.setItem('churchFiles', JSON.stringify(updatedFiles));
    setFiles(updatedFiles);
  };

  const handleAddFile = (e) => {
    e.preventDefault();
    if (!newFile.name || !newFile.url) {
      toast({
        title: "Missing Information",
        description: "Please provide both file name and URL.",
        variant: "destructive",
      });
      return;
    }

    const fileToAdd = {
      id: Date.now(),
      ...newFile,
      uploadDate: new Date().toISOString()
    };

    const updatedFiles = [...files, fileToAdd];
    saveFiles(updatedFiles);
    setNewFile({ name: '', url: '', description: '', type: 'pdf' });
    setIsAdding(false);

    toast({
      title: "File Added!",
      description: "The file has been successfully added.",
    });
  };

  const handleDeleteFile = (fileId) => {
    const updatedFiles = files.filter(file => file.id !== fileId);
    saveFiles(updatedFiles);

    toast({
      title: "File Deleted",
      description: "The file has been removed.",
    });
  };

  const handleDownload = (file) => {
    toast({
      title: "🚧 Download Feature Coming Soon!",
      description: "This feature isn't implemented yet—but don't worry! You can request it in your next prompt! 🚀",
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-white">Files Management</h2>
        <Button
          onClick={() => setIsAdding(!isAdding)}
          className="btn-primary"
        >
          <Plus className="w-4 h-4 mr-2" />
          Add File
        </Button>
      </div>

      {/* Add File Form */}
      {isAdding && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white/10 rounded-lg p-6 border border-white/20"
        >
          <h3 className="text-lg font-semibold text-white mb-4">Add New File</h3>
          <form onSubmit={handleAddFile} className="space-y-4">
            <div className="grid md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="fileName" className="text-white">File Name *</Label>
                <Input
                  id="fileName"
                  value={newFile.name}
                  onChange={(e) => setNewFile({ ...newFile, name: e.target.value })}
                  placeholder="Registration Form"
                  className="bg-white/10 border-white/20 text-white placeholder:text-gray-400"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="fileType" className="text-white">File Type</Label>
                <select
                  id="fileType"
                  value={newFile.type}
                  onChange={(e) => setNewFile({ ...newFile, type: e.target.value })}
                  className="w-full h-10 rounded-md border border-white/20 bg-white/10 px-3 py-2 text-white"
                >
                  <option value="pdf">PDF</option>
                  <option value="doc">Document</option>
                  <option value="image">Image</option>
                  <option value="other">Other</option>
                </select>
              </div>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="fileUrl" className="text-white">File URL *</Label>
              <Input
                id="fileUrl"
                value={newFile.url}
                onChange={(e) => setNewFile({ ...newFile, url: e.target.value })}
                placeholder="https://example.com/file.pdf"
                className="bg-white/10 border-white/20 text-white placeholder:text-gray-400"
                required
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="fileDescription" className="text-white">Description</Label>
              <Input
                id="fileDescription"
                value={newFile.description}
                onChange={(e) => setNewFile({ ...newFile, description: e.target.value })}
                placeholder="Brief description of the file"
                className="bg-white/10 border-white/20 text-white placeholder:text-gray-400"
              />
            </div>
            
            <div className="flex space-x-4">
              <Button type="submit" className="btn-primary">
                <Upload className="w-4 h-4 mr-2" />
                Add File
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

      {/* Files List */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {files.map((file, index) => (
          <motion.div
            key={file.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <Card className="bg-white/10 border-white/20 p-6">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-gradient-to-r from-purple-600 to-blue-600 rounded-lg flex items-center justify-center">
                    <FileText className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-white">{file.name}</h3>
                    <span className="text-xs text-purple-300 bg-purple-500/20 px-2 py-1 rounded">
                      {file.type.toUpperCase()}
                    </span>
                  </div>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => handleDeleteFile(file.id)}
                  className="text-red-300 hover:text-red-200"
                >
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>
              
              {file.description && (
                <p className="text-gray-300 text-sm mb-4">{file.description}</p>
              )}
              
              <div className="flex items-center justify-between">
                <span className="text-xs text-gray-400">
                  {new Date(file.uploadDate).toLocaleDateString()}
                </span>
                <Button
                  size="sm"
                  onClick={() => handleDownload(file)}
                  className="btn-secondary text-xs"
                >
                  <Download className="w-3 h-3 mr-1" />
                  Download
                </Button>
              </div>
            </Card>
          </motion.div>
        ))}
      </div>

      {files.length === 0 && (
        <div className="text-center py-12">
          <FileText className="w-16 h-16 mx-auto text-gray-400 mb-4" />
          <p className="text-gray-400 text-lg">No files uploaded yet</p>
          <p className="text-gray-500">Add your first file to get started</p>
        </div>
      )}
    </div>
  );
}

export default FilesManager;