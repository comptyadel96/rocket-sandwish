import axios from "axios"
import { getSession } from "next-auth/react"
import Image from "next/image"
import React, { useRef, useState } from "react"
import AddMenu from "../../form/AddMenu"
import MenuCard from "../../components/MenuCard"
import { useRouter } from "next/router"

function menus({ menus, user }) {
  const router = useRouter()
  const modalRef = useRef(null)
  const modifyRef = useRef(null)
  const [menuId, setMenuId] = useState("")
  // delete menu
  const deleteMenu = async () => {
    try {
      await axios.post(
        `http://localhost:3000/api/menus/deleteMenu?userId=${user._id}&id=${menuId}`
      )
      router.reload()
    } catch (error) {
      console.log(error)
    }
  }
  // modify menu
  const modifyMenu = async () => {}
  // toggle delete modal
  const toggleModal = () => {
    if (modalRef.current.classList.contains("hidden")) {
      modalRef.current.classList.remove("hidden")
      modalRef.current.classList.add("block")
    } else {
      modalRef.current.classList.add("hidden")
      modalRef.current.classList.remove("block")
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
                toggleModal()
              }}
              className="px-3 py-1 rounded-md bg-red-600 text-white"
            >
              Oui
            </button>
            <button
              onClick={toggleModal}
              className="px-3 py-1 rounded-md bg-black text-white"
            >
              Annuler
            </button>
          </div>
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
              toggleModal()
              setMenuId(menu._id)
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
        {/* <button className="px-3 py-1 bg-amber-200 hover:bg-amber-300 font-semibold shadow-md mt-3 rounded-xl">
          +Ajouter
        </button> */}
      </div>
      <AddMenu />
    </div>
  )
}

export async function getServerSideProps(context) {
  const session = await getSession(context)
  const res = await axios(
    `http:localhost:3000/api/user/isAdmin?id=${session.user.id}`
  )
  const user = res.data
  // console.log(user)
  //  get all menus
  const menus = await (
    await axios("http:localhost:3000/api/menus/getMenus")
  ).data

  return { props: { user, menus } }
}
export default menus
