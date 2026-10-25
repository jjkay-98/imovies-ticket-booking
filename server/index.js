import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import Booking from './models/Booking.js';
import { movies } from './data/movies.js';

const app = express();
app.use(cors()); app.use(express.json());
let dbReady = false;
mongoose.connect(process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/imovies')
  .then(() => { dbReady = true; console.log('MongoDB connected'); })
  .catch(() => console.log('MongoDB unavailable — running catalog in demo mode'));

app.get('/api/health', (_req, res) => res.json({ ok: true, database: dbReady ? 'connected' : 'demo mode' }));
app.get('/api/movies', (_req, res) => res.json(movies));
app.get('/api/movies/:id', (req, res) => { const movie = movies.find(m => m.id === req.params.id); movie ? res.json(movie) : res.status(404).json({ message: 'Movie not found' }); });
app.get('/api/bookings/seats', async (req, res) => {
  const { movieId, date, showtime } = req.query;
  if (!movieId || !date || !showtime) return res.status(400).json({ message: 'movieId, date and showtime are required' });
  if (!dbReady) return res.json({ seats: [] });
  const bookings = await Booking.find({ movieId, date, showtime }).select('seats -_id');
  res.json({ seats: bookings.flatMap(b => b.seats) });
});
app.post('/api/bookings', async (req, res) => {
  const { movieId, date, showtime, seats, name, email } = req.body;
  const movie = movies.find(m => m.id === movieId);
  if (!movie || !date || !showtime || !Array.isArray(seats) || seats.length < 1 || seats.length > 8 || !name?.trim() || !/^\S+@\S+\.\S+$/.test(email || '')) return res.status(400).json({ message: 'Check your booking details and try again.' });
  const bookingCode = 'IM' + Math.random().toString(36).slice(2, 8).toUpperCase();
  if (!dbReady) return res.status(503).json({ message: 'Booking is in demo mode. Connect MongoDB to confirm reservations.' });
  try {
    const booked = await Booking.find({ movieId, date, showtime, seats: { $in: seats } }).select('seats');
    const taken = new Set(booked.flatMap(b => b.seats));
    const unavailable = seats.filter(s => taken.has(s));
    if (unavailable.length) return res.status(409).json({ message: `These seats were just taken: ${unavailable.join(', ')}` });
    const booking = await Booking.create({ movieId, movieTitle: movie.title, date, showtime, seats, name: name.trim(), email, total: seats.length * 14, bookingCode });
    return res.status(201).json({ booking });
  } catch (error) { return res.status(500).json({ message: 'Could not confirm booking. Please try again.' }); }
});
const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`iMovies API listening on ${port}`));
