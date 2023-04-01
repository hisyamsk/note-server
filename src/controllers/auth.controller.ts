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
      res.sendStatus(StatusCodes.UNAUTHORIZED);

      return;
    }

    const isPasswordMatch = bcrpyt.compare(password, foundUser.password);
    if (!isPasswordMatch) {
      res.sendStatus(StatusCodes.UNAUTHORIZED);
    }

    const { accessToken, refreshToken } = generateAuthTokens(foundUser);

    res.cookie('refreshToken', refreshToken, {
      httpOnly: true,
      secure: true,
      sameSite: 'none',
      maxAge: 1000 * 60 * 60 * 24 * 7,
    });

    res.status(StatusCodes.OK).json(accessToken);
  }
);

// @desc Refresh
// @route GET /auth/refersh
// @access Public
export const authRefreshHandler = asyncHandler(
  async (req: Request, res: Response) => {
    const { cookies } = req;
    if (!cookies?.refreshToken) {
      res.sendStatus(StatusCodes.UNAUTHORIZED);

      return;
    }

    const { refreshToken } = cookies;
    const { decoded, error } = verifyToken(
      refreshToken,
      process.env.REFRESH_TOKEN_SECRET || ''
    );
    if (error) {
      res.sendStatus(StatusCodes.FORBIDDEN);

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

    res.status(StatusCodes.OK).json(accessToken);
  }
);

// @desc Logout
// @route POST /auth/logout
// @access Public
export const authLogoutHandler = asyncHandler(
  async (req: Request, res: Response) => {
    const { cookies } = req;
    if (!cookies.refreshToken) {
      res.sendStatus(StatusCodes.NO_CONTENT);
      return;
    }

    res.clearCookie('refreshToken', {
      httpOnly: true,
      sameSite: 'none',
      secure: true,
    });
    res.sendStatus(StatusCodes.OK);
  }
);
