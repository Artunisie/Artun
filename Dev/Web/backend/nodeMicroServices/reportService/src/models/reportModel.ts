// reportModel.ts
import mongoose, { Document, Schema } from 'mongoose';

// Define the structure of the Report document
export interface ReportDocument extends Document {
  reportCause: string;
  idreporter: string;
  idReported: string;
}

// Create a Mongoose schema for the Report document
const reportSchema = new Schema<ReportDocument>({
  reportCause: {
    type: String,
    required: true,
  },
  idreporter: {
    type: String,
    required: true,
  },
  idReported: {
    type: String,
    required: true,
  },
});

// Create a Mongoose model for the Report document
const Report = mongoose.model<ReportDocument>('Report', reportSchema);

// Export the Report model to be used in other files
export default Report;
