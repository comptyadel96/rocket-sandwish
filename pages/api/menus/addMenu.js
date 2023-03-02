import clientPromise from "../../../lib/dbConnect"
import Menu from "../../../models/menu"
import NextCors from "nextjs-cors"

export default async (req, res) => {
  await NextCors(req, res, {
    // Options
    methods: ["GET", "HEAD", "PUT", "POST"],
    origin: "*",
    optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
  })
  try {
    clientPromise()
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
