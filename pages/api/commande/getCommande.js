import clientPromise from "../../../lib/dbConnect"
import Commande from "../../../models/commande"

export default async function (req, res) {
  try {
    clientPromise()
    const commandes = await Commande.find()
      .populate("commanderPar", "name  email phoneNumber adresseLivraison _id ")
      .sort({ createdAt: -1 })
    await res.status(200).send(commandes)
  } catch (e) {
    console.error(e)
    throw new Error(e).message
  }
}
