import 'reflect-metadata';
import './config/env';
import 'express-async-errors';
import cors from 'cors';
import { resolve } from 'path';

import express, { Request, Response, NextFunction } from 'express';
import './database';
import routes from './routes';
import AppError from './errors/AppError';

const app = express();

app.use(express.json());
app.use(cors());
app.use('/files', express.static(resolve(__dirname, '..', 'uploads')));
app.use(routes);

app.use((err: Error, request: Request, response: Response, _: NextFunction) => {
  if (err instanceof AppError) {
    return response
      .status(err.statusCode)
      .json({ status: 'error', message: err.message });
  }
  console.log(err);
  return response
    .status(500)
    .json({ status: 'error', message: 'Internal server error' });
});

app.listen(3333);
