import express from 'express';
import verifyJwt from '../../middleware/verifyJwt';
import noteRouter from './note.router';
import userRouter from './user.router';

const apiRouter = express.Router();

apiRouter.use(verifyJwt);

apiRouter.use('/users', userRouter);
apiRouter.use('/notes', noteRouter);

export default apiRouter;
