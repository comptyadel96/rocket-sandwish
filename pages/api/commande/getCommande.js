import clientPromise from "../../../lib/dbConnect"
import Commande from "../../../models/commande"

export default async function (req, res) {
  try {
    await clientPromise()
    const commandes = await Commande.find()
      // .populate("User", "name  email phoneNumber ")
      .populate("Menu")
      .sort({ createdAt: -1 })
    await res.status(200).send(commandes)
  } catch (e) {
    console.error(e)
    throw new Error(e).message
  }
}
