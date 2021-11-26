"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.isOperationalError = exports.returnError = exports.logErrorMiddleware = exports.logError = exports.BaseError = void 0;
var pino_1 = __importDefault(require("pino"));
var logger = (0, pino_1.default)();
var BaseError = /** @class */ (function (_super) {
    __extends(BaseError, _super);
    function BaseError(name, statusCode, isOperational, description) {
        var _newTarget = this.constructor;
        var _this = _super.call(this, name) || this;
        _this.name = name;
        _this.statusCode = statusCode;
        _this.isOperational = isOperational;
        _this.description = description;
        Object.setPrototypeOf(_this, _newTarget.prototype);
        Error.captureStackTrace(_this);
        return _this;
    }
    return BaseError;
}(Error));
exports.BaseError = BaseError;
function logError(err) {
    logger.error({ err: err });
}
exports.logError = logError;
function logErrorMiddleware(err, req, res, next) {
    logError(err);
    next(err);
}
exports.logErrorMiddleware = logErrorMiddleware;
function returnError(err, req, res, next) {
    res.status(err.statusCode || 500).send(err.message);
}
exports.returnError = returnError;
function isOperationalError(error) {
    if (error instanceof BaseError) {
        return error.isOperational;
    }
    return false;
}
exports.isOperationalError = isOperationalError;
//# sourceMappingURL=baseError.js.map