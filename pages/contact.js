import Image from "next/image"
import React from "react"

function contact() {
  return (
    <div className="md:py-10  md:bg-[#ffe6ac]">
      <h1 className="md:text-6xl md:block hidden text-2xl text-center font-bold md:mt-5 md:mb-6 pt-5">
        Contactez Rocket sandwish
      </h1>
      <div className="flex flex-wrap relative bg-white shadow-lg  md:px-6 md:py-4 md:ml-3 md:mb-5  max-w-fit mb-12">
        <Image
          src="/images/rocket-store2.png"
          width={550}
          height={550}
          alt="fast food rocket food Algèrie"
        />
        <div className="flex flex-col  md:text-xl font-semibold md:mx-4">
          <a href="mailto:rocketfood@gmail.com" className="my-1 ml-3">
            E-mail: rocketfood@gmail.com
          </a>
          <a href="tel:0557456602" className="my-1 ml-3  max-w-fit">
            Tél:{" "}
            <span className="bg-red-600 md:bg-transparent md:text-black text-white max-w-fit  px-2 rounded">
              {" "}
              0557456602
            </span>{" "}
          </a>
          <p className="my-1 ml-3">
            Adresse: hydra rue du sahel en face du stade
          </p>
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3197.1195347021253!2d3.038460015442261!3d36.74370177996023!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x128fb38704ce81df%3A0x22dc4c6051c51c6b!2sRocket%20Sandwich!5e0!3m2!1sfr!2sdz!4v1677932715097!5m2!1sfr!2sdz"
            width="600"
            height="450"
            className="border-none"
            allowfullscreen=""
            loading="lazy"
            referrerpolicy="no-referrer-when-downgrade"
          ></iframe>
        </div>
      </div>
    </div>
  )
}

export default contact
