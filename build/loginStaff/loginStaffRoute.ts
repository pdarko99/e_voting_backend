import express from "express";
import { LoginStaff } from "./loginStaffController";
let router = express.Router();
let loginStaff = new LoginStaff();

function loginRouter() {
  router.route("/")
     .post(loginStaff.loginUser);

  return router;
}

export default loginRouter();
