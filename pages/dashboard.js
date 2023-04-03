import Image from "next/image"
import React from "react"
import { getSession, signOut, useSession } from "next-auth/react"
import Link from "next/link"
import axios from "axios"
import { serverSideTranslations } from "next-i18next/serverSideTranslations"

function Dashboard({ users }) {
  const { data: session, status } = useSession()
  if (users && users.role !== "administrateur") {
    return (
      <p className="my-16 mx-24 h-screen text-center md:text-4xl font-bold">
        Vous n&apos;avez pas la persmission d&apos;acceder à cette page{" "}
      </p>
    )
  }
  return (
    <div className="md:my-20 flex flex-col h-full">
      <div className="flex items-center">
        <button title="se deconnecter" onClick={signOut} className="bg-red-200 px-4 py-1 rounded-md m-4 font-semibold">
          {" "}
          <span className="text-red-600">Se déconnecter </span>{" "}
        </button>
      </div>
      <h1 className="text-center md:text-6xl font-bold">
        Bienvenue {session && session.user.name}{" "}
      </h1>
      <h2 className="md:mt-20 md:text-4xl font-semibold ml-5">
        1-Gérer le magasin
      </h2>
      <div className="flex items-center flex-wrap justify-evenly">
        {/* commande */}
        <div className="flex flex-col items-center md:px-4 md:py-3  max-w-fit self-center md:mt-10">
          <Image
            src="/images/da-commande.png"
            alt="commandes"
            height={250}
            width={250}
          />
          <p className="md:text-2xl font-semibold">Commandes</p>
          <p className="text-gray-400"> Consultez toutes vos commande ici</p>
          <Link
            href="/admin/commandes"
            className="px-3 py-1 bg-red-600 font-semibold mt-2 text-white rounded-md"
          >
            Voir les commandes
          </Link>
        </div>
        {/* commande */}
        <div className="flex flex-col items-center md:px-4 md:py-3  max-w-fit self-center md:mt-10">
          <Image
            src="/images/da-menu.png"
            alt="ajouter un menu"
            height={450}
            width={450}
          />
          <p className="md:text-2xl font-semibold">Menus</p>
          <p className="text-gray-400"> Ajouter ou supprimer un menu</p>
          <Link
            href="/admin/menus"
            className="px-3 py-1 bg-red-600 font-semibold mt-2 text-white rounded-md"
          >
            Voir les menus
          </Link>
        </div>
      </div>
      {/* client options */}
      <h2 className="md:mt-20 md:text-4xl font-semibold ml-5">
        2-Gérer les clients
      </h2>

      <div className="flex items-center flex-wrap justify-evenly">
        {/* coupons */}
        <div className="flex flex-col items-center md:px-4 md:py-3  max-w-fit self-center md:my-24">
          <Image
            src="/images/coupon.png"
            alt="coupons"
            height={450}
            width={450}
          />
          <p className="md:text-2xl font-semibold">Coupons</p>
          <p className="text-gray-400">
            Ajouter ou supprimer un coupon de réduction
          </p>
          <Link
            href="/admin/coupons"
            className="px-3 py-1 bg-red-600 font-semibold mt-2 text-white rounded-md"
          >
            Voir les coupons
          </Link>
        </div>
        {/* rocket points */}

        <div className="flex flex-col items-center md:px-4 md:py-3  max-w-fit self-center md:mt-10">
          <Image
            src="/images/rocket-point.png"
            alt="rocket points"
            height={400}
            width={400}
          />
          <p className="md:text-2xl font-semibold">Points rocket</p>
          <p className="text-gray-400">
            Accorder des points rocket à vos clients
          </p>
          <Link
            href="/admin/points"
            className="px-3 py-1 bg-red-600 font-semibold mt-2 text-white rounded-md"
          >
            Acceder
          </Link>
        </div>
      </div>
      {/* <p> votre email {users[0].email} </p> */}
    </div>
  )
}
export async function getServerSideProps(context) {
  const session = await getSession(context)
  const res = await axios(
    `http://localhost:3000/api/user/currentUser?id=${
      session ? session.user.id : null
    }`
    // "http:localhost:3000/api/user/getUsers"
  )
  const users = res.data

  return {
    props: {
      users,
      ...(await serverSideTranslations(context.locale, ["common"])),
    },
  }
}
export default Dashboard
