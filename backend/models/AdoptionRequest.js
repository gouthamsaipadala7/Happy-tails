import mongoose from "mongoose";

const adoptionRequestSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    pet: { type: mongoose.Schema.Types.ObjectId, ref: "Pet", required: true },

    personalInfo: {
      fullName: { type: String, required: true },
      email: { type: String, required: true },
      phone: { type: String, required: true },
      occupation: { type: String, default: "" },
    },

    addressInfo: {
      street: { type: String, required: true },
      city: { type: String, required: true },
      state: { type: String, required: true },
      zipCode: { type: String, required: true },
      country: { type: String, default: "India" },
    },

    housingInfo: {
      housingType: { type: String, enum: ["Own", "Rent"], required: true },
      hasYard: { type: Boolean, default: false },
      landlordApproval: { type: Boolean, default: false },
      numberOfOccupants: { type: Number, default: 1 },
    },

    petExperience: {
      hasOtherPets: { type: Boolean, default: false },
      otherPetsDetails: { type: String, default: "" },
      experienceLevel: { type: String, enum: ["First-time", "Some experience", "Very experienced"], default: "First-time" },
      hoursAloneDaily: { type: Number, default: 0 },
    },

    additionalNotes: { type: String, default: "" },

    status: {
      type: String,
      enum: ["Pending", "Under Review", "Approved", "Rejected"],
      default: "Pending",
    },

    adminNotes: { type: String, default: "" },
  },
  { timestamps: true }
);

export default mongoose.model("AdoptionRequest", adoptionRequestSchema);