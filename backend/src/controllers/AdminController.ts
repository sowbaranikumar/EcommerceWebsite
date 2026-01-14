import {Request,Response} from 'express';

export const adminDashboard=(req:Request,res:Response)=>{
  res.status(200).json({
    message:"Welcome to Admin Dashboard",
    user:req.user,
  });
};
