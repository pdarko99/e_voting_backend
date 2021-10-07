import express from 'express'
const router = express.Router()
import {OrgVoters} from './orgVotersController'

const org = new OrgVoters()

function voters(){
    router.route('/')
        .get(org.getAllCandidates)
        .post(org.createCandidate)
        .delete(org.deleteCandidate)
        .put(org.updateCandiate)

    return router
}


export default voters()