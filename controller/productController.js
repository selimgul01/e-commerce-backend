const Product = require("../models/ProductModel");

const getAllProducts = async (req,res) => {
  try {
    const products = await Product.find().sort({ createdAt: -1 });
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ message: "Ürünler alınamadı", error: error.message });
      
      
  }
};

const getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ message: "Ürün bulunamadı" });
    res.status(200).json(product);
  } catch (error) {
    res.status(500).json({ message: "Hata", error: error.message });
  }
};

const createProduct = async (req, res) => {
  try {
    const product = await Product.create(req.body);
    res.status(201).json(product);
  } catch (error) {
    res
      .status(400)
      .json({ message: "Ürün oluşturulamadı", error: error.message });
  }
};

module.exports = {
  createProduct,
  getProductById,
  getAllProducts,
};
