import Commande from "../../../models/commande"
import clientPromise from "../../../lib/dbConnect"
import User from "../../../models/user"

export default async function (req, res) {
  try {
    clientPromise()
    const commandes = await Commande.find()
      .populate({
        path: "commanderPar",
        model:User,
      })
      .sort({ createdAt: -1 })
    await res.status(200).send(commandes)
  } catch (e) {
    console.error(e)
    throw new Error(e).message
  }
}
