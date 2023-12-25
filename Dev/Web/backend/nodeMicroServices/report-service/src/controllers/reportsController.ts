import { Request, Response } from 'express';
import axios, { AxiosError } from 'axios';
import Report from '../models/reportmodel';

export const getAllReports = async (_: Request, res: Response) => {
  try {
    const reports = await Report.find();
    res.status(200).json(reports);
  } catch (error) {
    console.error('Error fetching reports:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

export const addReport = async (req: Request, res: Response) => {
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
      reporterExistsResponse = await axios.get(`http://localhost:3000/api/users/${idReporter}`);
    } catch (reporterError: any) {
      console.error('Error checking reporter:', reporterError);

      if (axios.isAxiosError(reporterError)) {
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
      reportedExistsResponse = await axios.get(`http://localhost:3000/api/users/${idReported}`);
    } catch (reportedError: any) {
      console.error('Error checking reported user:', reportedError);

      if (axios.isAxiosError(reportedError)) {
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
    const existingReport = await Report.findOne({
      reportCause,
      idReporter,
      idReported,
    });

    if (existingReport) {
      return res.status(400).json({ message: 'Report cause must be unique for each reporter-reported pair' });
    }

    // Create and save the new report
    const newReport = new Report({ reportCause, idReporter, idReported });
    await newReport.save();

    // Increment the reports count for the reported user
    try {
      await axios.put(`http://localhost:3000/api/users/report-user/${idReported}`);
    } catch (incrementError: any) {
      console.error('Error incrementing reports count for the reported user:', incrementError);

      if (axios.isAxiosError(incrementError)) {
        return res.status(500).json({ message: 'Error incrementing reports count for the reported user' });
      }

      // Handle other errors or rethrow
      throw incrementError;
    }

    res.status(201).json(newReport);

  } catch (error) {
    console.error('Error adding a report:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};
