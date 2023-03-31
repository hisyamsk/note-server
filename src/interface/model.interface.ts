import { INoteRequest, IUserRequest } from './request.interface';

export interface IUserDocument extends IUserRequest {
  _id: string;
  password: string;
}

export interface IUserModel extends IUserRequest {
  password: string;
}

export interface INoteModel extends INoteRequest {
  _id: string;
  createdAt: Date;
  updatedAt: Date;
}
