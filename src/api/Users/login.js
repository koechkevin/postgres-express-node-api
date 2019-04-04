import crypt from 'bcrypt';
import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';
import models from '../../database/models';

dotenv.config();
const { SECRET_KEY } = process.env;
const login = async (req, res) => {
  const { body: { idNumber, password } } = req;
  const user = await models.Staff.findOne({
    where: {
      idNumber
    }
  });
  if (user && crypt.compareSync(password, user.password)) {
    const userRole = await models.UserRole.findAll({
      where: {
        staffID: user.id
      },
      include: [{
        model: models.Role,
        as: 'role'
      }]
    });
    const roles = userRole.map(each => each.role.roleName);
    res.status(200).json({
      message: 'success',
      roles,
      jwt_token: jwt.sign({
        id: user.id,
        idNumber: user.idNumber,
        occupation: user.occupation
      }, SECRET_KEY, { expiresIn: '12h' })
    });
  } else {
    res.status(401).json({
      message: 'failed',
      error: 'invalid credentials'
    });
  }
};
export default login;
