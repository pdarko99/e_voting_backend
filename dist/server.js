"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.app = void 0;
var express_1 = __importDefault(require("express"));
var cors_1 = __importDefault(require("cors"));
var registerStaffRoutes_1 = __importDefault(require("./registerStaff/registerStaffRoutes"));
var loginStaffRoute_1 = __importDefault(require("./loginStaff/loginStaffRoute"));
var organizationRoute_1 = __importDefault(require("./createOrganization/organizationRoute"));
var orgCandsRoutes_1 = __importDefault(require("./orgnizationCands/orgCandsRoutes"));
var orgVotersRoutes_1 = __importDefault(require("./orgVoters/orgVotersRoutes"));
var app = (0, express_1.default)();
exports.app = app;
app.use(express_1.default.json());
app.use('/uploads', express_1.default.static('uploads'));
app.use((0, cors_1.default)());
app.use('/registerStaff', registerStaffRoutes_1.default);
app.use('/loginStaff', loginStaffRoute_1.default);
app.use('/Organization', organizationRoute_1.default);
app.use('/candidates', orgCandsRoutes_1.default);
app.use('/voters', orgVotersRoutes_1.default);
//# sourceMappingURL=server.js.map