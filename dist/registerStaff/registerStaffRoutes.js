"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var router = express_1.default.Router();
var registerStaffController_1 = require("./registerStaffController");
var register = new registerStaffController_1.RegisterStaffController();
var utility_1 = require("../utility/utility");
var utility = new utility_1.Utility();
function RegisterRouter() {
    router.route('/')
        .post(register.registerStaff)
        .put(utility.getID, register.update)
        .get(utility.getID, register.getUser);
    return router;
}
exports.default = RegisterRouter();
//# sourceMappingURL=registerStaffRoutes.js.map