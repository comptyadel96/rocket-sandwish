import mongoose from "mongoose"
const commandeSchema = new mongoose.Schema(
  {
    menu: {
      // type: mongoose.Types.ObjectId,
      // ref: "Menu",
      type: String,
    },
    // commanderPar: {
    //   type: mongoose.Types.ObjectId,
    //   ref: "User",

    //   required: True,
    //   type: String,
    // },
    numClient: { type: String, required: true },
    adresseClient: { type: String, required: true },
    sauces: [String],
    suppléments: [String],
    boisson: [{ nom: String, nombre: String }],
  },

  { timestamps: true }
)

export default mongoose.models.Commande ||
  mongoose.model("Commande", commandeSchema)
