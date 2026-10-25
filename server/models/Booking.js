import mongoose from 'mongoose';
const bookingSchema = new mongoose.Schema({
  movieId: { type: String, required: true }, movieTitle: { type: String, required: true },
  date: { type: String, required: true }, showtime: { type: String, required: true },
  seats: { type: [String], required: true }, name: { type: String, required: true },
  email: { type: String, required: true }, total: { type: Number, required: true },
  bookingCode: { type: String, required: true, unique: true }
}, { timestamps: true });
export default mongoose.model('Booking', bookingSchema);
