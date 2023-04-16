import mongoose from "mongoose"
const commandeSchema = new mongoose.Schema(
  {
    menu: {
      type: String,
    },
    photo: String,
    numClient: { type: String },
    adresseClient: { type: String },
    sauces: [String],
    suppléments: [String],
    boisson: [{ nom: String, nombre: String }],
    état: {
      type: String,
      default: "En cours",
    },
    livrable: {
      type: Boolean,
      default: true,
    },
    commanderPar: {
      type: mongoose.Types.ObjectId,
      ref: "User",
    },
    price: String,
    location: {
      type: {
        type: String,
        enum: ["Point"], // Utiliser le type de données GeoJSON "Point"
        // required: true,
      },
      coordinates: {
        type: [Number], // Tableau de deux nombres : la longitude et la latitude
        // required: true,
      },
    },
  },

  { timestamps: true }
)

export default mongoose.models.Commande ||
  mongoose.model("Commande", commandeSchema)
