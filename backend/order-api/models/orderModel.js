const mongoose = require('mongoose');

const itemSchema = new mongoose.Schema({
  productId: { type: String, required: true },
  name: { type: String }, // optional, for caching product name
  price: { type: Number }, // optional, for snapshotting price at order time
  quantity: { type: Number, required: true }
}, { _id: false });

const orderSchema = new mongoose.Schema({
  userId: { type: String, required: true },
  items: { type: [itemSchema], required: true },
  status: { type: String, default: 'pending' } // optional
}, { timestamps: true });

module.exports = mongoose.model('Order', orderSchema);
