import User from "../../../models/user"
import clientPromise from "../../../lib/dbConnect"

export default async function (req, res) {
  await clientPromise()
  try {
    const user = await User.findOne({ userId: req.query.id })

    if (user.role === "administrateur") {
      await res.status(200).send(user)
    } else {
      await res.status(403).send("non autorisé")
    }
  } catch (error) {
    console.log(error.message)
  }
}
