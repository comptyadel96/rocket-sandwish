import mongoose from "mongoose"

let clientPromise = async () => {
  try {
    mongoose.connect(process.env.MONGODB_URI)
  } catch (error) {
    console.log(error)
  }
}

export default clientPromise
