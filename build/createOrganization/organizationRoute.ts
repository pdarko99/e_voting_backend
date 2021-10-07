import express from 'express'
let router = express.Router()
import {CreateOrganization} from './organizationController'
import {Utility} from '../utility/utility'

let createorg = new CreateOrganization()
let util = new Utility()


function OrgaRouter() {
    router.route('/')
        .get(createorg.getAllOrg)
        .post(
            // util.getID, 
            createorg.createOrg)
    router.route('/id')
        .get(createorg.getOneOrg)

    return router
}


export default OrgaRouter()