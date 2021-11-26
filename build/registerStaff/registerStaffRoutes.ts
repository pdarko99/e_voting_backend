import express from 'express';
let router = express.Router()

import {RegisterStaffController} from './registerStaffController'
let register = new RegisterStaffController()
import {Utility} from '../utility/utility'
let utility = new Utility()

function RegisterRouter(){
    router.route('/')
        .post(register.registerStaff)
        .put(utility.getID, register.update)
        .get(utility.getID, register.getUser)


    return router
}


export default RegisterRouter()