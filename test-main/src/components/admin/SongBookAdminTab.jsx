import React, { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/components/ui/use-toast';
import { motion } from 'framer-motion';

function SongBookAdminTab() {
  const [title, setTitle] = useState('');
  const [language, setLanguage] = useState('Kannada');
  const [category, setCategory] = useState('');
  const [lyrics, setLyrics] = useState('');
  const [loading, setLoading] = useState(false);
  const [multiLoading, setMultiLoading] = useState(false);
  const [selected, setSelected] = useState(null);
  const [songs, setSongs] = useState([]);
  const [showList, setShowList] = useState(false);
  const [selectedSongs, setSelectedSongs] = useState([]);
  const [filterLang, setFilterLang] = useState('');
  const { toast } = useToast();

  const handleLyricsChange = (e) => {
    const text = e.target.value;
    setLyrics(text);
    // Auto-pick title from first non-empty line
    const firstLine = text.split('\n').find(line => line.trim() !== '');
    if (firstLine) setTitle(firstLine.trim());
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title || !lyrics) {
      toast({ title: 'Missing Info', description: 'Title and lyrics are required', variant: 'destructive' });
      return;
    }
    setLoading(true);
    const res = await fetch('http://localhost:4000/api/songs', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title, language, category, lyrics })
    });
    if (res.ok) {
      toast({ title: 'Song Added!', description: 'Song uploaded successfully.' });
      setTitle('');
      setLanguage('Kannada');
      setCategory('');
      setLyrics('');
      fetchSongs(); // Refresh song list
    } else {
      const err = await res.json().catch(() => ({}));
      toast({ title: 'Error', description: err.error || 'Failed to add song', variant: 'destructive' });
    }
    setLoading(false);
  };

  // Multi-upload handler
  const handleMultiUpload = async (e) => {
    const files = Array.from(e.target.files);
    if (!files.length) return;
    setMultiLoading(true);
    let successCount = 0;
    let failCount = 0;
    for (const file of files) {
      const text = await file.text();
      // Always use file name (without extension) as title
      const songTitle = file.name.replace(/\.[^.]+$/, '');
      const res = await fetch('http://localhost:4000/api/songs', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title: songTitle, language, category: '', lyrics: text })
      });
      if (res.ok) successCount++;
      else failCount++;
    }
    toast({
      title: 'Upload Complete',
      description: `${successCount} song(s) added, ${failCount} failed.`,
      variant: failCount ? 'destructive' : 'default',
    });
    setMultiLoading(false);
    e.target.value = '';
  };

  // Fetch all songs on mount
  useEffect(() => {
    fetchSongs();
  }, []);
  const fetchSongs = async () => {
    const res = await fetch('http://localhost:4000/api/songs');
    const data = await res.json();
    setSongs(data);
  };

  // Song deletion handler
  const handleDelete = async (songId) => {
    if (!window.confirm('Are you sure you want to delete this song?')) return;
    const res = await fetch(`http://localhost:4000/api/songs/${songId}`, {
      method: 'DELETE',
    });
    if (res.ok) {
      toast({ title: 'Song Deleted', description: 'Song deleted successfully.' });
      setSongs(songs => songs.filter(s => s.id !== songId));
      setSelectedSongs(selectedSongs => selectedSongs.filter(id => id !== songId));
    } else {
      toast({ title: 'Error', description: 'Failed to delete song', variant: 'destructive' });
    }
  };

  // Bulk delete handler
  const handleBulkDelete = async () => {
    if (!selectedSongs.length) return;
    if (!window.confirm(`Delete ${selectedSongs.length} selected song(s)?`)) return;
    let success = 0;
    for (const id of selectedSongs) {
      const res = await fetch(`http://localhost:4000/api/songs/${id}`, { method: 'DELETE' });
      if (res.ok) success++;
    }
    toast({ title: 'Bulk Delete', description: `${success} song(s) deleted.` });
    fetchSongs();
    setSelectedSongs([]);
  };

  return (
    <Card className="p-8 bg-white/10 border-white/20 max-w-lg mx-auto">
      <h2 className="text-2xl font-bold text-white mb-6">Add Song (Paste Text or Upload Multiple .txt)</h2>
      <Button className="mb-4" onClick={() => setShowList(v => !v)}>
        {showList ? 'Hide List of Songs' : 'List of Songs'}
      </Button>
      {showList && (
        <div className="mb-8">
          <h3 className="text-lg font-semibold text-white mb-2">All Songs</h3>
          <div className="mb-2 flex gap-2 items-center">
            <span className="text-white">Filter by Language:</span>
            <select value={filterLang} onChange={e => setFilterLang(e.target.value)} className="rounded px-2 py-1">
              <option value="">All</option>
              {[...new Set(songs.map(s => s.language).filter(Boolean))].map(lang => (
                <option key={lang} value={lang}>{lang}</option>
              ))}
            </select>
            <Button size="sm" className="bg-red-600 ml-auto" disabled={!selectedSongs.length} onClick={handleBulkDelete}>
              Delete Selected
            </Button>
          </div>
          <div className="max-h-64 overflow-y-auto bg-white/5 rounded-lg p-2">
            {songs.filter(s => !filterLang || s.language === filterLang).length === 0 ? (
              <p className="text-gray-300">No songs found.</p>
            ) : (
              songs.filter(s => !filterLang || s.language === filterLang).map(song => (
                <div key={song.id} className="flex items-center justify-between border-b border-white/10 py-2 px-1">
                  <div className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      checked={selectedSongs.includes(song.id)}
                      onChange={e => {
                        setSelectedSongs(sel => e.target.checked ? [...sel, song.id] : sel.filter(id => id !== song.id));
                      }}
                    />
                    <span className="font-medium text-white">{song.title}</span>
                    <span className="text-xs text-gray-400 ml-2">({song.language} | {song.category})</span>
                  </div>
                  <Button size="sm" className="bg-red-600 hover:bg-red-700 text-white" onClick={() => handleDelete(song.id)}>
                    Delete
                  </Button>
                </div>
              ))
            )}
          </div>
        </div>
      )}
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="songTitle" className="text-white">Title *</Label>
          <Input id="songTitle" value={title} onChange={e => setTitle(e.target.value)} required />
        </div>
        <div className="space-y-2">
          <Label htmlFor="songLanguage" className="text-white">Language</Label>
          <select
            id="songLanguage"
            className="w-full rounded-md border bg-background px-3 py-2 text-sm border-purple-200 focus:border-purple-500"
            value={language}
            onChange={e => setLanguage(e.target.value)}
            required
          >
            <option value="Kannada">Kannada</option>
            <option value="English">English</option>
            <option value="Malayalam">Malayalam</option>
            <option value="Tamil">Tamil</option>
            <option value="Telugu">Telugu</option>
            <option value="Others">Others</option>
          </select>
        </div>
        <div className="space-y-2">
          <Label htmlFor="songCategory" className="text-white">Category</Label>
          <select
            id="songCategory"
            className="w-full rounded-md border bg-background px-3 py-2 text-sm border-purple-200 focus:border-purple-500"
            value={category}
            onChange={e => setCategory(e.target.value)}
          >
            <option value="">Select Category</option>
            <option value="Worship">Worship</option>
            <option value="Praise">Praise</option>
            <option value="Special">Special</option>
            <option value="Kids">Kids</option>
            <option value="Others">Others</option>
          </select>
        </div>
        <div className="space-y-2">
          <Label htmlFor="songLyrics" className="text-white">Lyrics (Paste full text) *</Label>
          <Textarea id="songLyrics" value={lyrics} onChange={handleLyricsChange} rows={10} required />
        </div>
        <Button type="submit" disabled={loading} className="w-full">{loading ? 'Saving...' : 'Save Song'}</Button>
      </form>
      <div className="mt-8">
        <Label htmlFor="multiSongUpload" className="text-white block mb-2">Or Upload Multiple Songs (.txt files)</Label>
        <Input id="multiSongUpload" type="file" accept=".txt" multiple onChange={handleMultiUpload} disabled={multiLoading} />
      </div>
      {selected && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
          <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="bg-white rounded-lg p-8 max-w-lg w-full shadow-2xl relative">
            <Button className="absolute top-2 right-2" size="icon" onClick={() => setSelected(null)}>&times;</Button>
            <h2 className="text-2xl font-bold mb-2">{selected.title}</h2>
            <p className="text-sm text-gray-500 mb-2">{selected.language} | {selected.category}</p>
            <pre className="whitespace-pre-wrap text-gray-800 mt-4">{selected.lyrics}</pre>
            <Button className="mt-6 bg-red-600 hover:bg-red-700 text-white w-full" onClick={() => handleDelete(selected.id)}>
              Delete Song
            </Button>
          </motion.div>
        </div>
      )}
    </Card>
  );
}

export default SongBookAdminTab;
