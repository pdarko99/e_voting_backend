import express from 'express'
import jwt from 'jsonwebtoken'
import {Api404Error} from '../error/errors'
require("dotenv").config();

export class Utility {
    secret = process.env.SECRET!;

    constructor(){
        this.getID = this.getID.bind(this)
    }


    getID(req: express.Request, res: express.Response, next: express.NextFunction){
        if(!req.header('Authoriazation'))
            throw new Api404Error('no user logged in')

        let token = req.header('Authorization')!.split(' ')[1]
        jwt.verify(token, this.secret, ((err: any, decoded: any) =>{
            if(decoded)
                req.query.id = decoded.id
        }) )
        
        next()
    }
}