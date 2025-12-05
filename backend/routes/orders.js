import express from 'express';
import Order from '../models/Order.js';
import Event from '../models/Event.js';
import { preferenceClient } from '../config/mercadopago.js';
import { nanoid } from 'nanoid';

const router = express.Router();

// POST /api/orders - Create new order
router.post('/', async (req, res) => {
  try {
    const { eventId, schedule, items, customer } = req.body;
    
    // Validate event exists
    const event = await Event.findById(eventId).populate('venueId');
    if (!event) {
      return res.status(404).json({
        success: false,
        error: 'Event not found',
      });
    }
    
    // Find schedule
    const eventSchedule = event.schedule.find(
      s => s.date.toISOString() === new Date(schedule.date).toISOString() && s.time === schedule.time
    );
    
    if (!eventSchedule) {
      return res.status(404).json({
        success: false,
        error: 'Schedule not found',
      });
    }
    
    // Calculate total and validate stock
    let total = 0;
    const orderItems = [];
    
    for (const item of items) {
      const priceTier = eventSchedule.priceTiers.find(pt => pt.name === item.ticketTypeName);
      
      if (!priceTier) {
        return res.status(400).json({
          success: false,
          error: `Ticket type ${item.ticketTypeName} not found`,
        });
      }
      
      const available = priceTier.quantity - priceTier.sold;
      if (available < item.quantity) {
        return res.status(400).json({
          success: false,
          error: `Not enough tickets available for ${item.ticketTypeName}`,
        });
      }
      
      total += priceTier.price * item.quantity;
      orderItems.push({
        ticketTypeName: item.ticketTypeName,
        quantity: item.quantity,
        price: priceTier.price,
      });
    }
    
    // Create order
    const order = await Order.create({
      orderId: nanoid(10),
      eventId,
      schedule: {
        date: schedule.date,
        time: schedule.time,
      },
      items: orderItems,
      total,
      customer,
      status: 'pending',
    });
    
    // Create MercadoPago preference
    const preferenceData = {
      body: {
        items: orderItems.map(item => ({
          title: `${event.title} - ${item.ticketTypeName}`,
          unit_price: item.price,
          quantity: item.quantity,
        })),
        payer: {
          name: customer.name,
          email: customer.email,
          phone: {
            number: customer.phone,
          },
        },
        back_urls: {
          success: `${process.env.FRONTEND_URL}/confirmacion/${order._id}`,
          failure: `${process.env.FRONTEND_URL}/checkout?error=payment_failed`,
          pending: `${process.env.FRONTEND_URL}/confirmacion/${order._id}?status=pending`,
        },
        auto_return: 'approved',
        external_reference: order.orderId,
        notification_url: `${process.env.BACKEND_URL || 'http://localhost:5000'}/api/payments/webhook/mercadopago`,
      }
    };
    
    const mpResponse = await preferenceClient.create(preferenceData);
    
    // Update order with payment info
    order.payment.preferenceId = mpResponse.id;
    await order.save();
    
    res.status(201).json({
      success: true,
      data: {
        order,
        payment: {
          init_point: mpResponse.init_point,
          preferenceId: mpResponse.id,
        },
      },
    });
  } catch (error) {
    console.error('Order creation error:', error);
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
});

// GET /api/orders/:id - Get order details
router.get('/:id', async (req, res) => {
  try {
    const order = await Order.findById(req.params.id)
      .populate('eventId')
      .populate({
        path: 'eventId',
        populate: { path: 'venueId' },
      });
    
    if (!order) {
      return res.status(404).json({
        success: false,
        error: 'Order not found',
      });
    }
    
    res.json({
      success: true,
      data: order,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
});

export default router;
