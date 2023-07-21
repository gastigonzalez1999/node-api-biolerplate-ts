import express from 'express';
import cors from 'cors';
import passport from 'passport';
import bodyParser from 'body-parser';

import Logger from '../services/logger';
import authRouter from '../routes/auth.routes';
import categoriesRouter from '../routes/categories.routes';
import productsRouter from '../routes/products.routes';
import searchRouter from '../routes/search.routes';
import uploadsRouter from '../routes/uploads.routes';
import usersRouter from '../routes/users.routes';
import { dbConnection } from '../db/config';

class Server {
  private app: express.Application;
  private port: string;
  private paths = {
    auth: '/api/auth',
    users: '/api/users',
    categories: '/api/categories',
    products: '/api/products',
    search: '/api/search',
    uploads: '/api/uploads',
  };

  constructor() {
    this.app = express();
    this.port = '8000';
    this.connectDb();
    this.middlewares(),
    this.apiRoutes();
  }

  middlewares() {
    this.app.use(cors());
    this.app.use(express.json());
    this.app.use(bodyParser.urlencoded({ extended: false }));
    this.app.use(passport.initialize());
}

  private apiRoutes(): void {
    this.app.use(this.paths.users, usersRouter);
    this.app.use(this.paths.auth, authRouter);
    this.app.use(this.paths.categories, categoriesRouter);
    this.app.use(this.paths.products, productsRouter);
    this.app.use(this.paths.search, searchRouter);
    this.app.use(this.paths.uploads, uploadsRouter);
  }

  private async connectDb() {
    await dbConnection();
  }

  public listen() {
    this.app.listen(this.port, () => {
      Logger.info(`
        ###################################
          Server is runnning on ${this.port}
        ##################################
      `);
    })
  }
}

export default Server;