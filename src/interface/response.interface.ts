import { IUserDocument, UserRoles } from './model.interface';

interface INoteUser {
  _id: IUserDocument['_id'];
  username: IUserDocument['username'];
}

export interface IUserResponse {
  _id: string;
  username: string;
  roles: UserRoles[];
  active: boolean;
}

export interface INoteResponse {
  _id: string;
  title: string;
  text: string;
  completed: boolean;
  user?: INoteUser;
  createdAt: Date;
  updatedAt: Date;
}
