import React, { useState } from "react"
import { FiChevronDown, FiChevronUp } from "react-icons/fi"
function FAQ({
  question = "est-ce-que rocket food assure la livraison ?",
  reponse = "Oui, on vous fera la livraison si vous habitez sur la wilaya d'alger ",
}) {
  const [isOpen, setIsOpen] = useState(false)
  return (
    <div
      onClick={() => setIsOpen(!isOpen)}
      className="relative cursor-pointer md:mx-5 mx-auto  bg-white border shadow-md md:px-2 px-4 md:py-3 py-1 rounded-md flex  md:max-w-[40%] max-w-[100%] "
    >
      <div className="flex flex-col justify-items-start w-full mr-2 ">
        <p className="font-semibold capitalize md:text-2xl"> {question} </p>
        {isOpen && <p className="mt-2 text-gray-500 "> {reponse} </p>}
      </div>
      {!isOpen ? (
        <FiChevronDown
          className="ml-auto mr-1 self-start mt-2 text-red-600"
          size={27}
        />
      ) : (
        <FiChevronUp
          className="ml-auto mr-1 self-start mt-2 text-red-600"
          size={27}
        />
      )}
    </div>
  )
}

export default FAQ
