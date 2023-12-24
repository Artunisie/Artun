// report.controller.ts
import { Request, Response } from 'express';
import Report from '../models/reportmodel';

export const getAllReports = async (req: Request, res: Response) => {
  try {
    const reports = await Report.find();
    res.status(200).json(reports);
  } catch (error) {
    console.error('Error fetching reports:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

// report.controller.ts
export const addReport = async (req: Request, res: Response) => {
  try {
    const { reportCause, idReporter, idReported } = req.body;

    console.log('Received Request Body:', req.body); // Log the received data

    // Validation for required fields
    if (!reportCause || !idReporter || !idReported) {
      console.log('Validation Failed:', { reportCause, idReporter, idReported }); // Log the extracted data
      return res.status(400).json({ message: 'All fields are required' });
    }

    const newReport = new Report({ reportCause, idReporter, idReported });
    await newReport.save();
    res.status(201).json(newReport);
  } catch (error) {
    console.error('Error adding a report:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};
