import express from 'express';
import expressValidator from 'express-validator';
import cors from 'cors';
import parser from 'body-parser';
import morgan from 'morgan';
import api from './api/index';

const app = express();
app.use(cors());
app.use(morgan('dev'));
app.use(parser.json());
app.use(expressValidator());
api(app);
app.use('*', (req, res) => {
  res.status(404).json({
    message: 'please check the route'
  });
});

export default app;
