import NextAuth from "next-auth"
import FacebookProvider from "next-auth/providers/facebook"
import GoogleProvider from "next-auth/providers/google"
// import { MongoDBAdapter } from "@next-auth/mongodb-adapter"
import clientPromise from "../../../lib/dbConnect"
import User from "../../../models/user"



export default NextAuth({
  secret: process.env.SECRET,
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      profile(profile, tokens) {
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
          image: profile.picture.data.url,
        }
      },
    }),
  ],
  pages: {
    signIn: "/auth/signin",
  },

  callbacks: {
    async signIn({ user, account, profile, email, credentials }) {
      clientPromise()
      const currUser = await User.findOne({ userId: user.id })
      if (!currUser) {
        await User.create({
          name: profile.name,
          email: profile.email,
          picture:
            account.provider === "google"
              ? profile.picture
              : profile.picture.data.url,
          userId: account.provider === "google" ? profile.sub : profile.id,
        })
      }
      return true
    },
    async redirect({ url, baseUrl }) {
      return `${baseUrl}/Login`
    },
    async session({ session, user, token }) {
      session.user.id = token.sub
      return session
    },
  },
})
