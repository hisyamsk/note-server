import express from 'express';
import {
  getAllUsersHandler,
  updateUserHandler,
  createNewUserHandler,
  deleteUserHandler,
} from '../../controllers/user.controller';
import validateResource from '../../middleware/validateResource';
import { createUserSchema } from '../../schema/user.schema';

const userRouter = express.Router();

userRouter.get('/', getAllUsersHandler);
userRouter.post('/', validateResource(createUserSchema), createNewUserHandler);
userRouter.patch('/', updateUserHandler);
userRouter.delete('/', deleteUserHandler);

export default userRouter;
