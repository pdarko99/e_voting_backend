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
Object.defineProperty(exports, "__esModule", { value: true });
exports.ApiInternalServer = exports.ApiBadRequest = exports.Api404Error = void 0;
var baseError_1 = require("./baseError");
var httpStatusCodes_1 = require("./httpStatusCodes");
var Api404Error = /** @class */ (function (_super) {
    __extends(Api404Error, _super);
    function Api404Error(name, statusCode, isOperational, description) {
        if (statusCode === void 0) { statusCode = httpStatusCodes_1.httpStatusCodes.NOT_FOUND; }
        if (isOperational === void 0) { isOperational = true; }
        if (description === void 0) { description = 'Not found'; }
        return _super.call(this, name, statusCode, isOperational, description) || this;
    }
    return Api404Error;
}(baseError_1.BaseError));
exports.Api404Error = Api404Error;
var ApiBadRequest = /** @class */ (function (_super) {
    __extends(ApiBadRequest, _super);
    function ApiBadRequest(name, statusCode, isOperational, description) {
        if (statusCode === void 0) { statusCode = httpStatusCodes_1.httpStatusCodes.BAD_REQUEST; }
        if (isOperational === void 0) { isOperational = true; }
        if (description === void 0) { description = 'Bad Request'; }
        return _super.call(this, name, statusCode, isOperational, description) || this;
    }
    return ApiBadRequest;
}(baseError_1.BaseError));
exports.ApiBadRequest = ApiBadRequest;
var ApiInternalServer = /** @class */ (function (_super) {
    __extends(ApiInternalServer, _super);
    function ApiInternalServer(name, statusCode, isOperational, description) {
        if (statusCode === void 0) { statusCode = httpStatusCodes_1.httpStatusCodes.INTERNAL_SERVER; }
        if (isOperational === void 0) { isOperational = true; }
        if (description === void 0) { description = 'Internal server Error'; }
        return _super.call(this, name, statusCode, isOperational, description) || this;
    }
    return ApiInternalServer;
}(baseError_1.BaseError));
exports.ApiInternalServer = ApiInternalServer;
//# sourceMappingURL=errors.js.map