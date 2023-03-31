import express from 'express';
import {
  authLoginHandler,
  authLogoutHandler,
  authRefreshHandler,
} from '../../controllers/auth.controller';
import loginLimiter from '../../middleware/loginLimiter';
import validateResource from '../../middleware/validateResource';
import { authLoginSchema } from '../../schema/auth.schema';

const authRouter = express.Router();

authRouter.post(
  '/',
  [loginLimiter, validateResource(authLoginSchema)],
  authLoginHandler
);
authRouter.get('/refresh', authRefreshHandler);
authRouter.post('/logout', authLogoutHandler);

export default authRouter;
