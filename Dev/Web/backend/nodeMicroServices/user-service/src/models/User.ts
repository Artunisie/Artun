import mongoose, { Schema, Document } from 'mongoose';

export interface IUser extends Document {
  email: string;
  password: string;
  name: string;
  ncin: string;
  ntel: string;
  role:string,
  profileImg:String,
  reports:Number,
  isBlocked:boolean,
  isVerified: boolean;
}

const UserSchema = new Schema<IUser>({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  name: { type: String, required: true },
  ncin: { type: String, required: true },
  ntel: { type: String, required: true },
  role: { type: String, required: true },
  profileImg: { type: String, required: false },
  reports:{type:Number,default:0},
  isVerified: { type: Boolean, default: false },
  isBlocked:{type:Boolean,default:false}
});

export default mongoose.model<IUser>('User', UserSchema);
