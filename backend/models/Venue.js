import mongoose from 'mongoose';

const venueSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  slug: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
  },
  address: {
    type: String,
    required: true,
  },
  coords: {
    lat: Number,
    lng: Number,
  },
  description: {
    type: String,
    required: true,
  },
  images: [String],
  phone: String,
  website: String,
  category: {
    type: String,
    enum: ['parque', 'beach-club', 'teatro', 'excursion', 'otro'],
    default: 'otro',
  },
}, {
  timestamps: true,
});

export default mongoose.model('Venue', venueSchema);
