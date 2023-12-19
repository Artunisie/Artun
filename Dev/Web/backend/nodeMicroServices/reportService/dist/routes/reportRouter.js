"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// reportRoutes.ts
const express_1 = __importDefault(require("express"));
const reportController_1 = __importDefault(require("../controllers/reportController"));
// Create a router instance
const reportRouter = express_1.default.Router();
// Define routes
reportRouter.get('/', reportController_1.default.getAllReports);
reportRouter.post('/', reportController_1.default.addReport);
// Export the router to be used in other files
exports.default = reportRouter;
