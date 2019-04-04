import jwt from 'jsonwebtoken';
import jwtDecode from 'jwt-decode';
import dotenv from 'dotenv';
import models from '../../database/models';

dotenv.config();
const authenticate = async (req, res, next) => {
  const { headers: { authorization }, headers } = req;
  if (!headers || !authorization) {
    return res.status(401)
      .json({
        success: false,
        errors: 'Please provide an authentication token'
      });
  }
  const { verify } = jwt;
  verify(authorization, process.env.SECRET_KEY, (error, token) => {
    if (error) {
      return res.status(401).json({ success: false, errors: 'Token is invalid' });
    }
    req.jwt_token = token;
    return next();
  });
};

const checkRole = async ({ id: staffID }) => {
  const roles = await models.UserRole.findAll({
    where: {
      staffID
    },
    include: [
      {
        model: models.Role,
        as: 'role',
        attributes: ['id', 'roleName'],
      },
    ]
  });
  return roles.map(each => each.role.roleName);
};

const allowRoles = roles => async (req, res, next) => {
  const { headers: { authorization } } = req;
  const decode = jwtDecode(authorization);
  const role = await checkRole(decode);
  if (!roles.some(e => e.includes(role))) {
    return res.status(403).json({
      error: 'You do not have access to this endpoint'
    });
  }
  return next();
};

const Authenticate = {
  authenticate,
  allowRoles,
};

export default Authenticate;
