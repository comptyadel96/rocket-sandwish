import clientPromise from "../../../lib/dbConnect"
import Commande from "../../../models/commande"

export default async function (req, res) {
  if (req.method == "POST") {
    try {
      clientPromise()
      const id = req.query.id
      const commande = await Commande.findByIdAndUpdate(id, {
        état: req.body.état,
      })
      await res.status(200).send(commande)
    } catch (e) {
      console.error(e)
      throw new Error(e).message
    }
  } else if (req.method == "DELETE") {
    try {
      clientPromise()
      const id = req.query.id
      const commande = await Commande.findByIdAndDelete(id)
      await res.status(200).send(commande)
    } catch (e) {
      console.error(e)
      throw new Error(e).message
    }
  }
}
