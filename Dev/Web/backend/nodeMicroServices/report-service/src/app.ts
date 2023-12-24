import express from 'express';
import cors from 'cors';
import reportRouter from './routes/reportRoutes';
import mongoose from 'mongoose';

const app = express();
const PORT = 3004;

// Connect to the database
mongoose.connect("mongodb+srv://seifeddine:ewyFHk1NAO0j78Oc@cluster0.o4udqpk.mongodb.net/reports")
  .then(() => {
    console.log('MongoDB connected');

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
  })
  .catch(error => {
    console.error('MongoDB connection failed:', error);
    process.exit(1);
  });
