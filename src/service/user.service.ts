import {
  DocumentDefinition,
  FilterQuery,
  QueryOptions,
  UpdateQuery,
} from 'mongoose';
import { IUserDocument } from '../interface/model.interface';
import { IUserRequest } from '../interface/request.interface';
import { IUserResponse } from '../interface/response.interface';
import UserModel from '../models/user.model';

export async function getAllUsers() {
  const users = await UserModel.find()
    .select('-password')
    .lean<IUserResponse[]>();

  return users;
}

export async function findUser(query: FilterQuery<IUserDocument>) {
  const user = await UserModel.findOne(query)
    .lean<IUserDocument>()
    .exec();

  return user;
}

export async function createNewUser(input: DocumentDefinition<IUserRequest>) {
  const newUser = await UserModel.create({ ...input });

  return newUser;
}

export async function updateUser(
  query: FilterQuery<IUserDocument>,
  update: UpdateQuery<IUserRequest>,
  options: QueryOptions = { new: true }
) {
  const updatedUser = await UserModel.findOneAndUpdate(query, update, options)
    .select('-password')
    .lean<IUserResponse>()
    .exec();

  return updatedUser;
}

export async function deleteUser(query: FilterQuery<IUserDocument>) {
  const deletedUser = await UserModel.deleteOne(query);

  return deletedUser;
}
