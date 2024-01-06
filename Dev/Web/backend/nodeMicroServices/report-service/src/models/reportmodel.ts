import mongoose, { Document, Schema } from 'mongoose';

export interface ReportDocument extends Document {
    reportCause: string;
    idReporter: string;
    idReported: string;
}

const reportSchema = new Schema<ReportDocument>({
  reportCause: {
    type: String,
  },
  idReporter: {
    type: String,
    required: true,
    unique:true
  },
  idReported: {
    type: String,
    required: true,
    unique:true
  },
});

const Report = mongoose.model<ReportDocument>('Report', reportSchema);

export default Report;
