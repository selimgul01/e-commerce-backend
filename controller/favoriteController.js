const Favorite = require("../models/FavoriteModel");

const addToFavorites = async (req, res) => {
  try {
    const userId = req.user._id;
    const { productId } = req.body;

    let favorites = await Favorite.findOne({ user: userId });

    if (!favorites) {
      favorites = new Favorite({
        user: userId,
        items: [{ product: productId }],
      });
    } else {
      const alreadyExists = favorites.items.find(
        (item) => item.product.toString() === productId
      );
      if (alreadyExists) {
        return res.status(400).json({ message: "Zaten favorilere eklendi." });
      }

      favorites.items.push({ product: productId });
    }

    await favorites.save();
    res.status(200).json({ data: favorites, message: "Favorilere Ekleni" });
  } catch (error) {
    res.status(500).json({ message: "Favoriler alınırken hata oluştu" });
  }
};

const removeFromFavorites = async (req, res) => {
  try {
    const userId = req.user._id;
    const { productId } = req.body;

    const favorites = await Favorite.findOne({ user: userId });
    if (!favorites)
      return res.status(404).json({ message: "Favoriler bulunamadı." });

    favorites.items = favorites.items.filter(
      (item) => item.product.toString() !== productId
    );

    await favorites.save();
    res.status(200).json(favorites);
  } catch (error) {
    res.status(500).json({ message: "Favoriler alınırken hata oluştu" });
  }
};

const getFavorites = async (req, res) => {
  try {
    const userId = req.user._id;

    const favorites = await Favorite.findOne({ user: userId }).populate(
      "items.product"
    );
    if (!favorites) return res.status(200).json({ items: [] });

    res.status(200).json(favorites);
  } catch (error) {
    res.status(500).json({ message: "Favoriler alınırken hata oluştu" });
  }
};

module.exports = {
  addToFavorites,
  removeFromFavorites,
  getFavorites,
};
