import express from "express";
import joi from "joi";
import { ApiBadRequest, ApiInternalServer } from "../error/errors";
import { Iformat, IRegister } from "./interface";
import registerStaffModel from "./model";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
require("dotenv").config(); 

export class RegisterStaffController {
  secret = process.env.SECRET!;
  constructor() {
    this.registerStaff = this.registerStaff.bind(this);
    this.createUser = this.createUser.bind(this);
  }

  async registerStaff(req: express.Request, res: express.Response, next: express.NextFunction) {
    let data = { ...req.body };

    let validData = this.validate(data);
    if (validData.error) {
      throw new ApiBadRequest(validData.error?.details[0].message);
    }
    try {

      let token = await this.createUser(data);
      if (token)
        return res
          .status(200)
          .json({ message: "registered successfully", token });
      
    } catch (error) {
      next(error)
    }
  
  }

  async createUser(data: Iformat) {
    this.validate(data)
    let formatedData = this.formatData(data);
    let token = await this.addToDb(formatedData);
    return token;
  }

  async addToDb(data: IRegister) {
    try {
      let user = new registerStaffModel(data);
      let User = await user.save();
      let token = jwt.sign({ id: User._id }, this.secret);
      
      return token;
    } catch (error) {
      throw error
    }
  }

  validate(data: Iformat): any {
    const schema = joi.object({
      fullname: joi.string().required(),
      email: joi.string().required().email(),
      password: joi.string().min(6).required(),
   
    });

    let validData = schema.validate(data);

    return validData;
  }

  formatData(data: Iformat): IRegister {
    return {
      fullname: data.fullname,
      email: data.email,
      password: bcrypt.hashSync(data.password!, 8),
    };
  }

  async update(req: express.Request, res: express.Response, next: express.NextFunction){
    let id = req.query.id
    let data = req.body
    if(data.password){
      data.password = bcrypt.hashSync(data.password, 8)
    }
    const filter = {_id:id}

    try {
      let updated = await registerStaffModel.findOneAndUpdate(filter, data, {
           new: true
       })
       return res.status(200).send({message: 'updated successfully'})

   } catch (error) {
           throw(error)
   }
  }

  async getUser(req: express.Request, res: express.Response, next: express.NextFunction){
    let id = req.query.id
    try {
      let org = await registerStaffModel.findOne({_id: id})
      return res.status(200).send(org)

} catch (error) {
  next(error)
  
}
  }
}
