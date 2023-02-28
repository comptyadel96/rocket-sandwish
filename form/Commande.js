import React, { useRef, useState } from "react"
import { Formik, Form, Field } from "formik"
import * as Yup from "yup"
import Image from "next/image"
import axios from "axios"
import { ToastContainer, toast } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"
import { BsPinMap, BsTelephone } from "react-icons/bs"

function Commande({ menu, prix = "400" }) {
  const validationSchema = Yup.object().shape({
    numClient: Yup.string().min(
      10,
      "veuillez saisir un numéro de téléphone valide svp"
    ),
    adresseClient: Yup.string().min(
      10,
      "l'adresse doit au-moins contenir 10 lettres"
    ),
  })
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
  const [suppléments, setSupléments] = useState([])
  const [sauce, setSauce] = useState([])
  const [boisson, setBoisson] = useState([])
  const [totalPrice, setTotalPrice] = useState(parseInt(prix))

  const toggleSauce = (ref) => {
    if (ref.current.classList.contains("bg-white")) {
      ref.current.classList.remove("bg-white")
      ref.current.classList.add("bg-red-600")
      ref.current.classList.add("text-white")
      setSauce((prevSauce) => [...prevSauce, ref.current.value])
    } else {
      ref.current.classList.add("bg-white")
      ref.current.classList.remove("text-white")
      ref.current.classList.remove("bg-red-600")
      setSauce(sauce.filter((sauce) => sauce !== ref.current.value))
    }
  }
  const toggleSup = (ref) => {
    if (ref.current.classList.contains("bg-white")) {
      ref.current.classList.remove("bg-white")
      ref.current.classList.add("bg-amber-300")
      ref.current.classList.add("text-white")
      setSupléments((prevSup) => [...prevSup, ref.current.value])
      setTotalPrice((prevPrice) => prevPrice + 100)
    } else {
      ref.current.classList.add("bg-white")
      ref.current.classList.remove("text-white")
      ref.current.classList.remove("bg-amber-300")
      setSupléments(suppléments.filter((sup) => sup !== ref.current.value))
      setTotalPrice((prevPrice) => prevPrice - 100)
    }
  }

  const addBoisson = (nom, nombre) => {
    const currBoisson = boisson.find((boisson) => boisson.nom === nom)
    if (currBoisson) {
      currBoisson.nombre = nombre
    } else {
      setBoisson((prev) => [...prev, { nom, nombre }])
    }
  }
  return (
    <>
      <ToastContainer />
      <Formik
        initialValues={{
          numClient: "",
          adresseClient: "",
          sauces: sauce,
          suppléments,
          boisson,
        }}
        validationSchema={validationSchema}
        enableReinitialize
        onSubmit={async (values) => {
          //   await addMenu(values)

          console.log(values)
        }}
      >
        {({ setFieldValue, handleChange, touched, errors }) => (
          <Form className="flex flex-col items-center md:mt-6 md:py-4 py-2">
            <p className="md:text-5xl text-2xl md:mb-4 mb-2 ">
              Alors ça vous tente ?{" "}
            </p>
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
                onClick={(e) => {
                  toggleSauce(mayoRef)
                  setFieldValue("sauces", sauce)
                  e.preventDefault()
                }}
                name="sauces"
                ref={mayoRef}
                value="Mayonnaise"
                className="px-3 py-1 rounded-md bg-white m-2 font-semibold cursor-pointer"
              >
                Mayonnaise
              </button>

              {/* ketchup */}

              <button
                onClick={() => {
                  toggleSauce(ketchupRef)
                  setFieldValue("sauces", sauce)
                }}
                name="sauces"
                value="ketchup"
                ref={ketchupRef}
                className="px-3 py-1 rounded-md bg-white m-2 font-semibold cursor-pointer"
              >
                ketchup
              </button>

              {/* sauce maison */}

              <button
                onClick={() => {
                  toggleSauce(maisonRef)
                  setFieldValue("sauces", sauce)
                }}
                ref={maisonRef}
                value="Sauce maison"
                name="sauces"
                className="px-3 py-1 rounded-md bg-white m-2 font-semibold cursor-pointer"
              >
                Sauce maison
              </button>

              {/* hrissa */}

              <button
                onClick={() => {
                  toggleSauce(hrissaRef)
                  setFieldValue("sauces", sauce)
                }}
                ref={hrissaRef}
                value="Hrissa"
                name="sauces"
                className="px-3 py-1 rounded-md bg-white m-2 font-semibold cursor-pointer"
              >
                Hrissa
              </button>
            </div>

            <p className="font-semibold">Un supplément ?</p>
            <div className="flex flex-wrap items-center">
              <button
                ref={gruyére}
                value="Gruyére"
                name="suppléments"
                onClick={(e) => {
                  e.preventDefault()
                  toggleSup(gruyére)
                  setFieldValue("suppléments", suppléments)
                }}
                className="px-3 py-1 rounded-md bg-white m-2 font-semibold cursor-pointer"
              >
                Gruyére
              </button>
              <button
                ref={gouda}
                value="Gouda"
                name="suppléments"
                onClick={() => {
                  toggleSup(gouda)
                  setFieldValue("suppléments", suppléments)
                }}
                className="px-3 py-1 rounded-md bg-white m-2 font-semibold cursor-pointer"
              >
                Gouda
              </button>
              <button
                ref={camambert}
                value="Camambert"
                name="suppléments"
                onClick={() => {
                  toggleSup(camambert)
                  setFieldValue("suppléments", suppléments)
                }}
                className="px-3 py-1 rounded-md bg-white m-2 font-semibold cursor-pointer"
              >
                Camambert
              </button>
              <button
                ref={kiri}
                value="Kiri"
                name="suppléments"
                onClick={() => {
                  toggleSup(kiri)
                  setFieldValue("suppléments", suppléments)
                }}
                className="px-3 py-1 rounded-md bg-white m-2 font-semibold cursor-pointer"
              >
                Kiri
              </button>
            </div>
            {/* boissons */}
            <div className="flex items-center justify-evenly flex-wrap md:my-5">
              <div className="flex flex-col items-center  md:mx-4 mx-2">
                <Image src="/images/selecto.jpg" height={40} width={40} />
                <p className="font-semibold">Selecto</p>
                <div className="flex items-center text-lg font-semibold text-red-600">
                  <button
                    onClick={() => {
                      setNumbSelecto((prev) => (prev > 0 ? prev - 1 : 0))
                      addBoisson(
                        "Selecto",
                        numbSelecto > 0 ? numbSelecto - 1 : 0
                      )
                    }}
                    className=" text-2xl"
                    name="boisson"
                  >
                    -
                  </button>
                  <p className="mx-2 text-black">{numbSelecto} </p>
                  <button
                    onClick={() => {
                      setNumbSelecto((prev) => prev + 1)
                      addBoisson("Selecto", numbSelecto + 1)
                    }}
                    className="text-2xl"
                    name="boisson"
                  >
                    +
                  </button>
                </div>
              </div>
              <div className="flex flex-col items-center  md:mx-4 mx-2">
                <Image src="/images/coca.png" height={40} width={40} />
                <p className="font-semibold">Coca cola</p>
                <div className="flex items-center text-lg font-semibold text-red-600">
                  <button
                    onClick={() => {
                      setNumbCoca((prev) => (prev > 0 ? prev - 1 : 0))
                      addBoisson("Coca cola", numbCoca > 0 ? numbCoca - 1 : 0)
                    }}
                    className=" text-2xl"
                    name="boisson"
                  >
                    -
                  </button>
                  <p className="mx-2 text-black">{numbCoca}</p>
                  <button
                    onClick={() => {
                      setNumbCoca((prev) => prev + 1)
                      addBoisson("Coca cola", numbCoca + 1)
                    }}
                    className="text-2xl"
                    name="boissons"
                  >
                    +
                  </button>
                </div>
              </div>
              <div className="flex flex-col items-center  md:mx-4 mx-2">
                <Image src="/images/pepsi.jpg" height={45} width={45} />
                <p className="font-semibold">Pepsi</p>
                <div className="flex items-center text-lg font-semibold text-red-600">
                  <button
                    onClick={() => {
                      setNumbPepsi((prev) => (prev > 0 ? prev - 1 : 0))
                      addBoisson("Pepsi", numbPepsi > 0 ? numbPepsi - 1 : 0)
                    }}
                    className=" text-2xl"
                    name="boisson"
                  >
                    -
                  </button>
                  <p className="mx-2 text-black">{numbPepsi} </p>
                  <button
                    onClick={() => {
                      setNumbPepsi((prev) => prev + 1)
                      addBoisson("Pepsi", numbPepsi + 1)
                    }}
                    className="text-2xl"
                    name="boisson"
                  >
                    +
                  </button>
                </div>
              </div>
              <div className="flex flex-col items-center  md:mx-4 mx-2">
                <Image src="/images/schweppes.jpeg" height={45} width={45} />
                <p className="font-semibold">Schweppes</p>
                <div className="flex items-center text-lg font-semibold text-red-600">
                  <button
                    onClick={() => {
                      setNumbSchweppes((prev) => (prev > 0 ? prev - 1 : 0))
                      addBoisson(
                        "Schweppes",
                        numbSchweppes > 0 ? numbSchweppes - 1 : 0
                      )
                    }}
                    className=" text-2xl"
                    name="boisson"
                  >
                    -
                  </button>
                  <p className="mx-2 text-black">{numbSchweppes} </p>
                  <button
                    onClick={(e) => {
                      e.preventDefault()
                      setNumbSchweppes((prev) => prev + 1)
                      addBoisson("Schweppes", numbSchweppes + 1)
                      // setFieldValue("boisson", boisson)
                    }}
                    className="text-2xl"
                    name="boisson"
                  >
                    +
                  </button>
                </div>
              </div>
              <div className="flex flex-col items-center  md:mx-4 mx-2">
                <Image src="/images/mirinda.jpg" height={60} width={60} />
                <p className="font-semibold">Mirinda</p>
                <div className="flex items-center text-lg font-semibold text-red-600">
                  <button
                    onClick={() => {
                      setNumbMirinda((prev) => (prev > 0 ? prev - 1 : 0))
                      addBoisson(
                        "Mirinda",
                        numbMirinda > 0 ? numbMirinda - 1 : 0
                      )
                    }}
                    className=" text-2xl"
                  >
                    -
                  </button>
                  <p className="mx-2 text-black">{numbMirinda} </p>
                  <button
                    onClick={() => {
                      setNumbMirinda((prev) => prev + 1)
                      addBoisson("Mirinda", numbMirinda + 1)
                    }}
                    className="text-2xl"
                  >
                    +
                  </button>
                </div>
              </div>
            </div>

            {/* infos personnelle client */}
            <div className="flex items-center my-3">
              <BsPinMap className="mr-2 text-xl" />
              <Field
                onChange={(e) => {
                  handleChange(e)
                }}
                name="adresseClient"
                className="bg-white px-3 py-1 rounded-md"
                placeholder="Adresse de livraison"
              />
            </div>
            <div className="flex items-center my-3">
              <BsTelephone className="mr-2 text-xl" />
              <Field
                onChange={(e) => {
                  handleChange(e)
                }}
                name="numClient"
                className="bg-white px-3 py-1 rounded-md "
                placeholder="Ex: 05577049.."
              />
            </div>
            <p className="font-semibold mb-2">
              Totale à payer: {totalPrice} Da{" "}
            </p>
            <button
              type="submit"
              className="px-2 py-[2px] font-semibold rounded-lg hover:bg-red-600 border border-red-600 text-red-600 hover:text-white"
            >
              Commander
            </button>
          </Form>
        )}
      </Formik>
    </>
  )
}

export default Commande
