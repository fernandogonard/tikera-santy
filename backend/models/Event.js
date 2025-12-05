import mongoose from 'mongoose';

const priceTierSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
  },
  sold: {
    type: Number,
    default: 0,
  },
});

const scheduleSchema = new mongoose.Schema({
  date: {
    type: Date,
    required: true,
  },
  time: {
    type: String,
    required: true,
  },
  capacity: {
    type: Number,
    required: true,
  },
  sold: {
    type: Number,
    default: 0,
  },
  priceTiers: [priceTierSchema],
});

const eventSchema = new mongoose.Schema({
  venueId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Venue',
    required: true,
  },
  title: {
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
  description: {
    type: String,
    required: true,
  },
  categories: [{
    type: String,
    enum: ['concierto', 'teatro', 'parque', 'excursion', 'deporte', 'festival', 'otro'],
  }],
  schedule: [scheduleSchema],
  images: [String],
  tags: [String],
  isOutdoor: {
    type: Boolean,
    default: false,
  },
  durationMinutes: Number,
  featured: {
    type: Boolean,
    default: false,
  },
  active: {
    type: Boolean,
    default: true,
  },
}, {
  timestamps: true,
});

// Virtual para obtener el precio mínimo
eventSchema.virtual('startPrice').get(function() {
  if (!this.schedule || this.schedule.length === 0) return 0;
  
  const prices = this.schedule.flatMap(s => 
    s.priceTiers.map(pt => pt.price)
  );
  
  return Math.min(...prices);
});

// Virtual para obtener la próxima fecha disponible
eventSchema.virtual('nextDate').get(function() {
  if (!this.schedule || this.schedule.length === 0) return null;
  
  const now = new Date();
  const futureDates = this.schedule
    .filter(s => new Date(s.date) >= now)
    .sort((a, b) => new Date(a.date) - new Date(b.date));
  
  return futureDates.length > 0 ? futureDates[0].date : null;
});

eventSchema.set('toJSON', { virtuals: true });
eventSchema.set('toObject', { virtuals: true });

export default mongoose.model('Event', eventSchema);
