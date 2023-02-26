import React from "react"

function SupprimerProfil() {
  return (
    <div className="md:my-24 flex flex-col items-center">
      <h1 className="md:text-5xl font-semibold md:mb-6 mb-3">
        Supprimer vos informations personnelles ?
      </h1>
      <p className="text-sm text-gray-500 md:mb-6 mb-3">
        voici les étapes à suivre pour supprimer votre profil ainsi que tous vos
        informations personnelles du site rocket food
      </p>
      <p className="font-semibold my-2">1-Rendez-vous sur la page profil</p>
      <p className="font-semibold my-2">2-Appuyer sur gérer le profil</p>
      <p className="font-semibold my-2">3-Appuyer sur supprimer mon compte</p>
      <p className="font-semibold mt-2 mb-96">4-Confirmer votre action</p>
    </div>
  )
}

export default SupprimerProfil
