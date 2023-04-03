import clientPromise from "../../../lib/dbConnect"
import User from "../../../models/user"

export default async function (req, res) {
  clientPromise()
  const { email, phoneNumber, adresseLivraison, hasCompletedProfil } = req.body
  const id = req.query.id
  try {
    const user = await User.findByIdAndUpdate(id, {
      email,
      phoneNumber,
      adresseLivraison,
      hasCompletedProfil,
    })

    await res.status(200).send(user)
  } catch (error) {
    console.log(error.message)
  }
}
