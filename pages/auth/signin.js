import { getProviders, signIn } from "next-auth/react"
import { FcGoogle } from "react-icons/fc"
import { BsFacebook } from "react-icons/bs"
import Link from "next/link"
import { serverSideTranslations } from "next-i18next/serverSideTranslations"
import { useTranslation } from "next-i18next"

export default function Login({ providers }) {
  const { t } = useTranslation("common")
  return (
    <div className="my-20 flex flex-col items-center  h-screen">
      <h1 className="font-bold md:text-4xl text-2xl text-center">
        {t("connecterRocket")}
      </h1>

      <button
        className="mb-5 font-semibold mt-14 flex items-center px-3 py-2 rounded-lg shadow-md hover:bg-gray-100 border"
        onClick={(e) => {
          signIn("google", {
            callbackUrl: `https://rocket-sandwish-2.vercel.app/Login`,
          })
        }}
      >
        {t("connectGoogle")}
        <FcGoogle className="text-2xl ml-1" />
      </button>

      <button
        className="my-3 flex font-semibold items-center px-3 py-2 rounded-lg shadow-md hover:bg-gray-100 border"
        onClick={(e) => {
          e.preventDefault()
          signIn("facebook", {
            callbackUrl: `https://rocket-sandwish-2.vercel.app/Login`,
          })
        }}
      >
        {t("connectFacebook")}
        <BsFacebook className="text-2xl ml-1 text-blue-500" />
      </button>

      <p className="text-xs  font-semibold mt-4 md:mx-0 mx-10 text-center">
        {t("connectRegle")}{" "}
        <Link
          className="text-red-600 border-b-[1px] border-b-red-600 font-bold "
          href="/Conf"
        >
          {t("linkRegle")}
        </Link>
      </p>
    </div>
  )
}

export async function getStaticProps(context) {
  const providers = await getProviders()
  return {
    props: {
      providers,
      ...(await serverSideTranslations(context.locale, ["common"])),
    },
  }
}
