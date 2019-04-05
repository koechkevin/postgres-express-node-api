import express from 'express';
import login from './login';
import controller from './controller';
import auth from '../authentication/authenticate';
import validator from './validator';

const { authenticate, allowRoles, } = auth;
const {
  createRoles, createStaff, getStaff, updateStaff, getRoles, deleteStaff
} = controller;
const {
  validateLogin, validateLoginUser, validateNewUser,
  checkIfRoleIsValid, validateUniqueStaff, validateRole, validateUpdateStaff
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

Router.put(
  '/users/staff/:idNumber/update',
  authenticate,
  allowRoles(['Super Admin']),
  validateUpdateStaff,
  updateStaff
);

Router.get(
  '/Users/roles',
  authenticate,
  allowRoles(['Super Admin', 'Manager']),
  getRoles
);

Router.get(
  '/users/staff',
  authenticate,
  allowRoles(['Super Admin', 'Manager']),
  getStaff
);

Router.delete(
  '/users/staff/:idNumber/delete',
  authenticate,
  allowRoles(['Super Admin']),
  validateUpdateStaff,
  deleteStaff
);

Router.post(
  '/users/role/create',
  authenticate,
  allowRoles(['Super Admin']),
  validateRole,
  createRoles
);
export default Router;
