const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },

  items: [
    {
      product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product",
        required: true,
      },
      quantity: {
        type: Number,
        ref: "Product",
        required: true,
      },
      size: { type: String, required: true },
    },
  ],
  shippingAddress: {
    fullName: { type: String, required: true },
    city: { type: String, required: true },
    street: { type: String, required: true },
    phone: { type: String, required: true },
  },
  totalPrice: {
    type: Number,
    required: true,
  },
},{timestamps: true});


module.exports = mongoose.model("Order", orderSchema);
