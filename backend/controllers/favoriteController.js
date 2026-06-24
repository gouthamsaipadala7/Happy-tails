import Favorite from "../models/Favorite.js";

// @desc Add pet to favorites
// @route POST /api/favorites
export const addFavorite = async (req, res, next) => {
  try {
    const { pet } = req.body;
    const existing = await Favorite.findOne({ user: req.user._id, pet });
    if (existing) return res.status(400).json({ message: "Already in favorites" });

    const favorite = await Favorite.create({ user: req.user._id, pet });
    res.status(201).json(favorite);
  } catch (error) {
    next(error);
  }
};

// @desc Get logged-in user's favorites
// @route GET /api/favorites
export const getMyFavorites = async (req, res, next) => {
  try {
    const favorites = await Favorite.find({ user: req.user._id }).populate("pet");
    res.json(favorites);
  } catch (error) {
    next(error);
  }
};

// @desc Remove favorite
// @route DELETE /api/favorites/:petId
export const removeFavorite = async (req, res, next) => {
  try {
    await Favorite.findOneAndDelete({ user: req.user._id, pet: req.params.petId });
    res.json({ message: "Removed from favorites" });
  } catch (error) {
    next(error);
  }
};