import express from 'express';
import bodyParser from 'body-parser';
import userRoutes from './routes/userRoutes';
import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config(); 
const app = express();
const port = 3000;

// Check if environment variables exist
const mongodbURI = process.env.MONGODB_URI;
const emailUser = process.env.EMAIL_USER;
const emailPass = process.env.EMAIL_PASS;

if (!mongodbURI || !emailUser || !emailPass) {
  console.error("Please set the required environment variables.");
  process.exit(1); // Terminate the application
}

// Connect to MongoDB using the new options format
mongoose.connect(process.env.MONGODB_URI??"DEAD")
    .then(() => {
        console.log("MongoDb connection success");
    })
    .catch((err) => {
        console.error('MongoDb connection error:', err);
    });
  

app.use(bodyParser.json());

app.use('/api/users', userRoutes);

app.listen(port, () => {
  console.log(`User Service is running on port ${port}`);
});
