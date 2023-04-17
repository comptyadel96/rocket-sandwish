import Image from "next/image"
import React from "react"
import clientPromise from "../../lib/dbConnect"
import Menu from "../../models/menu"
import Commande from "../../form/Commandes"
import { serverSideTranslations } from "next-i18next/serverSideTranslations"
import { useTranslation } from "next-i18next"
import { useSession } from "next-auth/react"
import { useRouter } from "next/router"

export const getStaticPaths = async ({ locales }) => {
  clientPromise()
  const menus = await Menu.find({})
  const ids = menus.map((menu) => {
    return menu._id
  })
  const paths = ids
    .map((id) =>
      locales.map((locale) => ({
        params: { id: id.toString() },
        locale, //locale should not be inside `params`
      }))
    )
    .flat()
  return {
    paths,
    fallback: false,
  }
}

export const getStaticProps = async (context) => {
  const id = context.params.id
  clientPromise()
  const menu = await Menu.findById(id)
  return {
    props: {
      menu: JSON.parse(JSON.stringify(menu)),
      ...(await serverSideTranslations(context.locale, ["common"])),
    },
  }
}

function menu({ menu }) {
  const route = useRouter()
  const { status } = useSession()
  const { t } = useTranslation("common")
  return (
    <div className="md:py-16 py-10 flex md:flex-row flex-wrap flex-col justify-evenly w-full bg-gray-100">
      {/* menu card */}

      <Image
        height={600}
        width={600}
        src={menu.photo}
        alt={`menu rocket ${menu.nom} `}
        className="md:rounded-3xl self-start"
      />

      {/* commande details */}
      <div className="flex flex-col self-start">
        <p className="font-bold md:text-6xl text-2xl capitalize md:mt-0 mt-3 md:ml-0 ml-4">
          {menu.nom}
        </p>
        <div className="flex flex-wrap md:mt-7 mt-4 md:text-lg px-3 py-2  bg-white rounded-lg shadow font-bold">
          <p className=" text-red-600">{t("ingredients")}:</p>
          <p className="md:max-w-md ml-2 font-semibold">{menu.description} </p>
        </div>
        <div className="flex items-center flex-wrap text-sm justify-evenly mt-5">
          <p className=" font-semibold md:my-0 my-2 bg-red-600 px-3 py-1 rounded-xl text-white">
            {t("menuPerso")}
          </p>
          <p className=" font-semibold md:my-0 my-2 bg-black px-3 py-1 rounded-xl text-white">
            {t("plusiuersFormat")}
          </p>
          <p className=" font-semibold md:my-0 my-2 bg-[#f6d485] px-3 py-1 rounded-xl">
            {t("apartirDe")} {menu.prix} {t("Da")}
          </p>
        </div>
        {status === "authenticated" ? (
          <Commande prix={menu.prix} menu={menu.nom} photo={menu.photo} />
        ) : (
          <div className="bg-black rounded-t-[60px] rounded-b-lg md:px-5 p-3 flex flex-col items-center md:my-16">
            <p className="md:text-4xl  font-semibold text-amber-300">
              Vous n'étes pas connecter !
            </p>
            <p className="md:text-xl text-white text-lg max-w-md text-center md:mt-3">
              Connecter vous pour pouvoir faire une commande
            </p>
            <button
              onClick={() => {
                route.push("/Login")
              }}
              className="bg-white transition-colors duration-700  hover:bg-red-600 hover:text-white text-red-600 font-semibold px-3 py-[2px] my-4 md:rounded-lg rounded"
            >
              c'est partie!
            </button>
          </div>
        )}
      </div>
    </div>
  )
}

export default menu
