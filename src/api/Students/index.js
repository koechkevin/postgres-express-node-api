import express from 'express';
import auth from '../authentication/authenticate';
import controller from './controller';
import validator from './validator';

const { authenticate, allowRoles, } = auth;
const { createStudent, getStudents } = controller;
const { checkIfStudentExists, validateStudent } = validator;

const Router = express.Router();

Router.post(
  '/students/create',
  authenticate,
  allowRoles(['Super Admin', 'Teacher', 'Manager']),
  validateStudent, checkIfStudentExists,
  createStudent
);

Router.get(
  '/students',
  authenticate,
  allowRoles(['Super Admin', 'Teacher', 'Manager']),
  getStudents
);

export default Router;
