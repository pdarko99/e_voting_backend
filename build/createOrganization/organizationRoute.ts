import express from 'express'
let router = express.Router()
import {CreateOrganization} from './organizationController'
import {Utility} from '../utility/utility'

let createorg = new CreateOrganization()
let util = new Utility()



const upload = util.mult()
function OrgaRouter() {
    router.route('/')
        .get(
            util.getID, 
            createorg.getAllOrg)
        .post(
            util.getID, upload.single('Image'),
            createorg.createOrg)
        .delete(
            createorg.deleteOrg
        )
    router.route('/id')
        .get(createorg.getOneOrg)
        .put(upload.single('Image'),createorg.setEmailLogic, createorg.updateOrg)
       

    return router
}


export default OrgaRouter()