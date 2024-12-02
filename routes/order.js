const express = require("express");
const router = express.Router();
const Order = require("../schema/order.schema");

// Middleware to check if the user is authenticated
// Ensure you have a middleware that populates `req.user` from a JWT or session
const authenticate = require("../middleware/auth");

// GET all orders for a user
router.get("/", authenticate, async (req, res) => {
  try {
    const orders = await Order.find({ user: req.user.id }).populate("items.product");
    res.json(orders);
  } catch (err) {
    res.status(500).json({ message: "Internal server error" });
  }
});

// POST to create a new order
router.post("/", authenticate, async (req, res) => {
  const { items, totalAmount, deliveryOption } = req.body;

  if (!items || items.length === 0) {
    return res.status(400).json({ message: "Order items are required." });
  }

  try {
    const order = new Order({
      user: req.user.id,
      items,
      totalAmount,
      deliveryOption,
      status: "Pending",
      paymentStatus: "Pending",
    });

    await order.save();
    res.status(201).json(order);
  } catch (err) {
    res.status(500).json({ message: "Internal server error" });
  }
});

module.exports = router;
