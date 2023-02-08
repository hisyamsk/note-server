import mongoose from 'mongoose';

export interface IUserResponse {
  username: string;
  roles: string[];
  active: boolean;
}

export interface IUserModel extends IUserResponse {
  password: string;
}

export interface INoteModel {
  user: mongoose.Schema.Types.ObjectId;
  title: string;
  text: string;
  completed: boolean;
  createdAt: Date;
  updatedAt: Date;
}
