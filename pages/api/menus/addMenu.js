import clientPromise from "../../../lib/dbConnect"
import Menu from "../../../models/menu"

export default async (req, res) => {
  try {
    await clientPromise()
    const { nom, description, prix, photo, prixPoints } = req.body
    const menu = await Menu.create({
      nom,
      description,
      prix,
      photo,
      prixPoints,
    })

    res.status(200).json(menu)
  } catch (e) {
    console.error(e)
    throw new Error(e).message
  }
}
