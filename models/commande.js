import mongoose from "mongoose"
const commandeSchema = new mongoose.Schema(
  {
    menu: {
      type: String,
    },

    numClient: { type: String, required: true },
    adresseClient: { type: String, required: true },
    sauces: [String],
    suppléments: [String],
    boisson: [{ nom: String, nombre: String }],
    état: [String],
    typeLivraison: String,
  },

  { timestamps: true }
)

export default mongoose.models.Commande ||
  mongoose.model("Commande", commandeSchema)
