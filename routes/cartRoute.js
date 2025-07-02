const express = require("express");
const router = express.Router();
const { addToCart, getUserCart, clearCart, removeFromCart } = require("../controller/cartController");
const protect = require("../middleware/authMiddleware");

router.post("/add", protect, addToCart);   
router.get("/", protect, getUserCart);   
router.delete("/remove",protect,removeFromCart)       
router.delete("/clear",protect,clearCart)
module.exports = router;
