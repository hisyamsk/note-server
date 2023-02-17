import mongoose from 'mongoose';

export interface IUserInput {
  username: string;
  roles: string[];
  active: boolean;
  password?: string;
}

export interface IUserDocument extends IUserInput {
  _id: string;
}

export interface IUserModel extends IUserInput {
  password: string;
}

export interface INoteInput {
  title: string;
  text: string;
  completed: boolean;
  user: mongoose.Types.ObjectId;
}

export interface INoteModel extends INoteInput {
  _id: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface INoteResponse extends INoteModel {
  username?: IUserInput['username'];
}
