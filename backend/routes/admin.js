import express from 'express';
import Event from '../models/Event.js';
import Order from '../models/Order.js';
import Venue from '../models/Venue.js';

const router = express.Router();

// TODO: Add authentication middleware

// GET /api/admin/orders - List all orders
router.get('/orders', async (req, res) => {
  try {
    const { status, from, to } = req.query;
    const filter = {};
    
    if (status) filter.status = status;
    if (from || to) {
      filter.createdAt = {};
      if (from) filter.createdAt.$gte = new Date(from);
      if (to) filter.createdAt.$lte = new Date(to);
    }
    
    const orders = await Order.find(filter)
      .populate('eventId')
      .sort({ createdAt: -1 });
    
    res.json({
      success: true,
      count: orders.length,
      data: orders,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
});

// POST /api/admin/events - Create event
router.post('/events', async (req, res) => {
  try {
    const event = await Event.create(req.body);
    
    res.status(201).json({
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

// PUT /api/admin/events/:id - Update event
router.put('/events/:id', async (req, res) => {
  try {
    const event = await Event.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    
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

// GET /api/admin/stats - Get dashboard stats
router.get('/stats', async (req, res) => {
  try {
    const totalOrders = await Order.countDocuments();
    const confirmedOrders = await Order.countDocuments({ status: 'confirmed' });
    const pendingOrders = await Order.countDocuments({ status: 'pending' });
    
    const totalRevenue = await Order.aggregate([
      { $match: { status: 'confirmed' } },
      { $group: { _id: null, total: { $sum: '$total' } } },
    ]);
    
    const topEvents = await Order.aggregate([
      { $match: { status: 'confirmed' } },
      { $group: { _id: '$eventId', count: { $sum: 1 }, revenue: { $sum: '$total' } } },
      { $sort: { count: -1 } },
      { $limit: 5 },
    ]);
    
    res.json({
      success: true,
      data: {
        totalOrders,
        confirmedOrders,
        pendingOrders,
        totalRevenue: totalRevenue[0]?.total || 0,
        topEvents,
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
});

export default router;
