"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var router = express_1.default.Router();
var orgVotersController_1 = require("./orgVotersController");
var utility_1 = require("../utility/utility");
var org = new orgVotersController_1.OrgVoters();
var util = new utility_1.Utility();
var upload = util.filemult();
function voters() {
    router.route('/')
        .get(org.getAllCandidates)
        .post(upload.single('file'), org.createCandidate)
        .delete(org.deleteCandidate)
        .put(org.updateCandiate);
    router.route('/single')
        .post(org.addSingleVoter);
    return router;
}
exports.default = voters();
//# sourceMappingURL=orgVotersRoutes.js.map