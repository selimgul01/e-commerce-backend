const Cart = require("../models/CartModel");

const addToCart = async (req, res) => {
  try {
    const userId = req.user._id;
    const { productId, quantity, size } = req.body;

    if (!productId || !size || quantity <= 0) {
      return res.status(400).json({ message: "Eksik veya geçersiz bilgi" });
    }

    let cart = await Cart.findOne({ user: userId });

    if (!cart) {
      cart = new Cart({
        user: userId,
        items: [{ product: productId, quantity, size }],
      });
    } else {
      const itemIndex = cart.items.findIndex(
        (item) => item.product.toString() === productId && item.size === size
      );

      if (itemIndex > -1) {
        cart.items[itemIndex].quantity += quantity;
      } else {
        cart.items.push({ product: productId, quantity, size });
      }
    }

    await cart.save();
    res.status(200).json({cart, message:"Ürün Sepete Eklendi"});
  } catch (error) {
    console.error("Cart Error:", error.message);
    res.status(500).json({ message: "Sepet güncellenemedi" });
  }
};

const getUserCart = async (req, res) => {
  const userId = req.user._id;
  const cart = await Cart.findOne({ user: userId }).populate("items.product");
  if (!cart) {
    return res.status(200).json({ items: [] });
  }

  res.status(200).json(cart);
};

const removeFromCart = async (req, res) => {
  const userId = req.user._id;
  const { productId } = req.body
  console.log("removeFromCart productId:",productId)

  try {
    const cart = await Cart.findOne({ user: userId });
    if (!cart) return res.status(400).json({ message: "Sepet Bulunamadı" });
    cart.items = cart.items.filter( (item) => item._id.toString() !== productId )
      
    await cart.save();
    await cart.populate("items.product")
    res.status(200).json({cart, message: "Ürün Sepetten Çıkarıldı"});
  } catch (error) {
    res.status(500).json({ message: "Ürün silme hatası", error });
  }
};

const clearCart = async (req, res) => {
  const userId = req.user._id;
  try {
    await Cart.findOneAndDelete({ user: userId });
    res.status(200).json({ message: "Sepet başarıyla temizlendi" });
  } catch (error) {
    res.status(500).json({ message: "Sepeti temizleme hatası", error });
  }
};

module.exports = {
  addToCart,
  getUserCart,
  clearCart,
  removeFromCart
};
