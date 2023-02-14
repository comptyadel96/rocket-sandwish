import Image from "next/image"
import React, { useRef, useState } from "react"
import clientPromise from "../../lib/dbConnect"
import Menu from "../../models/menu"
import { BsTelephone, BsPinMap } from "react-icons/bs"

export const getStaticPaths = async () => {
  await clientPromise()
  const menus = await Menu.find({})
  const paths = menus.map((menu) => {
    return {
      params: { id: menu._id.toString() },
    }
  })
  return {
    paths,
    fallback: false,
  }
}

export const getStaticProps = async (context) => {
  const id = context.params.id
  await clientPromise()
  const menu = await Menu.findById(id)
  return {
    props: { menu: JSON.parse(JSON.stringify(menu)) },
  }
}

function menu({ menu }) {
  const mayoRef = useRef()
  const ketchupRef = useRef()
  const maisonRef = useRef()
  const hrissaRef = useRef()
  const gruyére = useRef()
  const gouda = useRef()
  const kiri = useRef()
  const camambert = useRef()
  //  state
  // const [numbMenu, setNumbMenu] = useState(0)
  const [numbCoca, setNumbCoca] = useState(0)
  const [numbPepsi, setNumbPepsi] = useState(0)
  const [numbSelecto, setNumbSelecto] = useState(0)
  const [numbMirinda, setNumbMirinda] = useState(0)
  const [numbSchweppes, setNumbSchweppes] = useState(0)

  const toggleSauce = (ref) => {
    if (ref.current.classList.contains("bg-white")) {
      ref.current.classList.remove("bg-white")
      ref.current.classList.add("bg-red-600")
      ref.current.classList.add("text-white")
    } else {
      ref.current.classList.add("bg-white")
      ref.current.classList.remove("text-white")
      ref.current.classList.remove("bg-red-600")
    }
  }
  const toggleSup = (ref) => {
    if (ref.current.classList.contains("bg-white")) {
      ref.current.classList.remove("bg-white")
      ref.current.classList.add("bg-amber-300")
      ref.current.classList.add("text-white")
    } else {
      ref.current.classList.add("bg-white")
      ref.current.classList.remove("text-white")
      ref.current.classList.remove("bg-amber-300")
    }
  }

  return (
    <div className="md:py-16 flex md:flex-row flex-wrap flex-col justify-evenly w-full bg-gray-100">
      {/* menu card */}

      <Image
        height={600}
        width={600}
        src={menu.photo}
        alt={`menu rocket ${menu.nom} `}
        className="rounded-3xl self-start"
      />

      {/* commande details */}
      <div className="flex flex-col self-start">
        <p className="font-bold md:text-6xl capitalize"> {menu.nom} </p>
        <div className="flex flex-wrap md:mt-7 md:text-lg md:px-3 md:py-2  bg-white rounded-lg shadow font-bold">
          <p className=" text-red-600">Ingrédients:</p>
          <p className="md:max-w-md ml-2 font-semibold">{menu.description} </p>
        </div>
        <div className="flex items-center flex-wrap text-sm justify-evenly md:mt-5">
          <p className=" font-semibold bg-red-600 px-3 py-1 rounded-xl text-white">
            menu personnalisable
          </p>
          <p className=" font-semibold bg-black px-3 py-1 rounded-xl text-white">
            plusieurs formats
          </p>
          <p className=" font-semibold bg-[#f6d485] px-3 py-1 rounded-xl">
            à partir de {menu.prix} Da
          </p>
        </div>

        {/* commande form */}
        <div className="flex flex-col items-center md:mt-6 md:py-4 py-2">
          <p className="md:text-5xl  md:mb-4 mb-2 ">Alors ça vous tente ? </p>
          {/* sauce */}
          <p className="font-semibold">
            une sauce ?{" "}
            <span className="text-xs max-w-xs text-gray-500 font-normal">
              Appuyez sur une sauce pour l'ajouter à votre menu
            </span>
          </p>
          <div className="flex flex-wrap items-center justify-evenly my-3">
            {/* mayonnaise */}

            <button
              onClick={() => {
                toggleSauce(mayoRef)
              }}
              ref={mayoRef}
              className="px-3 py-1 rounded-md bg-white m-2 font-semibold cursor-pointer"
            >
              Mayonnaise
            </button>

            {/* ketchup */}

            <button
              onClick={() => {
                toggleSauce(ketchupRef)
              }}
              ref={ketchupRef}
              className="px-3 py-1 rounded-md bg-white m-2 font-semibold cursor-pointer"
            >
              ketchup
            </button>

            {/* sauce maison */}

            <button
              onClick={() => {
                toggleSauce(maisonRef)
              }}
              ref={maisonRef}
              className="px-3 py-1 rounded-md bg-white m-2 font-semibold cursor-pointer"
            >
              Sauce maison
            </button>

            {/* hrissa */}

            <button
              onClick={() => {
                toggleSauce(hrissaRef)
              }}
              ref={hrissaRef}
              className="px-3 py-1 rounded-md bg-white m-2 font-semibold cursor-pointer"
            >
              Hrissa
            </button>
          </div>

          <p className="font-semibold">Un supplément ?</p>
          <div className="flex flex-wrap items-center">
            <button
              ref={gruyére}
              onClick={() => {
                toggleSup(gruyére)
              }}
              className="px-3 py-1 rounded-md bg-white m-2 font-semibold cursor-pointer"
            >
              Gruyére
            </button>
            <button
              ref={gouda}
              onClick={() => {
                toggleSup(gouda)
              }}
              className="px-3 py-1 rounded-md bg-white m-2 font-semibold cursor-pointer"
            >
              Gouda
            </button>
            <button
              ref={camambert}
              onClick={() => {
                toggleSup(camambert)
              }}
              className="px-3 py-1 rounded-md bg-white m-2 font-semibold cursor-pointer"
            >
              Camambert
            </button>
            <button
              ref={kiri}
              onClick={() => {
                toggleSup(kiri)
              }}
              className="px-3 py-1 rounded-md bg-white m-2 font-semibold cursor-pointer"
            >
              Kiri
            </button>
          </div>
          {/* boissons */}
          <div className="flex items-center justify-evenly flex-wrap md:my-5">
            <div className="flex flex-col items-center  md:mx-3 mx-2">
              <Image src="/images/selecto.jpg" height={40} width={40} />
              <p className="font-semibold">Selecto</p>
              <div className="flex items-center text-lg font-semibold text-red-600">
                <button
                  onClick={() => {
                    setNumbSelecto((prev) => (prev > 0 ? prev - 1 : 0))
                  }}
                  className=" text-2xl"
                >
                  -
                </button>
                <p className="mx-2 text-black">{numbSelecto} </p>
                <button
                  onClick={() => {
                    setNumbSelecto((prev) => prev + 1)
                  }}
                  className="text-2xl"
                >
                  +
                </button>
              </div>
            </div>
            <div className="flex flex-col items-center  md:mx-3 mx-2">
              <Image src="/images/coca.png" height={40} width={40} />
              <p className="font-semibold">Coca cola</p>
              <div className="flex items-center text-lg font-semibold text-red-600">
                <button
                  onClick={() => {
                    setNumbCoca((prev) => (prev > 0 ? prev - 1 : 0))
                  }}
                  className=" text-2xl"
                >
                  -
                </button>
                <p className="mx-2 text-black">{numbCoca}</p>
                <button
                  onClick={() => {
                    setNumbCoca((prev) => prev + 1)
                  }}
                  className="text-2xl"
                >
                  +
                </button>
              </div>
            </div>
            <div className="flex flex-col items-center  md:mx-3 mx-2">
              <Image src="/images/pepsi.jpg" height={45} width={45} />
              <p className="font-semibold">Pepsi</p>
              <div className="flex items-center text-lg font-semibold text-red-600">
                <button
                  onClick={() => {
                    setNumbPepsi((prev) => (prev > 0 ? prev - 1 : 0))
                  }}
                  className=" text-2xl"
                >
                  -
                </button>
                <p className="mx-2 text-black">{numbPepsi} </p>
                <button
                  onClick={() => {
                    setNumbPepsi((prev) => prev + 1)
                  }}
                  className="text-2xl"
                >
                  +
                </button>
              </div>
            </div>
            <div className="flex flex-col items-center  md:mx-3 mx-2">
              <Image src="/images/schweppes.jpeg" height={45} width={45} />
              <p className="font-semibold">Schweppes</p>
              <div className="flex items-center text-lg font-semibold text-red-600">
                <button
                  onClick={() => {
                    setNumbSchweppes((prev) => (prev > 0 ? prev - 1 : 0))
                  }}
                  className=" text-2xl"
                >
                  -
                </button>
                <p className="mx-2 text-black">{numbSchweppes} </p>
                <button
                  onClick={() => {
                    setNumbSchweppes((prev) => prev + 1)
                  }}
                  className="text-2xl"
                >
                  +
                </button>
              </div>
            </div>
            <div className="flex flex-col items-center  md:mx-3 mx-2">
              <Image src="/images/mirinda.jpg" height={60} width={60} />
              <p className="font-semibold">Mirinda</p>
              <div className="flex items-center text-lg font-semibold text-red-600">
                <button
                  onClick={() => {
                    setNumbMirinda((prev) => (prev > 0 ? prev - 1 : 0))
                  }}
                  className=" text-2xl"
                >
                  -
                </button>
                <p className="mx-2 text-black">{numbMirinda} </p>
                <button
                  onClick={() => {
                    setNumbMirinda((prev) => prev + 1)
                  }}
                  className="text-2xl"
                >
                  +
                </button>
              </div>
            </div>
          </div>

          {/* infos personnelle client */}
          <div className="flex items-center md:my-3">
            <BsPinMap className="mr-2 text-xl" />
            <input
              type="text"
              className="bg-white px-3 py-1 rounded-md"
              placeholder="Adresse de livraison"
            />
          </div>
          <div className="flex items-center md:my-3">
            <BsTelephone className="mr-2 text-xl" />
            <input
              type="text"
              className="bg-white px-3 py-1 rounded-md "
              placeholder="Ex: 05577049.."
            />
          </div>
          <button className="px-2 py-[2px] font-semibold rounded-lg hover:bg-red-600 border border-red-600 text-red-600 hover:text-white">
            Commander
          </button>
        </div>
      </div>
    </div>
  )
}

export default menu
