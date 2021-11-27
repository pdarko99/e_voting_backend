"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = __importDefault(require("mongoose"));
var baseError_1 = require("./error/baseError");
var server_1 = require("./server");
// const url = process.env.URL! ||  'mongodb://localhost/evotes'
var url = 'mongodb://localhost/evotes';
// const PORT = process.env.PORT || 3000
var PORT = 3000;
mongoose_1.default.connect(url).then(function (data) {
    console.log('we connected to database');
});
server_1.app.use(baseError_1.logError);
server_1.app.use(baseError_1.returnError);
process.on('unhandledRejection', function (err) {
    throw err;
});
process.on('uncaughtException', function (err) {
    (0, baseError_1.logError)(err);
    if (!(0, baseError_1.isOperationalError)(err)) {
        process.exit(1);
    }
});
server_1.app.listen(PORT, function () { return console.log('we connected'); });
//# sourceMappingURL=app.js.map