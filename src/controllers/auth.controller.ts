import { Request, Response } from 'express';
import asyncHandler from 'express-async-handler';
import { StatusCodes } from 'http-status-codes';
import bcrpyt from 'bcrypt';

import { AuthLoginInput } from '../schema/auth.schema';
import { findUser } from '../service/user.service';
import { generateAuthTokens, verifyToken } from '../utils/jwt.util';

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
      res
        .status(StatusCodes.UNAUTHORIZED)
        .json({ message: `User: ${foundUser.username} is not active!` });

      return;
    }

    const isPasswordMatch = await bcrpyt.compare(password, foundUser.password);
    if (!isPasswordMatch) {
      res
        .status(StatusCodes.BAD_REQUEST)
        .json({ message: 'Incorrect password' });

      return;
    }

    const { accessToken, refreshToken } = generateAuthTokens(foundUser);

    res.cookie('refreshToken', refreshToken, {
      httpOnly: true,
      secure: true,
      sameSite: 'none',
      maxAge: 1000 * 60 * 60 * 24 * 7,
    });

    res.status(StatusCodes.OK).json({ accessToken });
  }
);

// @desc Refresh
// @route GET /auth/refersh
// @access Public
export const authRefreshHandler = asyncHandler(
  async (req: Request, res: Response) => {
    const { cookies } = req;
    if (!cookies?.refreshToken) {
      res
        .status(StatusCodes.BAD_REQUEST)
        .json({ message: 'No refresh token sent' });

      return;
    }

    const { refreshToken } = cookies;
    const { decoded, error } = verifyToken(
      refreshToken,
      process.env.REFRESH_TOKEN_SECRET || ''
    );
    if (error) {
      res
        .status(StatusCodes.FORBIDDEN)
        .json({ message: 'Refresh token has expired, please login' });

      return;
    }

    const foundUser = await findUser({ username: decoded.username });
    if (!foundUser) {
      res
        .status(StatusCodes.NOT_FOUND)
        .json({ message: `username: ${decoded.username} not found!` });

      return;
    }

    const { accessToken } = generateAuthTokens(foundUser);

    res.status(StatusCodes.OK).json({ accessToken });
  }
);

// @desc Logout
// @route POST /auth/logout
// @access Public
export const authLogoutHandler = asyncHandler(
  async (req: Request, res: Response) => {
    const { cookies } = req;
    if (!cookies.refreshToken) {
      res.status(StatusCodes.NO_CONTENT).json({ message: 'NO CONTENT' });
      return;
    }

    res.clearCookie('refreshToken', {
      httpOnly: true,
      sameSite: 'none',
      secure: true,
    });
    res.status(StatusCodes.OK).json({ message: 'OK' });
  }
);
