import "../styles/globals.css"
import Layout from "../components/Layout"
import { SessionProvider } from "next-auth/react"
import React from "react"

function MyApp({ Component, pageProps: { session, ...pageProps } }) {
  return (
    <SessionProvider basePath={`${process.env.NEXTAUTH_URL}`}>
      <main>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </main>
    </SessionProvider>
  )
}

export default MyApp
