import mongoose from "mongoose"

const userSchema = new mongoose.Schema(
  {
    userId: {
      type: String,
      unique: true,
    },
    email: {
      type: String,
    },
    name: String,
    phoneNumber: String,
    role: {
      type: String,
      default: "user",
    },
    picture: String,
    commandes: [],
    rocketPts: {
      type: String,
      default: 0,
    },
    adresseLivraison: String,
    hasCompletedProfil: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
)

export default mongoose.models.User || mongoose.model("User", userSchema)
