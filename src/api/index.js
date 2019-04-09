import express from 'express';
import Users from './Users/index';
import Students from './Students/index';

const router = express.Router();
const apiPrefix = '/api/v1';
export default (app) => {
  router.use(Users);
  router.use(Students);
  app.use(apiPrefix, router);
  return app;
};
