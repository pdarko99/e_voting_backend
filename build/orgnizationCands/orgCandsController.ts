import express from 'express'
import candidateModel from './candidateModel'

export class OrgDetails {
    constructor(){}

    async createCandidate(req: express.Request, res: express.Response, next: express.NextFunction){
        const url = process.env.PORT || 'http://localhost:3000'

        // req.body.id = req.query.id
        if(req.file){
            req.body.pic = `${url}/${req.file?.path}`
        }
        let data = {...req.body}
        
        try {
            let cand = new candidateModel(data)
            let savedCand = await cand.save();
            return res.status(200).send({message:"candidate saved successfully"})

        } catch (error) {
            next(error)
        }
       
    }


    async updateCandiate(req: express.Request, res: express.Response, next: express.NextFunction){
        const url = process.env.PORT || 'http://localhost:3000'
        
        const filter = {_id: req.query.id}
        if(req.file){
            req.body.pic = `${url}/${req.file?.path}`
        }
        // const filter = {_id: req.query.idDel}
        const update = req.body
        try {
            let updatedData = await candidateModel.findOneAndUpdate(filter, update, {new: true})
            return res.status(200).send({ message: 'updated successfully'})
        } catch (error) {
            next(error)
        }
        
    }

    async deleteCandidate(req: express.Request, res: express.Response, next: express.NextFunction){
        //here the id to be deleted would be pass in the query as delId
        try {
            let deleted = await candidateModel.findByIdAndDelete({_id: req.query.delId})
            return res.status(200).json({"message":"deleted successfully"})
        } catch (error) {
            next(error)
        }

    }

    async getAllCandidates(req: express.Request, res: express.Response, next: express.NextFunction){
        try {
            let id = req.query.orgId
            let allCands = await candidateModel.find({id: id})
            return res.status(200).json({"message":"success", allCands})
        } catch (error) {
            next(error)
        }
    }
}