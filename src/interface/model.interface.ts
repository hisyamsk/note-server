import { JwtPayload } from 'jsonwebtoken';
import { INoteRequest, IUserRequest } from './request.interface';

export type UserRoles = 'Employee' | 'Admin' | 'Manager'

interface ITokenUserInfo {
  username: string;
  roles: UserRoles[];
}

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

export interface ITokenPayload extends JwtPayload {
  username?: string;
  UserInfo?: ITokenUserInfo;
}
