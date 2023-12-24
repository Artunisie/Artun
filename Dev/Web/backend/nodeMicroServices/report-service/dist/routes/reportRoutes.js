"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// report.routes.ts
const express_1 = __importDefault(require("express"));
const reportsController_1 = require("../controllers/reportsController");
const router = express_1.default.Router();
router.get('/', reportsController_1.getAllReports);
router.post('/', reportsController_1.addReport);
exports.default = router;
