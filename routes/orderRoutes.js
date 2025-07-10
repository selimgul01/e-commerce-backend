const express = require("express")
const router = express.Router()
const { createOrder, getUserOrders } = require("../controller/orderController")
const protect = require("../middleware/authMiddleware")

router.post("/", protect, createOrder)
router.get("/my-orders", protect, getUserOrders)

module.exports = router