const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  items: [
    {
      product: { type: mongoose.Schema.Types.ObjectId, ref: "Product" },
      quantity: { type: Number, required: true },
    },
  ],
  totalAmount: { type: Number, required: true },
  deliveryOption: { type: String, enum: ["Door delivery", "Pick up"], required: true },
  status: { type: String, default: "Pending" },
  paymentStatus: { type: String, enum: ["Pending", "Paid"], default: "Pending" },
}, { timestamps: true });

module.exports = mongoose.model("Order", orderSchema);
