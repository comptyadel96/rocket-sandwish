import mongoose from "mongoose"
const commandeSchema = new mongoose.Schema(
  {
    menu: {
      type: String,
    },

    numClient: { type: String },
    adresseClient: { type: String },
    sauces: [String],
    suppléments: [String],
    boisson: [{ nom: String, nombre: String }],
    état: [String],
    livrable: {
      type: Boolean,
    },
  },

  { timestamps: true }
)

export default mongoose.models.Commande ||
  mongoose.model("Commande", commandeSchema)
