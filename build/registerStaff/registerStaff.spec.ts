import { RegisterStaffController } from "./registerStaffController";
import sinon from "sinon";
import chai from "chai";
import { Iformat } from "./interface";
chai.should();

describe.skip("staff registration", function () {
  let receivedData: Iformat;
  let req: any,
      res: any,
      next: any
  beforeEach(() => {
    receivedData = {
      // firstname: "prince",
      // lastname: "darko",
      fullname: 'peinxw',
      email: "info@gmail.com",
      password: "123456",

    };
    req = {
      body: {
          email: 'prince',
          password: 'heyaaaa',
          confirmpassword: 'heyaaaa',
          firstname: 'rpince',
          lastname: 'darko'
      }
  }
  });

  it("should format the received data into only four fields(username, password, email and lastname), and also hash the password", function () {
    let registerStaff = new RegisterStaffController();

    let returnedData = registerStaff.formatData(receivedData);

    returnedData.email.should.equal("info@gmail.com");
    // returnedData.firstname.should.equal("prince");
    // returnedData.lastname.should.equal("darko");
    returnedData.password?.should.not.equal("123456");
  });

  it("should call the formatData and addToDb function with their appropriate arguments also return a token", function () {
    let registerStaff = new RegisterStaffController();
    let formatData = sinon.spy(registerStaff, "formatData");
    let addtoDb = sinon.spy(registerStaff, "addToDb");
    let gogo = { name: "eoej", ...receivedData };
    let returnedData = registerStaff.createUser(receivedData);

    formatData.calledOnceWith(receivedData).should.be.true;
    addtoDb.calledOnce.should.be.true;
    formatData.calledOnceWith(gogo).should.not.be.true;

    returnedData.should.exist;
  });

  it("should call the createUser function with the right params when registerStaff is called", function(){

    //this function doesnt run oooooooooooooo
      let registerStaff = new RegisterStaffController();
      let createuser = sinon.spy(registerStaff, "validate");

       registerStaff.registerStaff(req, res, next)
      createuser.calledOnce.should.be.true
     

      
  });

  it("DO NOTHING", function(){

    //this function doesnt run oooooooooooooo
      let registerStaff = new RegisterStaffController();
      let addtodb = sinon.spy(registerStaff, "addToDb");

      req.body.email = 'prince@gmail.com'
       registerStaff.registerStaff(req, res, next)
      addtodb.calledOnce.should.be.true
      // done()

      
  });
});
