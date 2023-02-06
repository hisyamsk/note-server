import express, { Request, Response } from 'express';
import path from 'path';

const rootRouter = express.Router();

rootRouter.get('^/$|/index(.html)?', (req: Request, res: Response) => {
  res.sendFile(path.join(__dirname, '..', 'views', 'index.html'));
});

export default rootRouter;
