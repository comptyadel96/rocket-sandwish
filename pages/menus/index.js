import { serverSideTranslations } from "next-i18next/serverSideTranslations"
import Image from "next/image"
import Link from "next/link"
import React from "react"
import { useTranslation,  i18n } from "next-i18next"
import clientPromise from "../../lib/dbConnect"
import Menu from "../../models/menu"

function menus({ menus }) {
  const { t } = useTranslation("common")
  return (
    <div className="md:my-16 my-10 flex flex-col items-center">
      <h1 className="md:text-5xl text-2xl font-bold md:mb-6 mb-4">
        {t("tousPlatRocket")}
      </h1>
      <div className="flex flex-wrap w-full justify-evenly items-center md:px-5">
        {menus.map((menu, index) => (
          <Link
            href={`/menus/${menu._id}`}
            key={index}
            className="m-2 cursor-pointer rounded-xl overflow-hidden shadow-md flex flex-col items-center pb-2 hover:-translate-y-5 transition-transform duration-500"
          >
            <Image
              src={menu.photo}
              height={400}
              width={400}
              alt={`menu ${menu.nom}`}
              
            />
            <p className="font-semibold md:text-3xl text-center">{menu.nom}</p>
            <p className="text-gray-500 text-sm max-w-xs text-center">
              {" "}
              {menu.description}{" "}
            </p>
            {i18n.language === "fr" ? (
              <p className="mt-2 md:text-2xl font-bold text-red-600">
                {menu.prix} <span className="text-black">{t("Da")} </span>
              </p>
            ) : (
              <p className="mt-2 md:text-2xl font-bold text-red-600 flex items-center">
               <span className="text-black mr-1">{t("Da")} </span> {menu.prix} 
              </p>
            )}
          </Link>
        ))}
      </div>
    </div>
  )
}
export async function getServerSideProps(context) {
  clientPromise()
  const menus = await Menu.find()
  return {
    props: {
      menus: JSON.parse(JSON.stringify(menus)),
      ...(await serverSideTranslations(context.locale, ["common"])),
    },
  }
}
export default menus
