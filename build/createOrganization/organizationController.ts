import express from 'express'
import { IOrganization } from './interface'
import Organization from './model'
import cron from 'node-cron'
import bcrypt from "bcryptjs";
import {OrgVoters} from '../orgVoters/orgVotersController'
import sendEmails from '../utility/sendEmails'
import {genPass} from '../utility/utility'

let orgvoters = new OrgVoters()
let generator = new genPass()
export class CreateOrganization{
    constructor(){this.createOrg = this.createOrg.bind(this), this.setEmailLogic = this.setEmailLogic.bind(this), this.getOneOrg = this.getOneOrg.bind(this)}

    async createOrg(req: express.Request, res: express.Response, next: express.NextFunction){
        const url = 'https://shrouded-reef-90177.herokuapp.com'
        let data = {...req.body}
        data.id = req.query.id
        data.pic = `${url}/${req.file?.path}`
        try {
             let organa = await this.saveToDb(data)
            if(organa)
                return res.status(200).json({"message": "saved successfully" })
            
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
            let allorg = await Organization.find({id: req.query.id})

            return res.status(200).send({message:"users found", allorg})
        } catch (error) {
                next(error)
        }
    }

    async getOneOrg(req: express.Request, res: express.Response, next: express.NextFunction){
        let id = req.query.key
        try {
           let findoneOrg = await this.findOneOrgInDb(id)
           if(findoneOrg)
                return res.status(200).send({message:"users found", findoneOrg})
        } catch (error) {
            next(error)
        }
     
    }

    async findOneOrgInDb(id: any){
        try {
            let org = await Organization.findOne({_id: id})
            return org

    } catch (error) {
        throw(error)
        
    }
    }

    async updateOrg(req: express.Request, res: express.Response, next: express.NextFunction){
        const url = process.env.PORT || 'http://localhost:3000'

        if(req.file){
            req.body.pic = `${url}/${req.file?.path}`
        }
        const filter = {_id: req.query.key}
        const update = req.body;

        try {
           let updated = await Organization.findOneAndUpdate(filter, update, {
                new: true
            })

            res.status(200).send({message: "updated successfully"})
        } catch (error) {
                next(error)
        }
    }

     async deleteOrg(req: express.Request, res: express.Response, next: express.NextFunction){
         try {
            let deleted = await Organization.findByIdAndDelete({_id: req.query.delId})
            return res.status(200).json({"message":"deleted org successfully"})
        } catch (error) {
            next(error)
        }
    }


       async sendEmailAndHashpass(id: any, data: any){
            let allVoters: any = await orgvoters.getVotersFromDb(id)
            allVoters.forEach(async (voter: { password: string, _id: any })  => {
                let password = generator.generatePassword()
                voter.password = bcrypt.hashSync(password, 8)
                try {
                    await orgvoters.updateVoterFromDb(voter._id, voter)
                    await sendEmails.send(data, voter, password)
                } catch (error) {
                    throw error
                }
              
            })
        }
         setEmailLogic(req: express.Request, res: express.Response, next: express.NextFunction ){

            let datetime = req.body.startdate.split('-')
            let startime = req.body.starttime.split(':')
             let id = req.query.key

            cron.schedule(`${startime[1]} ${startime[0]} ${datetime[2]} ${datetime[1]} *`, async()=>{
                try {
                   
                    let data: any = await this.findOneOrgInDb(id)
                    
                    if(!data.startdate ){
                        await this.sendEmailAndHashpass(id, data)
                        return
                    }
                    //comparing date and time in the database
                    let datee = data.startdate.split('-')
                    let timee = data.starttime.split(':')
                    if(datee[1] === datetime[1] && datee[2] === datetime[2] && timee[0] === startime[0] && timee[1] === startime[1]){

                        await this.sendEmailAndHashpass(id, data)
                        return
                    }
                } catch (error) {
                    
                    return res.status(400).send({message: error})
                }
             
            })
            next()
    }

}