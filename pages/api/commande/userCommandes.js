import clientPromise from "../../../lib/dbConnect"
import Commande from "../../../models/commande"

export default async function (req, res) {
  const id = req.query.id
  try {
    clientPromise()
    const commandes = await Commande.find({ commanderPar: id })
      .populate("commanderPar", "name  email phoneNumber adresseLivraison _id ")
      .sort({ createdAt: -1 })
    await res.status(200).send(commandes)
  } catch (e) {
    console.error(e)
    throw new Error(e).message
  }
}
