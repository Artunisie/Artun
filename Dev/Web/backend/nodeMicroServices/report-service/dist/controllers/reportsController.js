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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.addReport = exports.getAllReports = void 0;
const reportmodel_1 = __importDefault(require("../models/reportmodel"));
const getAllReports = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const reports = yield reportmodel_1.default.find();
        res.status(200).json(reports);
    }
    catch (error) {
        console.error('Error fetching reports:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});
exports.getAllReports = getAllReports;
// report.controller.ts
const addReport = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { reportCause, idReporter, idReported } = req.body;
        console.log('Received Request Body:', req.body); // Log the received data
        // Validation for required fields
        if (!reportCause || !idReporter || !idReported) {
            console.log('Validation Failed:', { reportCause, idReporter, idReported }); // Log the extracted data
            return res.status(400).json({ message: 'All fields are required' });
        }
        const newReport = new reportmodel_1.default({ reportCause, idReporter, idReported });
        yield newReport.save();
        res.status(201).json(newReport);
    }
    catch (error) {
        console.error('Error adding a report:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});
exports.addReport = addReport;
