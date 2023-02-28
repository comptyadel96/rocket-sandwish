import NextAuth from "next-auth"
import FacebookProvider from "next-auth/providers/facebook"
import GoogleProvider from "next-auth/providers/google"
// import { MongoDBAdapter } from "@next-auth/mongodb-adapter"
import clientPromise from "../../../lib/dbConnect"
import User from "../../../models/user"

// créer un nouvel utilisateur si il n'a pas encore un compte sur le site
const getCurrentUser = async (id, profile, provider = "google") => {
  clientPromise()
  const currUser = await User.findOne({ userId: id })
  if (!currUser) {
    await User.create({
      name: profile.name,
      email: profile.email,
      picture:
        provider === "google" ? profile.picture : profile.picture.data.url,
      userId: provider === "google" ? profile.sub : profile.id,
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
      async profile(profile, tokens) {
        console.log(profile)
        await getCurrentUser(profile.sub, profile)
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

     async profile(profile, tokens) {
       await getCurrentUser(profile.id, profile, "facebook")
        console.log(profile)
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
 
  callbacks: {
    async session({ session, token, user }) {
      session.user.id = token.sub
      return session
    },
  },
})
