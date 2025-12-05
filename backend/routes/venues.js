import express from 'express';
import Venue from '../models/Venue.js';

const router = express.Router();

// GET /api/venues - List all venues
router.get('/', async (req, res) => {
  try {
    const { category } = req.query;
    const filter = category ? { category } : {};
    
    const venues = await Venue.find(filter).sort({ name: 1 });
    
    res.json({
      success: true,
      count: venues.length,
      data: venues,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
});

// GET /api/venues/:id - Get venue by ID
router.get('/:id', async (req, res) => {
  try {
    const venue = await Venue.findById(req.params.id);
    
    if (!venue) {
      return res.status(404).json({
        success: false,
        error: 'Venue not found',
      });
    }
    
    res.json({
      success: true,
      data: venue,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
});

export default router;
