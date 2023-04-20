import React, { useState } from "react"
import { Formik, Form, Field } from "formik"
import * as Yup from "yup"
import { CldUploadWidget } from "next-cloudinary"
import Image from "next/image"
import axios from "axios"
import { ToastContainer, toast } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"
import { useRouter } from "next/router"

function ModifyMenu({
  userId,
  menuId,
  onModifyComplete,
  defaultPic = "/images/menu1.png",
  defTitle = "",
  defPrice = "",
  defPricePoint = "",
  defDescription = "",
}) {
  const [hasUploadPhoto, setHasUploadPhoto] = useState(false)
  const [uploadUrl, setUploadUrl] = useState("")
  const validationSchema = Yup.object().shape({
    nom: Yup.string()
      .min(10, "le nom du menu doit contenir aumoins 10 lettres")
      .max(1024, "le nom ne peut pas dépasser les 1024 lettres")
      .required("Vous devez attribuer un nom au menu"),

    description: Yup.string()
      .min(
        20,
        "vous devez aumoins utliser 20 lettres pour les ingredients de votre menu"
      )
      .max(5000, "le menu ne peut pas dépasser les 5000 lettres / chiffres")
      .required("La description est obligatoire pour un menu"),

    prix: Yup.string().required("Veuillez spécifer un prix pour le menu"),
    prixPoints: Yup.string().required(
      "le prix en points rocket est obligatoire "
    ),
    photo: Yup.string().required(
      "un menu sans photo ... c'est pas une bonne idée !"
    ),
  })
  const route = useRouter()
  const addMenu = async (values) => {
    try {
      await axios.post(
        `https://rocket-sandwich/api/menus/modifyMenu?userId=${userId}&id=${menuId}`,
        values
      )
      toast.success("Menu modifier avec succées !", {
        position: toast.POSITION.BOTTOM_CENTER,
      })
      setUploadUrl("")
      setHasUploadPhoto(false)
      onModifyComplete()
      route.reload({ scroll: false })
    } catch (error) {
      console.log(error)
      alert("une erreur est servenu, si le probléme persiste contactez rivuxo")
    }
  }
  return (
    <>
      <ToastContainer />
      <Formik
        enableReinitialize={true}
        initialValues={{
          nom: defTitle,
          description: defDescription,
          prix: defPrice,
          prixPoints: defPricePoint,
          photo: defaultPic,
          tag: "",
        }}
        validationSchema={validationSchema}
        onSubmit={async (values) => {
          await addMenu(values)
          console.log(values)
        }}
      >
        {({ setFieldValue, handleChange, touched, errors }) => (
          <Form className="flex flex-col bg-white max-w-fit self-center justify-evenly md:py-3 md:px-10 rounded-lg border shadow-md mx-10  md:mt-5">
            {/* image */}
            {hasUploadPhoto ? (
              <Image
                src={uploadUrl}
                alt="menu"
                height={200}
                width={200}
                className="my-3 self-center"
              />
            ) : (
              <Image
                src={defaultPic}
                alt="menu"
                height={200}
                width={200}
                className="my-3 self-center"
              />
            )}
            <CldUploadWidget
              onUpload={(err, res, widget) => {
                console.log(res.info.secure_url)
                setFieldValue("photo", res.info.secure_url, false)
                setHasUploadPhoto(true)
                setUploadUrl(res.info.secure_url)
              }}
              uploadPreset="xi6ieh2h"
            >
              {({ open }) => {
                function handleOnClick(e) {
                  e.preventDefault()
                  open()
                }
                return (
                  <button
                    className="px-3 py-1 rounded-lg border-2 border-black font-bold mb-2 hover:bg-black hover:text-amber-400  transition-all duration-500"
                    onClick={handleOnClick}
                  >
                    <p>Changer l'image</p>
                  </button>
                )
              }}
            </CldUploadWidget>
            {errors.photo ? (
              <p className="text-red-600 text-xs font-semibold">
                {errors.photo}
              </p>
            ) : null}
            <div className="flex items-center md:my-3  my-2">
              <label className="font-semibold mr-2" htmlFor="nom">
                Nom du menu
              </label>
              <Field
                className="bg-transparent placeholder:text-xs placeholder:text-amber-500 outline-none border-b border-b-black  px-2 py-1"
                placeholder={defTitle}
                name="nom"
              />
            </div>
            {errors.nom && touched.nom ? (
              <p className="text-red-600 text-xs font-semibold">{errors.nom}</p>
            ) : null}
            {/* prix */}
            <div className="flex items-center md:my-3 my-2">
              <label className="font-semibold mr-2" htmlFor="prix">
                Prix du menu
              </label>
              <Field
                className="bg-transparent placeholder:text-xs placeholder:text-amber-500 w-[20%] outline-none border-b border-b-black  px-2 py-1"
                placeholder={defPrice}
                name="prix"
                onChange={(e) => {
                  const domain = e.target.value.toLowerCase().replace("da", "")
                  handleChange(e)
                  setFieldValue("prix", domain)
                }}
              />
              <p className="ml-3 font-semibold">Da</p>
            </div>
            {errors.prix && touched.prix ? (
              <p className="text-red-600 text-xs font-semibold">
                {errors.prix}
              </p>
            ) : null}
            {/* prix points rocket */}
            <div className="flex items-center md:mt-3 my-2">
              <label className="font-semibold mr-2" htmlFor="prixPoints">
                Prix en points
              </label>
              <Field
                className="bg-transparent placeholder:text-xs placeholder:text-amber-500 w-[20%] outline-none border-b border-b-black  px-2 py-1"
                name="prixPoints"
                placeholder={defPricePoint}
                onChange={(e) => {
                  const domain = e.target.value
                    .toLowerCase()
                    .replace("points", "")
                  handleChange(e)
                  setFieldValue("prixPoints", domain)
                }}
              />
              <p className="ml-3 font-semibold">Points</p>
            </div>
            {errors.prixPoints && touched.prixPoints ? (
              <p className="text-red-600 text-xs font-semibold">
                {errors.prixPoints}
              </p>
            ) : null}
            {/* description */}
            <div className="flex flex-col self-center items-center md:mb-3 max-w-fit my-2">
              <label className="font-semibold mb-2" htmlFor="description">
                description du menu (contenu)
              </label>
              <textarea
                className="md:min-h-[85px] bg-transparent border-2 border-black px-2 focus:outline-none rounded-lg  placeholder:text-xs placeholder:font-semibold placeholder:text-amber-500 "
                onChange={handleChange}
                name="description"
                placeholder={defDescription}
              />
            </div>
            {errors.description && touched.description ? (
              <p className="text-red-600 text-xs font-semibold max-w-xs">
                {errors.description}
              </p>
            ) : null}
            <p className="mb-2 font-bold">Marquer comme:</p>
            <div className="flex flex-wrap items-center justify-evenly">
              <button
                type="button"
                className="px-2 rounded-md text-sm font-semibold py-[1px] bg-blue-500 text-white"
                onClick={() => setFieldValue("tag", "nouveau")}
              >
                Nouveau
              </button>
              <button
                type="button"
                className="px-2 rounded-md text-sm font-semibold py-[1px] bg-red-500 text-white"
                onClick={() => setFieldValue("tag", "le plus vendu")}
              >
                Le plus vendu
              </button>
              <button
                type="button"
                className="px-2 rounded-md text-sm font-semibold py-[1px] bg-orange-400 text-white"
                onClick={() => setFieldValue("tag", "en feu!")}
              >
                En feu !
              </button>
            </div>
            <button
              type="submit"
              className="transition-all duration-500 px-3 py-1 max-w-fit self-center mt-1 rounded-lg  bg-black text-amber-400 md:py-2 font-semibold "
            >
              Modifier le menu
            </button>
          </Form>
        )}
      </Formik>
    </>
  )
}

export default ModifyMenu
