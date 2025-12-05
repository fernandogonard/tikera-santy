import express from 'express';
import Order from '../models/Order.js';
import Event from '../models/Event.js';
import { paymentClient } from '../config/mercadopago.js';
import QRCode from 'qrcode';
import { nanoid } from 'nanoid';

const router = express.Router();

// POST /api/payments/webhook/mercadopago - MercadoPago webhook
router.post('/webhook/mercadopago', async (req, res) => {
  try {
    const { type, data } = req.body;
    
    // Only process payment notifications
    if (type !== 'payment') {
      return res.sendStatus(200);
    }
    
    // Get payment info from MercadoPago
    const paymentId = data.id;
    const payment = await paymentClient.get({ id: paymentId });
    
    const externalReference = payment.external_reference;
    const order = await Order.findOne({ orderId: externalReference });
    
    if (!order) {
      console.error(`Order not found for reference: ${externalReference}`);
      return res.sendStatus(404);
    }
    
    // Update payment status
    order.payment.status = payment.status;
    order.payment.providerPaymentId = paymentId;
    order.payment.paymentData = payment;
    
    // If payment is approved, generate tickets
    if (payment.status === 'approved') {
      await processApprovedPayment(order);
    }
    
    await order.save();
    
    res.sendStatus(200);
  } catch (error) {
    console.error('Webhook error:', error);
    res.sendStatus(500);
  }
});

// Function to process approved payment
async function processApprovedPayment(order) {
  try {
    // Update order status
    order.status = 'confirmed';
    
    // Generate tickets
    const tickets = [];
    
    for (const item of order.items) {
      for (let i = 0; i < item.quantity; i++) {
        const ticketId = nanoid(12);
        const qrData = JSON.stringify({
          ticketId,
          orderId: order.orderId,
          eventId: order.eventId,
          type: item.ticketTypeName,
        });
        
        const qrCode = await QRCode.toDataURL(qrData);
        
        tickets.push({
          ticketId,
          ticketType: item.ticketTypeName,
          price: item.price,
          qrCode,
          used: false,
        });
      }
    }
    
    order.tickets = tickets;
    
    // Update event stock
    const event = await Event.findById(order.eventId);
    const schedule = event.schedule.find(
      s => s.date.toISOString() === order.schedule.date.toISOString() && 
           s.time === order.schedule.time
    );
    
    if (schedule) {
      for (const item of order.items) {
        const priceTier = schedule.priceTiers.find(pt => pt.name === item.ticketTypeName);
        if (priceTier) {
          priceTier.sold += item.quantity;
        }
      }
      schedule.sold += order.items.reduce((sum, item) => sum + item.quantity, 0);
      await event.save();
    }
    
    // TODO: Send confirmation email with tickets
    // await sendTicketEmail(order);
    
    console.log(`✅ Tickets generated for order ${order.orderId}`);
  } catch (error) {
    console.error('Error processing payment:', error);
    throw error;
  }
}

export default router;
