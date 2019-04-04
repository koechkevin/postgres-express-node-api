/* eslint-disable no-useless-escape */
/* eslint-disable max-len */
import moment from 'moment';
import { Op } from 'sequelize';
import users from '../helpers/users';
import models from '../../database/models';

const validateLogin = async (req, res, next) => {
  req.checkBody('idNumber', 'idNumber is required').notEmpty().ltrim();
  req.checkBody('password', 'password is required').notEmpty().ltrim();
  const errors = req.validationErrors();
  if (errors) {
    return users.validationErrorHandler(req, res, errors, 422);
  }
  next();
};

const validateLoginUser = async (req, res, next) => {
  const { body: { idNumber } } = req;
  const user = await models.Staff.findOne({
    where: {
      idNumber
    }
  });
  const errors = [
    { param: 'idNumber', msg: 'the id number you provided does not match any user' }
  ];
  if (!user) {
    return users.validationErrorHandler(req, res, errors, 404);
  }
  next();
};

const validateNewUser = async (req, res, next) => {
  req.checkBody('idNumber', 'idNumber is required').notEmpty().ltrim();
  req.checkBody('mobile', 'mobile number is required').notEmpty().ltrim();
  req.checkBody('name', 'name cannot be null').notEmpty().ltrim();
  req.checkBody('position', 'staff position is required').notEmpty().ltrim();
  req.checkBody('hireDate', 'employment date should be a valid date in format MM-DD-YYYY')
    .notEmpty().ltrim().custom(date => moment(date, 'DD-MM-YYYY', true).isValid());
  req.checkBody('role', 'role should be provided as an integer').notEmpty().ltrim().isInt();
  const errors = req.validationErrors();
  if (errors) {
    return users.validationErrorHandler(req, res, errors, 422);
  }
  next();
};

const checkIfRoleIsValid = async (req, res, next) => {
  const { body: { role } } = req;
  const roles = await models.Role.findOne({
    where: {
      id: role
    }
  });
  if (!roles) {
    const errors = [
      { param: 'role', msg: 'the role id you provided does not exist' }
    ];
    return users.validationErrorHandler(req, res, errors, 404);
  }
  next();
};

const validateUniqueStaff = async (req, res, next) => {
  const { body: { idNumber, mobile } } = req;
  const similar = await models.Staff.findOne({
    where: {
      [Op.or]: [{ idNumber }, { mobile }]
    }
  });
  if (similar) {
    const errors = [
      { param: 'idNumber', msg: 'Please provide a unique id number' },
      { param: 'mobile', msg: 'Please provide a unique mobile number' }
    ];
    return users.validationErrorHandler(req, res, errors, 409);
  }
  next();
};

const validateRole = async (req, res, next) => {
  req.checkBody('roleName', 'roleName is required').notEmpty().ltrim();
  req.checkBody('description', 'description is required').notEmpty().ltrim();
  const { body: { roleName } } = req;
  const similar = await models.Role.findOne({
    where: {
      roleName
    }
  });
  let errors = req.validationErrors();
  if (similar) {
    const error = { param: 'roleName', msg: 'roleName already exists' };
    if (errors) errors.push(error);
    errors = errors || [error];
  }
  if (errors) {
    return users.validationErrorHandler(req, res, errors, 422);
  }
  next();
};

export default {
  validateLogin, validateLoginUser, validateNewUser, checkIfRoleIsValid, validateUniqueStaff, validateRole
};
