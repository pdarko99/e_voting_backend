"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var loginStaffController_1 = require("./loginStaffController");
var router = express_1.default.Router();
var loginStaff = new loginStaffController_1.LoginStaff();
function loginRouter() {
    router.route("/")
        .post(loginStaff.loginUser);
    return router;
}
exports.default = loginRouter();
//# sourceMappingURL=loginStaffRoute.js.map