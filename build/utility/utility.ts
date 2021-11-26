import express from 'express'
import jwt from 'jsonwebtoken'
import {Api404Error} from '../error/errors'
require("dotenv").config();
 import {ApiBadRequest} from '../error/errors'
 import {} from '../error/errors'
import multer from 'multer'





export class Utility {
    secret = process.env.SECRET!;

    constructor(){
        this.getID = this.getID.bind(this)
    }


    getID(req: express.Request, res: express.Response, next: express.NextFunction){
        if(!req.header('Authorization'))
            throw new Api404Error('no user logged in')

        let token = req.header('Authorization')!.split(' ')[1]
        jwt.verify(token, this.secret, ((err: any, decoded: any) =>{
            if(decoded)
                req.query.id = decoded.id
        }) )
        
        next()
    }

    storage(){
        const storage = multer.diskStorage({
            destination: function(req, file, cb){
                cb(null, 'uploads/')
            },
            filename: function(req, file, cb){
                cb(null, new Date() .toISOString().replace(/:/g, '-') + file.originalname)
            }
        })

        return storage
    }

    fillterby(){
        const fileFilter = (req: any, file: any, cb: any) => {
            if(file.mimetype === 'image/jpeg' || file.mimetype === 'image/png'){
                cb(null, true)
            }else{
                //we throw new Error(" here");
                cb(null, false);
                throw new ApiBadRequest('file type not supported')
            }
    }

    return fileFilter
    }

    filefilterby(){
        const fileFilter = (req: any, file: any, cb: any) => {
            if(file.mimetype === 'text/plain' ){
                cb(null, true)
            }else{
                //we throw new Error(" here");
                
                cb(null , false);
                throw new ApiBadRequest('file type not supported')

            }
    }

    return fileFilter
    }

    mult(){
        let storage = this.storage()
        let fileFilter = this.fillterby()
        const upload = multer({storage, limits: {
                fileSize: 1024*1024 * 5,
            },
            fileFilter
            })


        return upload
    }

    filemult(){
        let storage = this.storage()
        let fileFilter = this.filefilterby()
        const upload = multer({storage, limits: {
                fileSize: 1024*1024 * 5,
            },
            fileFilter
            })


        return upload
    }


  
}


export class genPass{
    constructor(){}

    generatePassword(): string{
        let returnedStr = ''
        let allLower = ['a', 'b', 'c', 'd', 'e', 'f']
        let allCaps = ['G', 'Z', 'B', 'H', 'U', 'P']
        let nums = [9,5,6,3,6,7]
        let syms = ['$', '%', '=', '#', '!', '&']
        while(returnedStr.length < 8){
            let index =  Math.floor(Math.random()*6)
            returnedStr += allLower[index]
            returnedStr += allCaps[index]
            returnedStr += nums[index]
            returnedStr += syms[index]
        }
        return returnedStr
    }
}