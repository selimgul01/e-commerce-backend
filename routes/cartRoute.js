const express = require("express");
const router = express.Router();
const { addToCart, getUserCart } = require("../controller/cartController");
const protect = require("../middleware/authMiddleware");

router.post("/add", protect, addToCart);        // sepete ürün ekle
router.get("/", protect, getUserCart);          // sepeti getir

module.exports = router;
