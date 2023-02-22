import React from "react"
import Link from "next/link"
import Image from "next/image"
import {
  BsFacebook,
  BsInstagram,
  BsTelephone,
  BsMailbox,
  BsPinMap,
} from "react-icons/bs"
function Footer() {
  return (
    <div className="flex flex-col py-4 md:px-5 bg-black text-white font-semibold">
      <Image
        src="/images/logo-white.png"
        height={100}
        width={100}
        alt="rocket food algèrie"
        className="md:ml-0 ml-4 md:mb-0 mb-2"
      />
      <div className="flex items-center flex-wrap self-center justify-evenly w-full">
        <div className="flex-col flex ">
          <p className="text-red-600">Raccourci</p>
          <Link href="/">Acceuil</Link>
          <Link href="/menus">Menus</Link>
          <Link href="/contact">Contacte</Link>
          <Link href="/infos">infos</Link>
        </div>
        <div className="flex items-center">
          <a
            href="https://www.facebook.com/profile.php?id=100064220315886"
            className="mx-2 flex flex-col items-center"
            rel="noopener noreferrer"
            target={"_blank"}
          >
            <BsFacebook className="text-xl" /> Facebook
          </a>
          <a
            href="https://www.instagram.com/rocket.sndwich/?hl=fr"
            target="_blank"
            className="mx-2 flex flex-col items-center"
            rel="noopener noreferrer"
          >
            <BsInstagram className="text-xl" /> Instagram
          </a>
        </div>
        <div className="flex-col flex ">
          <div className="flex items-center my-2">
            <BsTelephone className="mr-2 md:text-xl" />
            0540.06.71.30 / 0540.94.24.21
          </div>
          <div className="flex items-center my-2">
            <BsMailbox className="mr-2 md:text-xl" /> rocketsandwich39@gmail.com
          </div>
          <div className="flex items-center my-2">
            <BsPinMap className="mr-2 md:text-xl" /> Rue du SAHEL, Hydra,
            Algiers, Algeria
          </div>
        </div>
      </div>
    </div>
  )
}

export default Footer
