import Link from "next/link"
import React, { useState } from "react"
import Image from "next/image"
import { useSession } from "next-auth/react"
import { RxHamburgerMenu } from "react-icons/rx"
import { GrClose } from "react-icons/gr"
function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const { status } = useSession()
  return (
    <>
      {/* mobile nav */}
      <div className="md:hidden flex items-center w-full  py-2 bg-white shadow fixed top-0">
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
            <RxHamburgerMenu className="ml-auto mr-3" size={31} />
          ) : (
            <GrClose className="ml-auto mr-3" size={31} />
          )}
          <div className="flex flex-col items-center w-full pb-2 bg-white shadow-md absolute left-0 -bottom-[100px]">
          <Link
          className="lg:mx-5 font-semibold hover:text-red-600"
          href="/menus"
        >
          Menus
        </Link>
        <Link
          className="lg:mx-5 font-semibold"
          href="/contact"
        >
          Contactez nous
        </Link>
        <Link
          className="lg:mx-5 font-semibold"
          href="/infos"
        >
          Infos
        </Link>
        {status !== "authenticated" ? (
          <Link
            className="lg:mx-5 font-semibold"
            href="/Login"
          >
            Se connecter
          </Link>
        ) : (
          <Link
            className="lg:mx-5 font-semibold"
            href="/Login"
          >
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
          Menus
        </Link>
        <Link
          className="lg:mx-5 font-semibold hover:text-red-600"
          href="/contact"
        >
          Contactez nous
        </Link>
        <Link
          className="lg:mx-5 font-semibold hover:text-red-600"
          href="/infos"
        >
          Infos
        </Link>
        {status !== "authenticated" ? (
          <Link
            className="lg:mx-5 font-semibold hover:text-red-600"
            href="/Login"
          >
            Se connecter
          </Link>
        ) : (
          <Link
            className="lg:mx-5 font-semibold hover:text-red-600"
            href="/Login"
          >
            Profil
          </Link>
        )}
      </div>
    </>
  )
}

export default Navbar
