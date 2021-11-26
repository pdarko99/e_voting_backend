"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.genPass = exports.Utility = void 0;
var jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
var errors_1 = require("../error/errors");
require("dotenv").config();
var errors_2 = require("../error/errors");
var multer_1 = __importDefault(require("multer"));
var Utility = /** @class */ (function () {
    function Utility() {
        this.secret = process.env.SECRET;
        this.getID = this.getID.bind(this);
    }
    Utility.prototype.getID = function (req, res, next) {
        if (!req.header('Authorization'))
            throw new errors_1.Api404Error('no user logged in');
        var token = req.header('Authorization').split(' ')[1];
        jsonwebtoken_1.default.verify(token, this.secret, (function (err, decoded) {
            if (decoded)
                req.query.id = decoded.id;
        }));
        next();
    };
    Utility.prototype.storage = function () {
        var storage = multer_1.default.diskStorage({
            destination: function (req, file, cb) {
                cb(null, 'uploads/');
            },
            filename: function (req, file, cb) {
                cb(null, new Date().toISOString().replace(/:/g, '-') + file.originalname);
            }
        });
        return storage;
    };
    Utility.prototype.fillterby = function () {
        var fileFilter = function (req, file, cb) {
            if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
                cb(null, true);
            }
            else {
                //we throw new Error(" here");
                cb(null, false);
                throw new errors_2.ApiBadRequest('file type not supported');
            }
        };
        return fileFilter;
    };
    Utility.prototype.filefilterby = function () {
        var fileFilter = function (req, file, cb) {
            if (file.mimetype === 'text/plain') {
                cb(null, true);
            }
            else {
                //we throw new Error(" here");
                cb(null, false);
                throw new errors_2.ApiBadRequest('file type not supported');
            }
        };
        return fileFilter;
    };
    Utility.prototype.mult = function () {
        var storage = this.storage();
        var fileFilter = this.fillterby();
        var upload = (0, multer_1.default)({ storage: storage, limits: {
                fileSize: 1024 * 1024 * 5,
            }, fileFilter: fileFilter
        });
        return upload;
    };
    Utility.prototype.filemult = function () {
        var storage = this.storage();
        var fileFilter = this.filefilterby();
        var upload = (0, multer_1.default)({ storage: storage, limits: {
                fileSize: 1024 * 1024 * 5,
            }, fileFilter: fileFilter
        });
        return upload;
    };
    return Utility;
}());
exports.Utility = Utility;
var genPass = /** @class */ (function () {
    function genPass() {
    }
    genPass.prototype.generatePassword = function () {
        var returnedStr = '';
        var allLower = ['a', 'b', 'c', 'd', 'e', 'f'];
        var allCaps = ['G', 'Z', 'B', 'H', 'U', 'P'];
        var nums = [9, 5, 6, 3, 6, 7];
        var syms = ['$', '%', '=', '#', '!', '&'];
        while (returnedStr.length < 8) {
            var index = Math.floor(Math.random() * 6);
            returnedStr += allLower[index];
            returnedStr += allCaps[index];
            returnedStr += nums[index];
            returnedStr += syms[index];
        }
        return returnedStr;
    };
    return genPass;
}());
exports.genPass = genPass;
//# sourceMappingURL=utility.js.map