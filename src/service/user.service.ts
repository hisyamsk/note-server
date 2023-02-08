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

export async function findUser(username: string) {
  const user = await UserModel.findOne({ username })
    .lean<IUserResponse>()
    .exec();

  return user;
}

export async function createNewUser(input: DocumentDefinition<IUserModel>) {
  const salt: string = await bcrypt.genSalt(10);
  const hashedPassword: string = await bcrypt.hash(input.password, salt);

  const newUser = await UserModel.create({
    ...input,
    password: hashedPassword,
  });

  return newUser;
}
