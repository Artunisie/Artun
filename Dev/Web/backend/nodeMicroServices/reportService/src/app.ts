import express, { Request, Response, NextFunction } from 'express';
import cors from 'cors';
import bodyParser from 'body-parser'; // Add this line for body parsing
import reportRouter from './routes/reportRouter';
import { connectDB } from './db';

const app = express();
const PORT = 3004;

// Connect to the database
async function startServer() {
  try {
    await connectDB();
    console.log('Connected to the database');

    // Use cors middleware
    app.use(cors());

    // Parse JSON bodies
    app.use(bodyParser.json()); // Use body-parser for JSON parsing

    // Log incoming requests
    app.use((req: Request, res: Response, next: NextFunction) => {
      console.log('Received Request:', req.method, req.url, req.body);
      next();
    });

    // Error handling middleware
    app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
      console.error(err.stack);
      res.status(500).send('Something went wrong!');
    });

    // Routes
    app.use('/reports', reportRouter);

    // Start the server
    app.listen(PORT, () => {
      console.log(`Reports Service running on port ${PORT}`);
    });
  } catch (error) {
    console.error('Error connecting to the database:', error);
  }
}

startServer();
