import crypt from 'bcrypt';
import models from '../../database/models';

const createRoles = async (req, res) => {
  try {
    const role = await models.Role.create({
      roleName: req.body.roleName,
      description: req.body.description
    });
    res.status(200).json({
      status: 'success',
      role
    });
  } catch (error) {
    res.status(400).json({
      error: error.message
    });
  }
};

const createStaff = async (req, res) => {
  try {
    const {
      body: {
        name, mobile, position, idNumber, hireDate, email, role
      }
    } = req;
    const password = await crypt.hashSync(idNumber, crypt.genSaltSync(10));
    const newStaff = await models.Staff.create({
      name,
      mobile,
      position,
      idNumber,
      hireDate: new Date(hireDate),
      email: email || null,
      password
    });
    const assignRole = await models.UserRole.create({
      staffID: newStaff.id,
      roleId: role
    });
    const roleDetails = await models.Role.findOne({
      where: {
        id: role
      }
    });
    const output = {
      id: assignRole.id,
      staffID: assignRole.staffID,
      roleId: assignRole.roleId,
      createdAt: assignRole.createdAt,
      staff: newStaff,
      role: roleDetails
    };
    res.status(200).json({
      message: 'success',
      newStaff: output
    });
  } catch (error) {
    res.status(400).json({
      error: error.message
    });
  }
};

const updateStaff = async (req, res) => {
  try {
    const { body, params: { idNumber } } = req;
    const didUpdate = await models.Staff.update({ ...body }, {
      where: {
        idNumber
      }
    });
    if (didUpdate[0]) {
      const updated = await models.Staff.findOne({
        where: { idNumber: req.body.idNumber || idNumber }
      });
      return res.status(200).json({
        message: 'success', updated
      });
    }
    res.status(400).json({
      error: 'no record was updated'
    });
  } catch (error) {
    res.status(400).json({
      error: error.message
    });
  }
};

const getStaff = async (req, res) => {
  try {
    const { query: { page, idNumber } } = req;
    const limit = req.query.limit || 10;
    const count = await models.UserRole.count();
    const pageCount = Math.ceil(count / limit);
    const currentPage = page < 1 || !page || pageCount === 0 ? 1 : Math.min(page, pageCount);
    const offset = limit * (currentPage - 1);
    const staff = await models.UserRole.findAll({
      include: [{
        model: models.Staff,
        as: 'staff',
        where: idNumber ? { idNumber } : {},
        attributes: { exclude: ['password'] }
      }, {
        model: models.Role,
        as: 'role'
      }],
      offset,
      limit,
      order: [['id', 'DESC']]
    });
    res.status(200).json({
      status: 'success',
      staff,
      pagination: {
        count, pageCount, currentPage
      }
    });
  } catch (error) {
    res.status(400).json({
      error: error.message
    });
  }
};

const getRoles = async (req, res) => {
  try {
    const roles = await models.Role.findAll({
      order: [['id', 'DESC']]
    });
    res.status(200).json({
      status: 'success',
      roles
    });
  } catch (error) {
    res.status(400).json({
      error: error.message
    });
  }
};

export default {
  createRoles, createStaff, getStaff, updateStaff, getRoles
};
