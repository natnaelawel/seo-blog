import { Request, Response, NextFunction } from "express";
import Jwt from "jsonwebtoken";
import User, { IUser } from '../models/user';
const secret = process.env.JWT_SECRET || "sample secret";

export const requireSignIn = (
  req:any,
  res:any,
  next: NextFunction
) => {
  const token = req.headers.authorization?.split(" ")[1] || "sample";
  try {
    const decoded = Jwt.verify(token, secret);
    console.log(decoded);
    req.user = decoded;
    next();
  } catch (err) {
    console.log(err);
    res.status(403).json({ message: "UnAuthorized Access" });
  }
};

export const authMiddleware = (req:any, res:Response, next:NextFunction)=>{
  const authUserId = req.user._id;
  User.findById(authUserId).exec((err, user)=>{
    if(err && !user){
      return res.status(400).json({
        error: 'User not found'
      })
    }

    req.profile = user
    next()
  })
}

export const adminMiddleware = (req:any, res:Response, next:NextFunction)=>{
  const adminUserId = req.user._id;
  User.findById(adminUserId).exec((err, user:IUser)=>{
    if(err && !user){
      return res.status(400).json({
        error: 'User not found'
      })
    }
    if(user.role !== 'admin'){
      return res.status(400).json({
        error: 'User not admin'
      })
    }
    req.profile = user
    next()
  })
}
