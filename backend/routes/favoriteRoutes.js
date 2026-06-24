import express from "express";
import { addFavorite, getMyFavorites, removeFavorite } from "../controllers/favoriteController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/", protect, addFavorite);
router.get("/", protect, getMyFavorites);
router.delete("/:petId", protect, removeFavorite);

export default router;