import { serverSideTranslations } from "next-i18next/serverSideTranslations"
import React from "react"
import clientPromise from "../../lib/dbConnect"
import Commande from "../../models/commande"

function commandes({ commandes }) {
  return (
    <div className="md:my-24 mt-10 flex flex-col items-center md:px-10 ">
      <h1 className="md:text-6xl md:mb-10 font-semibold">Commandes clients</h1>
      {commandes.map((commande) => (
        <div
          key={commande._id}
          className="flex flex-col items-center md:my-3 px-3 py-1 rounded-xl shadow-md border"
        >
          <div className="flex items-center">
            <p className="font-semibold text-2xl capitalize">{commande.menu}</p>
            {commande.sauces.map((sauce,index) => (
              <p key={index} className="font-bold bg-red-100 px-2 rounded-lg text-red-600 ml-3">
                {sauce}
              </p>
            ))}
            {commande.suppléments.map((sup) => (
              <p className="font-bold text-yellow-500 ml-3 rounded-lg bg-yellow-200 px-2">
                {sup}
              </p>
            ))}
          </div>
          {/* boissons */}
          {commande.boisson && commande.boisson.length > 0 && (
            <div className="flex flex-col items-center font-bold">
              <p className=" md:text-3xl text-red-600">+</p>
              {commande.boisson.map((boisson) => (
                <div className="flex items-center">
                  <p className="mr-1 text-red-500">{boisson.nombre} </p>
                  <p> {boisson.nom} </p>
                </div>
              ))}
            </div>
          )}
          {/* infos clients */}
          <div className="flex flex-col items-center font-semibold">
            <p className="text-red-600">
              Adresse:{" "}
              <span className="text-black">{commande.adresseClient}</span>
            </p>
            <p className="text-red-600">
              Numéro client:{" "}
              <a className="text-black" href={`tel:${commande.numClient}`}>
                {commande.numClient}
              </a>
            </p>
          </div>
          <p className="mt-2 font-bold">Marquer comme: </p>
          <div className="flex items-center flex-wrap justify-evenly w-full font-semibold my-2">
            <button className="px-3 py-1 mx-2 text-gray-500 bg-gray-200 rounded-lg text-sm">
              En cours de livraison
            </button>
            <button className="px-3 py-1 mx-2 text-green-600 bg-green-200 rounded-lg text-sm">
              Livrer
            </button>
            <button className="px-3 py-1 mx-2 text-red-600 bg-red-100 rounded-lg text-sm">
              Annuler
            </button>
          </div>
        </div>
      ))}
    </div>
  )
}
export const getServerSideProps = async (context) => {
  clientPromise()
  const commandes = await Commande.find().populate("commanderPar","name email adresseLivraison _id phoneNumber")
  console.log(commandes)
  return {
    props: {
      commandes: JSON.parse(JSON.stringify(commandes)),
      ...(await serverSideTranslations(context.locale, ["common"]))
    },
  }
}
export default commandes
