import clientPromise from "../../../lib/dbConnect"
import Menu from "../../../models/menu"
export default async function handler(req, res) {
  try {
    await clientPromise()
    const menus = await Menu.find()
    res.status(200).send(menus)
  } catch (e) {
    console.error(e)
    throw new Error(e).message
  }
}
