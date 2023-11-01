import mongoose from 'mongoose';

export const connectDB = async () => {
  try {
    const mongoURI = 'mongodb://localhost:27017/';
    await mongoose.connect(mongoURI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
    });

    console.log('MongoDB connected');
  } catch (error) {
    console.error('MongoDB connection failed:', error);
    process.exit(1); 
};
