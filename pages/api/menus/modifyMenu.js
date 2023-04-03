import clientPromise from "../../../lib/dbConnect"
import Menu from "../../../models/menu"
import User from "../../../models/user"
export default async (req, res) => {
  try {
    clientPromise()
    const { id, userId } = req.query
    const currentUser = await User.findById(userId)
    if (currentUser.role === "administrateur") {
      const { nom, description, prix, photo, prixPoints, tag } = req.body
      await Menu.findOneAndUpdate(
        { _id: id },
        { nom, description, prix, photo, prixPoints, tag },
        { new: true }
      )
      return res.status(200).send("modifier avec succées!")
    } else {
      return res.status(403).send("non autorisé")
    }
  } catch (e) {
    console.error(e)
    throw new Error(e).message
  }
}
