import mongoose from "mongoose"
const commandeSchema = new mongoose.Schema(
  {
    menu: {
      type: String,
    },
    // commanderPar: {
    //   type: mongoose.Types.ObjectId,
    //   ref: "User",

    //   required: True,
    //   type: String,
    // },
    numClient: String,
    adresseClient: String,
    sauces: [String],
    suppléments: [String],
    boisson: [{ nom: String, nombre: String }],
  },

  { timestamps: true }
)

export default mongoose.models.Commande ||
  mongoose.model("Commande", commandeSchema)
