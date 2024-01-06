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
const axios_1 = __importDefault(require("axios"));
const reportmodel_1 = __importDefault(require("../models/reportmodel"));
const getAllReports = (_, res) => __awaiter(void 0, void 0, void 0, function* () {
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
const addReport = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { reportCause, idReporter, idReported } = req.body;
        console.log('Received Request Body:', req.body);
        if (!reportCause || !idReporter || !idReported) {
            console.log('Validation Failed:', { reportCause, idReporter, idReported });
            return res.status(400).json({ message: 'All fields are required' });
        }
        // Make a request to the user service to check if the reporter exists
        let reporterExistsResponse;
        try {
            reporterExistsResponse = yield axios_1.default.get(`http://localhost:3000/api/users/${idReporter}`);
        }
        catch (reporterError) {
            console.error('Error checking reporter:', reporterError);
            if (axios_1.default.isAxiosError(reporterError)) {
                if (reporterError.response && reporterError.response.status === 404) {
                    return res.status(404).json({ message: 'Reporter not found' });
                }
            }
            // Handle other errors or rethrow
            throw reporterError;
        }
        // Make a request to the user service to check if the reported user exists
        let reportedExistsResponse;
        try {
            reportedExistsResponse = yield axios_1.default.get(`http://localhost:3000/api/users/${idReported}`);
        }
        catch (reportedError) {
            console.error('Error checking reported user:', reportedError);
            if (axios_1.default.isAxiosError(reportedError)) {
                if (reportedError.response && reportedError.response.status === 404) {
                    return res.status(404).json({ message: 'Reported user not found' });
                }
            }
            // Handle other errors or rethrow
            throw reportedError;
        }
        // Check if the reporter and reported are different users
        if (idReporter === idReported) {
            return res.status(400).json({ message: 'Reporter and reported cannot be the same user' });
        }
        // Check if the report cause is unique for the given reporter and reported
        const existingReport = yield reportmodel_1.default.findOne({
            reportCause,
            idReporter,
            idReported,
        });
        if (existingReport) {
            return res.status(400).json({ message: 'Report cause must be unique for each reporter-reported pair' });
        }
        // Create and save the new report
        const newReport = new reportmodel_1.default({ reportCause, idReporter, idReported });
        yield newReport.save();
        // Increment the reports count for the reported user
        try {
            yield axios_1.default.put(`http://localhost:3000/api/users/report-user/${idReported}`);
        }
        catch (incrementError) {
            console.error('Error incrementing reports count for the reported user:', incrementError);
            if (axios_1.default.isAxiosError(incrementError)) {
                return res.status(500).json({ message: 'Error incrementing reports count for the reported user' });
            }
            // Handle other errors or rethrow
            throw incrementError;
        }
        res.status(201).json(newReport);
    }
    catch (error) {
        console.error('Error adding a report:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});
exports.addReport = addReport;
