import express from 'express'
import candidateModel from './candidateModel'

export class OrgDetails {
    constructor(){}

    async createCandidate(req: express.Request, res: express.Response, next: express.NextFunction){

        // req.body.id = req.query.id
        try {
            let cand = new candidateModel(req.body)
            let savedCand = await cand.save();
            return res.status(200).send({message:"candidate saved successfully"})

        } catch (error) {
            next(error)
        }
       
    }


    async updateCandiate(req: express.Request, res: express.Response, next: express.NextFunction){
        //here i need two ids one for the id to be deleted which is gonna be idDel
        //the other is gonna be added to the body to be deleted which is gonna be req.query.orgId
        // req.body.id = req.query.orgId
        req.body.id = "feefd"
        const filter = {_id: "615f2d7cf2743d086949bbc0"}
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
            let allCands = await candidateModel.find()
            return res.status(200).json({"message":"success", allCands})
        } catch (error) {
            next(error)
        }
    }
}