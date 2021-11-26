"use strict";
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
exports.OrgVoters = void 0;
var votersModel_1 = __importDefault(require("./votersModel"));
var fs_1 = __importDefault(require("fs"));
var readline_1 = __importDefault(require("readline"));
var OrgVoters = /** @class */ (function () {
    function OrgVoters() {
        this.arr = [];
        this.createCandidate = this.createCandidate.bind(this);
        this.refactore = this.refactore.bind(this);
        this.updateCandiate = this.updateCandiate.bind(this);
        this.getAllCandidates = this.getAllCandidates.bind(this);
    }
    OrgVoters.prototype.createCandidate = function (req, res, next) {
        var _a;
        return __awaiter(this, void 0, void 0, function () {
            var path, id, readInterface;
            var _this = this;
            return __generator(this, function (_b) {
                path = "./uploads/" + ((_a = req.file) === null || _a === void 0 ? void 0 : _a.filename);
                id = req.query.orgId;
                try {
                    readInterface = readline_1.default.createInterface({
                        input: fs_1.default.createReadStream(path)
                    });
                    readInterface.on('line', function (line) { return __awaiter(_this, void 0, void 0, function () {
                        var a, data, voter, dud;
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0:
                                    if (!line) return [3 /*break*/, 2];
                                    a = line.split(',');
                                    if (!(a[0] !== 'firstname' && a[1] !== 'lastname' && a[2] !== 'email')) return [3 /*break*/, 2];
                                    data = this.refactore(a, id);
                                    voter = new votersModel_1.default(data);
                                    return [4 /*yield*/, voter.save()];
                                case 1:
                                    dud = _a.sent();
                                    _a.label = 2;
                                case 2: return [2 /*return*/];
                            }
                        });
                    }); });
                    return [2 /*return*/, res.status(200).send({ message: 'json' })];
                }
                catch (error) {
                    next(error);
                }
                return [2 /*return*/];
            });
        });
    };
    OrgVoters.prototype.refactore = function (a, id) {
        var obj = {
            firstname: a[0],
            lastname: a[1],
            email: a[2],
            id: id
        };
        return obj;
    };
    OrgVoters.prototype.updateCandiate = function (req, res, next) {
        return __awaiter(this, void 0, void 0, function () {
            var id, data, updatedVoter, error_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        id = req.query.voterId;
                        data = req.body;
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, this.updateVoterFromDb(id, data)];
                    case 2:
                        updatedVoter = _a.sent();
                        return [2 /*return*/, res.status(200).send({ message: 'updated successfully' })];
                    case 3:
                        error_1 = _a.sent();
                        next(error_1);
                        return [3 /*break*/, 4];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    OrgVoters.prototype.deleteCandidate = function (req, res, next) {
        return __awaiter(this, void 0, void 0, function () {
            var deleted, error_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, votersModel_1.default.findByIdAndDelete({ _id: req.query.delId })];
                    case 1:
                        deleted = _a.sent();
                        return [2 /*return*/, res.status(200).json({ "message": "deleted successfully" })];
                    case 2:
                        error_2 = _a.sent();
                        next(error_2);
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    OrgVoters.prototype.getAllCandidates = function (req, res, next) {
        return __awaiter(this, void 0, void 0, function () {
            var id, allVoters, error_3;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        id = req.query.orgId;
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, this.getVotersFromDb(id)];
                    case 2:
                        allVoters = _a.sent();
                        return [2 /*return*/, res.status(200).json({ "message": "success", allVoters: allVoters })];
                    case 3:
                        error_3 = _a.sent();
                        next(error_3);
                        return [3 /*break*/, 4];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    OrgVoters.prototype.getVotersFromDb = function (id) {
        return __awaiter(this, void 0, void 0, function () {
            var allCands, error_4;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, votersModel_1.default.find({ id: id })];
                    case 1:
                        allCands = _a.sent();
                        return [2 /*return*/, allCands];
                    case 2:
                        error_4 = _a.sent();
                        throw (error_4);
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    OrgVoters.prototype.updateVoterFromDb = function (id, data) {
        return __awaiter(this, void 0, void 0, function () {
            var filter, updated, error_5;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        filter = { _id: id };
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, votersModel_1.default.findOneAndUpdate(filter, data, {
                                new: true
                            })];
                    case 2:
                        updated = _a.sent();
                        return [3 /*break*/, 4];
                    case 3:
                        error_5 = _a.sent();
                        throw (error_5);
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    OrgVoters.prototype.addSingleVoter = function (req, res, next) {
        return __awaiter(this, void 0, void 0, function () {
            var voter, dud, error_6;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        voter = new votersModel_1.default(req.body);
                        return [4 /*yield*/, voter.save()];
                    case 1:
                        dud = _a.sent();
                        return [2 /*return*/, res.status(200).json({ "message": "added successfully" })];
                    case 2:
                        error_6 = _a.sent();
                        next(error_6);
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    return OrgVoters;
}());
exports.OrgVoters = OrgVoters;
//# sourceMappingURL=orgVotersController.js.map