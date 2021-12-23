"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var router = express_1.default.Router();
var organizationController_1 = require("./organizationController");
var utility_1 = require("../utility/utility");
var createorg = new organizationController_1.CreateOrganization();
var util = new utility_1.Utility();
var upload = util.mult();
function OrgaRouter() {
    router.route('/')
        .get(util.getID, createorg.getAllOrg)
        .post(util.getID, upload.single('Image'), createorg.createOrg)
        .delete(createorg.deleteOrg);
    router.route('/id')
        .get(createorg.getOneOrg)
        .put(upload.single('Image'), createorg.updateOrg);
    router.route('/emails')
        .get(createorg.setEmailLogic);
    router.route('/getallOrgs')
        .get(createorg.getAllOrgs);
    return router;
}
exports.default = OrgaRouter();
//# sourceMappingURL=organizationRoute.js.map