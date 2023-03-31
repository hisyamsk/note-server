import express from 'express';

const authRouter = express.Router();

authRouter.post('/');
authRouter.get('/refresh');
authRouter.post('/logout');

export default authRouter;
