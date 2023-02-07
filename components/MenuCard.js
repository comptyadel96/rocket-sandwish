import Image from "next/image"
import React from "react"

function MenuCard({
  src = "/images/menu1.png",
  alt = "menu fast food",
  title = "menu",
  description = "Lorem ipsum dolor nhdu kdkdkdkdkdkdkdkdkkdkd ohfqiudhfdhsshfuhfshfhfdshfsihfhfsgfgdggdgdgdg",
  price = "400",
  prixPoints = "800",
  isDash = false,
  onDelete,
  onModify,
}) {
  return (
    <div className="flex flex-col items-center cursor-pointer lg:py-3 py-1 lg:px-5 px-2 md:max-w-[20rem] my-10 bg-white mx-4 rounded-md shadow-lg border  relative">
      <Image
        alt={alt}
        src={src}
        height={250}
        width={isDash ? 350 : 250}
        className="rounded-lg"
      />

      <p className="font-bold lg:text-2xl  ">{title} </p>

      <p className=" text-clip overflow-hidden  text-center font-semibold  text-sm text-gray-400 ">
        {description}
      </p>

      <p className="font-bold text-lg rounded-md my-1  w-full text-center  text-">
        {price} <span className="">Da</span>{" "}
      </p>
      <div></div>
      <p className="text-sm font-semibold text-red-600">
        {prixPoints} <span className="">Points rocket</span>{" "}
      </p>
      {!isDash ? (
        <button className="absolute lg:-right-9 -right-4 lg:-bottom-6 -bottom-8 border-red-600 border-2 shadow-md shadow-red-200 rounded-lg font-semibold bg-white px-2 text-red-600 hover:bg-red-600 hover:text-white">
          + Commander
        </button>
      ) : null}
      {isDash && (
        <div className="flex flex-col items-center">
          <button
            onClick={onModify}
            className="px-3 py-1 rounded-lg my-2 font-semibold text-sm shadow-md border border-purple-600 text-purple-600 hover:bg-purple-600 transition-all duration-500 hover:text-white "
          >
            Modifier le menu
          </button>
          <button
            onClick={onDelete}
            className="px-3 py-1 rounded-lg my-2 font-semibold text-sm shadow-md border border-red-600 text-red-600 hover:bg-red-600 transition-all duration-500 hover:text-white"
          >
            Supprimer le menu
          </button>
        </div>
      )}
    </div>
  )
}

export default MenuCard
