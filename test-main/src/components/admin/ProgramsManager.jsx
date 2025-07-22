import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card } from '@/components/ui/card';
import { useToast } from '@/components/ui/use-toast';
import { Plus, Trash2, Edit, Calendar, Clock, MapPin } from 'lucide-react';

function ProgramsManager() {
  const [programs, setPrograms] = useState([]);
  const [newProgram, setNewProgram] = useState({
    title: '',
    date: '',
    time: '',
    location: '',
    description: '',
    type: 'general'
  });
  const [isAdding, setIsAdding] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const { toast } = useToast();

  useEffect(() => {
    const savedPrograms = localStorage.getItem('churchPrograms');
    if (savedPrograms) {
      setPrograms(JSON.parse(savedPrograms));
    }
  }, []);

  const savePrograms = (updatedPrograms) => {
    localStorage.setItem('churchPrograms', JSON.stringify(updatedPrograms));
    setPrograms(updatedPrograms);
  };

  const handleAddProgram = (e) => {
    e.preventDefault();
    if (!newProgram.title || !newProgram.date || !newProgram.time) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields.",
        variant: "destructive",
      });
      return;
    }

    const programToAdd = {
      id: Date.now(),
      ...newProgram
    };

    const updatedPrograms = [...programs, programToAdd];
    savePrograms(updatedPrograms);
    setNewProgram({
      title: '',
      date: '',
      time: '',
      location: '',
      description: '',
      type: 'general'
    });
    setIsAdding(false);

    toast({
      title: "Program Added!",
      description: "The program has been successfully added.",
    });
  };

  const handleDeleteProgram = (programId) => {
    const updatedPrograms = programs.filter(prog => prog.id !== programId);
    savePrograms(updatedPrograms);

    toast({
      title: "Program Deleted",
      description: "The program has been removed.",
    });
  };

  const handleEditProgram = (program) => {
    setNewProgram(program);
    setEditingId(program.id);
    setIsAdding(true);
  };

  const handleUpdateProgram = (e) => {
    e.preventDefault();
    const updatedPrograms = programs.map(prog =>
      prog.id === editingId ? { ...newProgram, id: editingId } : prog
    );
    savePrograms(updatedPrograms);
    setNewProgram({
      title: '',
      date: '',
      time: '',
      location: '',
      description: '',
      type: 'general'
    });
    setIsAdding(false);
    setEditingId(null);

    toast({
      title: "Program Updated!",
      description: "The program has been successfully updated.",
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-white">Programs Management</h2>
        <Button
          onClick={() => {
            setIsAdding(!isAdding);
            setEditingId(null);
            setNewProgram({
              title: '',
              date: '',
              time: '',
              location: '',
              description: '',
              type: 'general'
            });
          }}
          className="btn-primary"
        >
          <Plus className="w-4 h-4 mr-2" />
          Add Program
        </Button>
      </div>

      {/* Add/Edit Program Form */}
      {isAdding && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white/10 rounded-lg p-6 border border-white/20"
        >
          <h3 className="text-lg font-semibold text-white mb-4">
            {editingId ? 'Edit Program' : 'Add New Program'}
          </h3>
          <form onSubmit={editingId ? handleUpdateProgram : handleAddProgram} className="space-y-4">
            <div className="grid md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="programTitle" className="text-white">Title *</Label>
                <Input
                  id="programTitle"
                  value={newProgram.title}
                  onChange={(e) => setNewProgram({ ...newProgram, title: e.target.value })}
                  placeholder="Program title"
                  className="bg-white/10 border-white/20 text-white placeholder:text-gray-400"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="programType" className="text-white">Type</Label>
                <select
                  id="programType"
                  value={newProgram.type}
                  onChange={(e) => setNewProgram({ ...newProgram, type: e.target.value })}
                  className="w-full h-10 rounded-md border border-white/20 bg-white/10 px-3 py-2 text-white"
                >
                  <option value="general">General</option>
                  <option value="youth">Youth</option>
                  <option value="ladies">Ladies</option>
                  <option value="men">Men</option>
                  <option value="children">Children</option>
                </select>
              </div>
            </div>
            
            <div className="grid md:grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label htmlFor="programDate" className="text-white">Date *</Label>
                <Input
                  id="programDate"
                  type="date"
                  value={newProgram.date}
                  onChange={(e) => setNewProgram({ ...newProgram, date: e.target.value })}
                  className="bg-white/10 border-white/20 text-white"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="programTime" className="text-white">Time *</Label>
                <Input
                  id="programTime"
                  value={newProgram.time}
                  onChange={(e) => setNewProgram({ ...newProgram, time: e.target.value })}
                  placeholder="7:00 PM"
                  className="bg-white/10 border-white/20 text-white placeholder:text-gray-400"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="programLocation" className="text-white">Location</Label>
                <Input
                  id="programLocation"
                  value={newProgram.location}
                  onChange={(e) => setNewProgram({ ...newProgram, location: e.target.value })}
                  placeholder="Fellowship Hall"
                  className="bg-white/10 border-white/20 text-white placeholder:text-gray-400"
                />
              </div>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="programDescription" className="text-white">Description</Label>
              <Textarea
                id="programDescription"
                value={newProgram.description}
                onChange={(e) => setNewProgram({ ...newProgram, description: e.target.value })}
                placeholder="Program description"
                className="bg-white/10 border-white/20 text-white placeholder:text-gray-400"
                rows={3}
              />
            </div>
            
            <div className="flex space-x-4">
              <Button type="submit" className="btn-primary">
                {editingId ? 'Update Program' : 'Add Program'}
              </Button>
              <Button
                type="button"
                variant="outline"
                onClick={() => {
                  setIsAdding(false);
                  setEditingId(null);
                }}
                className="border-white/20 text-white hover:bg-white/10"
              >
                Cancel
              </Button>
            </div>
          </form>
        </motion.div>
      )}

      {/* Programs List */}
      <div className="grid md:grid-cols-2 gap-6">
        {programs.map((program, index) => (
          <motion.div
            key={program.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <Card className="bg-white/10 border-white/20 p-6">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h3 className="text-lg font-semibold text-white">{program.title}</h3>
                  <span className="text-sm text-purple-300 bg-purple-500/20 px-2 py-1 rounded">
                    {program.type}
                  </span>
                </div>
                <div className="flex space-x-2">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleEditProgram(program)}
                    className="text-blue-300 hover:text-blue-200"
                  >
                    <Edit className="w-4 h-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleDeleteProgram(program.id)}
                    className="text-red-300 hover:text-red-200"
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </div>
              
              <div className="space-y-2 text-gray-300">
                <div className="flex items-center">
                  <Calendar className="w-4 h-4 mr-2 text-purple-400" />
                  <span>{new Date(program.date).toLocaleDateString()}</span>
                </div>
                <div className="flex items-center">
                  <Clock className="w-4 h-4 mr-2 text-purple-400" />
                  <span>{program.time}</span>
                </div>
                {program.location && (
                  <div className="flex items-center">
                    <MapPin className="w-4 h-4 mr-2 text-purple-400" />
                    <span>{program.location}</span>
                  </div>
                )}
              </div>
              
              {program.description && (
                <p className="text-gray-300 mt-3 text-sm">{program.description}</p>
              )}
            </Card>
          </motion.div>
        ))}
      </div>

      {programs.length === 0 && (
        <div className="text-center py-12">
          <Calendar className="w-16 h-16 mx-auto text-gray-400 mb-4" />
          <p className="text-gray-400 text-lg">No programs scheduled yet</p>
          <p className="text-gray-500">Add your first program to get started</p>
        </div>
      )}
    </div>
  );
}

export default ProgramsManager;