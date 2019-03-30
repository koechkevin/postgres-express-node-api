import express from 'express';
import login from './login';
import controller from './controller';
import auth from '../authentication/authenticate';
import validator from './validator';

const { authenticate, allowRoles, } = auth;
const { createRoles, createStaff, getStaff } = controller;
const {
  validateLogin, validateLoginUser, validateNewUser,
  checkIfRoleIsValid, validateUniqueStaff, validateRole
} = validator;
const Router = express.Router();

Router.post(
  '/login',
  validateLogin,
  validateLoginUser,
  login
);

Router.post(
  '/users/staff/create',
  authenticate,
  allowRoles(['Super Admin']),
  validateNewUser, checkIfRoleIsValid, validateUniqueStaff,
  createStaff
);

Router.get(
  '/users/staff',
  allowRoles(['Super Admin', 'Manager']),
  getStaff
);

Router.post(
  '/users/role/create',
  authenticate,
  allowRoles(['Super Admin']),
  validateRole,
  createRoles
);
export default Router;
