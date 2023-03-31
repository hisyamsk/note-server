import mongoose from 'mongoose';

export interface IUserRequest {
  username: string;
  roles: string[];
  active: boolean;
  password?: string;
}

export interface INoteRequest {
  title: string;
  text: string;
  completed: boolean;
  user: mongoose.Types.ObjectId;
}
