import clientPromise from "../../../lib/dbConnect"
import Commande from "../../../models/commande"

export default async function (req, res) {
  try {
    await clientPromise()
    await Commande.find()
      .populate("User", "name  email phoneNumber ")
      .populate("Menu")
      .sort({ createdAt: -1 })
  } catch (e) {
    console.error(e)
    throw new Error(e).message
  }
}
