import mongoose from 'mongoose';

export interface IUserInput {
  username: string;
  roles: string[];
  active: boolean;
  password?: string;
}

export interface IUserDocument extends IUserInput {
  _id: mongoose.Schema.Types.ObjectId;
}

export interface IUserModel extends IUserInput {
  password: string;
}

export interface INoteModel {
  user: IUserDocument['_id'];
  title: string;
  text: string;
  completed: boolean;
  createdAt: Date;
  updatedAt: Date;
}
