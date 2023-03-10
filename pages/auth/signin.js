import { getProviders, signIn } from "next-auth/react"
import { FcGoogle } from "react-icons/fc"
import { BsFacebook } from "react-icons/bs"
import Link from "next/link"
export default function Login({ providers }) {
  return (
    <div className="my-20 flex flex-col items-center  h-screen">
      <h1 className="font-bold md:text-4xl text-2xl text-center">
        Connecter vous √† votre compte rocket
      </h1>

      {Object.values(providers).map((provider) => (
        <div key={provider.name} className="font-semibold">
          {provider.name === "Google" ? (
            <button
              className="mb-5 mt-14 flex items-center px-3 py-2 rounded-lg shadow-md hover:bg-gray-100 border"
              onClick={(e) => {
                // e.preventDefault()
                signIn(provider.id, {
                  callbackUrl: `${process.env.NEXT_PUBLIC_BASE_URL}/Login`,
                })
              }}
            >
              Se connecter avec {provider.name}{" "}
              <FcGoogle className="text-2xl ml-1" />
            </button>
          ) : (
            <button
              className="my-3 flex items-center px-3 py-2 rounded-lg shadow-md hover:bg-gray-100 border"
              onClick={(e) => {
                e.preventDefault()
                signIn(provider.id, {
                  callbackUrl: `${process.env.NEXT_PUBLIC_BASE_URL}/Login`,
                })
              }}
            >
              Se connecter avec {provider.name}{" "}
              <BsFacebook className="text-2xl ml-1 text-blue-500" />
            </button>
          )}
        </div>
      ))}
      <p className="text-xs  font-semibold mt-4 md:mx-0 mx-10 text-center">
        en vous connectant sur notre site, vous acceptez notre{" "}
        <Link className="text-red-600 border-b-[1px] border-b-red-600 font-bold " href="/Conf">Politique de confidentialit√©</Link>
      </p>
    </div>
  )
}

export async function getServerSideProps(context) {
  const providers = await getProviders()
  return {
    props: {
      providers,
    },
  }
}
