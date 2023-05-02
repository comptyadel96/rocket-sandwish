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
    name: { type: String, required: true },
    phoneNumber: { type: String, required: true },
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
    location: {
      type: {
        type: String,
        enum: ["Point"], // Utiliser le type de données GeoJSON "Point"
      },
      coordinates: {
        type: [Number], // Tableau de deux nombres : la longitude et la latitude
      },
    },
    favories: [{ type: mongoose.Schema.Types.ObjectId, ref: "Menu" }],
  },
  { timestamps: true }
)

export default mongoose.models?.User || mongoose.model("User", userSchema)
