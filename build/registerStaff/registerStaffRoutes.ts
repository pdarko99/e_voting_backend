import express from 'express';
let router = express.Router()

import {RegisterStaffController} from './registerStaffController'
let register = new RegisterStaffController()


function RegisterRouter(){
    router.route('/')
        .post(register.registerStaff)


    return router
}


export default RegisterRouter()