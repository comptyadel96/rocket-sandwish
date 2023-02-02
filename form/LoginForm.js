import React from "react"

function LoginForm() {
  return (
    <div className="md:my-10">
      <form className="flex flex-col items-center md:py-7 md:px-5 shadow-md bg-gray-50">
        {/* email */}
        <input
          type="text"
          placeholder="exemple@gmail.com"
          className="px-4 py-2"
        />
        {/* password */}
        <input
          type="password"
          placeholder="mot de passe"
          className="px-4 py-2"
        />

        {/* submit btn */}
        <input
          type="submit"
          value="Se connecter"
          className="px-3 py-2 rounded-lg mt-3 bg-yellow-200 font-semibold"
        />
      </form>
    </div>
  )
}

export default LoginForm
