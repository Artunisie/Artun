import mongoose, { Schema, Document } from 'mongoose';

export interface IDemand extends Document {
  jobTitle: string;
  jobDescription: string;
  hourlyRateMin: string;
  hourlyRateMax: string;
  applicationDeadline: string;
  requirements: string[];
  acceptanceStatus: number;
  clientId: string; 
}

const demandSchema: Schema = new Schema({
  jobTitle: { type: String, required: true },
  jobDescription: { type: String, required: true },
  hourlyRateMin: { type: Number, required: true },
  hourlyRateMax: { type: Number, required: true },
  applicationDeadline: { type: String, required: true },
  requirements: [{ type: String, required: true }],
  acceptanceStatus: { type: Number, default: 0 }, // 0: Pending, 1: Accepted
  clientId: { type: String, required: true },
});

const Demand = mongoose.model<IDemand>('Demand', demandSchema);

export default Demand;
