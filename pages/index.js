import Head from "next/head"
import Image from "next/image"
import { Swiper, SwiperSlide } from "swiper/react"
import "swiper/css"
import { Navigation, Autoplay } from "swiper"
import "swiper/css/navigation"
import "swiper/css/pagination"
import "swiper/css/thumbs"
import React from "react"
import MenuCard from "../components/MenuCard"
import { BiRightArrowCircle } from "react-icons/bi"
import axios from "axios"
import clientPromise from "../lib/dbConnect"
import Menu from "../models/menu"

export default function Home({ menus }) {
  return (
    <div className=" h-full w-full">
      <Head>
        <title>rocket sandwish</title>
        <meta
          name="description"
          content="rocket food fast food et livraison de nourriture en Algérie"
        />
        <link rel="icon" href="/rocket.ico" />
      </Head>

      <main className="flex flex-col items-center lg:pt-10 mx-auto">
        <Image
          alt=" fast food vente de sandwishs et nourriture algèrie"
          className=" md:block hidden object-cover "
          src="/images/head.png"
          height={1400}
          width={1720}
        />
        {/* mobile photo */}
        <Image
          alt="fast food vente de sandwishs et nourriture algèrie"
          src="/images/head-mobile.png"
          height={400}
          width={400}
          className="md:hidden"
        />
        {/* <button className="px-3 py-2 transition-colors duration-700 border-red-600 border mt-5 lg:text-xl text-red-600 hover:bg-red-600 hover:text-white font-semibold rounded-lg">
          Voir tous les menus
        </button> */}
        <section className="lg:mb-20 lg:py-5  flex flex-col  w-full">
          <div className="flex items-center justify-between">
            <div className="m-5 relative max-w-fit ">
              <div className="flex items-center">
                <h2 className="font-semibold md:text-2xl text-xl">
                  Découvrer nos menus
                </h2>
                <Image
                  src="/images/burger.png"
                  height={30}
                  width={30}
                  alt="burger algèrie"
                  className="ml-1"
                />
              </div>

              <div className="absolute left-0 w-[23%] h-[3px] bg-red-600" />
            </div>
            <div className="mr-10 flex items-center cursor-pointer hover:text-red-600">
              <p className="font-bold mr-1">Voir tous les menus</p>
              <BiRightArrowCircle size={22} className="mt-1" />
            </div>
          </div>

          <Swiper
            spaceBetween={2}
            breakpoints={{
              1200: {
                slidesPerView: 4,
              },
              760: {
                slidesPerView: 3,
              },
              550: {
                slidesPerView: 2,
              },
              280: {
                slidesPerView: 1,
                spaceBetween: 0,
              },
            }}
            modules={[Navigation, Autoplay]}
            navigation
            style={{
              "--swiper-navigation-color": "#EF1111",
            }}
            className="xl:w-[95%] w-full py-10"
          >
            {/* bg-[#fdedc9]  */}
            {menus.map((menu, index) => (
              <SwiperSlide key={index}>
                <MenuCard
                  description={menu.description}
                  src={menu.photo}
                  price={menu.prix}
                  title={menu.nom}
                  key={index}
                  prixPoints={menu.prixPoints}
                />
              </SwiperSlide>
            ))}
          </Swiper>
        </section>
        <div className="lg:my-8 my-5 relative">
          <h1 className="xl:text-7xl lg:text-5xl text-xl font-bold">
            Vos plats préférés livrés chez vous!
          </h1>
          <div className="absolute left-0 md:-bottom-1 bottom-0 w-full md:h-5 h-2 -z-10 bg-[#fdedc9] " />
        </div>
        <p className="font-semibold my-10 md:text-3xl lg:max-w-2xl text-center">
          Rocket sandwish s'engage à vous préparer les meuilleurs des sandwishs
          et vous faire la livraison de votre commande dans un temps record
        </p>
        <div className="flex items-center flex-wrap justify-evenly">
          <div className="flex flex-col items-center px-3 py-2">
            <Image
              alt="commander en ligne du menu"
              src="/images/commande.png"
              height={200}
              width={200}
            />
            <p className="font-semibold my-3">Commander votre menu</p>
            <p className="max-w-xs text-center">
              faite la commande sur notre site ou bien sur l'application rocket
              sandwish
            </p>
          </div>
          <div className="flex flex-col items-center px-3 py-2 lg:my-10">
            <Image
              alt="préparation de votre commande"
              src="/images/produit.png"
              height={200}
              width={200}
            />
            <p className="font-semibold my-3">
              Nous préparerons votre commande
            </p>
            <p className="max-w-xs text-center">
              Notre équipe vous préparera le plat avec soins et les mettera dans
              des boites pour afin de garantir qu'il reste intacte
            </p>
          </div>
          <div className="flex flex-col items-center px-3 py-2">
            <Image
              alt="livraison de la nourriture algèrie"
              src="/images/livraison.png"
              height={350}
              width={350}
            />
            <p className="font-semibold my-3">Livraison à votre domicile</p>
            <p className="max-w-xs text-center">
              Votre commande vous sera livré dans un temps record + une facture
              de ce que vous avez acheté
            </p>
          </div>
        </div>
        {/* présentation magazin + formulaire de contacte */}
        <p className="xl:text-7xl lg:text-5xl text-xl font-bold md:mt-16 md:mb-12">
          Le goût que vous méritez
        </p>
        <div className="flex items-center flex-wrap w-full justify-evenly md:px-4 md:py-2 p-2  md:mb-24 ">
          <div className="relative p-4">
            <Image
              src="/images/rocket-store.png"
              height={550}
              width={550}
              alt="rocket store"
              className="rounded-xl z-10"
            />
            <div className="absolute -right-7 -bottom-5 w-full h-[50%]  bg-[#fdedc9] rounded-xl -z-50" />
          </div>
          <div className="flex flex-col self-start">
            <p className="font-semibold md:text-4xl">Soyez les bienvenues</p>
            <p className="lg:max-w-lg lg:mt-3 text-gray-500 text-lg">
              Que vous soyez en famille ou bien juste entre amis, vous trouverez
              surement votre plaisir chez rocket sandwish
            </p>
            <p className="font-semibold md:text-4xl md:mt-7">
              Des sandwishs ...mais pas que!
            </p>
            <p className="lg:max-w-lg lg:mt-3 text-gray-500 text-lg">
              Des sandwishs c&apos;est bien mais pleins d&apos;autres menus
              c&apos;est encore mieux,vous avez le choix!
            </p>
            <p className="font-semibold md:text-4xl md:mt-7">
              Acceuil chaleureux
            </p>
            <p className="lg:max-w-lg lg:mt-3 text-gray-500 text-lg">
              Notre équipe se chargera non seulement de vous préparer les
              meilleurs des sandwishs mais aussi de vous le servir avec joie et
              la bonne humeur
            </p>
          </div>
        </div>
      </main>
    </div>
  )
}
export async function getServerSideProps(context) {
  //  get all menus
  // const menus = await (
  //   await axios(`${process.env.NEXT_PUBLIC_BASE_URL}/api/menus/getMenus`)
  // ).data

  await clientPromise()
  const menus = await Menu.find({})
  return { props: { menus: JSON.parse(JSON.stringify(menus)) } }
}
