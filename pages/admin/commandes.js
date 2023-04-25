import axios from "axios"
import { serverSideTranslations } from "next-i18next/serverSideTranslations"
import { useRouter } from "next/router"
import React, { useState, useEffect } from "react"

function commandes() {
  const router = useRouter()
  const modifyEtat = async (id, etat) => {
    try {
      await axios.post(
        `https://rocket-sandwich.com/api/commande/modifyCommande?id=${id}`,
        { état: etat }
      )
      router.reload({ scroll: false })
    } catch (error) {
      console.log(error)
    }
  }
  const [commandes, setCommandes] = useState([])

  // get all commandes
  const getCommandes = async () => {
    try {
      const commandes = await axios.get(
        "https://rocket-sandwich.com/api/commande/getCommandes"
      )
      setCommandes(commandes.data)
    } catch (error) {
      console.log(error)
    }
  }
  useEffect(() => {
    getCommandes()
  }, [])
  return (
    <div className="md:my-24 mt-10 flex flex-col items-center md:px-10 ">
      <h1 className="md:text-6xl md:mb-10 font-semibold">Commandes clients</h1>
      {/* statistiques */}
      <div className="flex items-center flex-wrap md:self-start md:ml-5 md:my-6 font-semibold">
        <p className="md:mx-3 mx-1">
          Nombre total de commande:{" "}
          <span className="text-red-600">{commandes.length} </span> {" "}
        </p>{" "}
        {/* <p className="md:mx-3 mx-1">
          Commandes Livrer/Terminer:{" "}
          <span className="text-red-600">{commandesTerminer.length} </span>{" "}
        </p>
        <p className="md:mx-3 mx-1">
          Commandes annuler:{" "}
          <span className="text-red-600">{commandesAnnuler.length} </span>{" "}
        </p> */}
      </div>

      {commandes &&
        commandes.map((commande) => (
          <div
            key={commande._id}
            className="flex flex-col items-center md:my-3 px-3 py-1 rounded-xl shadow-md border relative"
          >
            <p
              className={`absolute md:-top-3 top-0 font-semibold md:-right-8 right-[40%] bg-${
                commande.état === "Livrer"
                  ? "green-400"
                  : commande.état === "Annuler"
                  ? "red-600"
                  : "gray-200"
              } text-${
                commande.état === "En cours" ? "gray-600" : "white"
              } pl-2 pr-3 rounded-br-full `}
            >
              {commande.état}
            </p>
            <div className="flex items-center flex-col">
              <p className="font-semibold md:text-3xl text-xl capitalize">
                {commande.menu}
              </p>
              <div className="flex items-center text-xs font-semibold">
                <p className="text-sm">Sauces/Supléments:</p>
                {commande.sauces.map((sauce, index) => (
                  <p key={index} className="text-red-600 ml-3">
                    {sauce}
                  </p>
                ))}
                {commande.suppléments.map((sup) => (
                  <p className=" text-yellow-500 ml-3">{sup}</p>
                ))}
              </div>
            </div>
            {/* boissons */}
            {commande.boisson && commande.boisson.length > 0 && (
              <div className="flex  items-center text-xs font-semibold">
                <p className="text-sm mr-2">boisson(s):</p>
                {commande.boisson.map((boisson) => (
                  <div className="flex items-center mx-1">
                    <p className="mx-1 text-red-500">{boisson.nombre} </p>
                    <p> {boisson.nom} </p>
                  </div>
                ))}
              </div>
            )}
            {/* infos clients */}
            {commande.livrable && !commande.commanderPar ? (
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
            ) : commande.livrable && commande.commanderPar ? (
              <div className="flex flex-col items-center font-semibold text-sm">
                <p>Commander par: {commande.commanderPar.name} </p>
                <p>
                  Adresse livraison: {commande.commanderPar.adresseLivraison}{" "}
                </p>
              </div>
            ) : (
              <p className="mt-2 font-semibold  text-purple-600">
                <span className="text-black">Type de commande : </span> À table
              </p>
            )}
            <p className="text-sm font-bold md:my-2 my-1">
              Coût de la commande: {commande.price} Da{" "}
            </p>
            <p className=" font-bold">Marquer comme: </p>
            <div className="flex items-center flex-wrap justify-evenly w-full font-semibold my-2">
              <button
                onClick={() => modifyEtat(commande._id, "En cours")}
                className="px-2 py-[2px] mx-2 text-gray-500 bg-[#f1f1f1] rounded-lg text-xs"
              >
                En cours
              </button>
              <button
                onClick={() => modifyEtat(commande._id, "Livrer")}
                className="px-2 py-[2px] mx-2 text-green-600 bg-green-200 rounded-lg text-xs"
              >
                Livrer
              </button>
              <button
                onClick={() => modifyEtat(commande._id, "Annuler")}
                className="px-2 py-[2px] mx-2 text-red-600 bg-red-100 rounded-lg text-xs"
              >
                Annuler
              </button>
            </div>
            <button
              className="my-1 px-2 py-1 bg-red-600 text-white rounded-full text-xs font-bold"
              onClick={async () => {
                try {
                  await axios.delete(
                    `https://rocket-sandwich.com/api/commande/modifyCommande?id=${commande._id}`
                  )
                  router.reload({ scroll: false })
                } catch (error) {
                  console.log(error.message)
                }
              }}
            >
              Supprimer la commande
            </button>
          </div>
        ))}
    </div>
  )
}
export const getServerSideProps = async (context) => {
  return {
    props: {
      ...(await serverSideTranslations(context.locale, ["common"])),
    },
  }
}
export default commandes
