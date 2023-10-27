import mongoose, { Schema, Document } from 'mongoose';

export interface IUser extends Document {
  email: string;
  password: string;
  name: string;
  ncin: string;
  ntel: string;
  isVerified: boolean;
}

const UserSchema = new Schema<IUser>({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  name: { type: String, required: true },
  ncin: { type: String, required: true },
  ntel: { type: String, required: true },
  isVerified: { type: Boolean, default: false },
});

export default mongoose.model<IUser>('User', UserSchema);
