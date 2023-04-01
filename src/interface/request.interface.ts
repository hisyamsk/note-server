import mongoose from 'mongoose';
import { UserRoles } from './model.interface';

export interface IUserRequest {
  username: string;
  roles: UserRoles[];
  active: boolean;
  password?: string;
}

export interface INoteRequest {
  title: string;
  text: string;
  completed: boolean;
  user: mongoose.Types.ObjectId;
}
