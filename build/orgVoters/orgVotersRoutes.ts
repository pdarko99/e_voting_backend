import express from 'express'
const router = express.Router()
import {OrgVoters} from './orgVotersController'
import {Utility} from '../utility/utility'

const org = new OrgVoters()
let util = new Utility()
const upload = util.filemult()

function voters(){
    router.route('/')
        .get(org.getAllCandidates)
        .post(upload.single('file'),org.createCandidate)
        .delete(org.deleteCandidate)
        .put(org.updateCandiate)
    router.route('/single')
        .post(org.addSingleVoter)

    return router
}


export default voters()