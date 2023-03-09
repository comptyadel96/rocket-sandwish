import "../styles/globals.css"
import Layout from "../components/Layout"
import { SessionProvider } from "next-auth/react"
import React from "react"
import { appWithTranslation } from "next-i18next"

function MyApp({ Component, pageProps: { session, ...pageProps } }) {
  return (
    <SessionProvider>
      <main>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </main>
    </SessionProvider>
  )
}

export default appWithTranslation(MyApp);
