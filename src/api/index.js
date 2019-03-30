import express from 'express';
import Users from './Users/index';

const router = express.Router();
const apiPrefix = '/api/v1';
export default (app) => {
  router.use(Users);
  app.use(apiPrefix, router);
  return app;
};
