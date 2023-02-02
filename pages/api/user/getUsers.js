import clientPromise from "../../../lib/dbConnect"
import User from "../../../models/user"

export default async function (req, res) {
  try {
    await clientPromise()

    const users = await User.find()
    await res.status(200).send(users)
  } catch (error) {
    console.log(error)
  }
}
