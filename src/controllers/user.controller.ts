import { Request, Response } from 'express';
import asyncHandler from 'express-async-handler';
import { StatusCodes } from 'http-status-codes';

import {
  createNewUser,
  deleteUser,
  findUser,
  getAllUsers,
  updateUser,
} from '../service/user.service';
import {
  CreateUserInput,
  DeleteUsersInput,
  UpdateUserInput,
} from '../schema/user.schema';
import { hashPassword } from '../utils/password.util';
import { findNote } from '../service/note.service';
import { IUserResponse } from '../interface/response.interface';

// @desc Get all users
// @route GET /users
// @access Private
export const getAllUsersHandler = asyncHandler(
  async (_: Request, res: Response) => {
    const users: IUserResponse[] = await getAllUsers();
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
    const { _id, username, roles, active } = await createNewUser({
      ...req.body,
      password: hashedPassword,
    });

    res.status(StatusCodes.CREATED).json({ _id, username, roles, active });
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
    const updatedUser: IUserResponse = await updateUser({ _id: id }, body);

    res.status(StatusCodes.CREATED).json(updatedUser);
  }
);

// @desc Delete a user
// @route DELETE /users
// @access Private
export const deleteUserHandler = asyncHandler(
  async (req: Request<{}, {}, DeleteUsersInput['body']>, res: Response) => {
    const { id } = req.body;

    const note = await findNote({ user: id });
    if (note) {
      res
        .status(StatusCodes.BAD_REQUEST)
        .json({ message: 'User still has assigned notes' });

      return;
    }

    const user = await findUser({ _id: id });
    if (!user) {
      res.status(StatusCodes.NOT_FOUND).json({ message: `user with id:${id} not found!` });

      return;
    }

    const deletedUser = await deleteUser({ _id: id });

    res.status(StatusCodes.OK).json(deletedUser);
  }
);
