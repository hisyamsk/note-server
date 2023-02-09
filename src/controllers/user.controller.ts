import { Request, Response } from 'express';
import asyncHandler from 'express-async-handler';
import { StatusCodes } from 'http-status-codes';

import { IUserDocument } from '../interface/model.interface';
import {
  createNewUser,
  findUser,
  getAllUsers,
  updateUser,
} from '../service/user.service';
import {
  CreateUserInput,
  DeleteUsersInput,
  UpdateUserInput,
} from '../schema/user.schema';
import { hashPassword } from '../utils/passwordUtils';

// @desc Get all users
// @route GET /users
// @access Private
export const getAllUsersHandler = asyncHandler(
  async (_: Request, res: Response) => {
    const users: IUserDocument = await getAllUsers();
    res.status(StatusCodes.OK).json(users);
  }
);

// @desc Create new user
// @route POST /users
// @access Private
export const createNewUserHandler = asyncHandler(
  async (req: Request<{}, {}, CreateUserInput['body']>, res: Response) => {
    const isUserExist = await findUser({ username: req.body.username });
    if (isUserExist) {
      res
        .status(StatusCodes.CONFLICT)
        .json({ message: 'Username already exist' });
      return;
    }
    const hashedPassword = await hashPassword(req.body.password);
    const newUser = await createNewUser({
      ...req.body,
      password: hashedPassword,
    });

    res.status(StatusCodes.CREATED).json(newUser);
  }
);

// @desc Update a user
// @route PATCH /users
// @access Private
export const updateUserHandler = asyncHandler(
  async (req: Request<{}, {}, UpdateUserInput['body']>, res: Response) => {
    const { username, id, password } = req.body;
    const user = await findUser({ _id: id });
    const duplicate = await findUser({ username });

    if (!user) {
      res.status(StatusCodes.NOT_FOUND).json({
        message: 'User not found',
      });

      return;
    } else if (duplicate && duplicate._id.toString() !== id) {
      res.status(StatusCodes.CONFLICT).json({
        message: 'Username already exist',
      });

      return;
    }

    const body = req.body;
    if (password) {
      body.password = await hashPassword(password);
    }
    const updatedUser = await updateUser({ _id: id }, body);

    res.json(StatusCodes.CREATED).json(updatedUser);
  }
);

// @desc Delete a user
// @route DELETE /users
// @access Private
export const deleteUserHandler = asyncHandler(
  async (req: Request<{}, {}, DeleteUsersInput['body']>, res: Response) => {}
);
