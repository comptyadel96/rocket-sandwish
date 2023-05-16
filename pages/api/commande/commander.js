import clientPromise from "../../../lib/dbConnect"
import Commande from "../../../models/commande"
import User from "../../../models/user"
import NextCors from "nextjs-cors"
import pusher from "../../../lib/pusher"

export default async function (req, res) {
  clientPromise()
  try {
    await NextCors(req, res, {
      // Options
      methods: ["GET", "HEAD", "PUT", "POST"],
      origin: "*",
      optionsSuccessStatus: 200,
    })

    const {
      numClient,
      adresseClient,
      sauces,
      suppléments,
      boisson,
      menu,
      photo,
      price,
      livrable,
      location,
    } = req.body
    const currUser = await User.findOne({ userId: req.query._id })
    const userId = currUser && currUser._id
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
      livrable,
      location,
    })
   await pusher.trigger("my-channel", "my-event", { message: "nouvelle commande" })
    if (!userId) {
      res.status(400).send("no user Id ")
    }
    res.status(200).send(commande)
  } catch (e) {
    console.log(e)
  }
}
