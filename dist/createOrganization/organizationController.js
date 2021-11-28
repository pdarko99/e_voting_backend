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
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateOrganization = void 0;
var model_1 = __importDefault(require("./model"));
var bcryptjs_1 = __importDefault(require("bcryptjs"));
var orgVotersController_1 = require("../orgVoters/orgVotersController");
var sendEmails_1 = __importDefault(require("../utility/sendEmails"));
var utility_1 = require("../utility/utility");
var orgvoters = new orgVotersController_1.OrgVoters();
var generator = new utility_1.genPass();
var CreateOrganization = /** @class */ (function () {
    function CreateOrganization() {
        this.createOrg = this.createOrg.bind(this), this.setEmailLogic = this.setEmailLogic.bind(this), this.getOneOrg = this.getOneOrg.bind(this);
    }
    CreateOrganization.prototype.createOrg = function (req, res, next) {
        var _a;
        return __awaiter(this, void 0, void 0, function () {
            var url, data, organa, error_1;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        url = 'https://shrouded-reef-90177.herokuapp.com';
                        data = __assign({}, req.body);
                        data.id = req.query.id;
                        data.pic = url + "/" + ((_a = req.file) === null || _a === void 0 ? void 0 : _a.path);
                        _b.label = 1;
                    case 1:
                        _b.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, this.saveToDb(data)];
                    case 2:
                        organa = _b.sent();
                        if (organa)
                            return [2 /*return*/, res.status(200).json({ "message": "saved successfully" })];
                        return [3 /*break*/, 4];
                    case 3:
                        error_1 = _b.sent();
                        next(error_1);
                        return [3 /*break*/, 4];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    CreateOrganization.prototype.saveToDb = function (data) {
        return __awaiter(this, void 0, void 0, function () {
            var organa, saved, error_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        organa = new model_1.default(data);
                        return [4 /*yield*/, organa.save()];
                    case 1:
                        saved = _a.sent();
                        return [2 /*return*/, true];
                    case 2:
                        error_2 = _a.sent();
                        throw error_2;
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    CreateOrganization.prototype.getAllOrg = function (req, res, next) {
        return __awaiter(this, void 0, void 0, function () {
            var allorg, error_3;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, model_1.default.find({ id: req.query.id })];
                    case 1:
                        allorg = _a.sent();
                        return [2 /*return*/, res.status(200).send({ message: "users found", allorg: allorg })];
                    case 2:
                        error_3 = _a.sent();
                        next(error_3);
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    CreateOrganization.prototype.getOneOrg = function (req, res, next) {
        return __awaiter(this, void 0, void 0, function () {
            var id, findoneOrg, error_4;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        id = req.query.key;
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, this.findOneOrgInDb(id)];
                    case 2:
                        findoneOrg = _a.sent();
                        if (findoneOrg)
                            return [2 /*return*/, res.status(200).send({ message: "users found", findoneOrg: findoneOrg })];
                        return [3 /*break*/, 4];
                    case 3:
                        error_4 = _a.sent();
                        next(error_4);
                        return [3 /*break*/, 4];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    CreateOrganization.prototype.findOneOrgInDb = function (id) {
        return __awaiter(this, void 0, void 0, function () {
            var org, error_5;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, model_1.default.findOne({ _id: id })];
                    case 1:
                        org = _a.sent();
                        return [2 /*return*/, org];
                    case 2:
                        error_5 = _a.sent();
                        throw (error_5);
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    CreateOrganization.prototype.updateOrg = function (req, res, next) {
        var _a;
        return __awaiter(this, void 0, void 0, function () {
            var url, filter, update, updated, error_6;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        url = process.env.PORT || 'http://localhost:3000';
                        if (req.file) {
                            req.body.pic = url + "/" + ((_a = req.file) === null || _a === void 0 ? void 0 : _a.path);
                        }
                        filter = { _id: req.query.key };
                        update = req.body;
                        _b.label = 1;
                    case 1:
                        _b.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, model_1.default.findOneAndUpdate(filter, update, {
                                new: true
                            })];
                    case 2:
                        updated = _b.sent();
                        res.status(200).send({ message: "updated successfully" });
                        return [3 /*break*/, 4];
                    case 3:
                        error_6 = _b.sent();
                        next(error_6);
                        return [3 /*break*/, 4];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    CreateOrganization.prototype.deleteOrg = function (req, res, next) {
        return __awaiter(this, void 0, void 0, function () {
            var deleted, error_7;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, model_1.default.findByIdAndDelete({ _id: req.query.delId })];
                    case 1:
                        deleted = _a.sent();
                        return [2 /*return*/, res.status(200).json({ "message": "deleted org successfully" })];
                    case 2:
                        error_7 = _a.sent();
                        next(error_7);
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    CreateOrganization.prototype.sendEmailAndHashpass = function (id, data) {
        return __awaiter(this, void 0, void 0, function () {
            var res, allVoters;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, orgvoters.getVotersFromDb(id)];
                    case 1:
                        allVoters = _a.sent();
                        allVoters.forEach(function (voter) { return __awaiter(_this, void 0, void 0, function () {
                            var password, error_8;
                            return __generator(this, function (_a) {
                                switch (_a.label) {
                                    case 0:
                                        password = generator.generatePassword();
                                        voter.password = bcryptjs_1.default.hashSync(password, 8);
                                        _a.label = 1;
                                    case 1:
                                        _a.trys.push([1, 4, , 5]);
                                        return [4 /*yield*/, orgvoters.updateVoterFromDb(voter._id, voter)];
                                    case 2:
                                        _a.sent();
                                        return [4 /*yield*/, sendEmails_1.default.send(data, voter, password)];
                                    case 3:
                                        res = _a.sent();
                                        return [3 /*break*/, 5];
                                    case 4:
                                        error_8 = _a.sent();
                                        throw error_8;
                                    case 5: return [2 /*return*/];
                                }
                            });
                        }); });
                        return [2 /*return*/, res];
                }
            });
        });
    };
    CreateOrganization.prototype.setEmailLogic = function (req, res, next) {
        return __awaiter(this, void 0, void 0, function () {
            var id, data, response, error_9;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        id = req.query.key;
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 4, , 5]);
                        return [4 /*yield*/, this.findOneOrgInDb(id)];
                    case 2:
                        data = _a.sent();
                        return [4 /*yield*/, this.sendEmailAndHashpass(id, data)];
                    case 3:
                        response = _a.sent();
                        return [2 /*return*/, res.status(200).send({ message: 'emails sent successfully :)', response: response })
                            // if(!data.startdate ){
                            //     return
                            // }
                            // //comparing date and time in the database
                            // let datee = data.startdate.split('-')
                            // let timee = data.starttime.split(':')
                            // if(datee[1] === datetime[1] && datee[2] === datetime[2] && timee[0] === startime[0] && timee[1] === startime[1]){
                            //     await this.sendEmailAndHashpass(id, data)
                            //     return
                            // }
                        ];
                    case 4:
                        error_9 = _a.sent();
                        return [2 /*return*/, res.status(400).send({ message: error_9 })];
                    case 5: return [2 /*return*/];
                }
            });
        });
    };
    return CreateOrganization;
}());
exports.CreateOrganization = CreateOrganization;
//# sourceMappingURL=organizationController.js.map