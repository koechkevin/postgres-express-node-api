import express from 'express';

const router = express.Router();
const apiPrefix = '/api/v1';
export default (app) => {
  app.use(apiPrefix, router);
  return app;
};
