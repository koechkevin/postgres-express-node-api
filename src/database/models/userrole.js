
module.exports = (sequelize, DataTypes) => {
  const UserRole = sequelize.define('UserRole', {
    staffID: {
      allowNull: false,
      type: DataTypes.INTEGER,
    },
    roleId: {
      allowNull: false,
      type: DataTypes.INTEGER
    },
    deletedAt: {
      allowNull: true,
      type: DataTypes.DATE
    }
  }, {});
  UserRole.associate = (models) => {
    UserRole.belongsTo(models.Role, {
      foreignKey: 'roleId',
      as: 'role'
    });
    UserRole.belongsTo(models.Staff, {
      foreignKey: 'staffID',
      as: 'staff'
    });
  };
  return UserRole;
};
