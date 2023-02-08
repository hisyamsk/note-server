import { Request, Response } from 'express';
import asyncHandler from 'express-async-handler';
import bcrypt from 'bcrypt';
import { StatusCodes } from 'http-status-codes';

import { IUserResponse } from '../interface/model.interface';
import { createNewUser, findUser, getAllUsers } from '../service/user.service';
import { CreateUserInput } from '../schema/user.schema';

// @desc Get all users
// @route GET /users
// @access Private
export const getAllUsersHandler = asyncHandler(
  async (_: Request, res: Response) => {
    const users: IUserResponse = await getAllUsers();
    res.status(StatusCodes.OK).json(users);
  }
);

// @desc Create new user
// @route POST /users
// @access Private
export const createNewUserHandler = asyncHandler(
  async (req: Request<{}, {}, CreateUserInput['body']>, res: Response) => {
    const isUserExist = await findUser(req.body.username)
    if (isUserExist) {
      res.status(StatusCodes.CONFLICT).json({ message: 'Username already exist' })
      return
    }

    const newUser = await createNewUser({...req.body})

    res.status(StatusCodes.CREATED).json(newUser);
  }
);

// @desc Update a user
// @route PATCH /users
// @access Private
export const updateUserHandler = asyncHandler(
  async (req: Request, res: Response) => {
    res.sendStatus(200);
  }
);

// @desc Delete a user
// @route DELETE /users
// @access Private
export const deleteUserHandler = asyncHandler(
  async (req: Request, res: Response) => {
    res.sendStatus(200);
  }
);
