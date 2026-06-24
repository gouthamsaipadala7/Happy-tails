import express from "express";
import {
  getSuccessStories,
  createSuccessStory,
  updateSuccessStory,
  deleteSuccessStory,
} from "../controllers/successStoryController.js";
import { protect } from "../middleware/authMiddleware.js";
import { isAdmin } from "../middleware/adminMiddleware.js";

const router = express.Router();

router.get("/", getSuccessStories);
router.post("/", protect, isAdmin, createSuccessStory);
router.put("/:id", protect, isAdmin, updateSuccessStory);
router.delete("/:id", protect, isAdmin, deleteSuccessStory);

export default router;