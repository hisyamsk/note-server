import { Request, Response, NextFunction, ErrorRequestHandler } from 'express';
import { StatusCodes } from 'http-status-codes';
import { logEvents } from './logger';

const errorHandlerMiddleware = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  logEvents(
    `${err.name}: ${err.message}\t${req.method}\t${req.url}\t${req.headers.origin}`,
    'errLog.log'
  );
  console.log(err.stack);

  const status = res.statusCode
    ? res.statusCode
    : StatusCodes.INTERNAL_SERVER_ERROR;

  res.status(status).json({
    message: err.message,
    isError: true,
  });
};

export default errorHandlerMiddleware;
