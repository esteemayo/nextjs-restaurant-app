import mongoose from 'mongoose';

const orderSchema = new mongoose.Schema(
  {
    customer: {
      type: String,
      required: [true, 'An order must belong to a customer'],
      maxlength: 60,
    },
    address: {
      type: String,
      required: [true, 'An order must have an address'],
      maxlength: 200,
    },
    total: {
      type: Number,
      required: [true, 'An order must have a total'],
    },
    status: {
      type: Number,
      default: 0,
    },
    method: {
      type: Number,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Order = mongoose.models.Order || mongoose.model('Order', orderSchema);

export default Order;
