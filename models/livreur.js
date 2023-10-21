import mongoose from "mongoose"

const livreurSchema = new mongoose.Schema({
  nom: String,
  email: String,
  phoneNumber: String,
  commandeTerminer: Number,
  commandeAnnuler: Number,
})
export default mongoose.models?.Livreur || mongoose.model("Livreur", livreurSchema)