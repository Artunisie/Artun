import mongoose from 'mongoose';

export const connectDB = async () => {
  try {
    const mongoURI = "mongodb://0.0.0.0:27017/artun";
    await mongoose.connect(mongoURI);

    console.log('MongoDB connected');
  } catch (error) {
    console.error('MongoDB connection failed:', error);
    process.exit(1);
  }
};
