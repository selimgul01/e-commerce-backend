const express = require("express");
const router = express.Router();
const  {createReview, getAllReviewsByProduct}  = require("../controller/reviewController");
const protect = require("../middleware/authMiddleware");

router.post("/", protect, createReview);
router.get("/:productId",getAllReviewsByProduct)

module.exports = router;
