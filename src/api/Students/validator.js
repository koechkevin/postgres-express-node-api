import { Op } from 'sequelize';
import users from '../helpers/users';
import models from '../../database/models';

const validateStudent = async (req, res, next) => {
  req.checkBody('name', 'name is required').notEmpty().ltrim();
  req.checkBody('guardian', 'guardian is required').notEmpty().ltrim();
  req.checkBody('level', 'level is required').notEmpty().ltrim();
  req.checkBody('contact', 'contact is required').notEmpty().ltrim();
  req.checkBody('stream', 'stream is required').notEmpty().ltrim();

  const errors = req.validationErrors();
  if (errors) {
    return users.validationErrorHandler(req, res, errors, 422);
  }
  next();
};

const checkIfStudentExists = async (req, res, next) => {
  const { body: { name, guardian, level } } = req;
  const student = await models.Student.findOne({
    where: {
      [Op.and]: [{ name }, { guardian }, { level }]
    }
  });
  if (student) {
    const errors = [
      { param: 'name', msg: 'the student has been created already' }
    ];
    return users.validationErrorHandler(req, res, errors, 409);
  }
  next();
};

export default { validateStudent, checkIfStudentExists };
