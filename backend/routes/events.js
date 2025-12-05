import express from 'express';
import Event from '../models/Event.js';
import Venue from '../models/Venue.js';

const router = express.Router();

// GET /api/events - List events with filters
router.get('/', async (req, res) => {
  try {
    const { venue, category, from, to, featured } = req.query;
    const filter = { active: true };
    
    if (venue) filter.venueId = venue;
    if (category) filter.categories = category;
    if (featured) filter.featured = featured === 'true';
    
    const events = await Event.find(filter)
      .populate('venueId', 'name address coords')
      .sort({ createdAt: -1 });
    
    // Filter by date range if provided
    let filteredEvents = events;
    if (from || to) {
      filteredEvents = events.filter(event => {
        return event.schedule.some(s => {
          const scheduleDate = new Date(s.date);
          if (from && scheduleDate < new Date(from)) return false;
          if (to && scheduleDate > new Date(to)) return false;
          return true;
        });
      });
    }
    
    res.json({
      success: true,
      count: filteredEvents.length,
      data: filteredEvents,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
});

// GET /api/events/:id - Get event details
router.get('/:id', async (req, res) => {
  try {
    const event = await Event.findById(req.params.id)
      .populate('venueId');
    
    if (!event) {
      return res.status(404).json({
        success: false,
        error: 'Event not found',
      });
    }
    
    res.json({
      success: true,
      data: event,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
});

export default router;
