import express, { Express, Request, Response } from 'express';
import path from 'path';
import cookieParser from 'cookie-parser';
import cors from 'cors';

import { loggerMiddleware } from './middleware/logger';
import errorHandlerMiddleware from './middleware/errorHandler';

import rootRouter from './routes/root.router';
import corsOptions from '../config/corsOptions';
import connectServer from './utils/connect';
import apiRouter from './routes/api/api.router';
import authRouter from './routes/auth/auth.router';

const app: Express = express();

app.use(loggerMiddleware);
app.use(express.json());
app.use(cookieParser());
app.use(cors(corsOptions));
app.use('/', express.static(path.join(__dirname, '..', 'public')));
app.use('/', rootRouter);
app.use('/auth', authRouter);
app.use('/api', apiRouter);

app.all('*', (req: Request, res: Response) => {
  res.status(404);
  if (req.accepts('html')) {
    return res.sendFile(path.join(__dirname, 'views', '404.html'));
  } else if (req.accepts('json')) {
    return res.json({ message: '404 Not Found' });
  }
  return res.send('404 Not Found');
});

app.use(errorHandlerMiddleware);

connectServer(app);
