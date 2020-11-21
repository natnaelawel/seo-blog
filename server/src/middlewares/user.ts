import { NextFunction } from "express";

export const getUser = (req:any, res:any, next:NextFunction)=>{
    req.profile.password = undefined; 
    req.profile.salt = undefined;

    res.json({
        user: req.profile
    })
}