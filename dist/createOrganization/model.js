"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = __importDefault(require("mongoose"));
var Schema = mongoose_1.default.Schema;
var Organization = new Schema({
    name: { type: String, required: true },
    id: { type: String, required: true },
    pic: { type: String, required: true },
    description: { type: String, required: true },
    startdate: { type: String },
    starttime: { type: String },
    endtime: { type: String }
});
exports.default = mongoose_1.default.model('orgaDetails', Organization);
//# sourceMappingURL=model.js.map