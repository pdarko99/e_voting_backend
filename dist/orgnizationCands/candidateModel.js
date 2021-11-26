"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = __importDefault(require("mongoose"));
var Schema = mongoose_1.default.Schema;
var candidateModel = new Schema({
    firstname: { type: String, required: true },
    lastname: { type: String, required: true },
    pic: { type: String },
    position: { type: String, required: true },
    id: { type: String, required: true }
});
exports.default = mongoose_1.default.model('candidates', candidateModel);
//# sourceMappingURL=candidateModel.js.map