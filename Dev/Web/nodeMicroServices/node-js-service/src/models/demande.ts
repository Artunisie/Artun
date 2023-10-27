import mongoose, { Schema, Document } from 'mongoose';

export interface IDemand extends Document {
  title: string;
  description: string;
  acceptanceStatus: number;
  clientId: string;
  technicians: string[];
}


const demandSchema:Schema= new Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  acceptanceStatus: { type: Number, default: 0 }, // 0: Pending, 1: Accepted
  clientId: { type: String, required: true },
  technicians: [{ type: String }],
});

const Demand = mongoose.model<IDemand>('Demand', demandSchema);

export default Demand;