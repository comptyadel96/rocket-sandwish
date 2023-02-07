import Link from "next/link"
import React from "react"
import Image from "next/image"
import { useSession } from "next-auth/react"

function Navbar() {
  const { status } = useSession()
  return (
    <>
      {/* mobile nav */}
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

        <Link className="lg:mx-5 font-semibold hover:text-red-600" href="/menu">
          Menus
        </Link>
        <Link className="lg:mx-5 font-semibold hover:text-red-600" href="/contact">
          Contactez nous
        </Link>
        <Link className="lg:mx-5 font-semibold hover:text-red-600" href="/infos">
          Infos
        </Link>
        {status !== "authenticated" ? (
          <Link className="lg:mx-5 font-semibold hover:text-red-600" href="/Login">
            Se connecter
          </Link>
        ) : (
          <Link className="lg:mx-5 font-semibold hover:text-red-600" href="/Login">
            Profil
          </Link>
        )}
      </div>
    </>
  )
}

export default Navbar
