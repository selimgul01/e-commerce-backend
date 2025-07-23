const express = require("express");
const {
  addToFavorites,
  removeFromFavorites,
  getFavorites,
} = require("../controller/favoriteController");

const  protect  = require("../middleware/authMiddleware")

const router = express.Router();

router.post("/", protect, addToFavorites);
router.delete("/", protect, removeFromFavorites);
router.get("/", protect, getFavorites);

module.exports = router;
 