import express from 'express'
import pino from 'pino';
const logger = pino()



export class BaseError extends Error {
    constructor(public name: string, public statusCode: number, public isOperational: boolean,public description:string){
        super(name)

        Object.setPrototypeOf(this, new.target.prototype)
        Error.captureStackTrace(this)
    }
}

export function logError(err: any){
    logger.error({err: err})
}

export function logErrorMiddleware (err: any, req: express.Request, res: express.Response, next: any){
    logError(err)
    next(err)
}


export function returnError(err: any, req: express.Request, res: express.Response, next: any){
    res.status(err.statusCode || 500).send(err.message)
}


export function isOperationalError(error: any){
    if(error instanceof BaseError){
        return error.isOperational
    }

    return false
}