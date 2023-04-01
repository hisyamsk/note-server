import { NextFunction, Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { verifyToken } from '../utils/jwt.util';

const verifyJwt = (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization || '';
  if (!authHeader.startsWith('Bearer ')) {
    res.status(StatusCodes.UNAUTHORIZED).json({ message: 'UNAUTHORIZED' });

    return;
  }

  const accessToken = authHeader.split(' ')[1];
  const { decoded, error } = verifyToken(
    accessToken,
    process.env.ACCESS_TOKEN_SECRET || ''
  );
  if (error) {
    res.status(StatusCodes.FORBIDDEN).json({ message: 'FORBIDDEN' });

    return;
  }

  res.locals.user = decoded.UserInfo?.username;
  res.locals.roles = decoded.UserInfo?.roles;
  next();
};

export default verifyJwt;
