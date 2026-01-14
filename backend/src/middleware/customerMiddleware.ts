import {Request,Response,NextFunction} from "express";

const customerMiddleware=(req:Request,res:Response,next:NextFunction)=>{
  if (req.user?.role!=="CUSTOMER"){
    return res.status(403).json({
      message:"Customer access only",
    });
  }
  next();
};

export default customerMiddleware;