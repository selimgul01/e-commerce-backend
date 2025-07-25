const ReviewModel = require("../models/ReviewModel")
const Product = require("../models/ProductModel");

const createReview = async (req, res) => {
  const { productId, rating, comment } = req.body;


  try {
    const existingReview = await ReviewModel.findOne({
      product: productId,
      user: req.user._id, 
    }); 

    if (existingReview)
      return res
        .status(400)
        .json({ message: "Bu ürüne zaten yorum yaptınız." });

    const newReview = new ReviewModel({
      user: req.user._id,
      product: productId,
      rating,
      comment, 
    });

    await newReview.save();

    const reviews = await ReviewModel.find({ product: productId });
    
    const avgRating =
      reviews.reduce((acc, r) => acc + r.rating, 0) / reviews.length;

    await Product.findByIdAndUpdate(productId, {
      averageRating: avgRating.toFixed(1),
      numReviews: reviews.length,
    });

    res.status(201).json({newReview, message:"Yorum Başarıyla Eklendi" });
  } catch (error) {
    res.status(500).json({
    message: "Yorum eklenirken hata oluştu.",
    error: error.message,
  });
  }
};

const getAllReviewsByProduct = async (req,res) =>{

  const {productId} = req.params


  try {
    const reviews = await ReviewModel.find({product: productId}).populate("user","username").sort({createdAt: -1})
    res.status(200).json(reviews)
  } catch (error) {
    console.error("Yorumları getirme hatası:", error);
    res.status(500).json({ message: "Yorumlar getirilemedi" });
  }

}

module.exports = {
  createReview,
  getAllReviewsByProduct,
};
