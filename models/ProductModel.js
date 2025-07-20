const mongoose = require("mongoose");

const reviewSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    name: { type: String, required: true },
    comment: { type: String, required: true },
    rating: { type: Number, required: true },
  },
  { timestamps: true }
);


const productSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
     discountprice: {
      type: Number,
    },
    sizes: [String],
    category: {
      type: String,
      required: true,
    },
     averageRating: {
      type: Number,
      default: 0,
    },
     numReviews: {
      type: Number, 
      default: 0,
    },
    stock: {
      type: Number,
      required: true,
      default: 0,
    },
    
  },
  { timestamps: true }
);

module.exports = mongoose.model("Product", productSchema);
