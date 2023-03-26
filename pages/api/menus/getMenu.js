import clientPromise from "../../../lib/dbConnect"
import Menu from "../../../models/menu"
export default async function handler(req, res) {
  const id = req.query.id
  try {
    clientPromise()
    const menus = await Menu.findById(id)
    res.status(200).send(menus)
  } catch (e) {
    console.error(e)
    throw new Error(e).message
  }
}
