import mongoose, { Schema, Document } from 'mongoose';

export interface IProposition extends Document {
    subject:string;
    proposedPrice: number;
    coverLetter:string
    userId: string;
    demandId: string;
    acceptanceStatus: number;
    refusalStatus: number ; 
  }

const PropositionSchema :Schema = new Schema({
  subject:{type:String ,required:true} , 
    proposedPrice: { type: Number, required: true },
    coverLetter:{ type:String, require:true} , 
    userId: { type: String, required: true },
    demandId: { type: String, required: true },
    acceptanceStatus: { type: Number, default: 0 },   // 0: Pending, 1: Accepted
    refusalStatus:{type:Number ,default:0}  , // 0: Pending, 1: Accepted
  
  });
const Proposition = mongoose.model<IProposition>('Proposition', PropositionSchema);

export default Proposition;