import { Request, Response } from 'express';
import Report, { ReportDocument } from '../models/reportModel';

const ReportController = {
  getAllReports: async (req: Request, res: Response) => {
    try {
      const reports = await Report.find();
      res.status(200).json(reports);
    } catch (error) {
      console.error('Error fetching reports:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  },

  addReport: async (req: Request, res: Response) => {
    try {
      const { reportCause, idReported, idreporter } = req.body;
  
      // Validation for required fields
      if (!reportCause || !idReported || !idreporter) {
        return res.status(400).json({ message: 'All fields are required' });
      }
  
      console.log('Received Request Body:', req.body); // Log the received data
      console.log('Extracted Data:', { reportCause, idReported, idreporter }); // Log the extracted data
  
      const newReport = new Report({ reportCause, idReported, idreporter });
      await newReport.save();
      res.status(201).json(newReport);
    } catch (error) {
      console.error('Error adding a report:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  }
};  

export default ReportController;
