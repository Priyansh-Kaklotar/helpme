import connectToDatabase from "../../../lib/mongodb";
import User from "@/src/models/User";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import bcrypt from 'bcryptjs'

dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET

export async function POST(req) {
  try {
    const {name , password } = await req.json();
    await connectToDatabase();
    const user = await User.findOne({name}).select("+password")
    if(!user){
      return req.status(404).send("Chala ja BSDK")
    }
    const is_mathed = await bcrypt.compare(password ,user.password)
    if(is_mathed){
      const token = jwt.sign(
        {
          name,
        },
        JWT_SECRET,
        {expiresIn : "1h"}
      )
      return new Response(
        JSON.stringify({
        message : "Login successfull",
        token : token
      }))
    }
    else{
      return new Response(
        JSON.stringify({
        message : "Login failed",
      }))
    }
  } catch (error) {
    return new Response(
      JSON.stringify({
        error : error.message,
        success: false,
        message: "Error in login route",
      })
    );
  }
}
