import express from 'express'
import { IOrganization } from './interface'
import Organization from './model'
export class CreateOrganization{
    constructor(){this.createOrg = this.createOrg.bind(this)}

    async createOrg(req: express.Request, res: express.Response, next: express.NextFunction){
        let data = {...req.body}

        //add logged in user's id to the data before saving
        // data.id = req.query.id
        try {
             let organa = await this.saveToDb(data)
            if(organa)
                return res.status(200).json({"message": "saved successfully", })
            
        } catch (error) {
            next(error)
        }
        
    }

    async saveToDb(data: IOrganization){
        try {
            let organa =  new Organization(data)
            let saved = await organa.save()
            return true


        } catch (error) {
            throw error
        }
    }

    async getAllOrg(req: express.Request, res: express.Response, next: express.NextFunction){
        try {
            let allorg = await Organization.find()
            return res.status(200).send({message:"users found", allorg})
        } catch (error) {
                next(error)
        }
    }

    async getOneOrg(req: express.Request, res: express.Response, next: express.NextFunction){
        try {
                // for the mean time
                let id = "615f1fd5bdc9f10a66b04707"
                let org = await Organization.findOne({_id: id})
                return res.status(200).send({message:"users found", org})

        } catch (error) {
            next(error)
            
        }
    }

   
}