import express, { Express, Request, Response } from 'express';
import path from 'path';
import { loggerMiddleware } from './middleware/logger';

import rootRouter from './routes/root.router';

const PORT: number = 8000;
const app: Express = express();

app.use(loggerMiddleware);
app.use(express.json());
app.use('/', express.static(path.join(__dirname, '..', 'public')));
app.use('/', rootRouter);

app.all('*', (req: Request, res: Response) => {
  res.status(404);
  if (req.accepts('html')) {
    return res.sendFile(path.join(__dirname, 'views', '404.html'));
  } else if (req.accepts('json')) {
    return res.json({ message: '404 Not Found' });
  }
  return res.send('404 Not Found');
});

app.listen(PORT, () => {
  console.log('listening on port 8000');
});
