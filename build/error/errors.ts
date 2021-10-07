import { BaseError } from "./baseError";
import {httpStatusCodes} from './httpStatusCodes'

class Api404Error extends BaseError{
    constructor(name: string, statusCode = httpStatusCodes.NOT_FOUND, isOperational = true, description = 'Not found' ){

        super(name, statusCode, isOperational, description)
    }
}

class ApiBadRequest extends BaseError{
    constructor(name: string, statusCode = httpStatusCodes.BAD_REQUEST, isOperational = true, description ='Bad Request' ){

        super(name, statusCode, isOperational, description)
    }
}

class ApiInternalServer extends BaseError{
    constructor(name: string, statusCode = httpStatusCodes.INTERNAL_SERVER, isOperational = true, description = 'Internal server Error' ){

        super(name, statusCode, isOperational, description)
    }
}


export {Api404Error, ApiBadRequest, ApiInternalServer}