import { useSession, signIn, signOut, getSession } from "next-auth/react"
import Head from "next/head"
import Image from "next/image"
import Link from "next/link"
import React from "react"
import { GrLogout } from "react-icons/gr"
import clientPromise from "../lib/dbConnect"
import User from "../models/user"
import Dashboard from "./dashboard"
import { serverSideTranslations } from "next-i18next/serverSideTranslations"

export default function Login({ users }) {
  const { data: session, status } = useSession()
  const userEmail = session?.user.email
  const profilPic = users ? users.picture : session?.user.image
  const userName = session?.user.name

  if (status === "loading") {
    return <div className="h-screen"></div>
  }

  if (
    status === "authenticated" &&
    users &&
    users.role !== "administrateur"
    // && (
    //   <Link
    //     className="lg:mx-5 text-sm font-semibold bg-yellow-300 hover:bg-yellow-400 px-3 py-1 rounded-xl"
    //     href="/dashboard"
    //   >
    //     Tableau administrateur
    //   </Link>
    // )
  ) {
    return (
      <div className="lg:my-16  flex flex-col items-center">
        <Head>
          <title>Profil</title>
          <meta
            name="description"
            content="rocket food fast food sandwishs et livraison de nourriture en Algérie"
          />
          <link rel="icon" href="/rocket.ico" />
        </Head>
        {/* user infos and logout */}
        <div className="flex flex-wrap md:mt-0 mt-16 md:mb-8 mb-4 items-center md:px-10 md:pb-1 justify-between w-full shadow-md">
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
            {users && users.role !== "user" && (
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
              <p className="text-xs text-gray-400  mr-2 font-semibold">
                Se déconnecter
              </p>{" "}
              <GrLogout className="lg:text-2xl" />
            </button>
            {/* {users && users.role === "administrateur" && (
              <Link
                className="lg:mx-5 text-sm font-semibold bg-yellow-300 hover:bg-yellow-400 px-3 py-1 rounded-xl"
                href="/dashboard"
              >
                Tableau administrateur
              </Link>
            )} */}
          </div>
        </div>
        <div className="flex items-center flex-wrap justify-evenly w-full">
          {/* commande du client */}
          <div className="flex flex-col items-center md:p-5 p-3 md:mx-0 mx-3 md:my-2 my-4 border shadow-lg rounded-xl md:mt-12">
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
            <button className="px-3 rounded-md bg-red-600 text-white font-semibold py-1 mt-3">
              Passer une commande
            </button>
          </div>
          <div className="flex flex-col items-center md:p-5 p-3 md:mx-0 mx-3 border shadow-lg rounded-xl md:mt-12 mt-6">
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
        <div className="md:mt-16 mt-5">
          <p className="font-bold lg:text-6xl text-2xl mb-2 text-center">
            Besoin d&apos;aide ?
          </p>
          <p className="font-semibold text-center md:mx-2 mx-3">
            Avez-vous des questions ou bien vous avez des réclamations ? <br />
            contactez nous sur le service client
          </p>
        </div>
        <Link
          href={"/contact"}
          className=" rounded-lg my-4 px-3 py-1 font-semibold bg-[#ffe6ac] hover:bg-[#ffde92]"
        >
          Contactez-nous
        </Link>
      </div>
    )
  }
  //  if admin
  if (status === "authenticated" && users && users.role === "administrateur") {
    return <Dashboard />
  }
  // if not authenticated
  return (
    <div className="font-semibold flex flex-col  items-center lg:m-20 mt-16 mx-auto px-10 h-screen">
      <Image src="/images/login.png" height={230} width={230} />
      <p className="font-semibold text-2xl mt-3 mb-2">
        Vous n'etes pas connecter
      </p>
      <p className="text-gray-500  ">
        Inscrivez vous ou bien connecter vous à votre compte pour commander plus
        rapidement et profiter d'autres aventages
      </p>
      <button
        className=" my-5 px-3 py-1 rounded-md bg-red-500 hover:bg-red-600 text-white"
        onClick={() => signIn()}
      >
        Se connecter
      </button>
    </div>
  )
}
export async function getServerSideProps(context) {
  const session = await getSession(context)
  clientPromise()
  const users = await User.findOne({ userId: session ? session.user.id : null })

  return {
    props: {
      session,
      users: JSON.parse(JSON.stringify(users)),
      ...(await serverSideTranslations(context.locale, ["common"])),
    },
  }
}
