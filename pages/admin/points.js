import axios from "axios"
import { getSession } from "next-auth/react"
import React from "react"

function points() {
  return <div>points</div>
}


export async function getServerSideProps(context) {
  const session = await getSession(context)
  const res = await axios(
    `http:localhost:3000/api/user/isAdmin?id=${session.user.id}`
    // "http:localhost:3000/api/user/getUsers"
  ) 
  console.log(res.data)
  const user = res.data
     
  return { props: { user } }
}
export default points
