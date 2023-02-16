import express from 'express';
import noteRouter from './note.router';
import userRouter from './user.router';

const apiRouter = express.Router();

apiRouter.use('/users', userRouter);
apiRouter.use('/notes', noteRouter);

export default apiRouter;
