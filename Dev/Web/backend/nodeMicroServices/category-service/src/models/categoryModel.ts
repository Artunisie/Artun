import mongoose, { Document, Schema } from 'mongoose';

export interface CategoryDocument extends Document {
  name: string;
  _id: string;
}

const categorySchema = new Schema<CategoryDocument>({
  name: {
    type: String,
    required: true,
    unique: true,
  },
});

const Category = mongoose.model<CategoryDocument>('Category', categorySchema);

export default Category;
