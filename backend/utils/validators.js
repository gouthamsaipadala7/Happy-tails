import { body, validationResult } from "express-validator";

export const handleValidation = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ message: errors.array()[0].msg, errors: errors.array() });
  }
  next();
};

export const signupValidation = [
  body("name").trim().notEmpty().withMessage("Name is required"),
  body("email").isEmail().withMessage("Valid email is required"),
  body("password").isLength({ min: 6 }).withMessage("Password must be at least 6 characters"),
];

export const loginValidation = [
  body("email").isEmail().withMessage("Valid email is required"),
  body("password").notEmpty().withMessage("Password is required"),
];

export const petValidation = [
  body("name").trim().notEmpty().withMessage("Pet name is required"),
  body("species").isIn(["Dog", "Cat", "Rabbit", "Bird"]).withMessage("Invalid species"),
  body("breed").trim().notEmpty().withMessage("Breed is required"),
  body("age").isNumeric().withMessage("Age must be a number"),
  body("gender").isIn(["Male", "Female"]).withMessage("Invalid gender"),
  body("description").trim().notEmpty().withMessage("Description is required"),
];