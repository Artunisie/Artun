// server.ts
import express from 'express';
import cors from 'cors';
import reportRouter from './routes/reportRoutes';
import { connectDB } from './db';

const app = express();
const PORT = 3004;

// Connect to the database
connectDB();

// Use cors middleware
app.use(cors());

// Parse JSON bodies
app.use(express.json());

// Routes
app.use('/reports', reportRouter);

// Start the server
app.listen(PORT, () => {
  console.log(`Reports Service running on port ${PORT}`);
});
