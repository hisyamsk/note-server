import { Request, Response } from 'express';
import asyncHandler from 'express-async-handler';
import bcrypt from 'bcrypt';

// @desc Get all users
// @route GET /users
// @access Private
export const getAllUsers = asyncHandler(async (req: Request, res: Response) => {
  res.sendStatus(200);
});

// @desc Create new user
// @route POST /users
// @access Private
export const createNewUser = asyncHandler(
  async (req: Request, res: Response) => {
    res.sendStatus(200);
  }
);

// @desc Update a user
// @route PATCH /users
// @access Private
export const updateUser = asyncHandler(async (req: Request, res: Response) => {
  res.sendStatus(200);
});

// @desc Delete a user
// @route DELETE /users
// @access Private
export const deleteUser = asyncHandler(async (req: Request, res: Response) => {
  res.sendStatus(200);
});
