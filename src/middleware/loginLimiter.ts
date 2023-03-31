import { Response, Request, NextFunction } from 'express';
import rateLimit, { Options } from 'express-rate-limit';
import { logEvents } from './logger';

const loginLimiter = rateLimit({
  windowMs: 60 * 1000,
  max: 5,
  handler: (
    req: Request,
    res: Response,
    next: NextFunction,
    options: Options
  ) => {
    logEvents(
      `Too many requests: ${options.message}\t${req.method}\t${req.url}\t${req.headers.origin}`,
      'errorLog.log'
    );
    res.status(options.statusCode).send(options.message);
  },
  standardHeaders: true,
  legacyHeaders: false,
});

export default loginLimiter;
