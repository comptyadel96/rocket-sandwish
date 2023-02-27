import mongoose from "mongoose"

const userSchema = new mongoose.Schema(
  {
    userId: String,
    email: {
      type: String,
      // required: true,
      // unique: [true, "Un utilisateur avec cet email existe déja"],
    },
    name: String,
    phoneNumber: {
      type: String,
      unique: [true, "Un utilisateur avec ce numéro de téléphone existe déja"],
    },
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
