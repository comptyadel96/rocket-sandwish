import clientPromise from "../../../lib/dbConnect"
import User from "../../../models/user"

export default async function (req, res) {
  clientPromise()
  const {
    name,
    email,
    role,
    picture,
    userId,
    phoneNumber,
    adresseLivraison,
    hasCompletedProfil,
  } = req.body
  try {
    const user = await User.create({
      name,
      email,
      role,
      picture,
      userId,
      phoneNumber,
      adresseLivraison,
      hasCompletedProfil,
    })

    await res.status(200).send(user)
  } catch (error) {
    console.log(error.message)
  }
}
