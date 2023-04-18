import axios from "axios"
import { getSession } from "next-auth/react"
import Image from "next/image"
import React, { useRef, useState } from "react"
import AddMenu from "../../form/AddMenu"
import MenuCard from "../../components/MenuCard"
import { useRouter } from "next/router"
import ModifyMenu from "../../form/ModifyMenu"
import { IoMdCloseCircle } from "react-icons/io"
import { serverSideTranslations } from "next-i18next/serverSideTranslations"

function menus({ menus, user }) {
  const router = useRouter()
  const modalRef = useRef(null)
  const modifyRef = useRef(null)
  const [menuId, setMenuId] = useState("")
  const [singleMenu, setSingleMenu] = useState({})
  // delete menu
  const deleteMenu = async () => {
    try {
      await axios.post(
        `https://rocket-sandwich.com/api/menus/deleteMenu?userId=${user._id}&id=${menuId}`
      )
      router.reload()
    } catch (error) {
      console.log(error)
    }
  }
  // modify menu

  // toggle delete modal
  const toggleModal = (ref) => {
    if (ref.current.classList.contains("hidden")) {
      ref.current.classList.remove("hidden")
      ref.current.classList.add("block")
    } else {
      ref.current.classList.add("hidden")
      ref.current.classList.remove("block")
    }
  }

  return (
    <div className=" mt-16 flex flex-col relative">
      {/* delete modal */}
      <div
        ref={modalRef}
        className="fixed z-10 inset-0 hidden w-full h-full bg-black/40 pt-10"
      >
        <div className=" bg-white shadow-md border md:p-8 rounded-lg flex flex-col max-w-fit mx-auto mt-[10%] ">
          <p className="font-semibold capitalize ">
            étes-vous sûre de vouloir supprimer ce menu ?
          </p>
          <div className="w-full flex items-center justify-evenly mt-5">
            <button
              onClick={() => {
                deleteMenu()
                toggleModal(modalRef)
              }}
              className="px-3 py-1 rounded-md bg-red-600 text-white"
            >
              Oui
            </button>
            <button
              onClick={() => toggleModal(modalRef)}
              className="px-3 py-1 rounded-md bg-black text-white"
            >
              Annuler
            </button>
          </div>
        </div>
      </div>
      {/* modify menu */}
      <div
        ref={modifyRef}
        className="fixed z-10 inset-0 hidden w-full h-full bg-black/40 pt-10"
      >
        <div className="relative max-w-fit mx-auto">
          <div className="md:mt-6 bg-black/70 rounded-xl  flex flex-col pb-4 items-center">
            <ModifyMenu
              menuId={menuId}
              userId={user._id}
              onModifyComplete={() => toggleModal(modifyRef)}
              defaultPic={singleMenu.photo}
              defPrice={singleMenu.prix}
              defDescription={singleMenu.description}
              defTitle={singleMenu.nom}
              defPricePoint={singleMenu.prixPoints}
            />
          </div>
          <IoMdCloseCircle
            className="absolute right-2 top-2 text-red-600 z-40 cursor-pointer"
            size={24}
            onClick={() => toggleModal(modifyRef)}
          />
        </div>
      </div>
      {/* all menus */}
      <h1 className="md:text-5xl font-bold text-center">Tous les menus</h1>
      <div className="flex items-center flex-wrap justifiy-evenly md:p-5 p-3 md:mb-24">
        {menus.map((menu, index) => (
          <MenuCard
            description={menu.description}
            src={menu.photo}
            price={menu.prix}
            title={menu.nom}
            key={index}
            isDash={true}
            prixPoints={menu.prixPoints}
            onDelete={() => {
              toggleModal(modalRef)
              setMenuId(menu._id)
            }}
            onModify={() => {
              toggleModal(modifyRef)
              setMenuId(menu._id)
              setSingleMenu(menu)
              console.log(menu)
            }}
          />
        ))}
      </div>

      {/* add menus */}
      <div className="flex flex-col items-center p-3  max-w-fit self-center md:mt-10 mt-5 ">
        <Image
          src="/images/addMenu.png"
          height={200}
          width={200}
          alt="ajouter un menu rocket food"
        />
        <p className="font-bold md:text-4xl">Ajouter un menu</p>
      </div>
      <AddMenu />
    </div>
  )
}

export async function getServerSideProps(context) {
  const session = await getSession(context)
  // verfifer si c'est l'admin qui publie le nouveau menu
  const res = await axios(
    `https://rocket-sandwich.com/api/user/isAdmin?id=${
      session ? session.user.id : null
    }`
  )
  const user = res.data

  //  get all menus
  const menus = await (
    await axios(`https://rocket-sandwich.com/api/menus/getMenus`)
  ).data

  return {
    props: {
      user,
      menus,
      ...(await serverSideTranslations(context.locale, ["common"])),
    },
  }
}
export default menus
