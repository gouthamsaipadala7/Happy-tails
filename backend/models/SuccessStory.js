import mongoose from "mongoose";

const successStorySchema = new mongoose.Schema(
  {
    petName: { type: String, required: true },
    adopterName: { type: String, required: true },
    title: { type: String, required: true },
    story: { type: String, required: true },
    images: [{ type: String }],
    testimonial: { type: String, default: "" },
    pet: { type: mongoose.Schema.Types.ObjectId, ref: "Pet" },
    featured: { type: Boolean, default: false },
  },
  { timestamps: true }
);

export default mongoose.model("SuccessStory", successStorySchema);