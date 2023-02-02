import axios from "axios"
import { useSession, signIn, signOut, getSession } from "next-auth/react"
import Head from "next/head"
import Image from "next/image"
import Link from "next/link"
import React from "react"
import { GrLogout } from "react-icons/gr"
export default function Login({ users }) {
  const { data: session, status } = useSession()
  const userEmail = session?.user.email
  const profilPic = session?.user.image
  const userName = session?.user.name

  if (status === "loading") {
    return <div className="h-screen"></div>
  }

  if (status === "authenticated") {
    return (
      <div className="lg:my-16  flex flex-col items-center">
        <Head>
          <title>Profil</title>
          <meta
            name="description"
            content="rocket food fast food et livraison de nourriture en Algérie"
          />
          <link rel="icon" href="/rocket.ico" />
        </Head>
        {/* user infos and logout */}
        <div className="flex items-center md:px-10 md:pb-1 justify-between w-full shadow-md">
          <div className="flex items-center">
            <Image
              // src={`http://graph.facebook.com/${userId}/picture?type=large`}
              src={profilPic}
              height={50}
              width={50}
              alt="photo utilisateur"
              className=" rounded-full"
            />
            <div className="flex flex-col">
              <p className="font-semibold ml-2">{userName} </p>{" "}
              {userEmail && (
                <p className="font-semibold text-xs text-gray-400 ml-2 ">
                  {userEmail}
                </p>
              )}
            </div>
            {users.role !== "user" && (
              <p className="ml-4 px-3 py-1 bg-amber-300 rounded-full font-bold">
                {users.role}
              </p>
            )}
          </div>

          <div className="flex items-center">
            <button
              className="px-3 py-1 rounded-md bg-gray-100 hover:bg-gray-200 flex items-center"
              onClick={() => signOut()}
              title="Se déconnecter"
            >
              <p className="text-xs text-gray-400  md:mr-2 font-semibold">
                Se déconnecter
              </p>{" "}
              <GrLogout className="lg:text-2xl" />
            </button>
            {status === "authenticated" &&
              users &&
              users.role === "administrateur" && (
                <Link
                  className="lg:mx-5 text-sm font-semibold bg-yellow-300 hover:bg-yellow-400 px-3 py-1 rounded-xl"
                  href="/dashboard"
                >
                  Tableau administrateur
                </Link>
              )}
          </div>
        </div>
        <div className="flex items-center flex-wrap justify-evenly w-full">
          {/* commande du client */}
          <div className="flex flex-col items-center md:p-5 border shadow-lg rounded-xl md:mt-12">
            <Image
              src="/images/no-commande.png"
              height={550}
              width={550}
              alt="ajouter votre commande içi"
            />
            <p className="my-3 md:text-3xl font-semibold">
              Vous n&apos;avez pas encore de commande!
            </p>
            <p className="max-w-lg text-gray-400">
              vous trouverez ici la liste de vos commande(s) en cours ainsi que
              votre historique de commande sur le site{" "}
            </p>{" "}
            <button className="md:px-3 rounded-md bg-red-600 text-white font-semibold py-1 mt-3">
              Passer une commande
            </button>
          </div>
          <div className="flex flex-col items-center md:p-5 border shadow-lg rounded-xl md:mt-12">
            <Image
              src="/images/rocket-pts.png"
              height={400}
              width={400}
              alt="points rocket"
            />
            <p className="my-3 md:text-3xl font-semibold">
              Vous avez 200 points rocket
            </p>
            <p className="max-w-lg text-gray-400 text-center">
              pour chaque commande avec nous vous aurez des points rocket que
              vous pourrez par la suite convertir en solde afin d'avoir des
              menus gratuits
            </p>
          </div>
        </div>
        <div className="md:mt-16">
          <p className="font-bold lg:text-6xl mb-2">Besoin d&apos;aide ?</p>
          <p className="font-semibold text-center">
            Avez-vous des questions ou bien vous avez des réclamations ? <br />
            contactez nous sur le service client
          </p>
        </div>
        <button className=" rounded-lg mt-4 px-3 py-1 font-semibold bg-[#ffe6ac] hover:bg-[#ffde92]">
          Contactez-nous
        </button>
      </div>
    )
  }

  return (
    <div className="font-semibold lg:m-20 h-screen">
      <p>Vous n'etes pas connecter</p>
      <button
        className=" my-5 px-3 py-1 rounded-md bg-indigo-500 hover:bg-indigo-600 text-white"
        onClick={() => signIn()}
      >
        Se connecter
      </button>
    </div>
  )
}
export async function getServerSideProps(context) {
  const session = await getSession(context)

  const res = await axios(
    `http:localhost:3000/api/user/currentUser?id=${
      session ? session.user.id : null
    }`
  )
  const users = res.data

  return {
    props: { session, users },
  }
}
