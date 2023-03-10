import mongoose from "mongoose"

const userSchema = new mongoose.Schema(
  {
    userId: String,
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
  },
  { timestamps: true }
)

export default mongoose.models.User || mongoose.model("User", userSchema)
