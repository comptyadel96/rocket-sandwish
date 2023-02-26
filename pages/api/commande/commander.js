import clientPromise from "../../../lib/dbConnect"
import Commande from "../../../models/commande"
// import User from "../../../models/user"

export default async function (req, res) {
  try {
    await clientPromise()
    const { menuId } = req.query
    const { numClient, adresseClient, sauces, suppléments, boisson } = req.body
    const commande = await Commande.create({
      menu: menuId,
      numClient,
      adresseClient,
      sauces,
      suppléments,
      boisson,
    })
   
    res.status(200).send(commande)
  } catch (e) {
    console.error(e)
    throw new Error(e).message
  }
}
