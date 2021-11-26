"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var sinon_1 = __importDefault(require("sinon"));
var chai_1 = __importDefault(require("chai"));
chai_1.default.should();
var loginStaffController_1 = require("./loginStaffController");
describe("login staff", function () {
    var req, res, next;
    beforeEach(function () {
        return req = {
            body: {
                email: "prince@gmail.com",
                password: "heyaaaa",
            },
        };
    });
    it("should call the checkDb function with the right parameters when login User func is called", function () {
        //this test doesnt run oo
        var loginStaff = new loginStaffController_1.LoginStaff();
        var spy = sinon_1.default.spy(loginStaff, "checkDb");
        loginStaff.loginUser(req, res, next);
        spy.calledOnce.should.be.true;
    });
});
//# sourceMappingURL=loginStaff.spec.js.map