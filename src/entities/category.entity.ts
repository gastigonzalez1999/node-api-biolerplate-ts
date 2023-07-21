import { Schema, model, Document } from 'mongoose';

export interface ICategory extends Document {
  name: string;
  status: boolean;
  user: Schema.Types.ObjectId;
}

const CategorySchema = new Schema({
  name: { 
    type: String, 
    required: [true, 'The name is required'] 
  },
  status: { 
    type: Boolean, 
    default: true, required: [true, 'Status is required'] 
  },
  user: { 
    type: Schema.Types.ObjectId, 
    ref: 'User', 
    required: true 
  },
});

CategorySchema.methods.toJSON = function () {
  const { __v, ...data } = this.toObject();
  return data;
}

const Category = model<ICategory>('User', CategorySchema);
export default Category;
