"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var registerStaffController_1 = require("./registerStaffController");
var sinon_1 = __importDefault(require("sinon"));
var chai_1 = __importDefault(require("chai"));
chai_1.default.should();
describe.skip("staff registration", function () {
    var receivedData;
    var req, res, next;
    beforeEach(function () {
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
        };
    });
    it("should format the received data into only four fields(username, password, email and lastname), and also hash the password", function () {
        var _a;
        var registerStaff = new registerStaffController_1.RegisterStaffController();
        var returnedData = registerStaff.formatData(receivedData);
        returnedData.email.should.equal("info@gmail.com");
        // returnedData.firstname.should.equal("prince");
        // returnedData.lastname.should.equal("darko");
        (_a = returnedData.password) === null || _a === void 0 ? void 0 : _a.should.not.equal("123456");
    });
    it("should call the formatData and addToDb function with their appropriate arguments also return a token", function () {
        var registerStaff = new registerStaffController_1.RegisterStaffController();
        var formatData = sinon_1.default.spy(registerStaff, "formatData");
        var addtoDb = sinon_1.default.spy(registerStaff, "addToDb");
        var gogo = __assign({ name: "eoej" }, receivedData);
        var returnedData = registerStaff.createUser(receivedData);
        formatData.calledOnceWith(receivedData).should.be.true;
        addtoDb.calledOnce.should.be.true;
        formatData.calledOnceWith(gogo).should.not.be.true;
        returnedData.should.exist;
    });
    it("should call the createUser function with the right params when registerStaff is called", function () {
        //this function doesnt run oooooooooooooo
        var registerStaff = new registerStaffController_1.RegisterStaffController();
        var createuser = sinon_1.default.spy(registerStaff, "validate");
        registerStaff.registerStaff(req, res, next);
        createuser.calledOnce.should.be.true;
    });
    it("DO NOTHING", function () {
        //this function doesnt run oooooooooooooo
        var registerStaff = new registerStaffController_1.RegisterStaffController();
        var addtodb = sinon_1.default.spy(registerStaff, "addToDb");
        req.body.email = 'prince@gmail.com';
        registerStaff.registerStaff(req, res, next);
        addtodb.calledOnce.should.be.true;
        // done()
    });
});
//# sourceMappingURL=registerStaff.spec.js.map