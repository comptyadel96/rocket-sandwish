import clientPromise from "../../../lib/dbConnect"
import User from "../../../models/user"

export default async function (req, res) {
  await clientPromise()
  try {
    const user = await User.findOne({ userId: req.query.id })
    // console.log(user)
    await res.status(200).send(user)
  } catch (error) {
    console.log(error.message)
  }
}
