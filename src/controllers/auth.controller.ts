import { Request, Response } from 'express';
import asyncHandler from 'express-async-handler';
import { StatusCodes } from 'http-status-codes';
import bcrpyt from 'bcrypt';
import jwt from 'jsonwebtoken';

import { AuthLoginInput } from '../schema/auth.schema';
import { findUser } from '../service/user.service';

// @desc Login
// @route POST /auth
// @access Public
export const authLoginHandler = asyncHandler(
  async (req: Request<{}, {}, AuthLoginInput['body']>, res: Response) => {
    const { username, password } = req.body;
    const foundUser = await findUser({ username });

    if (!foundUser) {
      res
        .status(StatusCodes.NOT_FOUND)
        .json({ message: `username: ${username} not found!` });

      return;
    }

    if (!foundUser.active) {
      res.status(StatusCodes.UNAUTHORIZED).json({ message: 'Unauthorized' });

      return;
    }

    const isPasswordMatch = bcrpyt.compare(password, foundUser.password);

    if (!isPasswordMatch) {
      res.status(StatusCodes.UNAUTHORIZED).json({ message: 'Unauthorized' });
    }

    const accessToken = jwt.sign(
      {
        UserInfo: {
          username: foundUser.username,
          roles: foundUser.roles,
        },
      },
      process.env.ACCESS_TOKEN_SECRET || '',
      { expiresIn: '10s' }
    );

    const refreshToken = jwt.sign(
      { username: foundUser.username },
      process.env.REFRESH_TOKEN_SECRET || '',
      { expiresIn: '1d' }
    );

    res.cookie('jwt', refreshToken, {
      httpOnly: true,
      secure: true,
      sameSite: 'none',
      maxAge: 1000 * 60 * 60 * 24 * 7000,
    });

    res.status(StatusCodes.OK).json(accessToken);
  }
);

// @desc Refresh
// @route GET /auth/refersh
// @access Public
export const authRefreshHandler = asyncHandler(
  async (req: Request, res: Response) => {
    res.sendStatus(200);
  }
);

// @desc Logout
// @route POST /auth/logout
// @access Public
export const authLogoutHandler = asyncHandler(
  async (req: Request, res: Response) => {
    res.sendStatus(200);
  }
);
