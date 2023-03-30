import clientPromise from "../../../lib/dbConnect"
import Commande from "../../../models/commande"
import User from "../../../models/user"
import NextCors from "nextjs-cors"

export default async function (req, res) {
  try {
    await NextCors(req, res, {
      // Options
      methods: ["GET", "HEAD", "PUT", "POST"],
      origin: "*",
      optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
    })
    clientPromise()
    const {
      numClient,
      adresseClient,
      sauces,
      suppléments,
      boisson,
      menu,
      photo,
      price,
    } = req.body
    const currUser = await User.findOne({ userId: req.query._id })
    const userId = currUser._id
    const commande = await Commande.create({
      menu,
      numClient,
      adresseClient,
      sauces,
      suppléments,
      boisson,
      commanderPar: userId,
      photo,
      price,
    })

    res.status(200).send(commande)
  } catch (e) {
    console.error(e)
    throw new Error(e).message
  }
}
