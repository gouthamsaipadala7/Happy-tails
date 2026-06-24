import express from "express";
import { signup, login, getMe, forgotPassword, resetPassword } from "../controllers/authController.js";
import { protect } from "../middleware/authMiddleware.js";
import { signupValidation, loginValidation, handleValidation } from "../utils/validators.js";

const router = express.Router();

router.post("/signup", signupValidation, handleValidation, signup);
router.post("/login", loginValidation, handleValidation, login);
router.get("/me", protect, getMe);
router.post("/forgot-password", forgotPassword);
router.post("/reset-password", resetPassword);

export default router;