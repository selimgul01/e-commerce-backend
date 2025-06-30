const Cart = require("../models/CartModel");

const addToCart = async (req, res) => {
  const userId = req.user._id;
  const { productId, quantity, size } = req.body;

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
  res.status(200).json(cart);
};

const getUserCart = async (req, res) => {
  const userId = req.user._id;
  const cart = await Cart.findOne({ user: userId }).populate("items.product");
  if (!cart) {
    return res.status(200).json({ items: [] }); // boş sepet
  }

  res.status(200).json(cart);

}


module.exports = {
    addToCart,
    getUserCart,
}