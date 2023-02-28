import Image from "next/image"
import React from "react"

function contact() {
  return (
    <div className="md:py-10  bg-[#ffe6ac]">
      <h1 className="md:text-6xl text-2xl text-center font-bold md:mt-5 md:mb-6 pt-5">
        Contactez Rocket sandwish
      </h1>
      <div className="flex flex-wrap  bg-white shadow-lg  md:px-6 md:py-4 md:ml-3 md:mb-5  max-w-fit mb-12">
        <Image src="/images/rocket-store2.png" width={550} height={550} alt="fast food rocket food Algèrie" />
        <div className="flex flex-col md:text-xl font-semibold md:mx-4">
          <p className="my-1">E-mail: rocketfood@gmail.com</p>
          <p className="my-1">Tél: 0557456602</p>
          <p className="my-1">Adresse: hydra en face stade de football</p>
        </div>
      </div>
    </div>
  )
}

export default contact
