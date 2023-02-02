import mongoose from "mongoose"

const userSchema = new mongoose.Schema({
  userId: String,
  email: {
    type: String,
    required: true,
    unique: [true, "Un utilisateur avec cet email existe déja"],
  },
  name: String,
  role: {
    type: String,
    default: "user",
    enum: {
      values: ["client", "modérateur", "administrateur"],
    },
  },
  picture: String,
  commandes: [],
  rocketPts: {
    type: Number,
    default: 0,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
})

export default mongoose.models.User || mongoose.model("User", userSchema)
