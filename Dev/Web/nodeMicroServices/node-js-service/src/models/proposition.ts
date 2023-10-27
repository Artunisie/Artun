import mongoose, { Schema, Document } from 'mongoose';

export interface IProposition extends Document {
    proposedPrice: number;
    userId: string;
    demandId: string;
    acceptanceStatus: number;
  }

const PropositionSchema :Schema = new Schema({
    proposedPrice: { type: Number, required: true },
    userId: { type: String, required: true },
    demandId: { type: String, required: true },
    acceptanceStatus: { type: Number, default: 0 }, // 0: Pending, 1: Accepted
  });
const Proposition = mongoose.model<IProposition>('Proposition', PropositionSchema);

export default Proposition;