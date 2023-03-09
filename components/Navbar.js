import Link from "next/link"
import React, { useState, useRef } from "react"
import Image from "next/image"
import { useSession } from "next-auth/react"
import { RxHamburgerMenu } from "react-icons/rx"
import { GrClose } from "react-icons/gr"
import { i18n, useTranslation } from "next-i18next"
import { useRouter } from "next/router"

function Navbar() {
  const { t } = useTranslation("common")

  const router = useRouter()
  const changeTo = router.locale === "fr" ? "ar" : "fr"
  const [isOpen, setIsOpen] = useState(false)
  const { status } = useSession()
  const navRef = useRef(null)
  const toggleNav = () => {
    if (navRef.current.classList.contains("hidden")) {
      navRef.current.classList.remove("hidden")
      navRef.current.classList += " flex flex-col items-center"
    } else {
      navRef.current.classList.add("hidden")
    }
  }
  const onToggleLanguageClick = (newLocale) => {
    const { pathname, asPath, query } = router
    router.push({ pathname, query }, asPath, { locale: newLocale })
  }
  return (
    <>
      {/* mobile nav */}
      <div className="md:hidden z-50 flex items-center w-full  py-2 bg-white shadow fixed top-0">
        <div className="relative flex items-center w-full">
          <Link href="/" className="mr-auto ml-3">
            <Image
              alt="logo rocket food Algèrie"
              src="/images/logo-black.png"
              width={100}
              height={100}
            />
          </Link>
          {!isOpen ? (
            <RxHamburgerMenu
              className="ml-auto mr-3"
              size={31}
              onClick={() => {
                toggleNav()
                setIsOpen(!isOpen)
              }}
            />
          ) : (
            <GrClose
              className="ml-auto mr-3"
              size={31}
              onClick={() => {
                toggleNav()
                setIsOpen(!isOpen)
              }}
            />
          )}
          <div
            ref={navRef}
            className=" w-full pb-2 bg-white shadow-md absolute left-0 -bottom-[135px] hidden"
          >
            <Link href="/" className="font-semibold my-1">
              Acceuil
            </Link>
            <Link className="font-semibold my-1" href="/menus">
              Menus
            </Link>
            <Link className="font-semibold my-1" href="/contact">
              Contactez nous
            </Link>

            {status !== "authenticated" ? (
              <Link className="font-semibold my-1" href="/Login">
                Se connecter
              </Link>
            ) : (
              <Link className="font-semibold my-1" href="/Login">
                Profil
              </Link>
            )}
          </div>
        </div>
      </div>
      {/* desktop nav */}
      <div className="lg:flex items-center p-3 hidden justify-end z-50 w-full bg-black text-white fixed top-0">
        <Link href="/" className="mr-auto ml-14">
          <Image
            alt="logo rocket food Algèrie"
            src="/images/logo-white.png"
            width={100}
            height={100}
          />
        </Link>

        <Link
          className="lg:mx-5 font-semibold hover:text-red-600"
          href="/menus"
        >
          {t("menus")}
        </Link>
        <Link
          className="lg:mx-5 font-semibold hover:text-red-600"
          href="/contact"
        >
          {t("contactUs")}
        </Link>

        {status !== "authenticated" ? (
          <Link
            className="lg:mx-5 font-semibold hover:text-red-600"
            href="/Login"
          >
            {t("seConnecter")}
          </Link>
        ) : (
          <Link
            className="lg:mx-5 font-semibold hover:text-red-600"
            href="/Login"
          >
            {t("profil")}
          </Link>
        )}
        {i18n && i18n.language === "fr" ? (
          <button
            className="mx-2 font-semibold flex items-center"
            onClick={() => onToggleLanguageClick(changeTo)}
          >
            <Image
              className="mr-2"
              src="/images/alger.webp"
              width={20}
              height={20}
              alt="drapeau algérie"
            />
            <p>العربية </p>
          </button>
        ) : (
          <button
            className="mx-2 font-semibold flex items-center"
            onClick={() => onToggleLanguageClick(changeTo)}
          >
            <Image
              className="mr-2"
              src="/images/france.png"
              width={20}
              height={20}
              alt="drapeau france"
            />
            <p>Français </p>
          </button>
        )}
      </div>
    </>
  )
}

export default Navbar
