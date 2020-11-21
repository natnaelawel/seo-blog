import { Request, Response } from 'express';
import {validationResult} from 'express-validator';

export const runValidation = (req:Request, res:Response, next: Function)=>{
    const errors = validationResult(req)
    if(!errors.isEmpty()){
        return res.status(422).json({
            error: errors.array()[0].msg
        })
    }
    next()
}