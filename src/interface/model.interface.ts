import mongoose from 'mongoose';

export interface IUserModel {
  username: string;
  password: string;
  roles: string[];
  active: boolean;
}

export interface INoteModel {
  user: mongoose.Schema.Types.ObjectId;
  title: string;
  text: string;
  completed: boolean;
  createdAt: Date;
  updatedAt: Date;
}
