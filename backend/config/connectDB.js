import mongoose from "mongoose"
import dotenv from "dotenv"
dotenv.config({})
const connectDB = async () => {
    await mongoose.connect(process.env.MONGO_URI).then(() => {
        console.log("connected successfully")
    }).catch((error) => {
        console.log(error)
    })
}

export default connectDB;