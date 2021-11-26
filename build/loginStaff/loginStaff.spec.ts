import sinon from "sinon";
import chai from "chai";
chai.should();
import { LoginStaff } from "./loginStaffController";

describe("login staff", function () {
  let req: any, res: any, next: any;
  beforeEach(() => 
        req = {
          body: {
            email: "prince@gmail.com",
            password: "heyaaaa",
          },
      }
  );

  it("should call the checkDb function with the right parameters when login User func is called", function () {
    //this test doesnt run oo
    let loginStaff = new LoginStaff();
    let spy = sinon.spy(loginStaff, "checkDb");

    loginStaff.loginUser(req, res, next);

    spy.calledOnce.should.be.true;
  });
});
