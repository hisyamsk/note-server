import {
  DocumentDefinition,
  FilterQuery,
  QueryOptions,
  UpdateQuery,
} from 'mongoose';
import {
  IUserInput,
  IUserModel,
  IUserDocument,
} from '../interface/model.interface';
import UserModel from '../models/user.model';

export async function getAllUsers() {
  const users: IUserDocument = await UserModel.find()
    .select('-password')
    .lean<IUserDocument>();

  return users;
}

export async function findUser(query: FilterQuery<IUserDocument>) {
  const user = await UserModel.findOne(query)
    .select('-password')
    .lean<IUserDocument>()
    .exec();

  return user;
}

export async function createNewUser(input: DocumentDefinition<IUserModel>) {
  const newUser = await UserModel.create({ ...input });

  return newUser;
}

export async function updateUser(
  query: FilterQuery<IUserDocument>,
  update: UpdateQuery<IUserInput>,
  options: QueryOptions = { new: true }
) {
  const updatedUser = await UserModel.findOneAndUpdate(query, update, options);

  return updatedUser;
}

export async function deleteUser(query: FilterQuery<IUserDocument>) {
  const deletedUser = await UserModel.deleteOne(query);

  return deletedUser;
}
