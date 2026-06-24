import mongoose from "mongoose";

const petSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    species: { type: String, enum: ["Dog", "Cat", "Rabbit", "Bird"], required: true },
    breed: { type: String, required: true },
    age: { type: Number, required: true },
    gender: { type: String, enum: ["Male", "Female"], required: true },
    size: { type: String, enum: ["Small", "Medium", "Large"], default: "Medium" },
    color: { type: String, default: "" },
    description: { type: String, required: true },
    images: [{ type: String }],
    status: { type: String, enum: ["Available", "Pending", "Adopted"], default: "Available" },
    healthInfo: { type: String, default: "" },
    vaccinated: { type: Boolean, default: false },
    neutered: { type: Boolean, default: false },
    shelterName: { type: String, default: "Happy Tails Shelter" },
    shelterLocation: { type: String, default: "" },
    shelterContact: { type: String, default: "" },
    goodWithKids: { type: Boolean, default: true },
    goodWithPets: { type: Boolean, default: true },
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  },
  { timestamps: true }
);

petSchema.index({ name: "text", breed: "text", species: "text" });

export default mongoose.model("Pet", petSchema);