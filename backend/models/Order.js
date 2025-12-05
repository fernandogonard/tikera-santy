import mongoose from 'mongoose';

const ticketSchema = new mongoose.Schema({
  ticketId: {
    type: String,
    required: true,
    unique: true,
  },
  ticketType: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  qrCode: {
    type: String,
    required: true,
  },
  used: {
    type: Boolean,
    default: false,
  },
  usedAt: Date,
});

const orderSchema = new mongoose.Schema({
  orderId: {
    type: String,
    required: true,
    unique: true,
  },
  eventId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Event',
    required: true,
  },
  schedule: {
    date: {
      type: Date,
      required: true,
    },
    time: {
      type: String,
      required: true,
    },
  },
  items: [{
    ticketTypeName: String,
    quantity: Number,
    price: Number,
  }],
  total: {
    type: Number,
    required: true,
  },
  customer: {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
      required: true,
    },
    dni: String,
  },
  payment: {
    provider: {
      type: String,
      enum: ['mercadopago', 'stripe', 'paypal'],
      default: 'mercadopago',
    },
    status: {
      type: String,
      enum: ['pending', 'approved', 'rejected', 'refunded', 'cancelled'],
      default: 'pending',
    },
    providerPaymentId: String,
    preferenceId: String,
    paymentData: mongoose.Schema.Types.Mixed,
  },
  tickets: [ticketSchema],
  status: {
    type: String,
    enum: ['pending', 'confirmed', 'cancelled', 'refunded'],
    default: 'pending',
  },
  expiresAt: {
    type: Date,
    default: () => new Date(Date.now() + 15 * 60 * 1000), // 15 minutos
  },
}, {
  timestamps: true,
});

// Índice para limpiar órdenes expiradas
orderSchema.index({ expiresAt: 1 }, { expireAfterSeconds: 0 });

export default mongoose.model('Order', orderSchema);
