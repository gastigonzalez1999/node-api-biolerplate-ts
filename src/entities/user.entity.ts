import mongoose, { Document, Schema, model } from 'mongoose';

enum ROLEOPTIONS {
  admin = 'ADMIN',
  user = 'USER',
};

export interface IUser extends Document {
  name: string;
  email: string;
  password: string;
  img: string;
  role: ROLEOPTIONS;
  status: boolean;
  google?: boolean;
}

const UserSchema = new Schema({
  _id: {
    type: mongoose.Types.ObjectId,
    auto: true,
  },
  name: { 
    type: String, 
    required: [true, 'The name is required'] 
  },
  email: { 
    type: String, 
    required: [true, 'The email is required'], 
    unique: true 
  },
  password: { 
    type: String, 
    required: [true, 'The password is required'] 
  },
  img: { type: String },
  role: { 
    type: String, 
    required: true, 
    enum: ['ADMIN', 'USER'] 
  },
  status: { 
    type: Boolean, 
    default: true 
  },
  google: { 
    type: Boolean, 
    default: false 
  },
});

UserSchema.methods.toJSON = function () {
  const { __v, password, _id, ...user } = this.toObject();
  user.uid = _id;  
  return user;
}

const User = model<IUser>('User', UserSchema);
export default User;