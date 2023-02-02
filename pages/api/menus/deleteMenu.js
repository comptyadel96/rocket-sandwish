import clientPromise from "../../../lib/dbConnect"
import Menu from "../../../models/menu"
import User from "../../../models/user"
export default async (req, res) => {
  try {
    await clientPromise()
    const { id, userId } = req.query
    const currentUser = await User.findById(userId)
    if (currentUser.role === "administrateur") {
      await Menu.findByIdAndDelete(id)
      return res.status(200).send("supprimer avec succées")
    } else {
      return res.status(403).send("non autorisé")
    }
  } catch (e) {
    console.error(e)
    throw new Error(e).message
  }
}
