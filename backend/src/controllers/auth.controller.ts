import type { Request, Response } from "express";
import { User } from "../models/User.js";
import bcrypt from "bcrypt";
import jwt, { Secret, SignOptions } from "jsonwebtoken";

interface RegisterRequestBody
{
   email:string,
   password:string,
   role:"ADMIN"|"CUSTOMER"
}
 
const generateAccessToken=(user:User)=>{
   return jwt.sign(
    {
      id:user.id,
      email:user.email,
      role:user.role
   },
    process.env.ACCESS_TOKEN_SECRET as Secret,
    {expiresIn:"15m"}
  );
};

const generateRefreshToken=(user:User)=>{
   return jwt.sign(
    {
      id:user.id,
   },
    process.env.REFRESH_TOKEN_SECRET as Secret,
    {expiresIn:"7d"}
  );
};


export const register = async (req:Request,res:Response) => {
  try {
    const { email, password,role}=req.body as RegisterRequestBody;
    console.log("Users", req.body);
    if (!email || !password || !role) {
      return res.status(400).json({message:"All fields are required"});
    }
    const existingUser=await User.findOne({ where: { email } });
    if (existingUser){
      return res.status(409).json({message:"User already exists"});
    }

    const hashedPassword = await bcrypt.hash(password,10);

    const user = await User.create({
      email,
      password: hashedPassword,
      role,
    });
    console.log("User created:", user.toJSON());
    return res.status(201).json({
      message: "User registered successfully",
    });
  } catch (error) {
    return res.status(500).json({ message: error});
  }
};

export const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    console.log("LoggedUsers", req.body);
    if (!email || !password) {
      return res.status(400).json({ message: "Email and password required" });
    }

    const user = await User.findOne({ where: { email } });
    if (!user) {
      console.log("Found User:", user);
      return res.status(401).json({ message: "Invalid credentials" });
    }


    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: "Invalid credentials" });
    }
    console.log("Valid Password", isPasswordValid);

    const accesstoken=generateAccessToken(user);
    const refreshtoken=generateRefreshToken(user);
    console.log("refreshtoken====>",refreshtoken);

    const refreshTokenInDB=await user.update({refreshToken:refreshtoken});
    // console.log("refreshtoken",refreshTokenInDB.refreshToken);
    res.cookie("refreshToken",refreshtoken,{
    httpOnly: true,
    secure: false,
    sameSite: "strict",
});
    return res.status(200).json({
      message: "Login successful",
      accesstoken,
      refreshtoken,
      user: {
        id: user.id,
        email: user.email,
        role: user.role,
      },
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Server error" });
  }
};


