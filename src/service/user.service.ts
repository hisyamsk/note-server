import { DocumentDefinition } from 'mongoose';
import bcrypt from 'bcrypt';
import { IUserModel, IUserResponse } from '../interface/model.interface';
import UserModel from '../models/user.model';

export async function getAllUsers() {
  const users: IUserResponse = await UserModel.find()
    .select('-password')
    .lean<IUserResponse>();

  return users;
}

export async function createNewUser(input: DocumentDefinition<IUserModel>) {
  const duplicate = await UserModel.findOne({ username: input.username })
    .lean<IUserResponse>()
    .exec();

  if (duplicate) {
    return false;
  }

  const salt: string = await bcrypt.genSalt(10);
  const hashedPassword: string = await bcrypt.hash(input.password, salt);

  const newUser = await UserModel.create({
    ...input,
    password: hashedPassword,
  });

  return newUser;
}
