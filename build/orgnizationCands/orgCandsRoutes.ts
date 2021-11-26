import express from 'express'
const router = express.Router()
import {OrgDetails} from './orgCandsController'
import {Utility} from '../utility/utility'

const org = new OrgDetails()
let util = new Utility()
const upload = util.mult()

function candidates(){
    router.route('/')
        .get(org.getAllCandidates)
        .post(upload.single('Image'), org.createCandidate)
        .delete(org.deleteCandidate)
        .put(upload.single('Image'),org.updateCandiate)

    return router
}


export default candidates()