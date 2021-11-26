import express from "express";
import { Api404Error } from "../error/errors";
import registerStaffModel from "../registerStaff/model";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { Ilogin } from "./loginStaffInterface";
require("dotenv").config();

export class LoginStaff {
  secret = process.env.SECRET!;
  constructor() {
    this.loginUser = this.loginUser.bind(this);
  }

  async loginUser(
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) {
    const data = { ...req.body };
    try {
      let token = await this.checkDb(data);
      if (token.token) return res.status(200).send({ message: "successful", token: token.token, fullname: token.fullname });
    } catch (error) {
      next(error);
    }
  }

  async checkDb(data: Ilogin) {
    try {
      let loginUser: any = await registerStaffModel.findOne({
        email: data.email,
      });
      if (!loginUser) throw new Api404Error("no such user in our database");
      let validPassword = await bcrypt.compare(
        data.password,
        loginUser.password
      );

      if (!validPassword) throw new Api404Error("incorrect password");

      let token = jwt.sign({ id: loginUser._id }, this.secret);
      let user = {
        token,
        fullname: loginUser.fullname
      }
      return user;
    } catch (error) {
      throw error;
    }
  }
  
}
