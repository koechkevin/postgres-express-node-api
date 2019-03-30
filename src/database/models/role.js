
module.exports = (sequelize, DataTypes) => {
  const Role = sequelize.define('Role', {
    roleName: DataTypes.STRING,
    description: DataTypes.STRING
  }, {});
  Role.associate = (models) => {
    Role.hasMany(models.UserRole, {
      foreignKey: 'roleId',
      as: 'role'
    });
  };
  return Role;
};
