import clientPromise from "../../../lib/dbConnect"
import Commande from "../../../models/commande"
// import User from "../../../models/user"
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
    const { numClient, adresseClient, sauces, suppléments, boisson, menu } =
      req.body
    const commande = await Commande.create({
      menu,
      numClient,
      adresseClient,
      sauces,
      suppléments,
      boisson,
    })

    res.status(200).send(commande)
  } catch (e) {
    console.error(e)
    throw new Error(e).message
  }
}
