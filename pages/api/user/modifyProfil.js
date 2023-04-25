import clientPromise from "../../../lib/dbConnect"
import User from "../../../models/user"

export default async function (req, res) {
  clientPromise()
  const {
    phoneNumber,
    adresseLivraison,
    hasCompletedProfil,
    name,
    userId,
    location,
    favories,
  } = req.body
  const id = req.query.id
  try {
    const user = await User.findByIdAndUpdate(
      id,
      {
        phoneNumber,
        adresseLivraison,
        hasCompletedProfil,
        name,
        userId,
        location,
        favories,
      },
      {
        new: true,
      }
    )
    if (!user) {
      res.status(400).send("no user found with this id")
    }
    await res.status(200).send(user)
  } catch (error) {
    await res.status(400).send(error.message)
    console.log(error.message)
  }
}
