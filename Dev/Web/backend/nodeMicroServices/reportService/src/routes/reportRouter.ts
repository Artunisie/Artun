// reportRoutes.ts
import express from 'express';
import ReportController from '../controllers/reportController';

// Create a router instance
const reportRouter = express.Router();

// Define routes
reportRouter.get('/', ReportController.getAllReports);
reportRouter.post('/', ReportController.addReport);

// Export the router to be used in other files
export default reportRouter;
