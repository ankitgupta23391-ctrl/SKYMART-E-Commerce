import dotenv from "dotenv";
dotenv.config({path:"./config.env"})
import mongoose from "mongoose";

const ConnectDB = async ()=>{
  try {
    await mongoose.connect(process.env.MONGO_URI)
    console.log("MongoDB Connected 🎉")
  } catch (error) {
    console.log("MongoDB Not Connected")
  }
}

export default ConnectDB;
