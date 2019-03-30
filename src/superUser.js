const pg = require('pg');
const dotenv = require('dotenv');
const crypt = require('bcrypt');

dotenv.config();
const pool = new pg.Pool({ connectionString: process.env.DATABASE_URL });
const print = console.log;
const createSuperUser = async (
  {
    name, mobile, email, position, idNumber, password
  }
) => {
  const superQuery = `
    SELECT * from "Roles" WHERE (
    "Roles"."roleName"='Super Admin');
    `;
  const staffQuery = `
    SELECT * from "Staffs" WHERE (
    "Staffs"."idNumber"='${idNumber}'
    );`;
  const superUserId = await pool.query(superQuery);
  if (!superUserId.rows.length) {
    const sql = 'INSERT INTO "Roles" '
      + '("id", "roleName", "description", "createdAt", "updatedAt") VALUES ('
      + 'DEFAULT, $1, $2, $3, $4);';
    await pool.query(sql, ['Super Admin', 'Can perform all tasks', new Date(), new Date()]);
    print('Super Admin role Successfully created...........');
  }
  const userExists = await pool.query(staffQuery);
  if (!userExists.rows.length) {
    const newUserQuery = 'INSERT INTO "Staffs" '
    + '("id", "name", "mobile", "email", "position", '
    + '"idNumber", "hireDate", "createdAt", "updatedAt", "password")'
    + 'VALUES (DEFAULT, $1, $2, $3, $4, $5, $6, $7, $8, $9);';
    const encryptedPassword = await crypt.hashSync(password, crypt.genSaltSync(10));
    await pool.query(newUserQuery,
      [
        name, mobile, email, position, idNumber,
        new Date(), new Date(), new Date(), encryptedPassword
      ]);
    print('User successfully created...........');
  }
  const superAdmin = await pool.query(superQuery);
  const superId = superAdmin.rows[0].id;
  const staff = await pool.query(staffQuery);
  const staffId = staff.rows[0].id;
  const roleAssignedQuery = `
  SELECT * from "UserRoles" WHERE 
  ("UserRoles"."roleId" = '${superId}' AND "UserRoles"."staffID" = '${staffId}');
  `;
  const roleAssigned = await pool.query(roleAssignedQuery);
  if (!roleAssigned.rows.length) {
    const query = 'INSERT INTO "UserRoles" ("id", "staffID", "roleId", "createdAt", "updatedAt") '
      + 'VALUES (DEFAULT, $1, $2, $3, $4);';
    await pool.query(query, [staffId, superId, new Date(), new Date()]);
  }
};

createSuperUser({
  name: process.env.SUPER_USERNAME,
  mobile: process.env.SUPER_MOBILE,
  email: process.env.SUPER_EMAIL,
  position: process.env.SUPER_POSITION,
  idNumber: process.env.SUPER_ID,
  password: process.env.SUPER_PWD
}).then(() => {
  print('super user created successfully. You can now login to add new staff...........');
});
