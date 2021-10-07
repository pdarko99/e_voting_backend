import express from 'express'
const router = express.Router()
import {OrgDetails} from './orgCandsController'

const org = new OrgDetails()

function candidates(){
    router.route('/')
        .get(org.getAllCandidates)
        .post(org.createCandidate)
        .delete(org.deleteCandidate)
        .put(org.updateCandiate)

    return router
}


export default candidates()