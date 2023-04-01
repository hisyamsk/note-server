import jwt from 'jsonwebtoken';
import { ITokenPayload, IUserDocument } from '../interface/model.interface';

export function generateAuthTokens(user: IUserDocument) {
  const accessToken = jwt.sign(
    {
      UserInfo: {
        username: user.username,
        roles: user.roles,
      },
    },
    process.env.ACCESS_TOKEN_SECRET || '',
    { expiresIn: '10s' }
  );

  const refreshToken = jwt.sign(
    { username: user.username },
    process.env.REFRESH_TOKEN_SECRET || '',
    { expiresIn: '1d' }
  );

  return { accessToken, refreshToken };
}

export function verifyToken(token: string, secret: string) {
  let decoded: ITokenPayload = {};
  let error: any;

  try {
    decoded = jwt.verify(token, secret) as ITokenPayload;
  } catch (err: any) {
    error = err;
  }

  return { decoded, error };
}
