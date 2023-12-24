import mongoose from 'mongoose';

export const connectDB = async () => {
  try {
    const mongoURI = "mongodb+srv://seifeddine:ewyFHk1NAO0j78Oc@cluster0.o4udqpk.mongodb.net/reports";
    await mongoose.connect(mongoURI);

    console.log('MongoDB connected');
  } catch (error) {
    console.error('MongoDB connection failed:', error);
    process.exit(1);
  }
};
