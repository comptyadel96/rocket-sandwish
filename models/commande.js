import mongoose from "mongoose"
const commandeSchema = new mongoose.Schema(
  {
    menu: {
      type: mongoose.Types.ObjectId,
      ref: "Menu",
    },
    commanderPar: {
      type: mongoose.Types.ObjectId,
      ref: "User",
    },
  },
  { timestamps: true }
)

export default mongoose.models.Commande ||
  mongoose.model("Commande", commandeSchema)
