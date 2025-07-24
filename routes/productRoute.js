const express = require("express")
const router = express.Router()

const {getAllProducts, getProductById, createProduct} = require("../controller/productController")

// /api/products
router.get('/', getAllProducts)
router.get('/:id', getProductById)
router.post('/', createProduct) // Geçici olarak public (ileride auth ekleyeceğiz)

module.exports = router; 