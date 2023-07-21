import { Schema, model, Document } from "mongoose";

export interface IRole extends Document {
  role: string;
}

const RoleSchema = new Schema({
  role: {
    type: String,
    required: [true, 'The role is required']
  }
});

const Role = model<IRole>('Role', RoleSchema);
export default Role;