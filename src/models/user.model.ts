import mongoose from 'mongoose';
import { IUserModel } from '../interface/model.interface';

const UserSchema: mongoose.Schema<IUserModel> = new mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  roles: [
    {
      type: String,
      default: 'Employee',
    },
  ],
  active: {
    type: Boolean,
    default: true,
  },
});

const UserModel = mongoose.model<IUserModel>('User', UserSchema);

export default UserModel;
