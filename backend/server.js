import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import morgan from "morgan";
import connectDB from "./config/db.js";
import { errorHandler, notFound } from "./middleware/errorMiddleware.js";

import authRoutes from "./routes/authRoutes.js";
import petRoutes from "./routes/petRoutes.js";
import adoptionRoutes from "./routes/adoptionRoutes.js";
import favoriteRoutes from "./routes/favoriteRoutes.js";
import successStoryRoutes from "./routes/successStoryRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import adminRoutes from "./routes/adminRoutes.js";

dotenv.config();

console.log("MONGO_URI:", process.env.MONGO_URI);

connectDB();

const app = express();

app.use(cors({ origin: process.env.CLIENT_URL || "*", credentials: true }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
if (process.env.NODE_ENV !== "production") {
  app.use(morgan("dev"));
}

app.get("/api/health", (req, res) => {
  res.json({ status: "ok", message: "Happy Tails API is running" });
});

app.use("/api/auth", authRoutes);
app.use("/api/pets", petRoutes);
app.use("/api/adoptions", adoptionRoutes);
app.use("/api/favorites", favoriteRoutes);
app.use("/api/success-stories", successStoryRoutes);
app.use("/api/users", userRoutes);
app.use("/api/admin", adminRoutes);

app.get("/", (req, res) => {
  res.json({
    success: true,
    message: "🐾 Happy Tails API Running",
  });
});

app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`🐾 Happy Tails server running on port ${PORT} [${process.env.NODE_ENV || "development"}]`);
});