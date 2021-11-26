"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var router = express_1.default.Router();
var orgCandsController_1 = require("./orgCandsController");
var utility_1 = require("../utility/utility");
var org = new orgCandsController_1.OrgDetails();
var util = new utility_1.Utility();
var upload = util.mult();
function candidates() {
    router.route('/')
        .get(org.getAllCandidates)
        .post(upload.single('Image'), org.createCandidate)
        .delete(org.deleteCandidate)
        .put(upload.single('Image'), org.updateCandiate);
    return router;
}
exports.default = candidates();
//# sourceMappingURL=orgCandsRoutes.js.map