import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import fs from 'fs';
import path from 'path';

const app = express();
const PORT = 4000;

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Data storage (simple JSON files for demo)
const dataDir = path.join(process.cwd(), 'data');
if (!fs.existsSync(dataDir)) fs.mkdirSync(dataDir);

function getData(file) {
  const filePath = path.join(dataDir, file);
  if (!fs.existsSync(filePath)) return [];
  return JSON.parse(fs.readFileSync(filePath, 'utf8'));
}
function saveData(file, data) {
  const filePath = path.join(dataDir, file);
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
}

// Contact form
app.post('/api/contact', (req, res) => {
  const messages = getData('contacts.json');
  messages.push({ ...req.body, date: new Date() });
  saveData('contacts.json', messages);
  res.json({ success: true });
});

// Donations (mock)
app.post('/api/donate', (req, res) => {
  const donations = getData('donations.json');
  donations.push({ ...req.body, date: new Date() });
  saveData('donations.json', donations);
  res.json({ success: true });
});

// Program registration
app.post('/api/register', (req, res) => {
  const registrations = getData('registrations.json');
  registrations.push({ ...req.body, date: new Date() });
  saveData('registrations.json', registrations);
  res.json({ success: true });
});

// Gallery CRUD
app.get('/api/gallery', (req, res) => {
  res.json(getData('gallery.json'));
});
app.post('/api/gallery', (req, res) => {
  const gallery = getData('gallery.json');
  gallery.push({ ...req.body, id: Date.now() });
  saveData('gallery.json', gallery);
  res.json({ success: true });
});
app.delete('/api/gallery/:id', (req, res) => {
  let gallery = getData('gallery.json');
  gallery = gallery.filter(img => img.id != req.params.id);
  saveData('gallery.json', gallery);
  res.json({ success: true });
});

// Files CRUD
app.get('/api/files', (req, res) => {
  res.json(getData('files.json'));
});
app.post('/api/files', (req, res) => {
  const files = getData('files.json');
  files.push({ ...req.body, id: Date.now() });
  saveData('files.json', files);
  res.json({ success: true });
});
app.delete('/api/files/:id', (req, res) => {
  let files = getData('files.json');
  files = files.filter(f => f.id != req.params.id);
  saveData('files.json', files);
  res.json({ success: true });
});

// Live chat (mock, just stores messages)
app.post('/api/chat', (req, res) => {
  const chats = getData('chats.json');
  chats.push({ ...req.body, date: new Date() });
  saveData('chats.json', chats);
  res.json({ success: true });
});

// Visual editor (mock)
app.post('/api/apply-edit', (req, res) => {
  res.json({ success: true, newFileContent: '', beforeCode: '', afterCode: '' });
});

// Song Book API
app.get('/api/songs', (req, res) => {
  const songs = getData('songs.json');
  const { q, language } = req.query;
  let filtered = songs;
  if (q) {
    filtered = filtered.filter(song => song.title.toLowerCase().includes(q.toLowerCase()) || song.lyrics.toLowerCase().includes(q.toLowerCase()));
  }
  if (language) {
    filtered = filtered.filter(song => song.language.toLowerCase() === language.toLowerCase());
  }
  res.json(filtered);
});

app.get('/api/songs/:id', (req, res) => {
  const songs = getData('songs.json');
  const song = songs.find(s => s.id == req.params.id);
  if (!song) return res.status(404).json({ error: 'Song not found' });
  res.json(song);
});

app.post('/api/songs', (req, res) => {
  console.log('Received POST /api/songs body:', req.body);
  const songs = getData('songs.json');
  const { title, language, category, lyrics } = req.body;
  if (!title || !lyrics) return res.status(400).json({ error: 'Title and lyrics are required' });
  const newSong = {
    id: Date.now(),
    title,
    language: language || '',
    category: category || '',
    lyrics
  };
  songs.push(newSong);
  saveData('songs.json', songs);
  res.json({ success: true, song: newSong });
});

// DELETE song by id
app.delete('/api/songs/:id', (req, res) => {
  let songs = getData('songs.json');
  const id = req.params.id;
  const initialLength = songs.length;
  songs = songs.filter(song => String(song.id) !== String(id));
  if (songs.length === initialLength) {
    return res.status(404).json({ error: 'Song not found' });
  }
  saveData('songs.json', songs);
  res.json({ success: true });
});

app.listen(PORT, () => {
  console.log(`Backend server running on http://localhost:${PORT}`);
});
