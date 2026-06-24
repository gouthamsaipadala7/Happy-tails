import express from "express";
import {
  getPets,
  getPetById,
  createPet,
  updatePet,
  deletePet,
  getFeaturedPets,
} from "../controllers/petController.js";
import { protect } from "../middleware/authMiddleware.js";
import { isAdmin } from "../middleware/adminMiddleware.js";
import { petValidation, handleValidation } from "../utils/validators.js";

const router = express.Router();

router.get("/featured", getFeaturedPets);
router.get("/", getPets);
router.get("/:id", getPetById);
router.post("/", protect, isAdmin, petValidation, handleValidation, createPet);
router.put("/:id", protect, isAdmin, updatePet);
router.delete("/:id", protect, isAdmin, deletePet);

export default router;