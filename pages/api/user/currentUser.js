import clientPromise from "../../../lib/dbConnect"
import User from "../../../models/user"
import Menu from "../../../models/menu"

export default async function (req, res) {
  clientPromise()
  try {
    const user = await User.findOne({ userId: req.body.id }).populate({
      path: "favories",
      model: Menu,
    })
    // if (!user) {
    //   return res.status(400).send("aucun uilisateur trouver avec cet id")
    // }
    await res.status(200).send(user)
  } catch (error) {
    console.log(error)
  }
}
