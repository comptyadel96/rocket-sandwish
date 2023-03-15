import Image from "next/image"
import React from "react"
import clientPromise from "../../lib/dbConnect"
import Menu from "../../models/menu"
import Commande from "../../form/Commandes"
import { serverSideTranslations } from "next-i18next/serverSideTranslations"
import { useTranslation } from "next-i18next"
export const getStaticPaths = async ({ locales }) => {
  clientPromise()
  const menus = await Menu.find({})
  const ids = menus.map((menu) => {
    // return {
    //   params: { id: menu._id.toString() },
    // }
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
          {" "}
          {menu.nom}{" "}
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
            {t('apartirDe')} {menu.prix} {t('Da')}
          </p>
        </div>
        <Commande prix={menu.prix} menu={menu.nom} />
      </div>
    </div>
  )
}

export default menu
