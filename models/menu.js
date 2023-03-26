import mongoose from "mongoose"

const menuSchema = new mongoose.Schema(
  {
    // status: {
    //   type: String,
    //   enum: ["en cours", "terminer", "annuler"],
    //   default: "en cours",
    // },
    prix: {
      type: String,
      required: true,
    },
    prixPoints: {
      type: String,
      // required: true,
    },
    nom: {
      type: String,
      min: [10, "le nom du menu doit contenir aumoins 10 lettres"],
      max: [1024, "le nom ne peut pas dépasser les 1024 lettres"],
      required: true,
    },
    photo: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      min: [
        20,
        "vous devez aumoins utliser 20 lettres pour les ingredients de votre menu",
      ],
      max: [5000, "le menu ne peut pas dépasser les 5000 lettres / chiffres"],
      required: true,
    },
    // commanderPar: {
    //   type: mongoose.Types.ObjectId,
    //   ref: "User",
    // },
  },
  { timestamps: true }
)

export default mongoose.models.Menu || mongoose.model("Menu", menuSchema)
