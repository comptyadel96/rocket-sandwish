import clientPromise from "../../../lib/dbConnect"
import Commande from "../../../models/commande"
import User from "../../../models/user"

export default async function (req, res) {
  try {
    await clientPromise()
    const { userId, menuId } = req.query
    const commande = await Commande.create({
      menu: menuId,
      commanderPar: userId,
    })
    const currUser = await User.findById(userId)
    await currUser.commandes.push(commande)
    res.status(200).send(commande)
  } catch (e) {
    console.error(e)
    throw new Error(e).message
  }
}
