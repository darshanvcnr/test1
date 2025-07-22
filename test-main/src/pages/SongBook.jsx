import React, { useEffect, useState } from 'react';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

function SongBook() {
  const [songs, setSongs] = useState([]);
  const [search, setSearch] = useState('');
  const [selected, setSelected] = useState(null);
  const [loading, setLoading] = useState(false);
  const [category, setCategory] = useState('');
  const [language, setLanguage] = useState('');

  useEffect(() => {
    fetchSongs();
  }, [search]);

  const fetchSongs = async () => {
    setLoading(true);
    let url = 'http://localhost:4000/api/songs';
    if (search) url += `?q=${encodeURIComponent(search)}`;
    const res = await fetch(url);
    let data = await res.json();
    // Sort alphabetically by title
    data = data.sort((a, b) => a.title.localeCompare(b.title));
    setSongs(data);
    setLoading(false);
  };

  // Get unique languages and categories from songs
  const languages = Array.from(new Set(songs.map(song => song.language).filter(Boolean)));
  const categories = Array.from(new Set(songs.map(song => song.category).filter(Boolean)));

  // Filter by language and category
  const filteredSongs = songs.filter(song => {
    return (
      (!language || song.language === language) &&
      (!category || song.category === category)
    );
  });

  const handleSelect = async (song) => {
    setSelected(song);
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header />
      <main className="flex-grow section-padding">
        <div className="container-max">
          <h1 className="text-4xl font-bold mb-8 text-center">Song Book</h1>
          <div className="mb-6 flex flex-col md:flex-row justify-center gap-4 items-center">
            <Input
              value={search}
              onChange={e => setSearch(e.target.value)}
              placeholder="Search songs by title or lyrics..."
              className="max-w-md"
            />
            <select
              value={language}
              onChange={e => setLanguage(e.target.value)}
              className="border rounded px-3 py-2 text-sm bg-white text-gray-700"
            >
              <option value="">All Languages</option>
              {languages.map(lang => (
                <option key={lang} value={lang}>{lang}</option>
              ))}
            </select>
            <select
              value={category}
              onChange={e => setCategory(e.target.value)}
              className="border rounded px-3 py-2 text-sm bg-white text-gray-700"
            >
              <option value="">All Categories</option>
              {categories.map(cat => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {loading ? <p>Loading...</p> : filteredSongs.map(song => (
              <Card key={song.id} className="p-6 cursor-pointer hover:shadow-lg" onClick={() => handleSelect(song)}>
                <h2 className="text-xl font-semibold mb-2">{song.title}</h2>
                <p className="text-sm text-gray-500 mb-1">{song.language}</p>
                <p className="text-xs text-gray-400">{song.category}</p>
              </Card>
            ))}
          </div>
          {selected && (
            <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
              <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="bg-white rounded-lg p-8 max-w-lg w-full shadow-2xl relative">
                <Button className="absolute top-2 right-2" size="icon" onClick={() => setSelected(null)}>&times;</Button>
                <h2 className="text-2xl font-bold mb-2">{selected.title}</h2>
                <p className="text-sm text-gray-500 mb-2">{selected.language} | {selected.category}</p>
                <pre className="whitespace-pre-wrap text-gray-800 mt-4">{selected.lyrics}</pre>
              </motion.div>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
}

export default SongBook;
