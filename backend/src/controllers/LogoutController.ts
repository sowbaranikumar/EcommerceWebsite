import {Request,Response} from 'express';
import { User} from '../models/User.js';

export const Logout=async(req:Request,res:Response)=>{
    try{
    const refreshToken=req.cookies?.refreshToken||req.body.refreshToken;
    if (!refreshToken) {
    return res.status(400).json({ message: "Refresh token required" });
  }

     const user=await User.update(
      { refreshToken: null },
      { where: { refreshToken } }
    );
    
    if (!user) {
      return res.status(200).json({ message: "Logged out successfully" });
    }
    
    // await user.update({ refreshToken: null });
       res.clearCookie("refreshToken", {
      httpOnly: true,
      secure: false,
      sameSite: "strict",
    });
    return res.status(200).json({ message: "Logged out successfully" });
  }
     catch (error) {
    console.error("Logout error:", error);
    return res.status(500).json({ message: "Server error" });
  }
};

