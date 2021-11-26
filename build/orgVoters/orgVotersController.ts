import express from 'express'
import votersModel from './votersModel'
import { readFileSync } from 'fs'
import fs from 'fs'
import readline from 'readline'
import { IVoters } from './interface'

export class OrgVoters {
    arr: IVoters[] = []
    constructor(){ this.createCandidate = this.createCandidate.bind(this); this.refactore = this.refactore.bind(this); this.updateCandiate = this.updateCandiate.bind(this); this.getAllCandidates = this.getAllCandidates.bind(this)}
    async createCandidate(req: express.Request, res: express.Response, next: express.NextFunction){

       
        const path = `./uploads/${req.file?.filename}`
        const id = req.query.orgId
        try {
            const readInterface = readline.createInterface({
                input: fs.createReadStream(path)
            })

             readInterface.on('line', async(line) =>{
                if(line){
                   const a = line.split(',') 
                   if(a[0] !== 'firstname' && a[1] !== 'lastname' && a[2] !== 'email'){
                       let data = this.refactore(a, id)
                         let voter = new votersModel(data)
                         let dud = await voter.save()
                   }

                }
            })
                return res.status(200).send({message:'json'})
        } catch (error) {
            next(error)
            
        }
        
       
    }

    refactore(a: any, id: any){
        let obj = {
            firstname: a[0],
            lastname: a[1],
            email: a[2],
            id
        }

       return obj

    }


    async updateCandiate(req: express.Request, res: express.Response, next: express.NextFunction){
        
        let id = req.query.voterId
        let data = req.body
        try {
            let updatedVoter = await this.updateVoterFromDb(id, data);
            return res.status(200).send({ message: 'updated successfully'})

        } catch (error) {
            next(error)
        }

        
    }

    async deleteCandidate(req: express.Request, res: express.Response, next: express.NextFunction){
        try {
            let deleted = await votersModel.findByIdAndDelete({_id: req.query.delId})
            return res.status(200).json({"message":"deleted successfully"})
        } catch (error) {
            next(error)
        }

    }

    async getAllCandidates(req: express.Request, res: express.Response, next: express.NextFunction){
      let id = req.query.orgId
      try {
        let allVoters = await this.getVotersFromDb(id)
        return res.status(200).json({"message":"success", allVoters})
      } catch (error) {
          next(error)
      }
      
    }

   async getVotersFromDb(id: any){
        try {
            let allCands = await votersModel.find({id})
            return allCands
        } catch (error) {
            throw(error)
        }
    }

    async updateVoterFromDb(id: any, data: any){
        const filter = {_id:id}
        try {
            let updated = await votersModel.findOneAndUpdate(filter, data, {
                 new: true
             })
 
         } catch (error) {
                 throw(error)
         }
    }

    async addSingleVoter(req: express.Request, res:express.Response, next:express.NextFunction){
        try{
            let voter = new votersModel(req.body)
                let dud = await voter.save()
            return res.status(200).json({"message":"added successfully"})

        }catch(error){
            next(error)
        }
    }
}