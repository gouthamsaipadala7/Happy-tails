import express from "express";
import {
  createAdoptionRequest,
  getMyAdoptionRequests,
  getAdoptionRequestById,
  getAllAdoptionRequests,
  updateAdoptionStatus,
} from "../controllers/adoptionController.js";
import { protect } from "../middleware/authMiddleware.js";
import { isAdmin } from "../middleware/adminMiddleware.js";

const router = express.Router();

router.post("/", protect, createAdoptionRequest);
router.get("/my", protect, getMyAdoptionRequests);
router.get("/", protect, isAdmin, getAllAdoptionRequests);
router.get("/:id", protect, getAdoptionRequestById);
router.put("/:id/status", protect, isAdmin, updateAdoptionStatus);

export default router;