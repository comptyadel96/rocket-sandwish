import NextAuth from "next-auth"
import FacebookProvider from "next-auth/providers/facebook"
import GoogleProvider from "next-auth/providers/google"
// import { MongoDBAdapter } from "@next-auth/mongodb-adapter"
import clientPromise from "../../../lib/dbConnect"
import User from "../../../models/user"

// créer un nouvel utilisateur si il n'a pas encore un compte sur le site
const getCurrentUser = async (id, profile) => {
  await clientPromise()
  const currUser = await User.findOne({ userId: id })
  if (!currUser) {
    await User.create({
      name: profile.name,
      email: profile.email,
      picture: profile.picture,
      userId: profile.sub || profile.id,
    })
  } else {
    return null
  }
}

export default NextAuth({
  secret: process.env.SECRET,
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      profile(profile, tokens) {
        getCurrentUser(profile.sub, profile)

        return {
          id: profile.sub,
          email: profile.email,
          name: profile.name,
          accessToken: tokens.access_token,
          image: profile.picture,
        }
      },
    }),
    FacebookProvider({
      clientId: process.env.FACEBOOK_CLIENT_ID,
      clientSecret: process.env.FACEBOOK_CLIENT_SECRET,

      profile(profile, tokens) {
        return {
          id: profile.id,
          email: profile.email,
          name: profile.name,
          accessToken: tokens.access_token,
          picture: profile.picture.data.url,
        }
      },
    }),
  ],
  pages: {
    signIn: "/auth/signin",
  },
  // adapter: MongoDBAdapter(clientPromise),
  callbacks: {
    async session({ session, token, user }) {
      session.user.id = token.sub

      return session
    },
  },
})
