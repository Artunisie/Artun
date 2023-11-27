import mongoose, { Schema, Document } from 'mongoose';

export interface IDemand extends Document {
  jobTitle: string;
  jobDescription: string;
  hourlyRateMin: string;
  hourlyRateMax: string;
  applicationDeadline: string; //"urgent" or "not_urgent" 
  requirements: string[];
  acceptanceStatus: number;
  clientId: number; 
  createdAt: Date;
  updatedAt: Date;
}

const demandSchema: Schema = new Schema({
  jobTitle: { type: String, required: true },
  jobDescription: { type: String, required: true },
  hourlyRateMin: { type: Number, required: true },
  hourlyRateMax: { type: Number, required: true },
  applicationDeadline: { type: String, required: true }, //"urgent" or "not_urgent" 
  requirements: [{ type: String, required: true }],
  acceptanceStatus: { type: Number, default: 0 }, // 0: Pending, 1: Accepted
  clientId: { type: Number, required: true },
},
  {
    timestamps: true,
  }) ;

const Demand = mongoose.model<IDemand>('Demand', demandSchema);

export default Demand;
