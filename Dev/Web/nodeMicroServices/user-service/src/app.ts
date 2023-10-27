import express from 'express';
import bodyParser from 'body-parser';
import userRoutes from './routes/userRoutes';
import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config(); 
const app = express();
const port = 3000;

const mongodbURI = process.env.MONGODB_URI;
const emailUser = process.env.EMAIL_USER;
const emailPass = process.env.EMAIL_PASS;

if (!mongodbURI || !emailUser || !emailPass) {
  console.error("Please set the required environment variables.");
  process.exit(1); 
}

mongoose.connect(process.env.MONGODB_URI??"DEAD")
    .then(() => {
        console.log("MongoDb connection success");
    })
    .catch((err) => {
        console.error('MongoDb connection error:', err);
    });
  
const createInitialUser = async () => {
    try {
      const User = mongoose.model('User'); 
      const existingUser = await User.findOne({ email: 'example@example.com' }); 
  
      if (!existingUser) {
        const user = new User({
          email: 'example@example.com',
          password: 'yourpassword', 
          name: 'Example User',
          ncin: '1234567890',
          ntel: '9876543210',
          isVerified:true
        });
  
        await user.save(); 
      }
    } catch (error) {
      console.error('Error creating initial user:', error);
    }
  };
  
app.use(bodyParser.json());

app.use('/api/users', userRoutes);
createInitialUser();


app.listen(port, () => {
    console.log(`User Service is running on port ${port}`);
  });