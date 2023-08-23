require('dotenv').config();
import 'reflect-metadata';
import express, { NextFunction, Request, Response } from 'express';
import config from 'config';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import deserializeUser from './middleware/deserializeUser';
import router from './routes';
import createAppError, { AppError, HttpCode } from './utils/appError';
import log from './utils/logger';
import AppDataSource from './utils/connectToDb';
import limiter from './utils/limiter';
import { seedDb } from './utils/seedDb';
import { setup } from './utils/setup';

AppDataSource.initialize()
  .then(async () => {
    const app = express();
    const port = config.get<number>('port');

    const nodeEnv = config.get<string>('nodeEnv');

    if(nodeEnv === "development") {
      seedDb();
    }

    const setupStatus = config.get<string>('setupStatus');

    if(setupStatus === "setup") {
      setup()
    }

    // db Seeding, if you want this to run you must import the seedDB function

    // log all requests
    app.use(morgan('dev'));

    // header security
    app.use(
      helmet({
        frameguard: true,
        hidePoweredBy: true,
        hsts: true,
        noSniff: true,
        permittedCrossDomainPolicies: true,
        contentSecurityPolicy: {
          directives: {
            defaultSrc: ["'self'"],
            scriptSrc: [
              "'self'",
              "'unsafe-inline'",
              "https://*.willnahmens.com"
            ],
            connectSrc: [
              "'self'",
              "'unsafe-inline'",
              "https://*.willnahmens.com",
            ]
          },
        }
      })
    );

    // rate limiting API calls only
    app.use('/api', limiter);

    // parse incoming requests with JSON payloads
    app.use(express.json({ limit: '10mb' }));

    // cors protection
    app.use(cors());

    // checks for Bearer token
    app.use(deserializeUser);

    // setup routes
    app.use(router);

    // reject unknown routes
    app.all('*', (req: Request, _res: Response, next: NextFunction) => {
      return next(
        createAppError(HttpCode.NOT_FOUND, `Route ${req.originalUrl} not found`)
      );
    });

    // global error handling
    app.use(
      (error: AppError, _req: Request, res: Response, _next: NextFunction) => {
        error.status = error.status || 'error';
        error.statusCode = error.statusCode || 500;

        res.status(error.statusCode).json({
          status: error.status,
          message: error.message,
        });
      }
    );

    app.listen(port);

    log.info(`App started at http://localhost:${port}`);
  })
  .catch((error) => log.error(error));
